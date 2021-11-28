import { grid_size, origin } from "./const.js"
import { explode_at } from "./explosion.js"
import { apply_core_upgrades, core_definitions, SINGLE } from "./rules.js"
import { add_heat, add_power } from "./reactor.js"

const CORE = 'core'

const COLOR_BRIGHT_RED = 'bright-red'
const COLOR_DARK_RED = 'dark-red'
const COLOR_BRIGHT_ORANGE = 'bright-orange'
const COLOR_DARK_ORANGE = 'dark-orange'
const COLOR_BRIGHT_YELLOW = 'bright-yellow'
const COLOR_DARK_YELLOW = 'dark-yellow'
const COLOR_BRIGHT_GREEN = 'bright-green'
const COLOR_DARK_GREEN = 'dark-green'
const COLOR_BRIGHT_BLUE = 'bright-blue'
const COLOR_DARK_BLUE = 'dark-blue'
const COLOR_BRIGHT_PURPLE = 'bright-purple'
const COLOR_DARK_PURPLE = 'dark-purple'

const TIERS = {
    1: {
        color: COLOR_BRIGHT_GREEN,
        name: 'Uranium'
    },
    2: {
        color: COLOR_BRIGHT_YELLOW,
        name: 'Plutonium'
    },
    3: {
        color: COLOR_BRIGHT_BLUE,
        name: 'Thorium'
    },
    4: {
        color: COLOR_BRIGHT_RED,
        name: 'Seaborgium'
    },
    5: {
        color: COLOR_DARK_RED,
        name: 'Dolorium'
    },
    6: {
        color: COLOR_DARK_PURPLE,
        name: 'Nefastium'
    },
    7: {
        color: COLOR_DARK_YELLOW,
        name: 'Protium'
    },
    8: {
        color: COLOR_DARK_BLUE,
        name: 'Kymium'
    },
    9: {
        color: COLOR_DARK_GREEN,
        name: 'Monastium'
    },
    10: {
        // color: "rainbow",
        color: COLOR_BRIGHT_PURPLE,
        name: 'Discurrium'
    },
    11: {
        // color: "red saber",
        color: COLOR_BRIGHT_ORANGE,
        name: 'Stavrium'
    },
    12: {
        // color: "red saber",
        color: COLOR_DARK_ORANGE,
        name: 'Stavrium Also'
    },
}

const BASE_BRIGHT_CANISTER = 0x999999
const BASE_BRIGHT_FUEL = 0x333333
const BASE_DARK_CANISTER = 0x000000
const BASE_DARK_FUEL = 0x000000

const RED_OVERLAY = 0xFF0000
const GREEN_OVERLAY = 0x00FF00
const BLUE_OVERLAY = 0x0000FF
const YELLOW_OVERLAY = 0xFFFF00
const PURPLE_OVERLAY = 0x9900FF
const ORANGE_OVERLAY = 0xFF9900

const dim = (overlay, canister = true) => {
    let rgb = PIXI.utils.hex2rgb(overlay)
    rgb = rgb.map(chan => {
        return canister ? chan * 11 / 16 : chan * 5 / 16
    })
    return PIXI.utils.rgb2hex(rgb)
}

const COLORS = {
    'bright-red': {
        canister: BASE_BRIGHT_CANISTER | RED_OVERLAY,
        fuel: BASE_BRIGHT_FUEL | RED_OVERLAY,
    },
    'dark-red': {
        canister: BASE_DARK_CANISTER | dim(RED_OVERLAY, true),
        fuel: BASE_DARK_FUEL | dim(RED_OVERLAY, true),
    },
    'bright-orange': {
        canister: BASE_BRIGHT_CANISTER | ORANGE_OVERLAY,
        fuel: BASE_BRIGHT_FUEL | ORANGE_OVERLAY,
    },
    'dark-orange': {
        canister: BASE_DARK_CANISTER | dim(ORANGE_OVERLAY, true),
        fuel: BASE_DARK_FUEL | dim(ORANGE_OVERLAY, true),
    },
    'bright-yellow': {
        canister: BASE_BRIGHT_CANISTER | YELLOW_OVERLAY,
        fuel: BASE_BRIGHT_FUEL | YELLOW_OVERLAY,
    },
    'dark-yellow': {
        canister: BASE_DARK_CANISTER | dim(YELLOW_OVERLAY, true),
        fuel: BASE_DARK_FUEL | dim(YELLOW_OVERLAY, true),
    },
    'bright-green': {
        canister: BASE_BRIGHT_CANISTER | GREEN_OVERLAY,
        fuel: BASE_BRIGHT_FUEL | GREEN_OVERLAY,
    },
    'dark-green': {
        canister: BASE_DARK_CANISTER | dim(GREEN_OVERLAY, true),
        fuel: BASE_DARK_FUEL | dim(GREEN_OVERLAY, false),
    },
    'bright-blue': {
        canister: BASE_BRIGHT_CANISTER | BLUE_OVERLAY,
        fuel: BASE_BRIGHT_FUEL | BLUE_OVERLAY,
    },
    'dark-blue': {
        canister: BASE_DARK_CANISTER | dim(BLUE_OVERLAY, true),
        fuel: BASE_DARK_FUEL | dim(BLUE_OVERLAY, true),
    },
    'bright-purple': {
        canister: BASE_BRIGHT_CANISTER | PURPLE_OVERLAY,
        fuel: BASE_BRIGHT_FUEL | PURPLE_OVERLAY,
    },
    'dark-purple': {
        canister: BASE_DARK_CANISTER | dim(PURPLE_OVERLAY, true),
        fuel: BASE_DARK_FUEL | dim(PURPLE_OVERLAY, true),
    },
}

let tier = 1
let nTier = Object.keys(TIERS).length

const make_canister = (tier_param, resource, parent_container, tock) => {
    const canister_container = new PIXI.Container()
    parent_container.addChild(canister_container)

    const fuel_container = new PIXI.Container()
    canister_container.addChild(fuel_container)

    canister_container.core = create_core(1, SINGLE)

    const size = {
        width: grid_size,
        height: grid_size,
    }

    const tierDef = TIERS[tier]
    console.log({ tier, tierDef })

    tier = (tier + 1) % (nTier + 1) || 1

    const { color, name } = tierDef
    console.log({ color, name })
    const { canister: canister_tint, fuel: fuel_tint } = COLORS[color]
    console.log({
        canister_tint: Number(canister_tint).toString(16),
        fuel_tint: Number(fuel_tint).toString(16)
    })

    const canister = new PIXI.Sprite(resource[`gray-canister`].texture)
    canister.tint = canister_tint

    canister_container.addChild(canister)

    Object.assign(canister, size, { interactive: true })

    const selector = `gray-fuel`
    const fuel = new PIXI.AnimatedSprite(resource[selector].spritesheet.animations[selector])
    fuel.tint = fuel_tint
    fuel_container.addChild(fuel)

    Object.assign(fuel, size)

    let mask = new PIXI.Graphics()
    fuel_container.mask = mask

    const loc = fuel_container.toGlobal(origin)
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
    removeupdater = tock((displayOnly) => update(canister_container, fuel_container, displayOnly))

    fuel.play()
}

const update = (canister_container, fuel_container, displayOnly) => {
    if (canister_container.core.expired) {
        return
    }
    const { cur_core, power_emitted, heat_emitted } = update_core(canister_container.core, displayOnly)

    const { life_elapsed, life_span, expired } = cur_core // other two vars for drawing status bar
    canister_container.core = cur_core
    if (expired) {
        canister_container.core.expired = true
        canister_container.removeChild(fuel_container)
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
