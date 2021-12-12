import { withApp } from "react-pixi-fiber"
import { useSelector } from "react-redux"
import { selectHeatDisplayText } from "./controlPanelSlice"
import { DisplayContainer } from "./Display"

const HeatPanelInner = ({app, x, y}) => {
    const text = useSelector(selectHeatDisplayText)

    return <DisplayContainer {...{x, y, text}} />
}

export const HeatPanel = withApp(HeatPanelInner)