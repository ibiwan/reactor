import { withApp } from "react-pixi-fiber"
import { useSelector } from "react-redux"

import CustomAnimatedSprite from '../../util/AnimatedSprite'
import { selectGridSize, selectMasks } from "../geometry/geometrySlice"
import { loadedFuelAnimation } from "../../util/textures"
import { useMemo } from "react"

const FuelInner = ({
    app,
    i, j,
    cluster,
    colors: { fuel: fuel_tint },
},) => {
    const grid_size = useSelector(selectGridSize)

    const first_mask = useSelector(selectMasks(i, j, cluster))
    const mask = useMemo(() => first_mask, [i, j, cluster])

    const fuel_animation = useMemo(() => loadedFuelAnimation(app), [])
    
    const props = {
        width: grid_size,
        height: grid_size,
        textures: fuel_animation,
        tint: fuel_tint,
        mask,
    }

    return <CustomAnimatedSprite {...props} />
}

export const Fuel = withApp(FuelInner)