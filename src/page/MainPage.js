import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import site_logo_img from "../assets/logo/logo.png";
import {sendAuthTry} from '../stomp/stompSocketClient'
import MainPageFooter from '../components/footer/MainPageFooter';
import MainPageHeader from '../components/header/MainPageHeader';
import { Link } from 'react-router-dom';
import { getUserAuth } from '../actions/userActions';

const MainPage = () => {

    const {init, code} = useSelector(state => state.authController)

    const dispatch = useDispatch()

    return (
        <>
        <MainPageHeader />
        <div
            className={`flex center column`}>
            <img src={site_logo_img} alt="logo" className="medium_logo" />
            <div className="flex column center"
                 style={{display: `${init ? 'none' : 'flex'}`}}>
                <h2 className="text_center regular_font">
                    Fight, upgrade, become powerfully and be popular.</h2>
                <button className="btn btn_basic btn_auth"
                        onClick={sendAuthTry}>Login through <i className="fa-brands fa-telegram"/> Telegram</button>
            </div>
            <div className="flex column center"
                 style={{display: `${!init ? 'none' : 'flex'}`}}>
                <h2 className="text_center regular_font">Open telegram bot and send code:</h2>
                <h1 className="medium_font" id="login_code">{code}</h1>
                <button className="btn btn_basic btn_auth"
                    onClick={e => window.open('https://t.me/deedeegamebot', '_blank')}>Open telegram bot</button>
                <span className="top_margin" style={{maxWidth: "300px", textAlign: 'center'}}>If you use mobile version and redirect not completed{' '}
                    <span className="h4 decoration" onClick={e => dispatch(getUserAuth())}>click on me</span>
                </span>
            </div>
        </div>
        <MainPageFooter />
        </>
    );
};

export default MainPage;