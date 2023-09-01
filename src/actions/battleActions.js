import axios from "axios"
import {setFullLoading} from '../redux/slices/siteLoadingSlice'
import { getActionHeader, flushActionsErrors } from "./actionsHelper"
import { BEARER_TOKEN } from "../constants/actionConstants"
import { newNotification } from "./noitifcationActions";
import { getCurrentUserInfo } from "./userActions";
import { setBattleModalData } from "../redux/slices/modalSlice";
import { openBattleModal } from "./modalActions";

export const createNewBattle = (money, vipMoney) => async (dispatch) =>{
    try {
        const {data} = await axios.post(process.env.REACT_APP_API_BATTLE_URL + '/newBattle',
            money ? {money} : {vipMoney},
            getActionHeader(BEARER_TOKEN));
        dispatch(getCurrentUserInfo())
        dispatch(newNotification('Successful', 'New battle created!'))
    } catch (error) {
        dispatch(flushActionsErrors(error))
    }
}

export const getActiveBattleInfo = (id) => async (dispatch) =>{
    try {
        const {data} = await axios.get(process.env.REACT_APP_API_BATTLE_URL + `/${id}`,
            getActionHeader(BEARER_TOKEN));
        console.log(data)
        dispatch(openBattleModal(data))
    } catch (error) {
        dispatch(flushActionsErrors(error))
    }
}

export const joinBattle = (id) => async (dispatch) =>{
    try {
        const {data} = await axios.put(process.env.REACT_APP_API_BATTLE_URL + '/join/'+id,
            {}, getActionHeader(BEARER_TOKEN));
        window.location.href = '/battle/'+id;
    } catch (error) {
        dispatch(flushActionsErrors(error))
    }
}