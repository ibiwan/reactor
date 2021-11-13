import { display_width } from "./const.js"
import { get_status } from "./reactor.js"

let control_panel_container

const make_control_panel = (resource, parent_container, entities) => {
    control_panel_container = new PIXI.Container()
    parent_container.addChild(control_panel_container)

    entities.push({ update })
}

let text
const update = () => {
    control_panel_container.removeChild(text)

    const { power, power_gained, heat, heat_dissipated, money } = get_status()
    text = new PIXI.Text(`Heat: ${heat} MJ (-${heat_dissipated})\nPower: ${power} MW (+${power_gained})\nMoney: \$${money}`, {
        fontFamily: 'Arial',
        fontSize: 20,
        fill: 0xff1010,
        align: 'left',
        wordWrap: true,
        wordWrapWidth: display_width,
    });
    
    control_panel_container.addChild(text)
}

export { make_control_panel }