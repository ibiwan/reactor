import React from 'react';
import { Stage } from 'react-pixi-fiber'
import { Provider } from 'react-redux';

import { store } from './app/store';
import './App.css';
import { GameContainer } from './features/game/Game'

export const App = () => {
  return (
    <Stage options={{ width: 900, height: 800, antialias: true }}>
      <Provider store={store}>
        <GameContainer></GameContainer>
      </Provider>
    </Stage>
  );
}

export default App;
