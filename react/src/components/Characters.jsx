import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

const Characters = (props) => {
    const character = props.data;
    console.log(character);
    useEffect(() => {
    }, []);
    return (
        <>
            <div id="charactersList" key={character.id}><span key={character.id}><Link to={"/characters/" + character.id}>{character.name}</Link></span></div>
        </>
    )
}

export default Characters