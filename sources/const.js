const border = 3
const floor_size = 600
const game_width = 800
const game_height = floor_size
const control_width = game_width - floor_size
const display_width = control_width - 2 * border
const display_height = 200
const grid_num = 12
const grid_size = (floor_size - 2 * border) / grid_num
const base_tick_time = 1000 // ms

const dims = {
    gamewindow: { x: 0, y: 0, width: game_width, height: game_height },
    controlpanel: { x: border, y: border, width: control_width - 2 * border, height: game_height - 2 * border },
    reactorView: { x: control_width + border, y: border, width: floor_size - 2 * border, height: floor_size - 2 * border },
}
Object.values(dims).forEach(obj => {
    const { x, y, width: w, height: h } = obj
    obj.flat = () => [x, y, w, h]
})

export {
    base_tick_time,
    border,
    control_width,
    dims,
    display_height,
    display_width,
    floor_size,
    game_height,
    game_width,
    grid_num,
    grid_size
}