import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeBattles: [],
    activeBattleInfo: {},
    currentGameData: null
}

export const battleSlice = createSlice({
    name: 'battleController',
    initialState,
    reducers: {
        setActiveBattles: (state, action) => {
            state.activeBattles = action.payload;
        },
        setActiveBattleInfo: (state, action) => {
            state.activeBattleInfo = action.payload;
        },
        setCurrentGameData: (state, action) => {
            state.currentGameData = action.payload;
        }
    }
})

export const { setActiveBattles,
    setActiveBattleInfo,
    setCurrentGameData } = battleSlice.actions

export default battleSlice.reducer