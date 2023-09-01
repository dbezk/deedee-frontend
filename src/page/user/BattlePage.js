import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import avatar from '../../assets/avatar.png'
import heart from '../../assets/heart.svg'
import { useParams } from 'react-router-dom'
import { getBattle, setStompConnection } from '../../stomp/stompSocketClient'
import { useDispatch, useSelector } from 'react-redux'

const BattlePage = () => {

    const { stompClient } = useSelector(state => state.stompController)
    const { currentGameData } = useSelector(state => state.battleController)

    const [battle, setBattle] = useState({
        eventsSize: null,
        creatorHealth: 0,
        opponentHealth: 0,
        currentEventIndex: 0,
        creatorStep: null,
        events: [],
        creatorWinner: null,
        end: false
    })
    const [event, setEvent] = useState('')

    const { battleId } = useParams()

    const dispatch = useDispatch();

    useEffect(() => {
        if(currentGameData) {
            setBattle({
                ...battle,
                eventsSize: currentGameData.battleEventList.length,
                creatorHealth: currentGameData.creator.startHealth,
                opponentHealth: currentGameData.opponent ? currentGameData.opponent.startHealth : 0,
                creatorStep: true,
                events: currentGameData.battleEventList
            })
        } else {
            setStompConnection(dispatch, battleId)
        }
    }, [currentGameData])

    useEffect(() => {
        if(battle.currentEventIndex === battle.events.length-1) {
            const winnerFirstName = currentGameData.battleWinner === 'CREATOR' ? 
                currentGameData.creator.firstName : currentGameData.opponent.firstName;
            const winnerLastName = currentGameData.battleWinner === 'CREATOR' ? 
                currentGameData.creator.lastName || '' : currentGameData.opponent.lastName || '';
            setEvent(`${winnerFirstName} ${winnerLastName} won the battle!`)
            if(!battle.end) {
                setBattle({...battle, end: true})
            }
        } else if(battle.currentEventIndex < battle.events.length) {
            setTimeout(() => {
                const newCurrentIndex = battle.currentEventIndex + 1;
                setBattle({...battle, 
                    creatorStep: !battle.creatorStep, 
                    currentEventIndex: newCurrentIndex,
                    opponentHealth: battle.events[newCurrentIndex].opponentHealth,
                    creatorHealth: battle.events[newCurrentIndex].creatorHealth
                })
            }, 2000)
            setEvent(`${battle.creatorStep ? currentGameData.creator.firstName : currentGameData.opponent.firstName} 
            ${battle.events[battle.currentEventIndex].eventType === 'HEAL' ? 'heals' : 'attacks'}, 
            ${battle.events[battle.currentEventIndex].eventType === 'HEAL' ? '+' : '-'}
            ${battle.events[battle.currentEventIndex].eventType === 'HEAL' ? 
            battle.events[battle.currentEventIndex].healCount : battle.events[battle.currentEventIndex].damageCount}
            HP`)
        }
    }, [battle])

    return (
        <>
            <Header />
            {battle.eventsSize &&
            <div className="flex column center battle_block">
                <div className="flex row battle_players">
                    {battle.end && 
                    <div className="flex column center player">
                        <span className="h2">Winner</span>
                        <img src={process.env.REACT_APP_STATIC_URL + (currentGameData.battleWinner === 'CREATOR' ? currentGameData.creator.avatar : currentGameData.opponent.avatar)} 
                        alt="creator avatar"
                        className="avatar active" />
                        <div className="flex row top_margin player_health">
                            <span className="h2">{currentGameData.battleWinner === 'CREATOR' ? battle.creatorHealth : battle.opponentHealth}</span>
                            <img src={heart} alt="winner health img" />
                        </div>
                    </div>}
                    <>
                    {battle.currentEventIndex !== battle.events.length-1 && 
                        <>
                            {currentGameData.opponent &&
                            <div className="flex column center player">
                                <span className="h2">Opponent</span>
                                <img src={process.env.REACT_APP_STATIC_URL + currentGameData.opponent.avatar} 
                                alt="creator avatar"
                                className={`avatar ${battle.creatorStep ? '' : 'active'}`} />
                                <div className="flex row top_margin player_health">
                                    <span className="h2">{battle.opponentHealth}</span>
                                    <img src={heart} alt="opponent health img" />
                                </div>
                            </div>}
                            <div className="flex column player center">
                                <span className="h2">Creator</span>
                                <img src={process.env.REACT_APP_STATIC_URL + currentGameData.creator.avatar} 
                                alt="creator avatar"
                                className={`avatar ${battle.creatorStep ? 'active' : ''}`} />
                                <div className="flex row top_margin player_health">
                                    <span className="h2">{battle.creatorHealth}</span>
                                    <img src={heart} alt="creator health img" />
                                </div>
                            </div>
                        </>
                    }
                    </> 
                </div>
                <div className="flex row center battle_event">
                    {currentGameData.battleEventList.length !== 0 ? (
                        <span className="h4">{event}</span>
                    ) : (
                        <span className="h4">Waiting for opponent...</span>
                    )}
                </div>    
            </div>}
            <>
            {!battle.eventsSize &&
                <div className="flex column center full_section">
                    <span className="h3">Game not found or closed.</span>
                </div>
            }
            </>
        </>
    )
}

export default BattlePage