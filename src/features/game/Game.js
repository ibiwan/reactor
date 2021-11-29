import React, { useEffect } from 'react';
import {
    useSelector,
    useDispatch
} from 'react-redux';
import { withApp } from 'react-pixi-fiber'
import { loadTextures } from './gameSlice';
import { ReactorContainer } from '../reactor/Reactor';

const GameContainerInner = ({ app: { loader } }) => {
    const texturesLoaded = useSelector(state => state.game.texturesLoaded)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadTextures(loader))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!texturesLoaded) { return (<></>) }

    console.log("textures loaded; rendering game")

    return (
        <ReactorContainer ></ReactorContainer>
    );
}

export const GameContainer = withApp(GameContainerInner);
