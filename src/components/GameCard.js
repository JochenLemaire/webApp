import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


export default function GameCard(props) {    

    return (
        <Card style={{ minwidth: '18rem' }} className="col-sm-2">
            <Card.Img variant="top" src={props.image ? `/images/${props.image}` : `/images/noimagefound.png`} />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>
                    {props.description}
                </Card.Text>
                <Link to={`/games/${props.id}`}>
                    <Button variant="primary">Info</Button>
                </Link>
                {props.canEdit ? 
                <Link to={`/editgame/${props.id}`}>
                    <Button variant="info">Edit</Button>
                </Link>
            : <></>}
            {props.canDelete ? 
                <Button variant="danger" onClick={() => props.onDelete(props.id)}>Delete</Button>
            : <></>}
            </Card.Body>
        </Card>
    );
}