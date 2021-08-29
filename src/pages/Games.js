import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import * as gameData from "../api/games";
import CardDeck from "react-bootstrap/CardDeck";
import GameCard from "../components/GameCard";
import * as userData from "../api/users";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function Games() {
  const { getAccessTokenSilently, user } = useAuth0();
  const [accessToken, setAccessToken] = useState("");
  const [games, setGames] = useState(undefined);
  const [userr, setUserr] = useState(undefined);
  const history = useHistory();


  useEffect(() => {
    if (!games) {
      gameData.getGames().then(res => setGames(res)).catch(err => console.log(err));
    }

    if (user && !userr) {
      getAccessTokenSilently()
        .then((accessToken) => {
          userData
            .getUser(accessToken)
            .then((profile) => {
              setAccessToken(accessToken);
              setUserr(profile);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  }, [user, getAccessTokenSilently, games, userr]);

  const deleteGame = (id) => {
    gameData.deleteGame(accessToken, id).then(res => {
      history.go(0);
    }).catch((error) => {
      alert(`Could not delete product: ${error.message}`);
    });
  };

  return (
    <>
      {userr && userr.isAdmin === 0 &&
        <Link to={`/addGame`}>
          <Button variant="success">+ Add Game</Button>
        </Link>
      }
      {userr ? (
        <>
          <h2>Your Games</h2>
          <CardDeck>{
            games.filter(r => r.created_by === userr.id).map((m, i) => <GameCard {...m} canDelete={true} canEdit={true} onDelete={deleteGame} key={i} />)
          }</CardDeck>
          <h2>Other Games</h2>
          <CardDeck>{games.filter(r => r.created_by !== userr.id).map((m, i) => <GameCard {...m} canDelete={userr.isAdmin === 1} onDelete={deleteGame} key={i} />)
          }</CardDeck>
        </>) :
        <CardDeck>{games && games.map((m, i) => <GameCard {...m} key={i} />)}</CardDeck>

      }
    </>
  );
}