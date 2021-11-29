import React from 'react';
import { useSelector } from 'react-redux';
import {
    Container,
    withApp
} from 'react-pixi-fiber'

import { TileContainer } from '../tile/Tile';

const FloorContainerInner = (_props) => {
    const grid_num = useSelector(state => state.geometry.grid_num)

    const tileRows = []
    for (let i = 0; i < grid_num; i++) {
        const tileRow = []
        for (let j = 0; j < grid_num; j++) {
            tileRow.push(
                (<TileContainer key={j} {...{ i, j }}></TileContainer>)
            )
        }
        tileRows.push((
            <Container key={i}>{tileRow}</Container>
        ))
    }
    return (
        <Container>
            {tileRows}
        </Container>
    );
}

export const FloorContainer = withApp(FloorContainerInner);
