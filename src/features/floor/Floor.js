import React from 'react'
import { useSelector } from 'react-redux'
import {
    Container,
    withApp
} from 'react-pixi-fiber'

import { TileContainer } from '../tile/Tile'
import { selectGridNum, selectReactorPosition } from '../geometry/geometrySlice'

const FloorContainerInner = () => {
    const grid_num = useSelector(selectGridNum)
    const position = useSelector(selectReactorPosition)

    const seed = [...Array(grid_num)]
    const tileRows =
        seed.map((_, i) =>
            seed.map((_, j) =>
                (<TileContainer key={j} {...{ i, j }} />)))

    return (
        <Container position={position}>
            {tileRows}
        </Container>
    )
}

export const FloorContainer = withApp(FloorContainerInner)
