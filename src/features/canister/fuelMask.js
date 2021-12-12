import { Graphics } from '@pixi/graphics'

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
