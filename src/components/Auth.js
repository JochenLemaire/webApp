import { useAuth0 } from "@auth0/auth0-react";
import * as userData from "../api/api_user";
import { useHistory } from "react-router-dom";
import React, { useState } from 'react';
import Button from "react-bootstrap/Button";


export default function SaveUser() {
    const { getAccessTokenSilently, isLoading, loginWithRedirect, logout } = useAuth0();
    const history = useHistory();
    const [verified, setVerified] = useState(true);


    if (!isLoading) {
        getAccessTokenSilently().then(accessToken => {
            userData.getUser(accessToken).then(res => {
                if (res.status) {

                    //als er een statuscode wordt teruggegeven is het foutgelopen, als status 200 is krijg je enkel response zonder de statuscode van 200
                    userData.saveUser(accessToken)
                        .then(res => {
                            history.push("/");
                        }).catch(e => alert("An error occured while creating user account"));
                } else {
                    history.push("/");
                }
            })
                .catch(err => {
                    console.log(err);
                });
        }).catch((err) => {
            console.log(err);
            setVerified(false);
            setTimeout(() => {
                logout();
            }, 5000);
        });
    }
    return (
        <div>
            {!verified ?
                <div>
                    <h2>Please verify your email first</h2>
                    <Button onClick={loginWithRedirect} variant="primary">Refresh</Button>
                </div>
                : <></>
            }
        </div>
    )
}