import React from "react"
import { Graphics } from '@pixi/graphics'
import { Graphics as GraphicsComponent, withApp } from "react-pixi-fiber"

import { useSelector } from "react-redux"
import { selectMaskRects } from "../geometry/geometrySlice"


export const constructMask = (mask_graphic, mask_rect_defs, cluster) => {
    const mask_rects = mask_rect_defs[cluster]

    mask_graphic.beginFill(0xFFFFFF)
    mask_rects.forEach(mask_rect => {
        mask_graphic.drawRect(...mask_rect)
    })
    mask_graphic.endFill();

    return mask_graphic
}
export const makeMask = (mask_rect_defs, cluster) => {
    const mask = new Graphics()
    return constructMask(mask, mask_rect_defs, cluster)
}
