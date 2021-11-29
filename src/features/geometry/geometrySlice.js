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
        // floor_y: game_height - floor_size + border,
        // control_width: game_width - floor_size,
        // display_width: control_width - 2 * border,
        display_height,
        display_border,
        // display_text_offset: { x: display_border, y: display_border },
        button_text_offset: { y: 10 },
        section_height: display_height + button_height + 2 * border,
        origin: { x: 0, y: 0 },
        grid_num,
        // grid_size: (floor_size - 3 * border) / grid_num,
        base_tick_time,
    },
    reducers: {
        windowChanged: state => ({
            ...state // for example
        }),
    }
})

export const { windowChanged } = geometrySlice.actions

// const store = configureStore({
//     reducer: geometrySlice.reducer
// })

export const selectFloorY = ({ geometry: { game_height, floor_size, border } }) => game_height - floor_size + border
export const selectControlWidth = ({ geometry: { game_width, floor_size } }) => game_width - floor_size
export const selectDisplayTextOffset = ({ geometry: { display_border } }) => ({ x: display_border, y: display_border })
export const selectGridSize = ({geometry:{floor_size, border, grid_num}}) => (floor_size - 3 * border) / grid_num

// // Can still subscribe to the store
// store.subscribe(() => console.log(store.getState()))

// // Still pass action objects to `dispatch`, but they're created for us
// store.dispatch(incremented())
// // {value: 1}
// store.dispatch(incremented())
// // {value: 2}
// store.dispatch(decremented())
// // {value: 1}

export default geometrySlice.reducer;