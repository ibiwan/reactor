import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '../features/game/gameSlice';
import geometryReducer from '../features/geometry/geometrySlice'

export const store = configureStore({
  reducer: {
    game: gameReducer,
    geometry: geometryReducer,
  },
});
