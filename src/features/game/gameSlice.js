import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
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
    async (_, { dispatch }) => {
        console.log("a")
    }
)

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(loadTextures.pending, (state) => { })
        .addCase(loadTextures.fulfilled, (state, action) => {
            state.texturesLoaded = true
        }),
})

export const { addCanister } = gameSlice.actions;

export const selectTexturesLoaded = ({ game: { texturesLoaded } }) => texturesLoaded

export default gameSlice.reducer
