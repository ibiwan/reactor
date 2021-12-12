import { withApp } from "react-pixi-fiber"
import { useSelector } from "react-redux"
import { selectMoneyDisplayText } from "./controlPanelSlice"
import { DisplayContainer } from "./Display"

const MoneyPanelInner = ({app, x, y}) => {
    const text = useSelector(selectMoneyDisplayText)
    
    return <DisplayContainer {...{x, y, text}} />
}

export const MoneyPanel = withApp(MoneyPanelInner)