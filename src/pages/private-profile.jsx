import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate, useLocation } from "react-router-dom";
import {Search} from "../Database_api/API.js";
import "./style/profile.css";
import Button from "react-bootstrap/Button";
import { BsFillInboxesFill, BsArrowBarLeft } from "react-icons/bs";
import {Component} from "react"

import Modal from 'react-bootstrap/Modal';

function inbox(){
  return(
    <div>
      <p>here</p>
    </div>
  )
}

export default function Profile() {
    const messages = [("hello world", "user 1"), ("hello world", "user 2"), ("hello world", "user 3")];
    const listMessages = messages.map((message) =>
      <div key={message.toString()}>
        {message}
      </div>
    );

    //modal stuff
    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //modal stuff end

  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state;
  const top = []
  let testData = {username: "none", name: "Find Some Friends"}
  if (userData.likes == null){
    for (let i = 0; i < 4; i++){
      top.push(testData)
    }
  }
  else{
    const likes = userData.likes.reverse()
    for (let i = 0; i < 4; i++){
      Search(setData ,{username: likes[i]})
      if(data==null){
        top.push(testData)
      }else{
        top.push(data)
      }
    }
  }
  console.log(userData)
  console.log(top)
  function clickable(inData){
    if(inData.username == "none"){
      return
    }
    else{
      return navigate("/view", {state: inData})
    }
  }

  return (
    <div className="profile">
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Inbox</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{
                maxHeight: 'calc(100vh - 210px)',
                overflowY: 'auto'
                          }}
                          >
          <form>
          <div>
          {listMessages}
          </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>

    <div style={{ position: "absolute", left: "17%", top: "5%" }}>
          <Button variant="outline-danger" size="lg" onClick={() => navigate(-1)}>
            <BsArrowBarLeft class="mb-1" />
          </Button>
    </div>

    <div style={{ position: "absolute", right: "17%", top: "5%" }}>
          <Button size="lg" onClick={handleShow}>
            <BsFillInboxesFill class="mb-1" />
          </Button>
    </div>
      <Card style={{ width: "35rem", height: "auto" }}>
        {/*TODO: convert buffer to jpg/png and export*/}
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
                <Card onClick={clickable(top[idx])}>
                  <Card.Img
                    variant="top"
                    src="https://picsum.photos/1080/720/"
                  />
                  <Card.Body>
                    <Card.Title>{top[idx].name}</Card.Title>
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

class George extends Component {
    render() {
        return (
            <div>
                card html
            </div>
        )
    }
}

