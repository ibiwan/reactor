import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import {
    Container,
    Sprite,
    withApp,
} from 'react-pixi-fiber'

import { selectGridSize } from '../geometry/geometrySlice'
import { Fuel } from './Fuel'
import { loadedCanisterTexture } from '../../util/textures'

export const CanisterContainerInner = ({ app, canister }) => {
    const {
        i, j,
        colors: {
            canister: canister_tint,
        }
    } = canister

    const canister_texture = useMemo(()=>loadedCanisterTexture(app), [])// further select with cluster

    const grid_size = useSelector(selectGridSize)

    const canisterClick = (i, j) => {
        // console.log("canister clicked:", { i, j })
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
            <Fuel {...canister} />
            <Shell />
        </Container>
    )
}

export const CanisterContainer = withApp(CanisterContainerInner)
