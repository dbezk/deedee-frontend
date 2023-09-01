import React, { useEffect } from 'react'
import avatar_img from '../../assets/avatar.png'
import Header from '../../components/header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { getRatingsData } from '../../actions/ratingActions'

const RatingsPage = () => {

    const { ratingList } = useSelector(state => state.ratingsData)

    const dispatch = useDispatch()

    useEffect(() => {
        if(ratingList.length === 0) {
            dispatch(getRatingsData())
        }
    }, [])

    return (
        <>
        <Header />
        {ratingList.length !== 0 &&
        <div className="full_section under_header flex column">
            <span className="h2">Top 3:</span>
            {ratingList.slice(0, 3).map(rating => {
                return (
                <div key={rating.ratingPosition} className="flex row horizontal_center between rating_user black_border_basic">
                    <div className="flex row horizontal_center">
                        <span className="h3">#{rating.ratingPosition}</span>
                        <img src={process.env.REACT_APP_STATIC_URL + rating.avatar} alt="user avatar"/>
                        <span className="h3 name">
                            {rating.firstName}{' '}{rating.lastName}
                        </span>
                    </div>
                    <span className="h2">+{rating.rating}</span>
                </div>
                )
            })}
            <span className="h2 under_header">Your position:</span>
            <div className="flex row horizontal_center between rating_user black_border_basic">
                <div className="flex row horizontal_center">
                    <span className="h3">
                        #{ratingList[ratingList.length-1].ratingPosition}
                    </span>
                    <img src={process.env.REACT_APP_STATIC_URL + ratingList[ratingList.length-1].avatar} alt="user avatar"/>
                    <span className="h3 name">
                        {ratingList[ratingList.length-1].firstName}
                        {' '}
                        {ratingList[ratingList.length-1].lastName}
                    </span>
                </div>
                <span className="h2">+{ratingList[ratingList.length-1].rating}</span>
            </div>
        </div>}
        </>
    )
}

export default RatingsPage