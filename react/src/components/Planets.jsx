import { useState, useEffect } from 'react'
import { json, Link, useParams } from "react-router-dom";
import CharactersSub from "./CharactersSub";
import FilmSub from "./FilmSub";


const Planets = () => {
    const [planet, setPlanet] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_SWAPI_API_URL + `planets/${id}`);
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const json_response = await response.json();
                setPlanet(json_response[0]); // assign JSON response to the data variable.
            } catch (error) {
                console.error('Error fetching socks:', error);
            }
        };
        fetchData();
    }, []);
    return (
        <>
            <h1 id="name">{planet.name}</h1>
            <section id="generalInfo">
                <p><span>Population: {planet.population}</span></p>
                <p><span>Climate: {planet.climate}</span></p>
                <p><span>Terrain: {planet.terrain}</span></p>
                <p><span>Surface Water: {planet.surface_water}</span></p>
                <p><span>Diameter: {planet.diameter}</span></p>
                <p><span>Rotation Period: {planet.rotation_period}</span></p>
                <p><span>Orbital Period: {planet.orbital_period}</span></p>
                <p><span>Gravity: {planet.gravity}</span></p>
            </section>
            <h2>Films</h2>
            <section ><FilmSub id={id} /></section>
            <h2>Characters</h2>
            <section ><CharactersSub id={id} /></section>
        </>
    )
}

export default Planets