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
          <Card.Title><b>"First Last"</b></Card.Title>
          <Card.Subtitle>"California"</Card.Subtitle>
          <ListGroup variant="flush">
            <ListGroup.Item>"year"+"make"+"model"</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  )
}
