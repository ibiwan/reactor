import { grid_size } from "./const.js"
import { explode_at } from "./explosion.js"
import { apply_core_upgrades, core_definitions, SINGLE } from "./rules.js"
import { add_heat, add_power } from "./reactor.js"

const CORE = 'core'

const make_canister = (color, resource, parent_container, tock) => {
    const canister_container = new PIXI.Container()
    parent_container.addChild(canister_container)

    const goo_container = new PIXI.Container()
    canister_container.addChild(goo_container)

    canister_container.core = create_core(1, SINGLE)

    const size = {
        width: grid_size,
        height: grid_size,
    }

    const canister = new PIXI.Sprite(resource[`${color}-canister`].texture)
    canister_container.addChild(canister)

    Object.assign(canister, size, { interactive: true })

    const selector = `${color}-fuel`
    const goo = new PIXI.AnimatedSprite(resource[selector].spritesheet.animations[selector])
    goo_container.addChild(goo)

    Object.assign(goo, size)

    let mask = new PIXI.Graphics()
    goo_container.mask = mask

    const loc = goo_container.toGlobal({ x: 0, y: 0 })
    const maskRect = [
        loc.x + grid_size * 80 / 256,
        loc.y + grid_size * 64 / 256,
        grid_size * 96 / 256,
        grid_size * 144 / 256,
    ]
    mask.beginFill(0xFFFFFF)
    mask.drawRect(...maskRect)
    mask.endFill();

    let removeupdater

    canister.on('pointerdown', event => {
        canister_container.core.expired = true
        explode_at(canister_container, resource, parent_container)
        parent_container.removeChild(canister_container)
        removeupdater()
    })

    goo.play()

    removeupdater = tock(() => update(canister_container, goo_container))
}

const update = (canister_container, goo_container) => {
    if (canister_container.core.expired) {
        console.log("expired")
        return
    }
    const { cur_core, power_emitted, heat_emitted } = update_core(canister_container.core)

    const { life_elapsed, life_span, expired } = cur_core // other two vars for drawing status bar
    canister_container.core = cur_core
    if (expired) {
        canister_container.core.expired = true
        canister_container.removeChild(goo_container)
    }
    else {
        add_power(power_emitted)
        add_heat(heat_emitted)
    }
}

const create_core = (tier, cluster) => ({ ...core_definitions[tier][cluster] })

const update_core = (cur_core) => {
    const { tier, cluster, life_elapsed } = cur_core
    const { life_span, power_rate, heat_rate, auto_rebuild } = apply_core_upgrades(tier, cluster)

    const expired = life_elapsed >= life_span
    let new_life_elapsed = life_elapsed
    if (!expired) {
        new_life_elapsed += 1
    }

    return {
        cur_core: {
            ...cur_core,
            life_elapsed: new_life_elapsed,
            life_span,
            expired,
            auto_rebuild,
        },
        power_emitted: expired ? 0 : power_rate,
        heat_emitted: expired ? 0 : heat_rate,
    }
}

export { make_canister, CORE }
