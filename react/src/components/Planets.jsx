import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

const Planets = (props) => {
    const planet = props.data;

    useEffect(() => {
    }, []);
    return (
        <>
            {
                <div key={planet.id}><Link to={"/planets/" + planet.id}>{planet.name}</Link></div>

            }
        </>
    )
}

export default Planets