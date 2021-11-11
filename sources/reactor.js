import { display_height, display_width } from "./const.js"
import { make_floor } from "./floor.js"
import { heat_dissipation } from "./rules.js"

let heat = 0
let power = 0
let money = 0
let text // null, will be object

let reactor
let reactor_container

const make_reactor = (resource, container, entities) => {
    reactor_container = new PIXI.Container()
    container.addChild(reactor_container)
    reactor = { update, add_power, add_heat, sell_power }
    entities.push(reactor)
    make_floor(resource, container, entities)
}

const update = () => {
    // 1. check for current limits
    // 2. meltdown if over heat
    // 3. sell any auto amount

    // 4. dissipate heat
    const heat_dissipated_max = heat_dissipation()
    const heat_dissipated = Math.min(heat, heat_dissipated_max)
    heat = Math.round((heat - heat_dissipated) * 100) / 100

    // 5. push heat to outlets

    // 6. update text
    reactor_container.removeChild(text)
    text = new PIXI.Text(`Heat: ${heat} MJ (-${heat_dissipated})\nPower: ${power} MW\nMoney: \$${money}`, {
        fontFamily: 'Arial',
        fontSize: 20,
        fill: 0xff1010,
        align: 'left',
        wordWrap: true,
        wordWrapWidth: display_width,
    });
    reactor_container.addChild(text)
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

export { reactor, make_reactor }
