import React from 'react'
import { useSelector } from 'react-redux'
import {
    Container,
    withApp
} from 'react-pixi-fiber'

import {
    selectReactorPosition,
} from '../geometry/geometrySlice'
import { FloorContainer } from '../floor/Floor'

const ReactorContainerInner = () => {
    const position = useSelector(selectReactorPosition)

    return (
        <Container position={position}        >
            <FloorContainer />
        </Container>
    )
}

export const ReactorContainer = withApp(ReactorContainerInner)
