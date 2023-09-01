import React from 'react'
import img_404 from '../assets/logo/logo_404.png'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
    return (
        <div className="flex column center full_section">
            <img src={img_404} alt="not found" />
            <span className="h3 top_margin">Go to{' '}
            <Link to="/">Main page</Link></span>
        </div>
    )
}

export default NotFoundPage