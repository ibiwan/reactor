import { utils } from 'pixi.js'

export const COLOR_BRIGHT_RED = 'bright-red'
export const COLOR_DARK_RED = 'dark-red'
export const COLOR_BRIGHT_ORANGE = 'bright-orange'
export const COLOR_DARK_ORANGE = 'dark-orange'
export const COLOR_BRIGHT_YELLOW = 'bright-yellow'
export const COLOR_DARK_YELLOW = 'dark-yellow'
export const COLOR_BRIGHT_GREEN = 'bright-green'
export const COLOR_DARK_GREEN = 'dark-green'
export const COLOR_BRIGHT_BLUE = 'bright-blue'
export const COLOR_DARK_BLUE = 'dark-blue'
export const COLOR_BRIGHT_PURPLE = 'bright-purple'
export const COLOR_DARK_PURPLE = 'dark-purple'

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
    let rgb = utils.hex2rgb(overlay)
    rgb = rgb.map(chan => {
        return canister ? chan * 11 / 16 : chan * 5 / 16
    })
    return utils.rgb2hex(rgb)
}

export const COLORS = {
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
