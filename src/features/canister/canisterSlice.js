import { createSlice } from '@reduxjs/toolkit'
import { addListener, listenerMiddleware } from '../../util/listener'
import { fold_fields, sum } from '../../util/structures'
import { gameTick } from '../game/gameSlice'
import { core_definitions, SINGLE } from './templates'
import { apply_core_upgrades } from './upgrades'

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
    extraReducers: builder => {
        builder
            .addCase(gameTick.pending, (state, action) => {
                console.log("canister slice hears game tick!", { state, action })
                const canisters = selectCanisters(state)
                const updates = canisters.map(updateCanister)
                const update = fold_fields(updates, sum, 0)
                // console.log({ update })
                // try {
                    // console.log({ r: state.reactor })
                    // state.reactor.heat += update.heat_emitted
                    // state.reactor.power += update.power_emitted
                // }
                // catch (e) { console.log('add heat/power error', { e }) }
            })
    }
})

const selectCanisters = ({ canisters }) => canisters

const updateCanister = canister => {
    // console.log("update")

    if (canister.expired) {
        return
    }

    const { tier, cluster, life_elapsed } = canister
    const applied = apply_core_upgrades(tier, cluster)
    const { life_span, power_rate, heat_rate, auto_rebuild } = applied

    const expired = life_elapsed >= life_span
    let new_life_elapsed = life_elapsed
    if (!expired) {
        new_life_elapsed += 1
    } else {
        // console.log("EXPIRED!!")
    }

    Object.assign(canister, {
        life_elapsed: new_life_elapsed,
        life_span,
        expired,
        auto_rebuild,
    })

    return {
        power_emitted: expired ? 0 : power_rate,
        heat_emitted: expired ? 0 : heat_rate,
    }
}

export const { addCanister } = canisterSlice.actions;

// console.log("adding listener", { listenerMiddleware, addCanister })
// listenerMiddleware.addListener(addCanister, async () => {
//     console.log("addCanister noticed by middleware")
// })

// console.log({t:addCanister.type})
// addListener(addCanister.type, ()=>{})

export const selectCanisterAt = (i, j) => ({ canister: { canisters } }) => canisters.find(c => c.i === i && c.j === j)

export default canisterSlice.reducer
