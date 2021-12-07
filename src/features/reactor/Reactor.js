import React from 'react'
import { Container, withApp } from 'react-pixi-fiber'

import { FloorContainer } from '../floor/Floor'

const ReactorContainerInner = () => {

    return (
        <Container>
            {/* // controls */}
            {/* // output screen */}
            {/* // available items */}
            <FloorContainer />
        </Container>
    )
}

export const ReactorContainer = withApp(ReactorContainerInner)
