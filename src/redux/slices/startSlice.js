import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    charactersList: []
}

export const startSlice = createSlice({
    name: 'chooseCharactersController',
    initialState,
    reducers: {
        setCharactersList: (state, action) => {
            state.charactersList = action.payload;
        }
    }
})

export const { setCharactersList } = startSlice.actions

export default startSlice.reducer