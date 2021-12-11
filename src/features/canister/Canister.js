import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Container,
    Sprite,
    withApp,
} from 'react-pixi-fiber'

import { selectGridSize } from '../geometry/geometrySlice'
import { Fuel } from './Fuel'
import { loadedCanisterTexture } from '../../util/textures'
import { removeCanister } from './canisterSlice'
import { addExplosion } from '../explosion/explosionSlice'

const CanisterContainerInner = ({ app, canister }) => {
    const {
        i, j,
        colors: {
            canister: canister_tint,
        },
        expired,
    } = canister

    const dispatch = useDispatch()

    const canister_texture = useMemo(() => loadedCanisterTexture(app), [])// further select with cluster

    const grid_size = useSelector(selectGridSize)

    const canisterClick = (i, j) => {
        dispatch(addExplosion({ i, j }))
        dispatch(removeCanister({ i, j }))
    }

    const Shell = () => {
        const props = {
            width: grid_size,
            height: grid_size,
            texture: canister_texture,
            tint: canister_tint,
            interactive: true,
            pointerdown: () => canisterClick(i, j),
        }
        return <Sprite {...props} />
    }

    return (
        <Container>
            {!expired &&
                <Fuel {...canister} />
            }
            <Shell />
        </Container>
    )
}

export const CanisterContainer = withApp(CanisterContainerInner)
