import { grid_num, grid_size } from "./const.js"
import { make_canister } from "./canister.js"

const make_floor = (resource, parent_container, entities) => {
    const floor_container = new PIXI.Container()
    parent_container.addChild(floor_container)

    for (let i = 0; i < grid_num; i += 1) {
        for (let j = 0; j < grid_num; j += 1) {
            make_tile(i, j, resource, floor_container, entities)
        }
    }
}

const make_tile = (i, j, resource, parent_container, entities) => {
    const tile_container = new PIXI.Container()
    parent_container.addChild(tile_container)
    tile_container.position.set(i * grid_size, j * grid_size)

    const floor_tile = new PIXI.Sprite(resource.floor.texture)
    tile_container.addChild(floor_tile)

    Object.assign(floor_tile, {
        i, j,
        width: grid_size,
        height: grid_size,
        interactive: true,
    })

    floor_tile.on('pointerdown', () => floor_touched(resource, tile_container, entities))
}

const floor_touched = (resource, parent_container, entities) => {
    make_canister('red', resource, parent_container, entities)
}

export { make_floor }
