import { border, grid_size } from "./const.js"

const explode_at = (canister_container, resource, parent_container) => {
    const splode = new PIXI.AnimatedSprite(resource.explosion.spritesheet.animations.explosion, true)
    parent_container.addChild(splode)
    
    splode.position = canister_container.position
    splode.width = grid_size + 2 * border
    splode.height = grid_size + 2 * border
    splode.loop = false
    splode.onComplete = () => {
        parent_container.removeChild(splode)
    }

    splode.play()
}

export { explode_at }