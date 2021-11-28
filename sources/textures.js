const loader = PIXI.Loader.shared
const load_textures = () => {
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
