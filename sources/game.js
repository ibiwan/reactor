import { dims } from "./const.js"
import { load_textures } from "./textures.js"
import { make_reactor } from "./reactor.js"
import { tick_time } from "./rules.js"
import { make_control_panel } from "./control_panel.js";

const app = new PIXI.Application(
    {
        ...dims.gamewindow,
        antialias: true
    }
);
document.body.appendChild(app.view);

const game_container = new PIXI.Container()
app.stage.addChild(game_container)

const loader = load_textures()

const entities = []
loader.load((loader, resource) => {
    make_reactor(resource, game_container, entities)
    make_control_panel(resource, game_container, entities) // call AFTER reactor

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
