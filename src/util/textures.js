const blackPlastic = 'black-plastic'
const floor = 'floor'
const grayCanister = 'gray-canister'
const lcdDisplay = 'lcd-display'
const orangeButton = 'orange-button'
const redCanister = 'red-canister'

const explosion = 'explosion'
const grayFuel = 'gray-fuel'
const redFuel = 'red-fuel'

const load_textures = (loader) => {
    // textures
    loader
        .add(blackPlastic, 'resources/bumpy-black-plastic-texture.jpg')
        .add(floor, 'resources/floortile.png')
        .add(grayCanister, 'resources/gray-canister.png')
        .add(lcdDisplay, 'resources/lcd-display.jpg')
        .add(orangeButton, 'resources/orange-button.png')
        .add(redCanister, 'resources/red-canister.png')

        // animations
    loader
        .add(explosion, 'resources/explosion.json')
        .add(grayFuel, 'resources/gray-fuel.json')
        .add(redFuel, 'resources/red-fuel.json')
    return loader
}
export { load_textures }

// #region texture accessors
const loadedTexture = (app, key) =>
    app.loader.resources[key].texture

let _floor_texture
export const loadedFloorTexture = app =>
    _floor_texture || (_floor_texture = loadedTexture(app, floor))

let _gray_can_texture
export const loadedCanisterTexture = app =>
    _gray_can_texture || (_gray_can_texture = loadedTexture(app, grayCanister))

let _black_plastic_texture
export const loadedBlackPlasticTexture = app =>
    _black_plastic_texture || (_black_plastic_texture = loadedTexture(app, blackPlastic))

let _lcd_display_texture
export const loadedLcdDisplayTexture = app =>
_lcd_display_texture || (_lcd_display_texture = loadedTexture(app, lcdDisplay))
// #endregion

// #region animation accessors
const loadedAnimation = (app, key) =>
    app.loader.resources[key].spritesheet.animations[key]

let _fuel_animation
export const loadedFuelAnimation = app =>
    _fuel_animation || (_fuel_animation = loadedAnimation(app, grayFuel))

let _explosion_animation
export const loadedExplosionAnimation = app =>
    _explosion_animation || (_explosion_animation = loadedAnimation(app, explosion))
// #endregion
