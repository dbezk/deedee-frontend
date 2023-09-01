import React from 'react'
import close_icon from '../../assets/menu/close_icon.svg'
import dmoney_img from '../../assets/money/basic.png'
import dvmoney_img from '../../assets/money/vip.png'
import avatar from '../../assets/avatar.png'
import { useDispatch, useSelector } from 'react-redux'
import { closeBattleModal } from '../../actions/modalActions'
import { joinBattle } from '../../actions/battleActions'

const AcitveGameModal = () => {

    const { battleModalData } = useSelector(state => state.modalController)

    const dispatch = useDispatch()

    return (
        <div className={`full_block flex row center`}>
            <div className="modal_close_icon" 
            onClick={e => dispatch(closeBattleModal())}></div>
            <div className="flex column game_modal">
                <div className="flex row horizontal_center bottom_margin active_game_user">
                    <img src={process.env.REACT_APP_STATIC_URL + battleModalData.creatorInfo.avatar} alt="avatar" />
                    <span className="h3 regular_font decoration">
                        {battleModalData.creatorInfo.firstName}{' '}{battleModalData.creatorInfo.lastName}</span>
                </div>
                <hr />
                <div className="flex row top_margin divided">
                    <div>
                        <span className="h3">Battle bet:</span>
                    </div>
                    <div className="flex row center">
                        <span className="h3">{battleModalData.money || battleModalData.vipMoney}</span>
                        <img src={battleModalData.money ? dmoney_img : dvmoney_img} alt="currency" className="money_block_img"/>
                    </div>
                </div>
                <div className="flex row bottom_margin top_small_margin divided">
                    <div>
                        <span className="h3">Total win:</span>
                    </div>
                    <div className="flex row center">
                        <span className="h3">{battleModalData.money*2 || battleModalData.vipMoney*2}</span>
                        <img src={battleModalData.money ? dmoney_img : dvmoney_img} alt="currency" className="money_block_img"/>
                    </div>
                </div>
                <hr />
                <div className="flex column top_margin bottom_margin divided">
                    <span className="h3 decoration bottom_margin">{battleModalData.creatorInfo.firstName}'s statistic:</span>
                    <div className="flex row">
                        <div>
                            <span className="h3">Power:</span>
                        </div>
                        <div className="flex row center">
                            <span className="h3">{battleModalData.creatorInfo.userStatistic.power}</span>
                        </div>
                    </div>
                    <div className="flex row top_small_margin">
                        <div>
                            <span className="h3">Speed:</span>
                        </div>
                        <div className="flex row center">
                            <span className="h3">{battleModalData.creatorInfo.userStatistic.speed}</span>
                        </div>
                    </div>
                    <div className="flex row top_small_margin">
                        <div>
                            <span className="h3">Health:</span>
                        </div>
                        <div className="flex row center">
                            <span className="h3">{battleModalData.creatorInfo.userStatistic.health}</span>
                        </div>
                    </div>
                    <div className="flex row top_margin">
                        <div>
                            <span className="h3">Rating:</span>
                        </div>
                        <div className="flex row center">
                            <span className="h3">+{battleModalData.creatorInfo.rating}</span>
                        </div>
                    </div>
                    <div className="flex row top_small_margin bottom_margin">
                        <div>
                            <span className="h3">Unique attack:</span>
                        </div>
                        <div className="flex row center">
                            <span className="h3 decoration">
                                {battleModalData.creatorInfo.userStatistic.uniqueProduct ? (
                                    <>{battleModalData.creatorInfo.userStatistic.uniqueProduct.title}</>
                                ) : (
                                    <>Not set</>
                                )}
                            </span>
                        </div>
                    </div>
                </div>
                <button className="flex row center btn site_btn"
                    onClick={e => dispatch(joinBattle(battleModalData.id))}>
                    <span>Join for {battleModalData.money || battleModalData.vipMoney}</span>
                    <img src={battleModalData.money ? dmoney_img : dvmoney_img} alt="currency" />
                </button>
            </div>
        </div>
    )
}

export default AcitveGameModal