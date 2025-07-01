import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

const Characters = () => {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_SWAPI_API_URL + "characters");
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
            <div id="charactersList">
                {
                    characters.map(character => (
                        <div key={character.id}><span key={character.id}><Link to={"/character/" + character.id}>{character.name}</Link></span></div>
                    ))
                }
            </div >
        </>
    )
}

export default Characters