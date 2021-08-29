import React, { useState, useEffect } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as gameData from "../api/games";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";


export default function editGame(props) {
    const [onSubmit, setOnSubmit] = useState(false);
    const [formData, setFormData] = useState({name: "", description: ""});
    const { getAccessTokenSilently } = useAuth0();
    const history = useHistory();


    useEffect(() => {
        gameData.getGameById(props.match.params.id).then(res => setFormData(res)).catch(err => console.log(err));
    }, [props.match.params.id]);

    const handleSubmit = (prevent) => {
        prevent.preventDefault();
        getAccessTokenSilently().then(accessToken => {
            gameData.editGame(accessToken, formData, props.match.params.id).then(res => history.go(-1)).catch(err => alert("Game edit failed"));
        }).catch((err) => console.log(err));
        setOnSubmit(true);
    }

    return (
        <div className="addGameBox" onSubmit={handleSubmit}>
            <Form>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter your collected game"
                    value={formData.name}
                    onChange={(data) => setFormData({...formData, name: data.target.value})} />
                    <Form.Text className="text-muted">
                        What's in a name?
                </Form.Text>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Game Description</Form.Label>
                    <Form.Control 
                    as="textarea" 
                    rows={3}
                    value={formData.description}
                    onChange={(data) => setFormData({...formData, description: data.target.value})} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Uploading pictures currently disabled</Form.Label>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}