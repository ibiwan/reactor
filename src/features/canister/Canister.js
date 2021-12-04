import React from 'react'
import { useSelector } from 'react-redux'
import {
    Container,
    Sprite,
    withApp,
} from 'react-pixi-fiber'
import { Graphics } from '@pixi/graphics'

import { selectGridSize, selectMaskRects } from '../geometry/geometrySlice'
import AnimatedSprite from '../../util/AnimatedSprite'
import { SINGLE, DOUBLE, QUAD } from './templates'

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
        // console.log("canister clicked:", { i, j })
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

    const mask_rect_defs = useSelector(selectMaskRects({ i, j }))

    const makeMask = (i, j, type = SINGLE) => {
        const mask = new Graphics()
        const mask_rects = mask_rect_defs[type]

        mask.beginFill(0xFFFFFF)
        mask_rects.forEach(mask_rect => {
            mask.drawRect(...mask_rect)
        })
        mask.endFill();

        return mask
    }

    const Fuel = ({ i, j }) => {
        const mask = makeMask(i, j)
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
