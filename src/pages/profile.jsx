import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function Profile() {
  return (
    <div class="row justify-content-center">
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Example Profile</Card.Title>
        <Card.Img variant="top" src="img1.png" />
        <Card.Text>
          Here we can let people put a description if we wish. the list is not from input yet
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Name</ListGroup.Item>
        <ListGroup.Item>Location</ListGroup.Item>
        <ListGroup.Item>Preference</ListGroup.Item>
        <ListGroup.Item>Make</ListGroup.Item>
        <ListGroup.Item>Model</ListGroup.Item>
        <ListGroup.Item>Engine</ListGroup.Item>
        <ListGroup.Item>Color</ListGroup.Item>
        <ListGroup.Item></ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Button variant="Like" size="sm">
        </Button>{' '}
      </Card.Body>
    </Card>
    </div>
  );
}

export default Profile;