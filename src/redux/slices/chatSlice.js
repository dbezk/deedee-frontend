import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    onlinePlayersList: [],
    chatMessagesList: []
}

export const chatSlice = createSlice({
    name: 'chatController',
    initialState,
    reducers: {
        setOnlinePlayersList: (state, action) => {
            state.onlinePlayersList = action.payload;
        },
        setChatMessagesList: (state, action) => {
            state.chatMessagesList = action.payload;
        }
    }
})

export const { setOnlinePlayersList,
            setChatMessagesList } = chatSlice.actions

export default chatSlice.reducer