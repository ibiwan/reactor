import { dims } from "./const.js"

const draw_areas = (container) => {
    const bg = new PIXI.Graphics()
    bg.beginFill(0x666666)
    bg.drawRect(...dims.gamewindow.flat())
    container.addChild(bg)

    const controlpanel = new PIXI.Graphics()
    controlpanel.beginFill(0xEEEEEE)
    controlpanel.drawRect(...dims.controlpanel.flat())
    container.addChild(controlpanel)

    const chamber = new PIXI.Graphics()
    chamber.beginFill(0xCCCCCC)
    chamber.drawRect(...dims.reactorView.flat())
    container.addChild(chamber)
}

export { draw_areas }