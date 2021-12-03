import React from 'react'
import { useSelector } from 'react-redux'
import {
    Container,
    Sprite,
    withApp,
} from 'react-pixi-fiber'

import { selectGridSize, selectMaskRect } from '../geometry/geometrySlice'
import { Graphics } from '@pixi/graphics'
import AnimatedSprite from '../../util/AnimatedSprite'

export const CanisterContainerInner = ({ app, canister }) => {
    const grayCanister = 'gray-canister'
    const grayFuel = 'gray-fuel'

    const { loader: { resources: {
        [grayCanister]: {
            texture: canister_texture
        },
        [grayFuel]: {
            spritesheet: { animations: { [grayFuel]: fuel_animation } }
        },
    } } } = app

    const {
        i, j,
        colors: {
            canister: canister_tint,
            fuel: fuel_tint
        }
    } = canister

    const grid_size = useSelector(selectGridSize)

    const canisterClick = (i, j) => {
        console.log("canister clicked:", { i, j })
    }

    const Can = () => {
        return <Sprite
            width={grid_size}
            height={grid_size}
            texture={canister_texture}
            tint={canister_tint}
            interactive={true}
            pointerdown={() => canisterClick(i, j)}
        />
    }

    const Fuel = ({ i, j }) => {
        const mask_rect = useSelector(selectMaskRect({ i, j }))
        const mask = new Graphics()
        mask.beginFill(0xFFFFFF)
        mask.drawRect(...mask_rect)
        mask.endFill();

        return <AnimatedSprite
            width={grid_size}
            height={grid_size}
            textures={fuel_animation}
            tint={fuel_tint}
            mask={mask}
        />
    }

    return (
        <Container>
            <Fuel i={i} j={j} />
            <Can />
        </Container>
    )
}

export const CanisterContainer = withApp(CanisterContainerInner)
