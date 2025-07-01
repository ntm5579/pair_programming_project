import { useState, useEffect } from 'react'
import { json, Link, useParams } from "react-router-dom";

const Film = (props) => {
    const [film, setFilm] = useState([]);
    useEffect(() => {
        setFilm(props.data); //might need to change this to whatever you pass in the parent component
        console.log(film);
    })
    return (
        <>
            <Link to={"/films/" + film.id}>{film.title}</Link>
        </>
    )
}

export default Film