import React from 'react';
import {useSelector} from "react-redux";
import short_logo_img from "../../assets/logo/short_logo.png";

const FullLoading = () => {

    const { fullLoading } = useSelector(state => state.siteLoading)

    return (
        <div className={`full_block ${fullLoading ? 'flex' : 'none'} row center`}>
            <div className="big_loading_block">
                <img src={short_logo_img} alt="loading logo"/>
            </div>
        </div>
    );
};

export default FullLoading;