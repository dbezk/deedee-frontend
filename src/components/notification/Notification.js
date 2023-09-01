import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { hideNotification } from '../../actions/noitifcationActions';

const Notification = ({ id, title, text}) => {

    const [closed, setClosed] = useState(false);

    const dispatch = useDispatch()

    return (
        <div className={`notification ${closed ? 'none' : 'flex'} column black_border_basic`}
            onClick={e => dispatch(hideNotification(id))}>
            <span className="h3 decoration">{title}</span>
            <span>{text}</span>
        </div>
    )
}

export default Notification