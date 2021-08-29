import * as gameData from "../api/games";
import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';



export default function GameInfo(props) {
    const [game, setGame] = useState({});

    useEffect(() => {
        gameData.getGameById(props.match.params.id).then(res => setGame(res)).catch(err => console.log(err));
    }, [props.match.params.id]);

    return (
        <>
            {game ? <div>
                <div className="infoBox">
                    <div><img src={game.image ? `/images/${game.image}` : `/images/noimagefound.png`} className="infoPicture" alt=""></img></div>
                    <div>
                        <h2>{game.name}</h2>
                        <hr></hr>
                        <p>{game.description}</p>
                    </div>
                </div>
            </div> : <></>}
        </>
    );
}