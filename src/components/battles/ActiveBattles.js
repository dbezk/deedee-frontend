import React from 'react'
import dmoney_img from '../../assets/money/basic.png'
import dvmoney_img from '../../assets/money/vip.png'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getActiveBattleInfo, joinBattle } from '../../actions/battleActions'

const ActiveBattles = () => {

    const { userInfo } = useSelector(state => state.userInfo)
    const { activeBattles } = useSelector(state => state.battleController)

    const dispatch = useDispatch()
    const navigate = useNavigate();

    return (
        <div className="market_products">
            {activeBattles.length !== 0 ? (
                <>
                    {activeBattles.map(battle => {
                        return (
                            <div className="product" key={battle.battleId}>
                                <div className="flex row horizontal_center active_game_user">
                                    <img src={process.env.REACT_APP_STATIC_URL + battle.battleCreator.avatar} alt="avatar" />
                                    <span className="h3 regular_font decoration">
                                        {battle.battleCreator.firstName}{' '} {battle.battleCreator.lastName}</span>
                                </div>
                                {battle.battleCreator.id === userInfo.id ? (
                                    <div className="product_control">
                                        <button className="flex row center btn site_btn"
                                            onClick={e => navigate('/battle/'+battle.battleId)}>
                                            <span>Open battle</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="product_control">
                                        <button className="flex row center btn site_btn"
                                            onClick={e => dispatch(joinBattle(battle.battleId))}>
                                            <span>Bet {battle.money || battle.vipMoney}</span>
                                            <img src={battle.money ? dmoney_img : dvmoney_img} alt="currency" />
                                        </button>
                                    </div>
                                )}
                                <div className="product_control">
                                    <button className="flex row center btn site_btn"
                                        onClick={e => dispatch(getActiveBattleInfo(battle.battleId))}>
                                        <span>Battle info</span>
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </>
            ) : (
                <span>Games list is empty.</span>
            )}
        </div>    
    )
}

export default ActiveBattles