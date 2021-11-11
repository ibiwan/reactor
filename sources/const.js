const border = 3
const floor_size = 600
const game_width = 800
const game_height = floor_size
const control_width = game_width - floor_size
const grid_num = 12
const grid_size = (floor_size - 2 * border) / grid_num
const base_tick_time = 1000 // ms

export {
    base_tick_time,
    border,
    control_width,
    floor_size,
    game_height,
    game_width,
    grid_num,
    grid_size
}