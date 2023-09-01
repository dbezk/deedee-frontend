import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fullLoading: true
}

export const siteLoadingSlice = createSlice({
    name: 'siteLoading',
    initialState,
    reducers: {
        setFullLoading: (state, action) => {
            state.fullLoading = action.payload;
        }
    }
})

export const { setFullLoading } = siteLoadingSlice.actions

export default siteLoadingSlice.reducer