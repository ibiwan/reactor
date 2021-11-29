import React from 'react';
import { useSelector } from 'react-redux';
import {
    Container,
    withApp,
    Sprite,
} from 'react-pixi-fiber'

import { selectGridSize } from '../geometry/geometrySlice';

const TileContainerInner = (props) => {
    const {
        i,
        j,
        app: { loader: { resources: { floor: {
            texture: floor_texture
        } } } }
    } = props
    console.log({ i, j })
    const grid_size = useSelector(selectGridSize)
    const tileClick = (i, j) => {console.log("clicked:", {i, j})}
    const Tile = (props) => {
        return <Sprite
            i={i}
            j={j}
            texture={floor_texture}
            width={grid_size}
            height={grid_size}
            interactive={true}
            pointerdown={()=>tileClick(i, j)}
            {...props} />;
    }
    return (
        <Container position={{ x: i * grid_size, y: j * grid_size }} {...{ i, j }}>
            {/* {tileRows[0]} */}
            <Tile></Tile>
        </Container>
    );
}

export const TileContainer = withApp(TileContainerInner);
