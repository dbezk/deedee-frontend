import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    stompClient: null
}

export const stompSlice = createSlice({
    name: 'stompController',
    initialState,
    reducers: {
        setStompClient: (state, action) => {
            state.stompClient = action.payload;
        }
    }
})

export const { setStompClient } = stompSlice.actions

export default stompSlice.reducer