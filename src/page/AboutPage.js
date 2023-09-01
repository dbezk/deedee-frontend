import React from 'react'
import MainPageFooter from '../components/footer/MainPageFooter';
import MainPageHeader from '../components/header/MainPageHeader';
import { Link } from 'react-router-dom';

const AboutPage = () => {
    return (
        <>
            <MainPageHeader />
            {/* <div className="flex row gap info_block">
                <span className="h4 decoration">English</span>
                <span className="h4">Русский</span>
            </div> */}
            <div className="flex column under_header overflow">
                <div className="flex column top_margin info_block">
                    <span className="h3 bold_font">About DeeDee</span>
                    <span className="h4 regular_font">DeeDee is an online browser game in which users can fight against each other, choose and pump up characters, communicate with each other and track the rating of other players.</span>
                </div>
                <div className="flex column top_margin info_block">
                    <span className="h3 bold_font">DeeDee technologies</span>
                    <span className="h4 regular_font">The project is written in Java using the Spring Framework, PostgreSQL, Apache Kafka, etc. The project does not have a github repository and has closed source code.</span>
                </div>
                <div className="flex column top_margin info_block">
                    <span className="h3 bold_font">Terms of use & Privacy policy</span>
                    <span className="h4 regular_font">After the initial authorization user data obtained from the chat Telegram, such as: name, surname, avatar sent by the user and chat id - will be saved on the server. By using DeeDee you consent to the storage of these data. DeeDee will never share your personal information with other people.</span>
                </div>
                <div className="flex column top_margin info_block">
                    <span className="h3 bold_font">Copyright</span>
                    <span className="h4 regular_font">Although the project is closed-source, any part of the content used on the site must not be distributed elsewhere. For example, images of characters.</span>
                </div>
                <div className="flex column top_margin info_block">
                    <span className="h3 bold_font">Disclaimer</span>
                    <span className="h4 regular_font">In-game currency has no tangible value and all transactions or purchases made on the project do not provide any financial benefit to the creator. Messages and avatars of users are either taken from the Internet or created directly by users, so the author of the project is not responsible for the material posted on the site. The site was created for entertainment purposes only.</span>
                </div>
            </div>
        </>
    )
}

export default AboutPage