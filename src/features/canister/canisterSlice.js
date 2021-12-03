import { createSlice } from '@reduxjs/toolkit'
import { core_definitions, SINGLE } from './templates'

const initialState = {
    canisters: [],
}

export const canisterSlice = createSlice({
    name: 'canister',
    initialState,
    reducers: {
        addCanister: (state, action) => {
            const { i, j, tier } = action.payload
            const details = core_definitions[tier][SINGLE]
            const newCan = { i, j, ...details }
            state.canisters.push(newCan)
        }
    },
})

export const { addCanister } = canisterSlice.actions;

export const selectCanisterAt = (i, j) => ({ canister: { canisters } }) => canisters.filter(c => c.i === i && c.j === j)[0]

export default canisterSlice.reducer
