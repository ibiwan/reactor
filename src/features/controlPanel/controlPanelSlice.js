import { createSlice } from "@reduxjs/toolkit"

const initialState = {
}

export const controlPanelSlice = createSlice({
    name: 'controlPanel',
    initialState,
})

export const selectMoneyDisplayText = ({reactor:{money, money_gained}}) => `Money: \$${money}(+\$${money_gained})`
export const selectHeatDisplayText = ({reactor:{heat, heat_dissipated}}) => `Heat: ${heat} MJ (-${heat_dissipated})`
export const selectPowerDisplayText = ({reactor:{power, power_gained}}) => `Power: ${power} MW (-${power_gained})`

export default controlPanelSlice.reducer
