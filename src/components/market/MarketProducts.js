import React from 'react'
import dmoney_img from '../../assets/money/basic.png'
import dvmoney_img from '../../assets/money/vip.png'
import { useDispatch } from 'react-redux'
import { buyStaticProduct, buyUniqueProduct } from '../../actions/marketActions'

const MarketProducts = ({ type, products }) => {

    const dispatch = useDispatch()

    const buyProduct = (id) => {
        if(type === 1) {
            dispatch(buyStaticProduct(id))
        }
        if(type === 2) {
            dispatch(buyUniqueProduct(id))
        }
    }

    return (
        <div className="market_products">
            {products.length !== 0 ? (
                <>
                {products.map(product => {
                    return (
                        <div className="product" key={product.id}>
                            <div className="product_title">
                                <span className="decoration">{product.title}</span>
                            </div>
                            <div className="product_description">
                                <span>{product.description}</span>
                            </div>
                            <div className="product_control">
                                <button className="flex row center btn site_btn"
                                    onClick={e => buyProduct(product.id)}>
                                    <span>{product.money || product.vipMoney}</span>
                                    {product.money && <img src={dmoney_img} alt="dmoney" />}
                                    {product.vipMoney && <img src={dvmoney_img} alt="dvmoney" />}
                                </button>
                            </div>
                        </div>
                    )
                })}
                </>
            ) : (
                <span>Market is empty.</span>
            )}
        </div>
    )
}

export default MarketProducts