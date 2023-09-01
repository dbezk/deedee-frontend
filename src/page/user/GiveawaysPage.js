import React, { useEffect, useState } from 'react'
import dmoney_img from '../../assets/money/basic.png'
import dvmoney_img from '../../assets/money/vip.png'
import Header from '../../components/header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { claimMoneyGiveaway, claimVipMoneyGiveaway, getMoneyGiveaways, getVipMoneyGiveaways } from '../../actions/giveawayActions'


const GiveawaysPage = () => {

    const dispatch = useDispatch()

    const { userInfo } = useSelector(state => state.userInfo)
    const { moneyGiveawayList,
        vipMoneyGiveawayList } = useSelector(state => state.giveawayController)

    const [init, setInit] = useState(false)

    useEffect(() => {
        if(!init) {
            dispatch(getMoneyGiveaways())
            dispatch(getVipMoneyGiveaways())
            setInit(true)
        }
    }, [])

    return (
        <>
        <Header />
        <div className="under_header full_section flex row giveaways_page">
            <div className="giveaway_block black_border_basic">
                <div className="giveaway_header">
                    <div className="flex row horizontal_center money_block">
                        <span>{userInfo.money}</span>
                        <img src={dmoney_img} alt="money" />
                    </div>
                </div>
                <div className="flex column horizontal_center giveaways_available">
                    {moneyGiveawayList.map(giveaway => {
                        return (
                            <div className="giveaway" key={giveaway.id}>
                                <div className="giveaway_title">
                                    <span className="decoration">{giveaway.title}</span>
                                </div>
                                <div className="giveaway_description">
                                    <span>{giveaway.description}</span>
                                </div>
                                <div className="giveaway_control">
                                    <button className="flex row center btn site_btn"
                                    onClick={e => dispatch(claimMoneyGiveaway(giveaway.id))}>
                                        <span>Claim</span>
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="giveaway_block black_border_basic">
                <div className="giveaway_header">
                    <div className="flex row horizontal_center money_block">
                        <span>{userInfo.vipMoney}</span>
                        <img src={dvmoney_img} alt="money" />
                    </div>
                </div>
                <div className="flex column horizontal_center giveaways_available">
                    {vipMoneyGiveawayList.map(giveaway => {
                        return (
                            <div className="giveaway" key={giveaway.id}>
                                <div className="giveaway_title">
                                    <span className="decoration">{giveaway.title}</span>
                                </div>
                                <div className="giveaway_description">
                                    <span>{giveaway.description}</span>
                                </div>
                                <div className="giveaway_control">
                                    <button className="flex row center btn site_btn"
                                    onClick={e => dispatch(claimVipMoneyGiveaway(giveaway.id))}>
                                        <span>Claim</span>
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
        </>
    )
}

export default GiveawaysPage