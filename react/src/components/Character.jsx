import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import Film from "./Film";

const Character = () => {
    const [character, setCharacter] = useState(0);
    const [planet, setPlanet] = useState(0);
    const [films, setFilms] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async (append = "") => {
            try {
                const response = await fetch(import.meta.env.VITE_SWAPI_API_URL + `characters/${id}` + append);

                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const json_response = await response.json();
                if (append === "") {
                    setCharacter(json_response[0]);
                }
                else if (append === "/planet") {
                    setPlanet(json_response[0]);
                }
                else if (append === "/films") {
                    setFilms(json_response);
                }
                // assign JSON response to the data variable.
            } catch (error) {
                console.error('Error fetching socks:', error);
            }
        };
        fetchData();
        fetchData("/planet");
        fetchData("/films");

    }, []);
    return (
        <>
            <h1 id="name">{character.name}</h1>
            <section id="generalInfo">
                <p><span id="birth_year">Birthyear: {character.birth_year}</span></p>
                <p><span id="height">Height: {character.height}</span></p>
                <p><span id="mass">Mass: {character.mass}</span></p>
            </section>
            <section id="planets">
                Homeworld: <Link to={"/planet/" + planet.id}>{planet.name}</Link>
            </section>

            <section id="films">
                <div>Films appeared in: {films.map(film => (<Film key={film.id} data={film} />)) /*turn this into a map*/}</div>
            </section>




        </>
    )
}

export default Character