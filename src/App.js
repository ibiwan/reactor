import React from 'react'
import { Stage } from 'react-pixi-fiber'
import { Provider } from 'react-redux'

import { store } from './app/store'
import { Game } from './features/game/Game'

export const App = () => {
  return (
    <Stage options={{ antialias: true, width: 900, height: 800 }}>
      <Provider store={store}>
        <Game />
      </Provider>
    </Stage>
  )
}

export default App
