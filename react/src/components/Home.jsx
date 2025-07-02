import Characters from "./Characters";
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

const Home = () => {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_SWAPI_API_URL + `characters`);

                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const json_response = await response.json();
                setCharacters(json_response);
                // assign JSON response to the data variable.
            } catch (error) {
                console.error('Error fetching socks:', error);
            }
        };
        fetchData();

    }, []);
    return (
        <section>
            {characters.map(character => (<Characters key={character.id} data={character} />))}
        </section>
    )
}

export default Home