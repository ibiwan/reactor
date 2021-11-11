import { make_floor } from "./floor.js"
import { game_width, game_height, border, control_width, floor_size } from "./const.js"
import { tick_time } from "./rules.js"

const dims = {
    gamewindow: { x: 0, y: 0, width: game_width, height: game_height },
    controlpanel: { x: border, y: border, width: control_width - 2 * border, height: game_height - 2 * border },
    reactorView: { x: control_width + border, y: border, width: floor_size - 2 * border, height: floor_size - 2 * border },
}

Object.values(dims).forEach(obj => {
    const { x, y, width: w, height: h } = obj
    obj.flat = () => [x, y, w, h]
})

const app = new PIXI.Application(
    {
        ...dims.gamewindow,
        antialias: true
    }
);
document.body.appendChild(app.view);

const bg = new PIXI.Graphics()
bg.beginFill(0x666666)
bg.drawRect(...dims.gamewindow.flat())
app.stage.addChild(bg)

const controlpanel = new PIXI.Graphics()
controlpanel.beginFill(0xEEEEEE)
controlpanel.drawRect(...dims.controlpanel.flat())
app.stage.addChild(controlpanel)

const reactor = new PIXI.Graphics()
reactor.beginFill(0xCCCCCC)
reactor.drawRect(...dims.reactorView.flat())
app.stage.addChild(reactor)

const loader = PIXI.Loader.shared
loader
    .add('floor', 'resources/floortile.png')
    .add('explosion', 'resources/explosion.json')
    .add('red-fuel', 'resources/red-fuel.json')
    .add('red-canister', 'resources/red-canister.png')

const sprites = {}
const entities = []
loader.load((loader, resource) => {
    const container = new PIXI.Container()
    sprites.floor = make_floor(resource, container, entities)
    app.stage.addChild(container)
    app.ticker.add(handle_tick)
})

let elapsed = 0
const handle_tick = () => {
    elapsed += app.ticker.elapsedMS
    const use_tick = tick_time()
    // console.log({elapsed, use_tick})
    if (elapsed > use_tick) {
        elapsed -= use_tick
        update_world()
    }
}

const update_world = () => {
    // console.log("update_world", {entities})
    entities.forEach(e => e.update())
}