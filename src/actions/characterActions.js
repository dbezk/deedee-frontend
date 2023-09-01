import axios from "axios"
import {setFullLoading} from '../redux/slices/siteLoadingSlice'
import {setCharactersList} from '../redux/slices/startSlice';
import { getActionHeader, flushActionsErrors } from "./actionsHelper"
import { BEARER_TOKEN } from "../constants/actionConstants"

export const getAllCharacters = () => async (dispatch) =>{
    try {
        dispatch(setFullLoading(true))
        const {data} = await axios.get(process.env.REACT_APP_API_CHARACTER_URL,
            getActionHeader(BEARER_TOKEN));
        dispatch(setCharactersList(data))
    } catch (error) {
        dispatch(flushActionsErrors(error))
    }
    dispatch(setFullLoading(false))
}