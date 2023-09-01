import axios from "axios"
import { getActionHeader, flushActionsErrors } from "./actionsHelper"
import { BEARER_TOKEN } from "../constants/actionConstants"
import { newNotification } from './noitifcationActions'

export const sendNewMessage = (message) => async (dispatch, getState) =>{
    try {
        const {data} = await axios.post(process.env.REACT_APP_API_CHAT_URL + '/newMessage', 
        {senderId: getState().userInfo.userInfo.id, messageText: message},
        getActionHeader(BEARER_TOKEN));
    } catch (error) {
        dispatch(flushActionsErrors(error))
    }
}