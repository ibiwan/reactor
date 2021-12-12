import { useMemo } from "react"
import { Container, Sprite, Text, withApp } from "react-pixi-fiber"
import { useSelector } from "react-redux"
import { loadedLcdDisplayTexture } from "../../util/textures"
import { selectControlWidth, selectDisplayHeight, selectDisplayTextOffset } from "../geometry/geometrySlice"

const DisplayContainerInner = ({app, x, y, text}) => {
    const Display = () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const lcd_display_texture = useMemo(() => loadedLcdDisplayTexture(app), [])

        const width = useSelector(selectControlWidth)
        const height = useSelector(selectDisplayHeight)

        const props = {
            texture: lcd_display_texture,
            width,
            height,
        }
        return <Sprite {...props} />
    }

    const DisplayText = () => {
        const display_font = {
            fontFamily: 'Courier',
            fontSize: 20,
            fill: 0x333333,
            align: 'left',
        }
        
        const display_text_offset = useSelector(selectDisplayTextOffset)

        const props = {
            style: display_font,
            position: display_text_offset,
            text,
        }
        return <Text {...props} />
    }

    return <Container position={{x, y}}>
        <Display />
        <DisplayText />
    </Container>
}

export const DisplayContainer = withApp(DisplayContainerInner)



// const make_a_display = (resource, parent_container, dy, strf) => {
//     my_container.position = { x: border, y: dy + border }

//     const size = {
//         width: display_width - 2 * border,
//         height: display_height,
//     }
//     Object.assign(lcd, size)
//     my_container.addChild(lcd)

//     let text
//     return (x, dx) => {
//         my_container.removeChild(text)
//         text = new PIXI.Text(strf(x, dx), display_font);
//         Object.assign(text, display_text_offset)
//         my_container.addChild(text)
//         mask_lcd_text(text)
//     }
// }
