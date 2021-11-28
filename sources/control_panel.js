import { border, button_height, button_text_offset, control_width, display_border, display_height, display_text_offset, display_width, origin, section_height } from "./const.js"
import { get_status, sell_power, vent_heat } from "./reactor.js"

const display_font = {
    fontFamily: 'Courier',
    fontSize: 20,
    fill: 0x333333,
    align: 'left',
}

const mask_lcd_text = (text) => {
    let mask = new PIXI.Graphics()
    text.mask = mask

    const loc = text.toGlobal(origin)
    const maskRect = [
        loc.x,
        loc.y,
        display_width - 2 * display_border,
        display_height - 2 * display_border,
    ]
    mask.beginFill(0xFFFFFF)
    mask.drawRect(...maskRect)
    mask.endFill();
}

const make_control_panel = (resource, parent_container, tock) => {
    const control_panel_container = new PIXI.Container()
    parent_container.addChild(control_panel_container)

    const background = new PIXI.Sprite(resource['black-plastic'].texture)
    control_panel_container.addChild(background)
    background.width = control_width
    background.height = (section_height + border) * 3

    make_displays(resource, control_panel_container, tock)
    make_shop(resource, control_panel_container, tock)
}

const make_displays = (resource, parent_container, tock) => {
    const display_container = new PIXI.Container()
    parent_container.addChild(display_container)
    display_container.position = { x: border, y: border }

    let dy = 0
    const update_money = make_money_display(resource, display_container, dy)
    const { update: update_upgrades_button, set_onclick: set_upgrades_onclick } 
        = make_upgrades_button(resource, display_container, dy + display_height + border, 'left')
    const { update: update_prestige_button, set_onclick: set_prestige_onclick } 
        = make_prestige_button(resource, display_container, dy + display_height + border, 'right')
    dy += section_height

    const update_heat = make_heat_display(resource, display_container, dy)
    const { update: update_vent_heat_button, set_onclick: set_vent_heat_onclick } 
        = make_vent_heat_button(resource, display_container, dy + display_height + border, 'full')
    dy += section_height
    set_vent_heat_onclick(vent_heat)

    const update_power = make_power_display(resource, display_container, dy)
    const { update: update_sell_power_button, set_onclick: set_sell_power_onclick } 
        = make_sell_power_button(resource, display_container, dy + display_height + border, 'full')
    set_sell_power_onclick(sell_power)

    tock(() => update({ update_money, update_heat, update_power }))
}

const make_a_display = (resource, parent_container, dy, strf) => {
    const my_container = new PIXI.Container()
    parent_container.addChild(my_container)
    my_container.position = { x: border, y: dy + border }

    const lcd = new PIXI.Sprite(resource['lcd-display'].texture)
    const size = {
        width: display_width - 2 * border,
        height: display_height,
    }
    Object.assign(lcd, size)
    my_container.addChild(lcd)

    let text
    return (x, dx) => {
        my_container.removeChild(text)
        text = new PIXI.Text(strf(x, dx), display_font);
        Object.assign(text, display_text_offset)
        my_container.addChild(text)
        mask_lcd_text(text)
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
        (money, money_gained = 'x') => `Money: \$${money}(+\$${money_gained})`)
}

const make_a_button = (resource, parent_container, dy, placement, label, strf = (a => a)) => {
    const my_container = new PIXI.Container()
    parent_container.addChild(my_container)

    let position = { x: 5 * border, y: dy + border }
    let width = control_width - 10 * border
    switch (placement) {
        case 'left':
            width = control_width / 2 - 5 * border
            break;
        case 'right':
            position.x = control_width / 2
            width = control_width / 2 - 5 * border
            break;
    }
    my_container.position = position

    const button = new PIXI.Sprite(resource['orange-button'].texture)
    const size = {
        width,
        height: button_height,
    }
    Object.assign(button, size)
    button.interactive = true
    my_container.addChild(button)

    let text
    const update = (...parms) => {
        text = new PIXI.Text(strf(...parms), display_font);
        text.position.x = width / 2
        text.anchor.x = 0.5
        Object.assign(text, button_text_offset)
        my_container.addChild(text)
    }
    update(label)

    let onclick = () => { }
    const set_onclick = f => onclick = f
    button.on('pointerdown', () => onclick())

    return { update, set_onclick }
}

const make_upgrades_button = (resource, parent_container, dy, placement) => {
    return make_a_button(resource, parent_container, dy, placement, "Upgrades")
}
const make_prestige_button = (resource, parent_container, dy, placement) => {
    return make_a_button(resource, parent_container, dy, placement, "Prestige")
}
const make_vent_heat_button = (resource, parent_container, dy, placement) => {
    return make_a_button(resource, parent_container, dy, placement, "Vent Heat")
}
const make_sell_power_button = (resource, parent_container, dy, placement) => {
    return make_a_button(resource, parent_container, dy, placement, "Sell Power")
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