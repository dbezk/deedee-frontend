import axios from "axios"
import { getActionHeader, flushActionsErrors } from "./actionsHelper"
import { BEARER_TOKEN } from "../constants/actionConstants"
import { setRatingsList } from '../redux/slices/ratingsSlice'

export const getRatingsData = () => async (dispatch) =>{
    try {
        const {data} = await axios.get(process.env.REACT_APP_API_RATING_URL, 
            getActionHeader(BEARER_TOKEN));
        dispatch(setRatingsList(data))
        console.log(data)
    } catch (error) {
        dispatch(flushActionsErrors(error))
    }
}