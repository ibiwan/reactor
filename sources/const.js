const border = 3
const button_height = 48
const game_width = 900
const game_height = 800
const floor_size = 640
const floor_y = game_height - floor_size + border
const control_width = game_width - floor_size
const display_width = control_width - border
const display_height = 70
const display_border = 25
const display_text_offset = { x: display_border, y: display_border }
const button_text_offset = {y:10}
const section_height = display_height + button_height + 2 * border
const origin = { x: 0, y: 0 }
const grid_num = 12
const grid_size = (floor_size - 3 * border) / grid_num
const base_tick_time = 1000 // ms

const dims = {
    gamewindow: { x: 0, y: 0, width: game_width, height: game_height },
    // controlpanel: { x: border, y: border, width: control_width - 2 * border, height: game_height - 2 * border },
    // reactorView: { x: control_width + border, y: border, width: floor_size - 2 * border, height: floor_size - 2 * border },
}
// Object.values(dims).forEach(obj => {
//     const { x, y, width: w, height: h } = obj
//     obj.flat = () => [x, y, w, h]
// })

export {
    base_tick_time,
    border,
    button_height,
    button_text_offset,
    control_width,
    dims,
    display_border,
    display_height,
    display_width,
    display_text_offset,
    floor_size,
    floor_y,
    grid_num,
    grid_size,
    origin,
    section_height,
}