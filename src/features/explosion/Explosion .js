import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withApp } from 'react-pixi-fiber'

import CustomAnimatedSprite from '../../util/AnimatedSprite'
import { selectGridSize } from '../geometry/geometrySlice'
import { removeExplosion } from './explosionSlice'
import { loadedExplosionAnimation } from '../../util/textures'

const ExplosionInner = ({ app, explosion: { i, j } }) => {
    const dispatch = useDispatch()

    const grid_size = useSelector(selectGridSize)

    const explosion_animation = useMemo(() => loadedExplosionAnimation(app), [])

    const onComplete = useMemo(() => () => { dispatch(removeExplosion({ i, j })) }, [])

    const props = {
        width: grid_size,
        height: grid_size,
        textures: explosion_animation,
        loop: false,
        onComplete,
    }

    return <CustomAnimatedSprite {...props} />

}

export const Explosion = withApp(ExplosionInner)
