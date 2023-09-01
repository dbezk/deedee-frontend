import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    staticProductsList: [],
    vipProductsList: []
}

export const marketSlice = createSlice({
    name: 'marketController',
    initialState,
    reducers: {
        setStaticProductsList: (state, action) => {
            state.staticProductsList = action.payload;
        },
        setVipProductsList: (state, action) => {
            state.vipProductsList = action.payload;
        }
    }
})

export const { setStaticProductsList, 
    setVipProductsList } = marketSlice.actions

export default marketSlice.reducer