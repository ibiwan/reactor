const loader = PIXI.Loader.shared
const load_textures = () => {
    loader
        .add('floor', 'resources/floortile.png')
        .add('explosion', 'resources/explosion.json')
        .add('red-fuel', 'resources/red-fuel.json')
        .add('red-canister', 'resources/red-canister.png')
    return loader
}
export { load_textures }