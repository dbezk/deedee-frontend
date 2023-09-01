import { setBattleModalOpen, setBattleModalData } from '../redux/slices/modalSlice'

export const openBattleModal = (data) => async (dispatch) =>{
    dispatch(setBattleModalData(data))
    dispatch(setBattleModalOpen(true))
}

export const closeBattleModal = () => async (dispatch) =>{
    dispatch(setBattleModalData(null))
    dispatch(setBattleModalOpen(false))
}