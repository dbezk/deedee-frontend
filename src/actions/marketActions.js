import axios from "axios"
import {setFullLoading} from '../redux/slices/siteLoadingSlice'
import {setStaticProductsList, setVipProductsList} from '../redux/slices/marketSlice';
import { getActionHeader, flushActionsErrors } from "./actionsHelper"
import { BEARER_TOKEN } from "../constants/actionConstants"
import { newNotification } from './noitifcationActions';
import { getCurrentUserInfo } from './userActions'

export const loadAllStaticProducts = () => async (dispatch) =>{
    try {
        dispatch(setFullLoading(true))
        const {data} = await axios.get(process.env.REACT_APP_API_MARKET_URL+'/static',
            getActionHeader(BEARER_TOKEN));
        dispatch(setStaticProductsList(data))
    } catch (error) {
        dispatch(flushActionsErrors(error))
    }
    dispatch(setFullLoading(false))
}

export const buyStaticProduct = (id) => async (dispatch) =>{
    try {
        // dispatch(setFullLoading(true))
        const {data} = await axios.post(process.env.REACT_APP_API_MARKET_URL+'/static/buy/'+id, 
        {}, getActionHeader(BEARER_TOKEN));
        dispatch(getCurrentUserInfo(false))
        dispatch(newNotification('Successful', 'You bought this booster.'))
    } catch (error) {
        dispatch(flushActionsErrors(error))
    }
    // dispatch(setFullLoading(false))
}

export const loadAllUniqueProducts = () => async (dispatch) =>{
    try {
        dispatch(setFullLoading(true))
        const {data} = await axios.get(process.env.REACT_APP_API_MARKET_URL+'/unique',
            getActionHeader(BEARER_TOKEN));
        console.log(data)
        dispatch(setVipProductsList(data))
    } catch (error) {
        dispatch(flushActionsErrors(error))
    }
    dispatch(setFullLoading(false))
}

export const buyUniqueProduct = (id) => async (dispatch) =>{
    try {
        // dispatch(setFullLoading(true))
        const {data} = await axios.post(process.env.REACT_APP_API_MARKET_URL+'/unique/buy/'+id, 
        {}, getActionHeader(BEARER_TOKEN));
        dispatch(getCurrentUserInfo(false))
        dispatch(newNotification('Successful', 'You bought this attack.'))
    } catch (error) {
        dispatch(flushActionsErrors(error))
    }
    // dispatch(setFullLoading(false))
}