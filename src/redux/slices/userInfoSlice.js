import { createSlice } from "@reduxjs/toolkit";

const getUserToken = localStorage.getItem('access_token') || null

const initialState = {
    userInfo: getUserToken
}

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        addUserMoney: (state, action) => {
            state.userInfo.money += action.payload;
        },
        chargeUserMoney: (state, action) => {
            state.userInfo.money -= action.payload;
        },
        addUserVipMoney: (state, action) => {
            state.userInfo.vipMoney += action.payload;
        },
        chargeUserVipMoney: (state, action) => {
            state.userInfo.vipMoney -= action.payload;
        }
    }
})

export const { setUserInfo,
    addUserMoney, chargeUserMoney,
    addUserVipMoney, chargeUserVipMoney } = userInfoSlice.actions

export default userInfoSlice.reducer