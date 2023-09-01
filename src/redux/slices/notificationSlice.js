import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notifications: []
}

export const notificationsSlice = createSlice({
    name: 'notificationsController',
    initialState,
    reducers: {
        addNotification: (state, action) => {
            state.notifications.push({
                id: action.payload.id,
                title: action.payload.title,
                text: action.payload.text
            })
        },
        removeNotification: (state, action) => {
            state.notifications = state.notifications
                                        .filter(el => el.id !== action.payload)
        }
    }
})

export const { addNotification,
    removeNotification } = notificationsSlice.actions

export default notificationsSlice.reducer