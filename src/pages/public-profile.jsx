import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useParams } from "react-router-dom";
import image from "../assets/img1.png";

const ProfilePublic = (props) => {
  const { user } = useParams();

  console.log({ user });
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
      <Card style={{ width: "50rem", height: "auto" }}>
        <Card.Img src={image} />
        <Card.Body>
          <Card.Title>
            <h2>"{user}"</h2>
          </Card.Title>
          <Card.Subtitle class="mb-2 text-muted">
            <h4>"State"</h4>
          </Card.Subtitle>
          <ListGroup variant="flush">
            <ListGroup.Item class="mb-2">
              <h4
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                "year"+"make"+"model"
              </h4>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
};
export default ProfilePublic;
