import { CustomPIXIComponent } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

export default CustomPIXIComponent(
    {
        customDisplayObject: function ({ textures, autoupdate = true, width, height, tint }) {
            const sprite = new PIXI.AnimatedSprite(textures, autoupdate)
            Object.assign(sprite, {
                width, height, tint
            })
            return sprite
        },
        customDidAttach: (displayObject) => { displayObject.play() }
    },
    "AnimatedSprite"
);
