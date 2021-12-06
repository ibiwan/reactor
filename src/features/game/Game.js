import React, { useEffect } from 'react'
import {
    useSelector,
    useDispatch
} from 'react-redux'
import {
    withApp,
} from 'react-pixi-fiber'
import { loadTextures, selectTexturesLoaded, gameTick } from './gameSlice'
import { ReactorContainer } from '../reactor/Reactor'

const GameContainerInner = ({ app: { loader } }) => {
    const texturesLoaded = useSelector(selectTexturesLoaded)

    const dispatch = useDispatch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { dispatch(loadTextures(loader)) }, [])
    useEffect(() => { 
        console.log("starting main tick cycle")
        // eslint-disable-next-line react-hooks/exhaustive-deps
        dispatch(gameTick())
     }, [])

    if (!texturesLoaded) { return (<></>) }

    return (
        <ReactorContainer ></ReactorContainer>
    )
}

export const GameContainer = withApp(GameContainerInner)
