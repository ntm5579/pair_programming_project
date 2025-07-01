import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

const Planet = (props) => {
    const planet = props.data;

    useEffect(() => {
    }, []);
    return (
        <>
            {
                <div key={planet.id}><Link to={"/planet/" + planet.id}>{planet.name}</Link></div>

            }
        </>
    )
}

export default Planet