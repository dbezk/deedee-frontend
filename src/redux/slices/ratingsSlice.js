import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ratingList: []
}

export const ratingSlice = createSlice({
    name: 'ratingSlice',
    initialState,
    reducers: {
        setRatingsList: (state, action) => {
            state.ratingList = action.payload;
        }
    }
})

export const { setRatingsList } = ratingSlice.actions

export default ratingSlice.reducer