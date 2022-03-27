import { useEffect } from 'react';
import {
    useSelector,
    useDispatch
} from 'react-redux';

import { loadTextures, selectTexturesLoaded, gameTick } from './gameSlice';
import { useInterval } from '../../app/hooks/useInterval';

export const useGameComponent = (textureLoader) => {
    const texturesLoaded = useSelector(selectTexturesLoaded);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadTextures(textureLoader));
    }, [dispatch, textureLoader]);

    useInterval(() => {
        console.log("tick");
        dispatch(gameTick());
    }, 1000);


    return {
        texturesLoaded
    }
}
