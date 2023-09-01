import React from 'react'
import {Link} from "react-router-dom";
import {logoutUser} from '../../actions/userActions'

const HeaderDropdown = ({ parentWidth }) => {
    return (
        <div className="header_user_dropdown" 
                style={{width: parentWidth+'px'}}>
            <div className="dropdown_item">
                <Link to="/profile">Profile</Link>
            </div>
            <hr/>
            <div className="dropdown_item">
                <Link to="/giveaways">Giveaways</Link>
            </div>
            <hr/>
            <div className="dropdown_item">
                <Link 
                    onClick={e => logoutUser()}>Logout</Link>
            </div>
        </div>
  )
}

export default HeaderDropdown