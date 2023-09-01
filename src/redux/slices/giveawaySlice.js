import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    moneyGiveawayList: [],
    vipMoneyGiveawayList: []
}

export const giveawaySlice = createSlice({
    name: 'giveawayController',
    initialState,
    reducers: {
        setMoneyGiveawayList: (state, action) => {
            state.moneyGiveawayList = action.payload;
        },
        setVipMoneyGiveawayList: (state, action) => {
            state.vipMoneyGiveawayList = action.payload;
        }
    }
})

export const { setMoneyGiveawayList,
    setVipMoneyGiveawayList } = giveawaySlice.actions

export default giveawaySlice.reducer