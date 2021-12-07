import { CustomPIXIComponent } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

export default CustomPIXIComponent(
    {
        customDisplayObject: ({ textures }) => new PIXI.AnimatedSprite(textures),
        customDidAttach: (displayObject) => displayObject.play(),
    },
    "AnimatedSprite"
);
