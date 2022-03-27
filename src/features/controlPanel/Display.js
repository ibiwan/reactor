import { Container, Sprite, Text, withApp } from "react-pixi-fiber";
import { useDisplayComponent } from "./useDisplayComponent";

const DisplayContainerInner = ({ app, x, y, text }) => {
    const {
        lcd_display_texture,
        width,
        height,
        display_font,
        display_text_offset
    } = useDisplayComponent(app);

    return <Container position={{ x, y }}>
        <Sprite {...{
            texture: lcd_display_texture,
            width,
            height,
        }} />
        <Text {...{
            style: display_font,
            position: display_text_offset,
            text,
        }} />
    </Container>;
};

export const DisplayContainer = withApp(DisplayContainerInner);
