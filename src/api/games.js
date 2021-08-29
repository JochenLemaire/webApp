// import { useAuth0 } from "@auth0/auth0-react";
const endpoint = process.env.REACT_APP_AUTH0_AUDIENCE;

export function getGames() {
    return fetch(`${endpoint}/games`)
        .then(res => {
            return (res.json());
        })
        .catch(err => {
            alert(err);
        });
}

export function getGameById(id) {
    return fetch(`${endpoint}/games/${id}`)
        .then(res => {
            return (res.json());
        })
        .catch(err => {
            alert(err);
        });
}

export function createGame(accessToken, game){
    return fetch(`${process.env.REACT_APP_AUTH0_AUDIENCE}/games`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "content-type" : "application/json",
        },
        body: JSON.stringify(game)
    })
        .then(res => {
            if (res.status === 201) {
                return res.headers.get("Location");
            } else {
                return false;
            }
        });
}

export function editGame(accessToken, game, id){
    return fetch(`${process.env.REACT_APP_AUTH0_AUDIENCE}/games/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "content-type" : "application/json",
        },
        body: JSON.stringify(game)
    })
        .then(res => {
            if (res.status === 200) {
                return true;
            } else {
                return false;
            }
        });
}

export function deleteGame(accessToken, id){
    return fetch(`${process.env.REACT_APP_AUTH0_AUDIENCE}/games/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then(res => {
            if (res.status === 200) {
                return true;
            } else {
                return false;
            }
        });
}