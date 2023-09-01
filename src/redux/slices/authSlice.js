import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    code: 0o000000,
    init: false
}

export const authSlice = createSlice({
    name: 'authController',
    initialState,
    reducers: {
        setAuthCode: (state, action) => {
            state.code = action.payload;
        },
        setAuthInit: (state, action) => {
            state.init = true;
        }
    }
})

export const { setAuthCode, setAuthInit } = authSlice.actions

export default authSlice.reducer