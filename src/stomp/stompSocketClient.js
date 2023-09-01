import * as SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {setAuthCode, setAuthInit} from '../redux/slices/authSlice'
import {setFullLoading} from '../redux/slices/siteLoadingSlice'
import {setUserInfo} from '../redux/slices/userInfoSlice'
import { newNotification } from "../actions/noitifcationActions";
import { setChatMessagesList, setOnlinePlayersList } from "../redux/slices/chatSlice";
import { setActiveBattles, setCurrentGameData } from "../redux/slices/battleSlice";
import { setStompClient } from "../redux/slices/stompSlice";
import { getCurrentUserInfo } from "../actions/userActions";

let stompClient;
let stompConnected = false;

export const setStompConnection = (dispatch, battleId) => {
    stompClient = null;
    stompClient = Stomp.over(() => new SockJS(process.env.REACT_APP_STOMP_URL))
    stompClient.debug = () => {}
    stompClient.configure({
		reconnectDelay: 1000
	});
    stompClient.onDisconnect = () => {
        dispatch(setFullLoading(true))
    }
    stompClient.onStompError = (frame) => {
        console.log(frame)
    }
    const connectHeaders = {
        access_token : localStorage.getItem('access_token')
    }
    stompClient.connect(
        connectHeaders, () => {
        stompConnected = true;
        dispatch(setFullLoading(false))
        stompClient.subscribe(process.env.REACT_APP_STOMP_AUTH_TOPIC_URL, (message) => {
            dispatch(setAuthCode(JSON.parse(message.body).code))
            dispatch(setAuthInit(true))
        })
        stompClient.subscribe(process.env.REACT_APP_STOMP_CHAT_MESSAGES_TOPIC_URL, (message) => {
            dispatch(setChatMessagesList(JSON.parse(message.body)))
        })
        stompClient.subscribe(process.env.REACT_APP_STOMP_ONLINE_USERS_TOPIC_URL, (message) => {
            dispatch(setOnlinePlayersList(JSON.parse(message.body)))
        })
        stompClient.subscribe(process.env.REACT_APP_STOMP_AUTH_DONE_TOPIC_URL, (message) => {
            const userData = JSON.parse(message.body);
            localStorage.setItem('access_token', userData.accessToken);
            dispatch(setUserInfo(userData))
        });
        stompClient.subscribe(process.env.REACT_APP_STOMP_NOTIFICATIONS_TOPIC_URL, (message) => {
            dispatch(getCurrentUserInfo())
            dispatch(newNotification('Notification', message.body))
        });
        stompClient.subscribe(process.env.REACT_APP_STOMP_ACTIVE_BATTLES_TOPIC_URL, (message) => {
            dispatch(setActiveBattles(JSON.parse(message.body)))
        })
        if(battleId) {
            stompClient.subscribe(process.env.REACT_APP_WS_BATTLE_URL+battleId, (message) => {
                dispatch(setCurrentGameData(JSON.parse(message.body)))
            })
        }
    }, {}, () => {
        dispatch(setFullLoading(true))
    });
    stompClient.activate()
    dispatch(setStompClient(stompClient))
    return true;
}

export const sendAuthTry = () => {
    if(stompConnected) {
        stompClient.send(process.env.REACT_APP_WS_LOGIN_URL, {}, {});
    }
}