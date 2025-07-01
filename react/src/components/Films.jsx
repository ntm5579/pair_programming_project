import { useState, useEffect } from 'react'
import { json, Link, useParams } from "react-router-dom";
import Planet from "./Planet"

const Films = () => {
    const [films, setFilms] = useState([]);
    const [planets, setPlanets] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            //if there are props passed dont make an api call
            try {
                const response = await fetch(import.meta.env.VITE_SWAPI_API_URL + `films/${id}`);

                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const json_response = await response.json();
                setFilms(json_response[0]);
                // assign JSON response to the data variable.
            } catch (error) {
                console.error('Error fetching socks:', error);
            }
            //if there are props passed dont make an api call
            try {
                const response = await fetch(import.meta.env.VITE_SWAPI_API_URL + `films/${id}/planets`);

                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const json_response = await response.json();
                setPlanets(json_response);
                // assign JSON response to the data variable.
            } catch (error) {
                console.error('Error fetching socks:', error);
            }
        };
        fetchData();
    }, []);
    console.log("in films", planets);
    return (
        <>
            <h1>Episode {films.episode_id}: {films.title}</h1>
            <section id="generalInfo">
                <p><span id="director">Director: {films.director}</span></p>
                <p><span id="producer">Producers: {films.producer}</span></p>
                <p><span id="release_date">Release Date: {films.release_date}</span></p>
            </section>
            <section id="opening_crawl_section">{films.opening_crawl}</section>
            <section id="planet_section">
                <h2>Planets</h2>
                <div>{planets.map(planet => (<Planet key={planet.id} data={planet} />)) /*turn this into a map*/}</div>

            </section>
        </> //add the characters and planets
    )
}

export default Films