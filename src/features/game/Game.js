import React from 'react';
import {
    Container,
    withApp,
} from 'react-pixi-fiber';

import { ReactorContainer } from '../reactor/Reactor';
import { ControlPanelContainer } from '../controlPanel/ControlPanel';
import { useGameComponent } from './useGameComponent';

const GameInner = ({ app: { loader } }) => {
    const {texturesLoaded} = useGameComponent(loader)

    if (!texturesLoaded) { return <></>; }

    return (
        <Container>
            <ReactorContainer />
            <ControlPanelContainer />
            {/* <StatusWindow /> */}
        </Container>
    );
};

export const Game = withApp(GameInner);
