import { addNotification, removeNotification } from "../redux/slices/notificationSlice"
import {v4} from "uuid"

export const newNotification = (title, text) => async (dispatch) => {
    dispatch(addNotification({ id: v4(), title, text }))
}

export const hideNotification = (id) => async (dispatch) => {
    dispatch(removeNotification(id))
}