import React, { useRef, useState } from 'react';
import site_logo_img from "../../assets/logo/logo.png";
import menu_icon from "../../assets/menu/menu_icon.svg";
import {Link, useLocation} from "react-router-dom";
import HeaderDropdown from './HeaderDropdown';
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from '../../actions/userActions'

const Header = () => {

    const { userInfo } = useSelector(state => state.userInfo)

    const userBlockRef = useRef();

    const [dropdown, setDropdown] = useState(false);

    const [mobileMenu, setMobileMenu] = useState(false);

    const location = useLocation();
    const dispatch = useDispatch();

    return (
        <header className="flex row">
            <section className="flex row desktop_header_section">
                <div className="header_left_content flex row">
                    <Link to="/">
                        <img src={site_logo_img} alt="logo" />
                    </Link>
                    {userInfo.deeDeeCharacter &&
                    <div className="header_navigation flex row">
                        <Link to="/battles" 
                            className={`${location.pathname === '/battles' || 'none_decoration'}`}>Battles</Link>
                        <Link to="/market"
                            className={`${location.pathname === '/market' || 'none_decoration'}`}>Market</Link>
                        <Link to="/ratings" 
                            className={`${location.pathname === '/ratings' || 'none_decoration'}`}>Ratings</Link>
                        <Link to="/chat" 
                            className={`${location.pathname === '/chat' || 'none_decoration'}`}>Chat</Link>
                    </div>}
                </div>
                <div className="flex header_right_content">
                    <div className="header_user flex row horizontal_center" ref={userBlockRef}
                    onClick={e => {
                        if(userInfo.deeDeeCharacter) {setDropdown(!dropdown)}
                    }}>
                        <img src={process.env.REACT_APP_STATIC_URL + userInfo.avatar} alt="avatar" />
                        <span className="regular_font">{userInfo.firstName} {userInfo.lastName}</span>
                        {dropdown && <HeaderDropdown parentWidth={userBlockRef.current.offsetWidth} />}
                    </div>
                </div>
            </section>
            <section className="mobile_header_section">
                <div className={`flex row mobile_header_content ${mobileMenu ? 'mobile_header_active' : ''}`}>
                    <div className="logo">
                        <Link to="/">
                            <img src={site_logo_img} alt="logo" />
                        </Link>
                    </div>
                    <div className="flex row horizontal_center mobile_menu_icon"
                    onClick={e => setMobileMenu(!mobileMenu)}>
                        <img src={menu_icon} alt="menu icon" />
                        <span>Menu</span>
                    </div>
                    <div className={`flex ${mobileMenu ? '' : 'none'} column horizontal_center mobile_menu`}>
                        <div className="user flex row horizontal_center">
                            <img src={process.env.REACT_APP_STATIC_URL + userInfo.avatar} alt="avatar" />
                            <span className="regular_font">{userInfo.firstName} {userInfo.lastName}</span>
                        </div>
                        {userInfo.deeDeeCharacter &&
                        <>
                        <div className="nav_item flex row horizontal_center">
                            <Link to="/profile" 
                            className={`${location.pathname === '/profile' || 'none_decoration'}`}>Profile</Link>
                        </div>
                        <div className="nav_item flex row horizontal_center">
                            <Link to="/giveaways" 
                            className={`${location.pathname === '/giveaways' || 'none_decoration'}`}>Giveaways</Link>
                        </div>
                        <div className="nav_item flex row horizontal_center">
                            <Link to="/battles" 
                            className={`${location.pathname === '/battles' || 'none_decoration'}`}>Battles</Link>
                        </div>
                        <div className="nav_item flex row horizontal_center">
                            <Link to="/market" 
                            className={`${location.pathname === '/market' || 'none_decoration'}`}>Market</Link>
                        </div>
                        <div className="nav_item flex row horizontal_center">
                            <Link to="/ratings" 
                            className={`${location.pathname === '/ratings' || 'none_decoration'}`}>Ratings</Link>
                        </div>
                        <div className="nav_item flex row horizontal_center">
                            <Link to="/chat" 
                            className={`${location.pathname === '/chat' || 'none_decoration'}`}>Chat</Link>
                        </div>
                        <div className="nav_item flex row horizontal_center">
                            <Link className="none_decoration"
                                onClick={e => logoutUser()}>Logout</Link>
                        </div>
                        </>}
                    </div>
                </div>
            </section>
        </header>
    );
};

export default Header;