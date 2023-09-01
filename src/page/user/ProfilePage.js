import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Header from "../../components/header/Header";
import dmoney_img from '../../assets/money/basic.png'
import dvmoney_img from '../../assets/money/vip.png'
import { setUniqueProduct, unsetUniqueProduct } from '../../actions/userActions';

const ProfilePage = () => {

    const { userInfo } = useSelector(state => state.userInfo)

    const dispatch = useDispatch()

    return (
    <>
        <Header />
        <div className="profile_page under_header">
            <div className="profile_block black_border_basic">
                <div className="profile_products flex column">
                    {userInfo.uniqueProducts.map(product => {
                        return (
                            <div className="product profile_product" key={product.id}>
                                <div className="product_title">
                                    <span className="decoration">{product.title}</span>
                                </div>
                                <div className="product_description">
                                    <span>{product.description}</span>
                                </div>
                                <div className="product_control">
                                    {userInfo.characterStatistic.uniqueProduct ? (
                                        <>
                                        {userInfo.characterStatistic.uniqueProduct.id === product.id ? (
                                            <button className="flex row center btn site_btn"
                                            onClick={e => dispatch(unsetUniqueProduct())}>
                                                Unset
                                            </button>
                                        ) : (
                                            <button className="flex row center btn site_btn"
                                            onClick={e => dispatch(setUniqueProduct(product.id))}>
                                                Set
                                            </button>
                                        )}
                                        </>
                                    ) : (
                                        <button className="flex row center btn site_btn"
                                        onClick={e => dispatch(setUniqueProduct(product.id))}>
                                            Set
                                        </button>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                    {userInfo.uniqueProducts.length === 0 &&
                    <span>You don't have any unique attack.</span>}
                </div>
            </div>
            <div className="profile_block black_border_basic">
                <div className="stat_span">
                    <span className="h3">Rating: <span className="h2">{userInfo.userStatistic.rating}</span></span>
                </div>
                <hr />
                <div className="stat_span flex column">
                    <span className="h3">Win battled: <span className="h2">{userInfo.userStatistic.winBattles}</span></span>
                    <span className="h3">Lose battles: <span className="h2">{userInfo.userStatistic.loseBattles}</span></span>
                </div>
                <hr />
                <div className="stat_span flex row stat_span_balance">
                    <span className="h3">Total win:&nbsp;
                    <span className='h2'>{userInfo.userStatistic.winMoney}</span>
                    <img src={dmoney_img} alt="dmoney"/></span>
                </div>
                <hr />
                <div className="stat_span">
                    <span className="h3">Total win:&nbsp;
                    <span className='h2'>{userInfo.userStatistic.winVipMoney}</span>
                    <img src={dvmoney_img} alt="dmoney"/></span>
                </div>
            </div>
            <div className="profile_block black_border_basic">
                 <div className="character_info flex column center">
                    <img src={`${process.env.REACT_APP_STATIC_URL}${userInfo.deeDeeCharacter.image}`} alt="Poko" />
                    <span className="h2 medium_font">{userInfo.deeDeeCharacter.name}</span>
                </div>
                <hr/>
                <div className="money_span flex row">
                    <div className="money_block flex row center">
                        <span>{userInfo.money}</span>
                        <img src={dmoney_img} alt="dmoney" />
                    </div>
                    <div className="money_block flex row center">
                        <span>{userInfo.vipMoney}</span>
                        <img src={dvmoney_img} alt="dvmoney" />
                    </div>
                </div>
                <hr/>
                <div className="stat_span flex column">
                    <span className="h3">Power: <span className="h2">{userInfo.characterStatistic.power}</span></span>
                    <span className="h3">Speed: <span className="h2">{userInfo.characterStatistic.speed}</span></span>
                    <span className="h3">Health: <span className="h2">{userInfo.characterStatistic.health}</span></span>
                </div>
                <hr/>
                <div className="stat_span flex column">
                    {userInfo.characterStatistic.uniqueProduct ? (
                        <>
                        <span className="product_title decoration">{userInfo.characterStatistic.uniqueProduct.title}</span>
                        <span className="product_description">{userInfo.characterStatistic.uniqueProduct.description}</span>
                        </>
                    ) : (
                        <>
                        <span className="product_title decoration">Not set</span>
                        <span className="product_description">Character don't has any unique attack.</span>
                        </>
                    )}
                </div>
            </div>
        </div>
    </>
    )
}

export default ProfilePage