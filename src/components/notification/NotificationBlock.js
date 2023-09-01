import React from 'react'
import Notification from './Notification';
import { useSelector } from 'react-redux';

const NotificationBlock = () => {

    const { notifications } = useSelector(state => state.notificationsController)

    return (
        <div className="flex column horizontal_center notifications_block">
            <div className="flex row notifications">
                {notifications.map(notification => {
                    return (
                        <Notification key={notification.id}
                            id={notification.id}
                            title={notification.title} 
                            text={notification.text} />
                    )
                })}
            </div>
        </div>
    )
}

export default NotificationBlock