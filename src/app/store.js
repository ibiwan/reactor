import { configureStore } from '@reduxjs/toolkit'

import canisterReducer from '../features/canister/canisterSlice'
import gameReducer from '../features/game/gameSlice'
import geometryReducer from '../features/geometry/geometrySlice'

export const store = configureStore({
  reducer: {
    canister: canisterReducer,
    game: gameReducer,
    geometry: geometryReducer,
  },
})
