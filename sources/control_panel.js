import { border, control_width, display_height, section_height } from "./const.js"
import { get_status } from "./reactor.js"


const display_font = {
    fontFamily: 'Courier',
    fontSize: 20,
    fill: 0x333333,
    align: 'left',
}

const display_geom = {
    x: 20,
    y: 23,
}

const mask_lcd_text = (text) => {
    let mask = new PIXI.Graphics()
    text.mask = mask

    const loc = text.toGlobal({ x: 0, y: 0 })
    const maskRect = [
        loc.x,
        loc.y,
        control_width - 20,
        display_height - 20,
    ]
    mask.beginFill(0xFFFFFF)
    mask.drawRect(...maskRect)
    mask.endFill();
}

const make_control_panel = (resource, parent_container, tock) => {
    const control_panel_container = new PIXI.Container()
    parent_container.addChild(control_panel_container)

    make_displays(resource, control_panel_container, tock)
    make_shop(resource, control_panel_container, tock)
}

const make_displays = (resource, parent_container, tock) => {
    const display_container = new PIXI.Container()
    parent_container.addChild(display_container)
    display_container.position = { x: 0, y: 0 }

    const update_money = make_money_display(resource, display_container, 0 * section_height)
    const update_heat = make_heat_display(resource, display_container, 1 * section_height)
    const update_power = make_power_display(resource, display_container, 2 * section_height)


    console.log({ update_heat })
    tock(() => update({ update_money, update_heat, update_power }))
}

const make_a_display = (resource, parent_container, dy, strf) => {
    const my_container = new PIXI.Container()
    parent_container.addChild(my_container)
    my_container.position = { x: border, y: dy + border }

    const lcd = new PIXI.Sprite(resource['lcd-display'].texture)
    const size = {
        width: control_width,
        height: section_height
    }
    Object.assign(lcd, size)
    my_container.addChild(lcd)

    let text
    return (x, dx) => {
        my_container.removeChild(text)
        text = new PIXI.Text(strf(x, dx), display_font);
        Object.assign(text, display_geom)
        mask_lcd_text(text)
        my_container.addChild(text)
    }
}

const make_heat_display = (resource, parent_container, dy) => {
    return make_a_display(resource, parent_container, dy,
        (heat, heat_dissipated) => `Heat: ${heat} MJ (-${heat_dissipated})`)
}

const make_power_display = (resource, parent_container, dy) => {
    return make_a_display(resource, parent_container, dy,
        (power, power_gained) => `Power: ${power} MW (-${power_gained})`)
}

const make_money_display = (resource, parent_container, dy) => {
    return make_a_display(resource, parent_container, dy,
        (money, money_gained='x') => `Money: \$${money}(+\$${money_gained})`)
}


const make_shop = (resource, parent_container, tock) => {
}

const update = ({ update_money, update_heat, update_power }) => {
    const { power, power_gained, heat, heat_dissipated, money, money_gained } = get_status()
    update_heat(heat, heat_dissipated)
    update_power(power, power_gained)
    update_money(money, money_gained)
}

export { make_control_panel }