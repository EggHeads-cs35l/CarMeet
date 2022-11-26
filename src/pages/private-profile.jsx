import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import image from "../assets/img1.png";

function Profile() {
  return (
    <div
      className="stack"
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Card style={{ width: "35rem", height: "auto" }}>
        <Card.Img src={image} />
        <Card.Body>
          <Card.Title>
            <h2>"First Last"</h2>
          </Card.Title>
          <Card.Subtitle class="mb-2 text-muted">
            <h4>"State"</h4>
          </Card.Subtitle>
          <ListGroup variant="flush">
            <ListGroup.Item class=" row justify-content-center">
              <h4 align="center">"year"+"make"+"model"</h4>
            </ListGroup.Item>
            <ListGroup.Item>
              Likes
              <div class="row">
                {Array.from({ length: 12 }).map((_, idx) => (
                  <div class="col-lg">
                    <Card class="my-2">
                      <Card.Img variant="top" src="holder.js/100px160" />
                      <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                          This is a longer card with supporting text below as a
                          natural lead-in to additional content. This content is
                          a little bit longer.
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>
              <Row md={2} className="g-4"></Row>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Profile;
