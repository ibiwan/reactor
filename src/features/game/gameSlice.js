import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { load_textures } from '../../util/textures';

const initialState = {
    texturesLoaded: false,
};

export const loadTextures = createAsyncThunk(
    'game/loadTextures',
    async (loader) => {
        console.log("loading...")
        load_textures(loader)
        return new Promise((resolve, reject) => {
            loader.load((loader, resource) => {
                resolve()
            })
        });
    })


export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        // incrementByAmount: (state, action) => {
        //   state.value += action.payload;
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadTextures.pending, (state) => { })
            .addCase(loadTextures.fulfilled, (state, action) => {
                state.texturesLoaded = true
            });
    },
});

export default gameSlice.reducer;
