import { border, grid_size } from "./const.js"

const explode_at = (x, y, resource, container) => {
    const splode = new PIXI.AnimatedSprite(resource.explosion.spritesheet.animations.explosion, true)
    splode.x = x - border
    splode.y = y - border
    splode.width = grid_size + 2 * border
    splode.height = grid_size + 2 * border
    splode.loop = false
    splode.onComplete = () => {
        container.removeChild(splode)
    }
    container.addChild(splode)
    // console.log("BOOOM!", {x, y})
    splode.play()
}

export { explode_at }