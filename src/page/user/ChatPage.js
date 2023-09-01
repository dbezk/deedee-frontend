import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import { useDispatch, useSelector } from 'react-redux';
import { sendNewMessage } from '../../actions/chatActions';
import { newNotification } from '../../actions/noitifcationActions';
import { v4 } from 'uuid'

const ChatPage = () => {

    const { userInfo } = useSelector(state => state.userInfo);

    const { onlinePlayersList,
        chatMessagesList } = useSelector(state => state.chatController);

    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const sendMessage = (e) => {
        e.preventDefault()
        if(message.length < 5 || message.length > 200) {
            dispatch(newNotification('Error', 'Message range is [5;200] characters.'))
        } else {
            dispatch(sendNewMessage(message))
            setMessage('')
            document.querySelector('form input').value = ''
        }
    }

    return (
        <>
        <Header />
        <div className="full_section under_header flex row chat_page">
            <div className="chat_block black_border_basic">
                <div className="flex column chat_messages_block">
                    {chatMessagesList.length !== 0 &&
                    <>
                    {chatMessagesList.map(message => {
                        return (
                            <div key={message.id} 
                            className={`flex horizontal_center message ${parseInt(message.senderId) === userInfo.id ? 'my_message' : 'player_message'}`}>
                                <img src={process.env.REACT_APP_STATIC_URL + message.avatar} alt="user avatar"/>
                                <span className="flex horizontal_center">{message.messageText}</span>
                            </div> 
                        )
                    })}
                    </>
                    }
                </div>
                <div className="flex row horizontal_center chat_message_input">
                    <form onSubmit={sendMessage}>
                        <input type="text" placeholder="Say something..." 
                        onChange={e => setMessage(e.target.value)}/>
                    </form>
                </div>
            </div>
            <div className="chat_block black_border_basic">
                <div className="chat_block_header flex row section_header">
                    <span className="h2">Random online players</span>
                </div>
                <div className="chat_block_users flex column">
                    {onlinePlayersList.length !== 0 ? (
                        <>
                        {onlinePlayersList.map(user => {
                            return (
                                <div className="chat_block_user flex row horizontal_center"
                                    key={v4()}>
                                    <img src={process.env.REACT_APP_STATIC_URL + user.avatar} alt="avatar" />
                                    <span>{user.firstName}{' '}{user.lastName}</span>
                                </div>
                            )
                        })}
                        </>
                    ) : (
                        <span>no online players now</span>
                    )}
                </div>
            </div>
        </div>
        </>
    )
}

export default ChatPage