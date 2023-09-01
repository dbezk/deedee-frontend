import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import Header from "../../components/header/Header";
import { useDispatch } from 'react-redux';
import {getAllCharacters} from '../../actions/characterActions'
import {chooseCharacter} from '../../actions/userActions'

const CharacterChosePage = () => {

    const { charactersList } = useSelector(state => state.chooseCharactersController)

    const dispatch = useDispatch()

    useEffect(() => {
        if(charactersList.length === 0) {
            dispatch(getAllCharacters())
        }
    }, [charactersList])

    return (
    <>
        <Header />
        <section className="under_header flex column horizontal_center">
            <span className="h1 medium_font">Choose character</span>
            <span className="h3 regular_font">and start your road...</span>
            <div className="flex row horizontal_center choose_characters_block between">
                {charactersList.map(c => {
                    return (
                        <div className="start_character_block" key={c.id}
                            onClick={e => dispatch(chooseCharacter(c.id))}>
                            <div className="start_character_img flex column center">
                                <img src={process.env.REACT_APP_STATIC_URL+c.image} alt="Poko" />
                                <span className="h2 medium_font">{c.name}</span>
                            </div>
                            <div className="start_character_stat flex column">
                                <span className="h3">Power: <span className="h2">{c.power}</span></span>
                                <span className="h3">Speed: <span className="h2">{c.speed}</span></span>
                                <span className="h3">Health: <span className="h2">{c.health}</span></span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    </>
    );
};

export default CharacterChosePage;