import { xy_from_ij } from "./util.js"
import { grid_size } from "./const.js"
import { explode_at } from "./explosion.js"
import { create_core, update_core, SINGLE } from "./rules.js"

const CORE = 'core'

const canister_at = (i, j, color, resource, container, entities) => {
    const canister_container = new PIXI.Container()
    canister_container.core = create_core(1, SINGLE)
    canister_container.entity_type = CORE
    canister_container.update = () => {
        // console.log("canister update", { core: canister_container.core })
        if (canister_container.core.expired) {
            // console.log("expired; ignoring")
            return
        }
        // console.log("calling update_core")
        const { cur_core, power_emitted, heat_emitted } = update_core(canister_container.core)
        const { life_elapsed, life_span, expired } = cur_core
        canister_container.core = cur_core
        // console.log({ power_emitted, heat_emitted, life_elapsed, life_span, expired })
        if (canister_container.core.expired) {
            container.removeChild(canister_container)
            explode_at(place.x, place.y, resource, container)
        }
    }
    // console.log('canister_at', {entities})
    entities.push(canister_container)

    const canister = new PIXI.Sprite(resource[`${color}-canister`].texture)
    const place = {
        ...xy_from_ij(i, j),
        width: grid_size,
        height: grid_size,
    }
    Object.assign(canister, place)
    canister.interactive = true
    const selector = `${color}-fuel`

    const goo = new PIXI.AnimatedSprite(resource[selector].spritesheet.animations[selector])
    Object.assign(goo, place)

    const goo_container = new PIXI.Container()

    let mask = new PIXI.Graphics()
    mask.beginFill(0xFFFFFF)
    mask.drawRect(
        place.x + 80 / 256 * grid_size,
        place.y + 64 / 256 * grid_size,
        96 / 256 * grid_size,
        144 / 256 * grid_size
    )
    mask.endFill();
    goo_container.mask = mask
    goo_container.addChild(goo)

    canister.on('pointerdown', event => {
        container.removeChild(canister_container)
        explode_at(place.x, place.y, resource, container)
    })

    container.addChild(canister_container)
    canister_container.addChild(goo_container)
    canister_container.addChild(canister)
    goo.play()

    // console.log({cur_core, power_emitted, heat_emitted})
}

export { canister_at, CORE }
