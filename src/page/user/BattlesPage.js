import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import dmoney_img from '../../assets/money/basic.png'
import dvmoney_img from '../../assets/money/vip.png'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ActiveBattles from '../../components/battles/ActiveBattles'
import { newNotification } from '../../actions/noitifcationActions'
import { createNewBattle } from '../../actions/battleActions'

const BattlesPage = () => {

    const { userInfo } = useSelector(state => state.userInfo)

    const [activeTab, setActiveTab] = useState(1)

    const [newBattleData, setNewBattleData] = useState({
        bet: null,
        money: false,
        vipMoney: false
    })

    const location = useLocation();
    const dispatch = useDispatch();

    const createBattle = () => {
        if(parseInt(newBattleData.bet) || parseInt(newBattleData.bet) === 0) {
            if(newBattleData.money || newBattleData.vipMoney) {
                dispatch(createNewBattle(newBattleData.money ? newBattleData.bet : null, 
                    newBattleData.vipMoney ? newBattleData.bet : null))
            } else {
                dispatch(newNotification('Error', 'Choose a battle currency.'))
            }
        } else {
            dispatch(newNotification('Error', 'Enter a valid bet.'))
        }
    }

    useEffect(() => {
        if(location.pathname === '/battles') {
            setActiveTab(2)
        } else {
            setActiveTab(1)
        }
    }, [location])

    return (
        <>
        <Header />
        <section className="under_header flex column horizontal_center 
            black_border_basic full_section">
                <div className="section_header flex row between divided_section_header">
                    <div className="left flex row">
                        <div className="money_block flex row center vertical_center">
                            <span>{userInfo.money}</span>
                            <img src={dmoney_img} alt="dmoney" />
                        </div>
                        <div className="money_block flex row center vertical_center">
                            <span>{userInfo.vipMoney}</span>
                            <img src={dvmoney_img} alt="dvmoney" />
                        </div>
                    </div>
                    <div className="right flex row center">
                        <Link
                            className={`${activeTab === 1 || 'none_decoration'}`}
                            to="/">New battle</Link>
                        <Link
                            className={`${activeTab === 2 || 'none_decoration'}`}
                            to="/battles">Active battles</Link>
                    </div>
                </div>
                <div className="section_info_span">
                    {activeTab === 1 ? (
                        <span className="h3">Each victory gives +3 to the rating. Before create battle go to Profile page and set unique attack if you have.</span>
                    ) : (
                        <span className="h3">Click on the game block to get information about the opponent and the battle.</span>
                    )}
                </div>
                {activeTab === 1 ? (
                    <section className="flex row create_game_section">
                        <div className="flex column create_game_block">
                            <div className="flex row battle_bet_block">
                                <div className="flex column item_block input_block">
                                    <span>Place bet:</span>
                                    <input type="text" placeholder="100" maxLength={5}
                                    onChange={e => setNewBattleData({...newBattleData, bet: parseInt(e.target.value) || 0})}/>
                                </div>
                                <div className="flex column item_block currency_block">
                                    <span>Choose a currency:</span>
                                    <div className="flex row currencies">
                                        <img src={dmoney_img} alt="dmoney" 
                                        className={`${newBattleData.money ? 'active': ''}`}
                                        onClick={e => setNewBattleData({...newBattleData, vipMoney: false, money: true})}/>
                                        <img src={dvmoney_img} alt="dvmoney" 
                                        className={`${newBattleData.vipMoney ? 'active': ''}`}
                                        onClick={e => setNewBattleData({...newBattleData, vipMoney: true, money: false})}/>
                                    </div>
                                </div>
                            </div>
                            <div className="flex row battle_info_block">
                                <div className="flex column item_block currency_block">
                                    <span>Battle bet:</span>
                                    {(!newBattleData.vipMoney && !newBattleData.money) && 
                                    <span>Not set</span>}
                                    {(newBattleData.money || newBattleData.vipMoney) &&
                                    <div className="flex row horizontal_center gap">
                                        <span className="h2">{newBattleData.bet || 0}</span>  
                                        {newBattleData.money ? (
                                            <img src={dmoney_img} alt="dmoney" />
                                        ) : (
                                            <img src={dvmoney_img} alt="dvmoney" />
                                        )}
                                    </div>}
                                </div>
                                <div className="flex column item_block currency_block">
                                    <span>Battle win amount:</span>
                                    {(!newBattleData.vipMoney && !newBattleData.money) && 
                                    <span>Not set</span>}
                                    {(newBattleData.money || newBattleData.vipMoney) &&
                                    <div className="flex row horizontal_center gap">
                                        <span className="h2">{newBattleData.bet*2}</span>  
                                        {newBattleData.money ? (
                                            <img src={dmoney_img} alt="dmoney" />
                                        ) : (
                                            <img src={dvmoney_img} alt="dvmoney" />
                                        )}
                                    </div>}
                                </div>
                            </div>
                            <button className="btn site_btn"
                            onClick={createBattle}>Create battle</button>
                        </div>
                        <div className="create_game_block">
                        <div className="stat_span flex column">
                            <span className="h2 decoration">Your character statistic:</span>
                            <br />
                            <span className="h3">Power: <span className="h2">{userInfo.characterStatistic.power}</span></span>
                            <span className="h3">Speed: <span className="h2">{userInfo.characterStatistic.speed}</span></span>
                            <span className="h3">Health: <span className="h2">{userInfo.characterStatistic.health}</span></span>
                            <br />
                            <span className="h3">Unique attack: <span className="h2 decoration">
                                {userInfo.characterStatistic.uniqueProduct ? (
                                    <>{userInfo.characterStatistic.uniqueProduct.title}</>
                                ) : (
                                    <>Not set</>
                                )}
                            </span></span>
                        </div>
                        </div>
                    </section>
                ) : (
                    <ActiveBattles />
                )}
            </section>
        </>
    )
}

export default BattlesPage