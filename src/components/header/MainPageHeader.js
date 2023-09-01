import React from 'react'
import Cleek_img from '../../assets/characters/Cleek.svg'
import Poko_img from '../../assets/characters/Poko.svg'
import {Link, useLocation} from "react-router-dom";

const MainPageHeader = () => {

    const location = useLocation();

    return (
        <header className="flex row center main_page_header">
            <span>Hi, I'm {location.pathname === '/about' ? 'Poko' : 'Cleek'}</span>
            <img src={location.pathname === '/about' ? Poko_img : Cleek_img} alt="deedee character" />
            {location.pathname === '/about' ? (
                <Link to="/">Home page</Link>
            ) : (
                <Link to="/about">Read me page</Link>
            )}
            
        </header>
    )
}

export default MainPageHeader