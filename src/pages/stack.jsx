import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import image from "../assets/img1.png";
{/* Importing temp image from assets folder */}


export default function Stack() {
  return (
    <div className="stack" style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
      <Card style={{width:'50rem', height:'auto'}}>
        <Card.Img src={image} />
        <Card.Body>
          <Card.Title><h1>"First Last"</h1></Card.Title>
          <Card.Subtitle class="mb-2 text-muted"><h3>"State"</h3></Card.Subtitle>
          <ListGroup variant="flush">
            <ListGroup.Item class="mb-2"><h2 style={{position: 'absolute', left: '50%', top: '50%',transform: 'translate(-50%, -50%)'}}>"year"+"make"+"model"</h2></ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  )
}
