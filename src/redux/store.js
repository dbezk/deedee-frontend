import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from "./slices/authSlice";
import userInfoSliceReducer from "./slices/userInfoSlice";
import siteLoadingSliceReducer from "./slices/siteLoadingSlice";
import startSliceReducer from './slices/startSlice';
import marketSliceReducer from './slices/marketSlice';
import notificationsSliceReducer from './slices/notificationSlice';
import chatSliceReducer from './slices/chatSlice';
import ratingSliceReducer from './slices/ratingsSlice';
import giveawaySliceReducer from './slices/giveawaySlice';
import modalSliceReducer from './slices/modalSlice'
import battleSliceReducer from './slices/battleSlice'
import stompSliceReducer from './slices/stompSlice';

const reducer = {
    chooseCharactersController: startSliceReducer,
    authController: authSliceReducer,
    marketController: marketSliceReducer,
    chatController: chatSliceReducer,
    userInfo: userInfoSliceReducer,
    ratingsData: ratingSliceReducer,
    giveawayController: giveawaySliceReducer,
    siteLoading: siteLoadingSliceReducer,
    modalController: modalSliceReducer,
    battleController: battleSliceReducer,
    stompController: stompSliceReducer,
    notificationsController: notificationsSliceReducer
}

export const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    })
})