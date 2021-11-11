import { dims } from "./const.js"
import { draw_areas } from "./areas.js";
import { load_textures } from "./textures.js"
import { make_reactor } from "./reactor.js"
import { tick_time } from "./rules.js"

const app = new PIXI.Application(
    {
        ...dims.gamewindow,
        antialias: true
    }
);
document.body.appendChild(app.view);
const container = new PIXI.Container()
const loader = load_textures()

const entities = []
loader.load((loader, resource) => {
    draw_areas(container)
    make_reactor(resource, container, entities)
    app.stage.addChild(container)
    app.ticker.add(handle_tick)
})

let elapsed = 0
const handle_tick = () => {
    elapsed += app.ticker.elapsedMS
    const use_tick = tick_time()
    if (elapsed > use_tick) {
        elapsed -= use_tick
        update_world()
    }
}

const update_world = () => {
    entities.forEach(e => e.update())
}
