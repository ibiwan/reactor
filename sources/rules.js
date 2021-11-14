import { base_tick_time } from "./const.js"

const SINGLE = 'single'
const DOUBLE = 'double'
const QUAD = 'quad'

const CORE_UPGRADES = 'core_upgrades'
const WORLD_UPGRADES = 'world_upgrades'
const LIFE_SPAN = 'life_span'
const POWER_RATE = 'power_rate'
const AUTO_REBUILD = 'auto_rebuild'
const CLOCK_RATE = 'clock_rate'
const HEAT_DISSIPATION = 'heat_dissipation'

const colors = {
    1: 'red',
    2: 'green',
}

const core_template = (tier, cluster, life_span, power_rate, heat_rate) =>
({
    tier, cluster, life_span, power_rate, heat_rate,
    color: colors[tier],
    life_elapsed: 0,
    expired: false,
    auto_rebuild: false,
})

const core_definitions = [
    core_template(1, SINGLE, 15, 1, 1),
    core_template(1, DOUBLE, 15, 4, 8),
    core_template(1, QUAD, 15, 12, 36),
    core_template(2, SINGLE, 60, 150, 150),
    core_template(2, DOUBLE, 60, 600, 1.2e3),
    core_template(2, QUAD, 60, 1.8e3, 5.4e3),
].reduce((acc, cur) => {
    const next = { ...acc }
    next[cur.tier] ||= {}
    next[cur.tier][cur.cluster] = cur
    return next
}, {})

const core_upgrade_template = (upgrade, tier, level, cost, detail = {}) =>
({
    upgrade, tier, level, cost, detail
})

const upgrades_available = {
    [WORLD_UPGRADES]: {
        [CLOCK_RATE]: {
            level: 1,
            cost: 10e3,
            detail: { add_divider: 1 }
        },
        [CLOCK_RATE]: {
            level: 2,
            cost: 10e9,
            detail: { add_divider: 1 }
        }
    },
    [CORE_UPGRADES]: [
        core_upgrade_template(LIFE_SPAN, 1, 1, 100, { factor: 2 }),
        core_upgrade_template(LIFE_SPAN, 1, 2, 1000, { factor: 2 }),
        core_upgrade_template(LIFE_SPAN, 1, 3, 1000, { factor: 2 }),
        core_upgrade_template(LIFE_SPAN, 2, 1, 30e3, { factor: 2 }),
        core_upgrade_template(POWER_RATE, 1, 1, 500, { factor: 2 }),
        core_upgrade_template(POWER_RATE, 2, 1, 10e3, { factor: 2 }),
        core_upgrade_template(AUTO_REBUILD, 1, 1, 500),
    ].reduce((acc, cur) => {
        const next = { ...acc }
        next[cur.upgrade] ||= {}
        next[cur.upgrade][cur.tier] = cur
        
        return next
    }, {})
}

const upgrades_purchased = [
    { upgrade_category: CORE_UPGRADES, upgrade_type: LIFE_SPAN, tier: 1, level: 1 },
    { upgrade_category: WORLD_UPGRADES, upgrade_type: CLOCK_RATE, level: 1 },
]

const apply_core_upgrades = (tier, cluster) => {
    const use_rules = { ...core_definitions[tier][cluster] }
    upgrades_purchased.forEach(({ upgrade_category, upgrade_type, tier: u_tier = null }) => { // null in case not a CORE upgrade
        if (upgrade_category !== CORE_UPGRADES) { return }
        if (u_tier !== tier) { return }
        const upgrade = upgrades_available[CORE_UPGRADES][upgrade_type][tier]
        switch (upgrade_type) {
            case LIFE_SPAN:
                use_rules.life_span *= upgrade.detail.factor
                break
            case POWER_RATE:
                use_rules.power_rate *= upgrade.detail.factor
                break
            case AUTO_REBUILD:
                use_rules.auto_rebuild = true
                break
        }
    })
    return use_rules
}

const tick_time = () => {
    let divider = 1
    upgrades_purchased.forEach(({ upgrade_category, upgrade_type, level }) => {
        if (upgrade_category !== WORLD_UPGRADES || upgrade_type !== CLOCK_RATE) {
            return
        }
        const upgrade = upgrades_available[upgrade_category][upgrade_type]
        divider += upgrade.detail.add_divider
    })
    return base_tick_time / divider
}

const base_heat_dissipation = 0.1
const heat_dissipation = () => {
    let heat = base_heat_dissipation
    upgrades_purchased.forEach(({ upgrade_category, upgrade_type, level }) => {
        if (upgrade_category !== WORLD_UPGRADES || upgrade_type !== HEAT_DISSIPATION) {
            return
        }
        const upgrade = upgrades_available[upgrade_category][upgrade_type]
        heat *= upgrade.detail.multiplier
    })
    return heat
}

export {
    core_definitions,
    apply_core_upgrades,
    heat_dissipation,
    tick_time,
    SINGLE,
    DOUBLE,
    QUAD,
}