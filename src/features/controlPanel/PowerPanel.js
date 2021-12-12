import { withApp } from "react-pixi-fiber"
import { useSelector } from "react-redux"
import { selectPowerDisplayText } from "./controlPanelSlice"
import { DisplayContainer } from "./Display"

const PowerPanelInner = ({app, x, y}) => {
    const text = useSelector(selectPowerDisplayText)

    return <DisplayContainer {...{x, y, text}} />
}

export const PowerPanel = withApp(PowerPanelInner)