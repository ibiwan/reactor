import { createSlice } from '@reduxjs/toolkit'
import { addListener } from '../../util/listener'
import { gameTick } from '../game/gameSlice'

const initialState = {
    heat: 0,
    power: 0,
    money: 0,
}

export const reactorSlice = createSlice({
    name: 'reactor',
    initialState,
    reducers: {
        addPower: (state, action) => {
            const { power } = action.payload
            console.log({action, power})
            state.power += power
        },
        addHeat: (state, action) => {
            const { heat } = action.payload
            state.heat += heat
        },
        sellPower: (state, _action) => {
            state.money += state.reactor.power
            state.power = 0
        },
        ventHeat: (state, action) => {
            const { heat } = action.payload
            state.heat -= heat
        },
    },
    // extraReducers: builder => {
    //     builder
    //         .addCase(gameTick.pending, (state, action) => {
    //             // console.log("reactor slice hears game tick!", { state, action })
    //         })
    // }
})

export const { addPower, addHeat, sellPower, ventHeat } = reactorSlice.actions;

console.log({gameTick})
addListener(gameTick.pending.type, (storeApi, action)=>{
    const {dispatch} = storeApi
    dispatch(addPower(5))
})

export default reactorSlice.reducer
