import { control_width, border, grid_size } from "./const.js"

const xy_from_ij = (i, j) => ({
    x: control_width + border + i * grid_size,
    y: border + j * grid_size,
})

export { xy_from_ij }