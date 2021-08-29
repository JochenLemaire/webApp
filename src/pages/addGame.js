import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as gameData from "../api/games";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";


export default function AddGame() {
    const [onSubmit, setOnSubmit] = useState(false);
    const [formData, setFormData] = useState({ name: "", description: "" });
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();
    const history = useHistory();


    const handleSubmit = (prevent) => {
        prevent.preventDefault();
        getAccessTokenSilently().then(accessToken => {
            gameData.createGame(accessToken, formData).then(res => history.push(res)).catch(err => alert("Creation of game failed"));
        }).catch((err) => console.log(err));
        setOnSubmit(true);
    }

    return (
        isAuthenticated ?
            <div className="addGameBox" onSubmit={handleSubmit}>
                <Form>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your collected game"
                            value={formData.name}
                            onChange={(data) => setFormData({ ...formData, name: data.target.value })} />
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
                            onChange={(data) => setFormData({ ...formData, description: data.target.value })} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Uploading pictures currently disabled</Form.Label>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                </Button>
                </Form>
            </div>
            :
            <div>
                <h2>Please log in first</h2>
            </div>
    );
}