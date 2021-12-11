import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    explosions: [],
}

export const explosionSlice = createSlice({
    name: 'explosion',
    initialState,
    reducers: {
        addExplosion: (stateSlice, action) => {
            const { i, j } = action.payload
            const new_explosion = { i, j }
            stateSlice.explosions.push(new_explosion)
        },
        removeExplosion: (stateSlice, { payload: { i: dead_i, j: dead_j } }) => {
            stateSlice.explosions = stateSlice.explosions.filter(({ i, j }) =>
                i !== dead_i || j !== dead_j
            )
        },
    },
})

const findExplosionIn = (i, j, explosions) => explosions.find(e => e.i === i && e.j === j)

export const selectExplosionAt = (i, j) => (state) => {
    const { explosion: { explosions } } = state
    return findExplosionIn(i, j, explosions)
}

export const { addExplosion, removeExplosion } = explosionSlice.actions;


export default explosionSlice.reducer
