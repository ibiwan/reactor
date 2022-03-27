import { createSlice } from '@reduxjs/toolkit';
import { addListener } from '../../util/listener'
import { gameTick } from '../game/gameSlice';
import { addHeat, addPower } from '../reactor/reactorSlice';
import { core_definitions } from './templates';
import { apply_core_upgrades } from './upgrades';

const initialState = {
    canisters: [],
};

export const canisterSlice = createSlice({
    name: 'canister',
    initialState,
    reducers: {
        addCanister: (stateSlice, action) => {
            const { i, j, tier, cluster } = action.payload;
            const details = core_definitions[tier][cluster];
            const new_canister = { i, j, ...details };
            stateSlice.canisters.push(new_canister);
        },
        updateCanister: (stateSlice, { payload: updated_canister }) => {
            const { i, j } = updated_canister;
            const canister = findCanisterIn(i, j, stateSlice.canisters);
            Object.assign(canister, updated_canister);
        },
        removeCanister: (stateSlice, { payload: { i: dead_i, j: dead_j } }) => {
            stateSlice.canisters = stateSlice.canisters.filter(({ i, j }) =>
                i !== dead_i || j !== dead_j
            );
        },
    },
});

export const { addCanister, updateCanister, removeCanister } = canisterSlice.actions;

addListener(gameTick.pending.type, ({ getState, dispatch }) => {
    selectCanisters(getState()).forEach(canister => {
        const updates = getUpdatedCanister(canister);
        if (updates) {
            const { new_canister, power_emitted, heat_emitted } = updates;
            console.log("updating");
            dispatch(updateCanister(new_canister));
            dispatch(addPower(power_emitted));
            dispatch(addHeat(heat_emitted));
        }
    });
});

const selectCanisters = ({ canister: { canisters } }) => canisters;

const findCanisterIn = (i, j, canisters) => canisters.find(c => c.i === i && c.j === j);

export const selectCanisterAt = (i, j) => (state) => {
    const { canister: { canisters } } = state;
    return findCanisterIn(i, j, canisters);
};

const getUpdatedCanister = (canister) => {
    if (canister.expired) {
        return false;
    }

    const { tier, cluster, life_elapsed } = canister;
    const applied = apply_core_upgrades(tier, cluster);
    const { life_span, power_rate, heat_rate, auto_rebuild } = applied;

    const expired = life_elapsed >= life_span;
    let new_life_elapsed = life_elapsed;
    if (!expired) {
        new_life_elapsed += 1;
    }

    const new_canister = Object.assign({}, canister, {
        life_elapsed: new_life_elapsed,
        life_span,
        expired,
        auto_rebuild,
    });

    return {
        new_canister,
        power_emitted: expired ? 0 : power_rate,
        heat_emitted: expired ? 0 : heat_rate,
    };
};

export default canisterSlice.reducer;
