const explosion = 'explosion'
const floor = 'floor'
const grayCanister = 'gray-canister'
const grayFuel = 'gray-fuel'

const load_textures = (loader) => {
    // textures
    loader
        .add('black-plastic', 'resources/bumpy-black-plastic-texture.jpg')
        .add('lcd-display', 'resources/lcd-display.jpg')
        .add('orange-button', 'resources/orange-button.png')
        .add('red-canister', 'resources/red-canister.png')
        .add(floor, 'resources/floortile.png')
        .add(grayCanister, 'resources/gray-canister.png')
    // animations
    loader
        .add('red-fuel', 'resources/red-fuel.json')
        .add(explosion, 'resources/explosion.json')
        .add(grayFuel, 'resources/gray-fuel.json')
    return loader
}
export { load_textures }

const loadedTexture = (app, key) =>
    app.loader.resources[key].texture

let _floor_texture
export const loadedFloorTexture = app =>
    _floor_texture || (_floor_texture = loadedTexture(app, floor))

let _gray_can_texture
export const loadedCanisterTexture = app =>
    _gray_can_texture || (_gray_can_texture = loadedTexture(app, grayCanister))

const loadedAnimation = (app, key) =>
    app.loader.resources[key].spritesheet.animations[key]

let _fuel_animation
export const loadedFuelAnimation = app =>
    _fuel_animation || (_fuel_animation = loadedAnimation(app, grayFuel))

let _explosion_animation
export const loadedExplosionAnimation = app =>
    _explosion_animation || (_explosion_animation = loadedAnimation(app, explosion))
