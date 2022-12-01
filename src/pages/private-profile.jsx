import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import "./style/profile.css";

export default function Profile() {
  const navigate = useNavigate();
  return (
    <div className="profile">
      <Card style={{ width: "35rem", height: "auto" }}>
        <Card.Img src="https://picsum.photos/1080/720" />
        <Card.Body>
          <Card.Title>
            <h2>"First Last"</h2>
          </Card.Title>
          <Card.Subtitle class="mb-2 text-muted">
            <h4>"State"</h4>
          </Card.Subtitle>
          <h4 align="center">"year"+"make"+"model"</h4>
          <br></br>
          <Row xs={1} md={2} className="g-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Col>
                {/*TODO: Dynamic card loading*/}
                <Card onClick={() => navigate("/{title}")}>
                  <Card.Img
                    variant="top"
                    src="https://picsum.photos/1080/720/"
                  />
                  <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>Deets {idx + 1}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
