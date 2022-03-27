import { useMemo } from "react";
import { Container, Sprite, Text, withApp } from "react-pixi-fiber";
import { useSelector } from "react-redux";
import { loadedLcdDisplayTexture } from "../../util/textures";
import { selectControlWidth, selectDisplayHeight, selectDisplayTextOffset } from "../geometry/geometrySlice";



export const useDisplayComponent = (app) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const lcd_display_texture = useMemo(() => loadedLcdDisplayTexture(app), []);

    const width = useSelector(selectControlWidth);
    const height = useSelector(selectDisplayHeight);

    const display_font = {
        fontFamily: 'Courier',
        fontSize: 20,
        fill: 0x333333,
        align: 'left',
    }
    
    const display_text_offset = useSelector(selectDisplayTextOffset)


    return { lcd_display_texture, width, height, display_font, display_text_offset };

};
