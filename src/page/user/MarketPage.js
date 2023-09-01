import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import dmoney_img from '../../assets/money/basic.png'
import dvmoney_img from '../../assets/money/vip.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import MarketProducts from '../../components/market/MarketProducts'
import { loadAllStaticProducts, loadAllUniqueProducts } from '../../actions/marketActions'

const MarketPage = () => {

    const { userInfo } = useSelector(state => state.userInfo)
    const { staticProductsList,
        vipProductsList } = useSelector(state => state.marketController)

    const [activeTab, setActiveTab] = useState(1)

    const dispatch = useDispatch()

    useEffect(() => {
        if(staticProductsList.length === 0 || vipProductsList.length === 0) {
            dispatch(loadAllStaticProducts())
            dispatch(loadAllUniqueProducts())
        }
    }, [])

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
                            onClick={e => setActiveTab(1)}>Boosters</Link>
                        <Link
                            className={`${activeTab === 2 || 'none_decoration'}`}
                            onClick={e => setActiveTab(2)}>Attacks</Link>
                    </div>
                </div>
                <div className={`section_info_span ${activeTab === 2 || 'none'}`}>
                    <span className="h3">VIP attacks used in battles and add your character new skill. 
                    You can choose only one VIP attack, but buy mote than one.</span>
                </div>
                <MarketProducts 
                    type={activeTab}
                    products={activeTab === 1 ? staticProductsList : vipProductsList} />
            </section>
        </>
    )
}

export default MarketPage