import { createSlice } from '@reduxjs/toolkit'
import { addListener } from '../../util/listener'
import { gameTick } from '../game/gameSlice'

const initialState = {
    heat: 0,
    heat_dissipated: 0,
    power: 0,
    power_gained: 0,
    money: 0,
    money_gained: 0,
}

export const reactorSlice = createSlice({
    name: 'reactor',
    initialState,
    reducers: {
        addPower: (stateSlice, action) => {
            const power = action.payload
            stateSlice.power += power
        },
        addHeat: (stateSlice, action) => {
            const heat = action.payload
            stateSlice.heat += heat
        },
        sellPower: (stateSlice, _action) => {
            stateSlice.money += stateSlice.reactor.power
            stateSlice.power = 0
        },
        ventHeat: (stateSlice, action) => {
            const { heat } = action.payload
            stateSlice.heat -= heat
        },
    },
})

export const { addPower, addHeat, sellPower, ventHeat } = reactorSlice.actions;

addListener(gameTick.pending.type, (storeApi, _action) => {
    // const { dispatch, getState } = storeApi
    console.log('reactorSlice gameTick listener')
})

export default reactorSlice.reducer
