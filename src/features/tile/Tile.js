import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Container,
    withApp,
    Sprite,
} from 'react-pixi-fiber'

import { selectGridSize } from '../geometry/geometrySlice'
import { addCanister, selectCanisterAt } from '../canister/canisterSlice'
import { CanisterContainer } from '../canister/Canister'

const TileContainerInner = ({ app, i, j }) => {
    const { loader: { resources: { floor: {
        texture: floor_texture
    } } } } = app

    const dispatch = useDispatch()

    const grid_size = useSelector(selectGridSize)
    const canister = useSelector(selectCanisterAt(i, j))

    const tileClick = (i, j) => {
        console.log("tile clicked:", { i, j })
        dispatch(addCanister({ i, j, tier: 1 }))
    }

    const Tile = () => {
        return <Sprite
            texture={floor_texture}
            width={grid_size}
            height={grid_size}
            interactive={true}
            pointerdown={() => tileClick(i, j)}
        />
    }

    return (
        <Container position={{ x: i * grid_size, y: j * grid_size }} >
            <Tile />
            {canister &&
                <CanisterContainer canister={canister} />
            }
        </Container>
    )
}

export const TileContainer = withApp(TileContainerInner)
