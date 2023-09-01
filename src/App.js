import './App.css';
import './AppAdaptive.css';
import {Route, Routes} from "react-router-dom";
import CharacterChosePage from "./page/user/CharacterChosePage";
import MainPage from "./page/MainPage";
import FullLoading from "./components/loading/FullLoading";
import {useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from 'react';
import {setStompConnection} from './stomp/stompSocketClient';
import MarketPage from './page/user/MarketPage';
import ProfilePage from './page/user/ProfilePage';
import { getCurrentUserInfo } from './actions/userActions';
import ChatPage from './page/user/ChatPage';
import NotificationBlock from './components/notification/NotificationBlock';
import GiveawaysPage from './page/user/GiveawaysPage';
import RatingsPage from './page/user/RatingsPage';
import BattlesPage from './page/user/BattlesPage';
import AcitveGameModal from './components/battles/AcitveGameModal';
import BattlePage from './page/user/BattlePage';
import NotFoundPage from './page/NotFoundPage';
import AboutPage from './page/AboutPage';

function App() {

    const { userInfo } = useSelector(state => state.userInfo)
    const { battleModalOpen } = useSelector(state => state.modalController)

    const [connection, setConnection] = useState(false)
    const [init, setInit] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if(!connection) {
            setConnection(setStompConnection(dispatch))
        } else {
            if(userInfo && !init) {
                dispatch(getCurrentUserInfo(true))
                setInit(true)
            }
        }
    }, [connection])

    return (
        <>
            <FullLoading />
            <NotificationBlock />
            {userInfo ? (
                <main className="page_container flex column">
                {!userInfo.deeDeeCharacter &&
                <>
                    <Routes>
                        <Route exact path="/" element={<CharacterChosePage />} />
                        <Route exact path="*" element={<NotFoundPage />} />
                    </Routes>
                </>}
                {userInfo.deeDeeCharacter &&
                <>
                    {battleModalOpen && <AcitveGameModal />}
                    <Routes>
                        <Route exact path="/ratings" element={<RatingsPage />} />
                        <Route exact path="/giveaways" element={<GiveawaysPage />} />
                        <Route exact path="/chat" element={<ChatPage />} />
                        <Route exact path="/market" element={<MarketPage />} />
                        <Route exact path="/profile" element={<ProfilePage />} />
                        <Route exact path="/battle/:battleId" element={<BattlePage />} />
                        <Route exact path="/battles" element={<BattlesPage />} />
                        <Route exact path="/" element={<BattlesPage />} />
                        <Route exact path="*" element={<NotFoundPage />} />
                    </Routes>
                </>}
                </main>
            ): (
                <main className="page_container flex column center">
                <Routes>
                    <Route exact path="/about" element={<AboutPage />} />
                    <Route exact path="/" element={<MainPage />} />
                    <Route exact path="*" element={<NotFoundPage />} />
                </Routes>
                </main>
            )}
        </>
    );
}

export default App;
