import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { listenerMiddleware } from '../../util/listener'
import { load_textures } from '../../util/textures'

const initialState = {
    texturesLoaded: false,
    canisters: [],
}

export const loadTextures = createAsyncThunk(
    'game/loadTextures',
    async (loader) => {
        console.log("loading textures...")
        load_textures(loader)
        return new Promise((resolve) => {
            console.log("...loaded!")
            loader.load(() => resolve())
        })
    }
)

export const gameTick = createAsyncThunk(
    'game/tick',
    // async (_, { dispatch }) => {
    //     await new Promise((resolve) => setTimeout(resolve, 1000))
    //     console.log("next!")
    //     dispatch(gameTick())
    // }
    async (_, { dispatch }) => {
        await new Promise(resolve => setTimeout(resolve, 1000))
        // .then(console.log("success"))
        // .catch(e => console.log({ e }))
        // .finally(() => 
        dispatch(gameTick())
        // )
    }
)

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        // addCanister: (state, action) => {
        //     const {i, j, type} = action
        //     state.canisters.push({i, j, type})
        // }
    },
    extraReducers: builder => builder
        .addCase(loadTextures.pending, (state) => { })
        .addCase(loadTextures.fulfilled, (state, action) => {
            state.texturesLoaded = true
        })
        // .addCase(gameTick.pending, (state, action) => {
        //     // console.log('game tick! p', { state, action })
        // })
        // .addCase(gameTick.fulfilled, (state, action) => {
        //     // console.log('game tick! f', { state, action })
        // }),
})

export const { addCanister } = gameSlice.actions;

export const selectTexturesLoaded = ({ game: { texturesLoaded } }) => texturesLoaded

export default gameSlice.reducer
