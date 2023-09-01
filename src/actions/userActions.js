import axios from "axios"
import {setFullLoading} from '../redux/slices/siteLoadingSlice'
import {setUserInfo} from '../redux/slices/userInfoSlice'
import { getActionHeader, flushActionsErrors } from "./actionsHelper"
import { newNotification } from "./noitifcationActions";
import { BEARER_TOKEN } from "../constants/actionConstants"

export const getUserAuth = () => async (dispatch, getState) => {
    try {
        dispatch(setFullLoading(true))
        const {data} = await axios.get(process.env.REACT_APP_API_AUTH_URL + '/'+getState().authController.code);
        if(data.accessToken) {
            localStorage.setItem('access_token', data.accessToken);
            window.location.reload();
        } else {
            dispatch(newNotification('404', 'Your auth not found.'))
        }
    } catch (error) {
        window.location.reload()
    }
    dispatch(setFullLoading(false))
}

export const getCurrentUserInfo = (isLoad) => async (dispatch) => {
    try {
        if(isLoad) dispatch(setFullLoading(true))
        const {data} = await axios.get(process.env.REACT_APP_API_USER_URL,
            getActionHeader(BEARER_TOKEN));
        dispatch(setUserInfo(data))
        dispatch(setFullLoading(false))
    } catch (error) {
        localStorage.removeItem('access_token');
        window.location.href = '/';
    }
    if(isLoad) dispatch(setFullLoading(false))
}

export const chooseCharacter = (id) => async (dispatch) =>{
    try {
        dispatch(setFullLoading(true))
        await axios.put(process.env.REACT_APP_API_USER_URL+'/setCharacter/'+id, 
        {}, getActionHeader(BEARER_TOKEN));
        window.location.reload()
    } catch (error) {
        console.log(error.request)
        dispatch(flushActionsErrors(error))
    }
    dispatch(setFullLoading(false))
}

export const setUniqueProduct = (id) => async (dispatch) =>{
    try {
        await axios.put(process.env.REACT_APP_API_USER_URL+'/setUniqueProduct/'+id, 
        {}, getActionHeader(BEARER_TOKEN));
        dispatch(getCurrentUserInfo(false))
    } catch (error) {
        console.log(error.request)
        dispatch(flushActionsErrors(error))
    }
}

export const unsetUniqueProduct = () => async (dispatch) =>{
    try {
        await axios.put(process.env.REACT_APP_API_USER_URL+'/unsetUniqueProduct', 
        {}, getActionHeader(BEARER_TOKEN));
        dispatch(getCurrentUserInfo(false))
    } catch (error) {
        console.log(error.request)
        dispatch(flushActionsErrors(error))
    }
}

export const logoutUser = () => {
    localStorage.clear();
    window.location.href = '/';
}