import React  from 'react';
import { useSelector } from 'react-redux';
import {
    Container,
    withApp
} from 'react-pixi-fiber'

import { selectControlWidth, selectFloorY } from '../geometry/geometrySlice';
import { FloorContainer } from '../floor/Floor';

const ReactorContainerInner = (_props) => {
    const control_width = useSelector(selectControlWidth)
    const border = useSelector(state => state.geometry.border)
    const floor_y = useSelector(selectFloorY)

    return (
        <Container position={{
            x: control_width + 2 * border,
            y: floor_y,
        }}>
            <FloorContainer></FloorContainer>
        </Container>
    );
}

export const ReactorContainer = withApp(ReactorContainerInner);
