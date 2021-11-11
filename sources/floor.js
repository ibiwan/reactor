import { grid_num, grid_size } from "./const.js"
import { xy_from_ij } from "./util.js"
import { canister_at } from "./canister.js"

const make_floor = (resource, container, entities) => {
    // console.log('make_floor', {entities})
    const floor = []
    for (let i = 0; i < grid_num; i += 1) {
        for (let j = 0; j < grid_num; j += 1) {
            floor.push(floor_at(i, j, resource, container, entities))
        }
    }
    return floor
}

const floor_at = (i, j, resource, container, entities) => {
    // console.log('floor_at', {entities})
    const floor_tile = new PIXI.Sprite(resource.floor.texture)
    Object.assign(floor_tile, {
        ...xy_from_ij(i, j),
        i, j,
        width: grid_size,
        height: grid_size,
        interactive: true,
    })
    floor_tile.on('pointerdown', event => floor_touched(floor_tile, i, j, resource, container, entities))

    container.addChild(floor_tile)

    return floor_tile
}

const floor_touched = (spr, i, j, resource, container, entities) => {
    // console.log('floor_touched', {entities})
    canister_at(i, j, 'red', resource, container, entities)
}

export { make_floor, floor_at }