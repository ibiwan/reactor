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

const core = [
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
// console.log({ core })

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
        // console.log({ acc, next })
        return next
    }, {})
}
// console.log({ upgrades_available })

const upgrades_purchased = [
    // { upgrade_category: CORE_UPGRADES, upgrade_type: LIFE_SPAN, tier: 1, level: 1 },
    // { upgrade_category: WORLD_UPGRADES, upgrade_type: CLOCK_RATE, level: 1 },
]

const create_core = (tier, cluster) => ({ ...core[tier][cluster] })

const apply_upgrades = (tier, cluster) => {
    // console.log("applying", { tier, cluster })
    const use_rules = { ...core[tier][cluster] }
    // console.log({ use_rules })
    upgrades_purchased.forEach(({upgrade_category, upgrade_type, tier:u_tier = null}) => { // null in case not a CORE upgrade
        // const [upgrade, u_tier] = key.split(".")
        // console.log({ type, tier })
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

const update_core = (cur_core) => {
    // console.log("updating", { cur_core })
    const { tier, cluster, life_elapsed } = cur_core
    // console.log({ tier, cluster, life_elapsed })
    const { life_span, power_rate, heat_rate, auto_rebuild } = apply_upgrades(tier, cluster)
    // console.log({ life_span, power_rate, heat_rate, auto_rebuild })

    const expired = life_elapsed > life_span
    // console.log({life_elapsed, life_span, expired})
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

const tick_time = () => {
    let divider = 1
    upgrades_purchased.forEach(({upgrade_category, upgrade_type, level}) => {
        if (upgrade_category !== WORLD_UPGRADES || upgrade_type !== CLOCK_RATE) {
            return
        }
        const upgrade = upgrades_available[upgrade_category][upgrade_type]//[level]
// console.log({upgrades_available, upgrade_category, upgrade_type, level, upgrade})
        divider += upgrade.detail.add_divider
    })
    return base_tick_time / divider
}

export {
    create_core,
    tick_time,
    update_core,
    SINGLE,
    DOUBLE,
    QUAD,
}