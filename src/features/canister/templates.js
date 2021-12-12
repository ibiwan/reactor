import { 
    COLORS, 
    COLOR_BRIGHT_BLUE, COLOR_BRIGHT_GREEN, COLOR_BRIGHT_ORANGE, COLOR_BRIGHT_PURPLE, COLOR_BRIGHT_RED, COLOR_BRIGHT_YELLOW, 
    COLOR_DARK_BLUE, COLOR_DARK_GREEN, COLOR_DARK_PURPLE, COLOR_DARK_RED, COLOR_DARK_YELLOW
    // COLOR_DARK_ORANGE, 
 } from "./colors"

export const SINGLE = 'single'
export const DOUBLE = 'double'
export const QUAD = 'quad'

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
}
const core_template = (tier, cluster, life_span, power_rate, heat_rate) => {
    const { color: colorId, name } = TIERS[tier]
    const colors = COLORS[colorId]
    return {
        tier, cluster, name, life_span,
        power_rate, heat_rate, colors,
        life_elapsed: 0,
        expired: false,
        auto_rebuild: false,
    }
}

export const core_definitions = [
    core_template(1, SINGLE, 15, 1, 1),
    core_template(1, DOUBLE, 15, 4, 8),
    core_template(1, QUAD, 15, 12, 36),
    core_template(2, SINGLE, 60, 150, 150),
    core_template(2, DOUBLE, 60, 600, 1.2e3),
    core_template(2, QUAD, 60, 1.8e3, 5.4e3),
].reduce((acc, cur) => {
    const next = { ...acc }
    next[cur.tier] = next[cur.tier] ?? {}
    next[cur.tier][cur.cluster] = cur
    return next
}, {})
