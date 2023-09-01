import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    battleModalOpen: false,
    battleModalData: null
}

export const modalSlice = createSlice({
    name: 'modalSlice',
    initialState,
    reducers: {
        setBattleModalOpen: (state, action) => {
            state.battleModalOpen = action.payload;
        },
        setBattleModalData: (state, action) => {
            state.battleModalData = action.payload;
        }
    }
})

export const { setBattleModalOpen,
    setBattleModalData } = modalSlice.actions

export default modalSlice.reducer