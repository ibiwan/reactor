import { core_definitions } from "./templates"

const CORE_UPGRADES = 'core_upgrades'
const WORLD_UPGRADES = 'world_upgrades'
const LIFE_SPAN = 'life_span'
const POWER_RATE = 'power_rate'
const AUTO_REBUILD = 'auto_rebuild'
const CLOCK_RATE = 'clock_rate'
// const HEAT_DISSIPATION = 'heat_dissipation'

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
        next[cur.upgrade] = next[cur.upgrade] ?? {}
        next[cur.upgrade][cur.tier] = cur

        return next
    }, {})
}

const upgrades_purchased = [
    { upgrade_category: CORE_UPGRADES, upgrade_type: LIFE_SPAN, tier: 1, level: 1 },
    { upgrade_category: WORLD_UPGRADES, upgrade_type: CLOCK_RATE, level: 1 },
];

export const apply_core_upgrades = (tier, cluster) => {
    const use_rules = { ...core_definitions[tier][cluster] }
    upgrades_purchased.forEach((upgrade_details) => { // null in case not a CORE upgrade
        const { upgrade_category, upgrade_type, tier: u_tier = null } = upgrade_details
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
            default:
                break
        }
    })
    return use_rules
}
