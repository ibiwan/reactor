const grayCanister = 'gray-canister'
const grayFuel = 'gray-fuel'

const load_textures = (loader) => {
    loader
        .add('explosion', 'resources/explosion.json')
        .add('floor', 'resources/floortile.png')
        .add('lcd-display', 'resources/lcd-display.jpg')
        .add('red-canister', 'resources/red-canister.png')
        .add('gray-canister', 'resources/gray-canister.png')
        .add('red-fuel', 'resources/red-fuel.json')
        .add('gray-fuel', 'resources/gray-fuel.json')
        .add('orange-button', 'resources/orange-button.png')
        .add('black-plastic', 'resources/bumpy-black-plastic-texture.jpg')
    return loader
}
export { load_textures }

let _floor_texture
export const loadedFloorTexture = app =>
    _floor_texture ||
    (_floor_texture = app.loader.resources.floor.texture)

let _gray_can_texture
export const loadedCanisterTexture = app =>
    _gray_can_texture ||
    (_gray_can_texture = app.loader.resources[grayCanister].texture)

let _fuel_animation
export const loadedFuelAnimation = app =>
    _fuel_animation ||
    (_fuel_animation = app.loader.resources[grayFuel].spritesheet.animations[grayFuel])
