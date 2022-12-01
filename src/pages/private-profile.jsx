import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate, useLocation } from "react-router-dom";
import "./style/profile.css";
import Button from "react-bootstrap/Button";
import { BsFillInboxesFill, BsArrowBarLeft } from "react-icons/bs";

function inbox(){
  return(
    <div>
      <p>here</p>
    </div>
  )
}

export default function Profile() {
  const location = useLocation();
  const userData = location.state;
  const navigate = useNavigate();
  return (
    <div className="profile">
    <div style={{ position: "absolute", left: "17%", top: "5%" }}>
          <Button variant="outline-danger" size="lg" onClick={() => navigate(-1)}>
            <BsArrowBarLeft class="mb-1" />
          </Button>
    </div>
    <div style={{ position: "absolute", right: "17%", top: "5%" }}>
          <Button size="lg" onClick={inbox}>
            <BsFillInboxesFill class="mb-1" />
          </Button>
    </div>
      <Card style={{ width: "35rem", height: "auto" }}>
        <Card.Img src="https://picsum.photos/1080/720" />
        <Card.Body>
          <Card.Title>
            <h2>{userData.username}</h2>
          </Card.Title>
          <Card.Subtitle class="mb-2 text-muted">
            <h4>{userData.location}</h4>
          </Card.Subtitle>
          <h4 align="center">{userData.year} {userData.make} {userData.model}</h4>
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
