export function getUser(accessToken) {
    return fetch(
        `${process.env.REACT_APP_AUTH0_AUDIENCE}/user`, { headers: { Authorization: `Bearer ${accessToken}` } }
    )
        .then(res => {
            if (res.status === 200) {
                return (res.json());
            } else {
                return res;
            }
        });
}

export function getUserData(accessToken) {
    return fetch(
        `${process.env.REACT_APP_AUTH0_AUDIENCE}/getUserData`, { headers: { Authorization: `Bearer ${accessToken}` } }
    )
        .then(res => {
            if (res.status === 200) {
                return (res.json());
            } else {
                return res;
            }
        });
}

export function saveUser(accessToken) {

    return fetch(`${process.env.REACT_APP_AUTH0_AUDIENCE}/users`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then(res => {
            if (res.status === 201) {
                return true;
            } else {
                return false;
            }
        });
}

export function deleteUser(accessToken, userId) {

    return fetch(`${process.env.REACT_APP_AUTH0_AUDIENCE}/users/${userId}`, {
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