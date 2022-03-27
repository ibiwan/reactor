import { configureStore } from '@reduxjs/toolkit';

import canisterReducer from '../features/canister/canisterSlice';
import explosionReducer from '../features/explosion/explosionSlice';
import gameReducer from '../features/game/gameSlice';
import geometryReducer from '../features/geometry/geometrySlice';
import reactorReducer from '../features/reactor/reactorSlice';
import controlPanelReducer from '../features/controlPanel/controlPanelSlice';

import { listenWare } from '../util/listener';

export const store = configureStore({
  reducer: {
    canister: canisterReducer,
    controlPanel: controlPanelReducer,
    explosion: explosionReducer,
    game: gameReducer,
    geometry: geometryReducer,
    reactor: reactorReducer,
  },

  middleware: getDefault => [...getDefault(), listenWare]
});
