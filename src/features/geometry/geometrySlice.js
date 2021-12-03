import { createSlice } from '@reduxjs/toolkit'

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
        windowChanged: state => ({
            ...state // for example
        }),
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
export const selectMaskRect = ({ i, j }) => (state) => {
    const { x: rX, y: rY } = selectReactorPosition(state)
    const grid_size = selectGridSize(state)
    const tileX = i * grid_size
    const tileY = j * grid_size
    return [
        rX + tileX + grid_size * 80 / 256,
        rY + tileY + grid_size * 64 / 256,
        grid_size * 96 / 256,
        grid_size * 144 / 256,
    ]
}

export default geometrySlice.reducer
