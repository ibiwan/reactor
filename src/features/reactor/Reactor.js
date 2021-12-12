import React from 'react'
import { Container, withApp } from 'react-pixi-fiber'

import { FloorContainer } from '../floor/Floor'

const ReactorContainerInner = () => {

    return (
        <Container>
            {/* <StatusWindow /> */}
            <FloorContainer />
        </Container>
    )
}

export const ReactorContainer = withApp(ReactorContainerInner)
