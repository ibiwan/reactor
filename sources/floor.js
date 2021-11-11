import { grid_num, grid_size } from "./const.js"
import { xy_from_ij } from "./util.js"
import { canister_at } from "./canister.js"

const make_floor = (resource, container, entities) => {
    const floor = []
    for (let i = 0; i < grid_num; i += 1) {
        for (let j = 0; j < grid_num; j += 1) {
            floor.push(floor_at(i, j, resource, container, entities))
        }
    }
    return floor
}

const floor_at = (i, j, resource, container, entities) => {
    const floor_tile = new PIXI.Sprite(resource.floor.texture)
    Object.assign(floor_tile, {
        ...xy_from_ij(i, j),
        i, j,
        width: grid_size,
        height: grid_size,
        interactive: true,
    })
    floor_tile.on('pointerdown', () => floor_touched(i, j, resource, container, entities))

    container.addChild(floor_tile)

    return floor_tile
}

const floor_touched = (i, j, resource, container, entities) => {
    canister_at(i, j, 'red', resource, container, entities)
}

export { make_floor, floor_at }
