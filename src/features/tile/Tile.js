import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Container,
    withApp,
    Sprite,
} from 'react-pixi-fiber'

import { selectGridSize } from '../geometry/geometrySlice'
import { addCanister, selectCanisterAt } from '../canister/canisterSlice'
import { CanisterContainer } from '../canister/Canister'
import { SINGLE } from '../canister/templates'
import { loadedFloorTexture } from '../../util/textures'
import { selectExplosionAt } from '../explosion/explosionSlice'
import { Explosion } from '../explosion/Explosion '

const TileContainerInner = ({ app, i, j }) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const floor_texture = useMemo(() => loadedFloorTexture(app), [])

    const grid_size = useSelector(selectGridSize)
    const canister = useSelector(selectCanisterAt(i, j))
    const explosion = useSelector(selectExplosionAt(i, j))

    const dispatch = useDispatch()
    const tileClick = (i, j) => {
        dispatch(addCanister({ i, j, tier: 1, cluster: SINGLE }))
    }

    const Tile = () => {
        const props = {
            texture: floor_texture,
            width: grid_size,
            height: grid_size,
            interactive: true,
            pointerdown: () => tileClick(i, j),
        }
        return <Sprite {...props} />
    }

    return (
        <Container position={{ x: i * grid_size, y: j * grid_size }} >
            <Tile />
            {canister &&
                <CanisterContainer {...{ canister }} />
            }
            {explosion &&
                <Explosion {...{ explosion }} />
            }
        </Container>
    )
}

export const TileContainer = withApp(TileContainerInner)
