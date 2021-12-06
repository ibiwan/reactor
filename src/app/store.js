import { configureStore } from '@reduxjs/toolkit'

import canisterReducer from '../features/canister/canisterSlice'
import gameReducer from '../features/game/gameSlice'
import geometryReducer from '../features/geometry/geometrySlice'
import reactorReducer from '../features/reactor/reactorSlice'
import { listenWare } from '../util/listener'

export const store = configureStore({
  reducer: {
    geometry: geometryReducer,
    game: gameReducer,
    reactor: reactorReducer,
    canister: canisterReducer,
  },
  middleware: getDefault => [...getDefault(), listenWare]
})
