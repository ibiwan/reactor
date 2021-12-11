import { CustomPIXIComponent } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

export default CustomPIXIComponent(
    {
        customDisplayObject: ({ textures }) =>
            new PIXI.AnimatedSprite(textures),
        customApplyProps: (displayObject, _oldprops, newprops) => {
            Object.assign(displayObject, {
                autoPlay: true,
                loop: true,
                onComplete: null,
                onLoop: null,
                ...newprops
            })
        },
        customDidAttach: (displayObject) => {
            if (displayObject.autoPlay) {
                displayObject.play()
            }
        },
    },
    "CustomAnimatedSprite"
);
