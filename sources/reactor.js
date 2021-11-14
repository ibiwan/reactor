import { border, control_width, display_width } from "./const.js"
import { make_floor } from "./floor.js"
import { heat_dissipation } from "./rules.js"

let heat = 0
let previous_power = 0
let power_gained = 0
let power = 0
let money = 0
let heat_dissipated = 0

let reactor_container

const make_reactor = (resource, parent_container, tock) => {
    reactor_container = new PIXI.Container()
    parent_container.addChild(reactor_container)

    reactor_container.x = control_width + 2 * border
    reactor_container.y = border

    tock(update)

    make_floor(resource, reactor_container, tock)
}

const update = () => {
    // 1. check for current limits
    // 2. meltdown if over heat
    // 3. sell any auto amount

    // 4. dissipate heat
    const heat_dissipated_max = heat_dissipation()
    heat_dissipated = Math.min(heat, heat_dissipated_max)
    heat = Math.round((heat - heat_dissipated) * 100) / 100
    power_gained = power - previous_power
    previous_power = power

    // 5. push heat to outlets
}

const add_power = (amount) => {
    power += amount
}
const add_heat = (amount) => {
    heat += amount
}
const sell_power = () => {
    money += power
    power = 0
}

const get_status = () => ({ power, power_gained, heat, heat_dissipated, money })

export { make_reactor, add_power, add_heat, sell_power, get_status }
