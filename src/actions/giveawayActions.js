import axios from "axios"
import { getActionHeader, flushActionsErrors } from "./actionsHelper"
import { BEARER_TOKEN } from "../constants/actionConstants"
import { setMoneyGiveawayList,
    setVipMoneyGiveawayList } from '../redux/slices/giveawaySlice'
import { getCurrentUserInfo } from './userActions';
import { newNotification } from "./noitifcationActions";

export const getMoneyGiveaways = () => async (dispatch) =>{
    try {
        const {data} = await axios.get(process.env.REACT_APP_API_GIVEAWAY_URL + '/money', 
            getActionHeader(BEARER_TOKEN));
        dispatch(setMoneyGiveawayList(data))
    } catch (error) {
        dispatch(flushActionsErrors(error))
    }
}

export const claimMoneyGiveaway = (id) => async (dispatch) =>{
    try {
        const {data} = await axios.post(process.env.REACT_APP_API_GIVEAWAY_URL + '/money/'+id,
        {}, getActionHeader(BEARER_TOKEN));
        dispatch(newNotification('Successful', 'You claimed this giveaway.'))
        dispatch(getCurrentUserInfo(false))
    } catch (error) {
        dispatch(flushActionsErrors(error))
    }
}

export const getVipMoneyGiveaways = () => async (dispatch) =>{
    try {
        const {data} = await axios.get(process.env.REACT_APP_API_GIVEAWAY_URL + '/vipMoney', 
            getActionHeader(BEARER_TOKEN));
        dispatch(setVipMoneyGiveawayList(data))
    } catch (error) {
        dispatch(flushActionsErrors(error))
    }
}

export const claimVipMoneyGiveaway = (id) => async (dispatch) =>{
    try {
        const {data} = await axios.post(process.env.REACT_APP_API_GIVEAWAY_URL + '/vipMoney/'+id,
        {}, getActionHeader(BEARER_TOKEN));
        dispatch(newNotification('Successful', 'You claimed this giveaway.'))
        dispatch(getCurrentUserInfo(false))
    } catch (error) {
        dispatch(flushActionsErrors(error))
    }
}