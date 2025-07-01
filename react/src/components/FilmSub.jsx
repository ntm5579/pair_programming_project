import { useState, useEffect } from 'react'
import { json, Link, useParams } from "react-router-dom";
import Film from "./Film";


const Films = (props) => {
    const [films, setFilms] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            //if there are props passed dont make an api call
            try {
                const response = await fetch(import.meta.env.VITE_SWAPI_API_URL + `planets/${props.id}/films`);

                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const json_response = await response.json();
                setFilms(json_response);
                // assign JSON response to the data variable.
            } catch (error) {
                console.error('Error fetching socks:', error);
            }
        };
        fetchData();
    }, []);
    return (
        <>
            {films.map(film => (<Film key={film.id} data={film} />))}
        </> //add the characters and planets
    )
}

export default Films