import React from 'react';
import { useSelector } from 'react-redux';
import {
    Container,
    withApp
} from 'react-pixi-fiber'

import { TileContainer } from '../tile/Tile';

const FloorContainerInner = (_props) => {
    const grid_num = useSelector(state => state.geometry.grid_num)

    const seed = [...Array(grid_num)]
    const tileRows =
        seed.map((_, i) =>
            seed.map((_, j) =>
                (<TileContainer key={j} {...{ i, j }}></TileContainer>)))

    return (
        <Container>
            {tileRows}
        </Container>
    );
}

export const FloorContainer = withApp(FloorContainerInner);
