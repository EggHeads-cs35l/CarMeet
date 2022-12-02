import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import generate_decoded_image from "../components/image_decoder";

const ProfilePublic = (props) => {
  const img = `data:` + props.img1.contentType + `;base64,` + btoa(
    props.img1.data.data.reduce((data, byte) => data + String.fromCharCode(byte), '')
 );
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
<<<<<<< HEAD
      <Card style={{ width: "70rem", height: "auto" }}>
        <Card.Img src={generate_decoded_image(props.img1)} width={1080} height={720}/>
=======
      <Card style={{ width: "45rem", height: "auto" }}>
        <Card.Img src={img}/>
>>>>>>> 02ea0edaa63ae8fb917994b649d7211025b8d410
        <Card.Body>
          <Card.Title>
            <h2>{props.name}</h2>
          </Card.Title>
          <Card.Subtitle class="mb-2 text-muted">
            <h4>{props.state}</h4>
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
                {props.year} {props.make} {props.model}
              </h4>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
};
export default ProfilePublic;
