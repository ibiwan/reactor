import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import {
    Container,
    Sprite,
    withApp
} from 'react-pixi-fiber'

import { loadedBlackPlasticTexture } from '../../util/textures'
import { selectControlPanelHeight, selectControlWidth, selectSectionHeight } from '../geometry/geometrySlice'
import { MoneyPanel } from './MoneyPanel'
import { HeatPanel } from './HeatPanel'
import { PowerPanel } from './PowerPanel'

const ControlPanelContainerInner = ({app}) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const black_plastic_texture = useMemo(() => loadedBlackPlasticTexture(app), [])

    const control_width = useSelector(selectControlWidth)
    const control_panel_height = useSelector(selectControlPanelHeight)
    const section_height = useSelector(selectSectionHeight)

    const Background = () => {
        const props = {
            texture: black_plastic_texture,
            width: control_width,
            height: control_panel_height,
        }
        return <Sprite {...props} />
    }

    return (
        <Container>
            <Background />
            <MoneyPanel x={0} y={0 * section_height} />
            <HeatPanel x={0} y={1 * section_height} />
            <PowerPanel x={0} y={2 * section_height} />
            {/* <ShopPanel /> */}
        </Container>
    )
}

export const ControlPanelContainer = withApp(ControlPanelContainerInner)
