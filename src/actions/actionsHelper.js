import { BEARER_TOKEN } from "../constants/actionConstants";
import { newNotification } from "./noitifcationActions";

export const getActionHeader = (type) => {
    const accessToken = localStorage.getItem('access_token');
    const headers = {
        BEARER_TOKEN: {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }
    }
    return headers[type];
}

export const flushActionsErrors = (error) => async (dispatch) => {
    // if(error.response.data.errors) {
    //     const errors = error.response.data.errors;
    //     dispatch({ type: OPEN_FULL_PAGE_MODAL, payload: {
    //             full_modal_data: {
    //                 title: 'Validation error',
    //                 content: errors.map(error => error.msg).join('\n')
    //             }
    //         }})
    // }
    // if(error.response.data.error) {
    //     dispatch({ type: OPEN_FULL_PAGE_MODAL, payload: {
    //             full_modal_data: {
    //                 title: 'Error',
    //                 content: error.response.data.error.message
    //             }
    //         }})
    // }
    // if(error.response.status === 500) {
    //     dispatch({ type: OPEN_FULL_PAGE_MODAL, payload: {
    //             full_modal_data: {
    //                 title: 'Fatal error',
    //                 content: 'Ooops, server error... Try again later.'
    //             }
    //         }})
    // }
    // if(error.response.status === 403) {
    //     dispatch({ type: OPEN_FULL_PAGE_MODAL, payload: {
    //             full_modal_data: {
    //                 title: 'Authorization error',
    //                 content: 'Invalid credentials'
    //             }
    //         }})
    // }
    if(error.response.status === 400) {
        dispatch(newNotification('Error', error.response.data.message))
    }
    if(error.response.status === 429) {
        dispatch(newNotification('Spam error', 'You can send message per 5 seconds.'))
    }
}