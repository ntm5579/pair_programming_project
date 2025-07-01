import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

const CharactersSub = (props) => {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_SWAPI_API_URL + `planets/${props.id}/characters`);
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const json_response = await response.json();
                setCharacters(json_response); // assign JSON response to the data variable.
            } catch (error) {
                console.error('Error fetching socks:', error);
            }
        };
        fetchData();
    }, []);
    return (
        <>
            {
                characters.map(character => (
                    <div style={{}} key={character.id}><Link to={"/character/" + character.id}>{character.name}</Link></div>
                ))
            }
        </>
    )
}

export default CharactersSub