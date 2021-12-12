import React, { useEffect } from 'react'
import {
    useSelector,
    useDispatch
} from 'react-redux'
import {
    Container,
    withApp,
} from 'react-pixi-fiber'
import { loadTextures, selectTexturesLoaded, gameTick } from './gameSlice'
import { ReactorContainer } from '../reactor/Reactor'
import { ControlPanelContainer } from '../controlPanel/ControlPanel'

const GameInner = ({ app: { loader } }) => {
    const texturesLoaded = useSelector(selectTexturesLoaded)

    const dispatch = useDispatch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { dispatch(loadTextures(loader)) }, [])
    useEffect(() => {
        console.log("starting main tick cycle")
        dispatch(gameTick())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!texturesLoaded) { return (<></>) }

    return <Container>
        <ReactorContainer />
        <ControlPanelContainer />
        {/* <StatusWindow /> */}
    </Container>
}

export const Game = withApp(GameInner)
