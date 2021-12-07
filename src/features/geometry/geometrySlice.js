import { createSlice } from '@reduxjs/toolkit'
import { Graphics } from '@pixi/graphics'
import { constructMask } from '../canister/fuelMask'

import { SINGLE, DOUBLE, QUAD } from '../canister/templates'

const border = 3
const button_height = 48
const game_width = 900
const game_height = 800
const floor_size = 640
const display_height = 70
const display_border = 25
const grid_num = 12
const base_tick_time = 1000

const geometrySlice = createSlice({
    name: 'geometry',
    initialState: {
        border,
        button_height,
        game_width,
        game_height,
        floor_size,
        display_height,
        display_border,
        button_text_offset: { y: 10 },
        section_height: display_height + button_height + 2 * border,
        origin: { x: 0, y: 0 },
        grid_num,
        base_tick_time,
    },
    reducers: {
        windowChanged: _stateSlice => { },
    }
})

export const { windowChanged } = geometrySlice.actions

export const selectGridNum = ({ geometry: { grid_num } }) => grid_num
export const selectBorder = ({ geometry: { border } }) => border

export const selectFloorY = ({ geometry: { game_height, floor_size, border } }) => game_height - floor_size + border
export const selectControlWidth = ({ geometry: { game_width, floor_size } }) => game_width - floor_size
export const selectDisplayTextOffset = ({ geometry: { display_border } }) => ({ x: display_border, y: display_border })
export const selectGridSize = ({ geometry: { floor_size, border, grid_num } }) => (floor_size - 3 * border) / grid_num
export const selectReactorPosition = (state) => {
    const border = selectBorder(state)
    const control_width = selectControlWidth(state)
    const floor_y = selectFloorY(state)
    return {
        x: control_width + 2 * border,
        y: floor_y,
    }
}
export const selectMaskRects = ({ i, j }) => (state) => {
    const { x: rX, y: rY } = selectReactorPosition(state)
    const grid_size = selectGridSize(state)
    const tileX = i * grid_size
    const tileY = j * grid_size

    return {
        [SINGLE]: [[
            rX + tileX + grid_size * 80 / 256,
            rY + tileY + grid_size * 64 / 256,
            grid_size * 96 / 256,
            grid_size * 144 / 256,
        ]],
        [DOUBLE]: [[]],
        [QUAD]: [[]],
    }
}
export const selectMasks = (i, j, cluster) => state => {
    const mask_rect_defs = selectMaskRects({i, j})(state)
    const mask = new Graphics()
    return constructMask(mask, mask_rect_defs, cluster)
}

export default geometrySlice.reducer
