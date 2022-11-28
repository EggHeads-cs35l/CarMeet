import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";

function Profile() {
  return (
    <div
      className="stack"
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
      }}
    >
      <Card style={{ width: "35rem", height: "auto" }}>
        <Card.Img src="https://picsum.photos/1080/720" />
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
              <Row xs={1} md={2} className="g-4">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <Col>
                    <Card>
                      <Card.Img variant="top" src="https://picsum.photos/1080/720/"/>
                      <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                          Deets {idx+1}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Profile;
