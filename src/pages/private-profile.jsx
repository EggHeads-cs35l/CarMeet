import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate, useLocation } from "react-router-dom";
import {Search, Update} from "../Database_api/API.js";
import "./style/profile.css";
import Button from "react-bootstrap/Button";
import { BsFillInboxesFill, BsArrowBarLeft } from "react-icons/bs";
import {Component} from "react"

import Modal from 'react-bootstrap/Modal';


export default function Profile() {

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
  //reply stuff
  const [show, setShow] = useState(false);
  const handleCloseReply = () => setShow(false);
  const handleShowReply = () => setShow(true);
  const handleSendReply = () => {
    Update ({
            user:{ username: "aasd"},
            updates: {
            $push:{
              messages:{
                username: "tejas",
                message: "test",
              }
            }
          }});
    alert("Message sent. You will be notified when the user responds.");
  }
  //reply stuff end

  //const messages = userData.messages;

  useEffect(() => {

    if(data == null){
      Search(setData, {username:"aasd"});
    }
    else {
      console.log("HEY");
      console.log(data);
      console.log(data[0].messages);
      setAllMessages(data[0].messages);
    }

  }, [data]);
  const [allMessages, setAllMessages] = useState([{message: 'loading messages', username: ''}])
  const messages = [{message: 'Sick car bro', username: 'John'}, {message: 'Damn.', username: 'Jane'}, {message: 'LOL', username: 'George'}];
  const listMessages = allMessages.map(message =>

      <Card key={message.username.toString()}>
      <Card.Body>{message.message}</Card.Body>

      <footer align = "right">
        {'- ' + message.username}
      </footer>
      <Button variant = "primary" onClick={handleShowReply}>
        Reply
      </Button>
      </Card>


  );

  //inbox stuff
  const [showInbox, setShowInbox] = useState(false);

  const fetchMessages = () => Search(setData, {username:"aasd"});
  const handleCloseInbox = () => setShowInbox(false);
  const handleShowInbox = () => setShowInbox(true);
  //Inbox end



  return (
    <div className="profile">
    <Modal
        show={show}
        onHide={handleCloseReply}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Reply</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
          <div class="form-group">
            <label for="Textarea">Enter Message</label>
            <textarea class="form-control" id="Textarea" rows="1"></textarea>
          </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseReply}>
            Close
          </Button>
          <Button variant="primary" onClick={event => {handleSendReply(); handleCloseReply();}}>Reply</Button>
        </Modal.Footer>
      </Modal>

    <Modal
        show={showInbox}
        onHide={handleCloseInbox}
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
          <Button size="lg" onClick={event => {handleShowInbox(); fetchMessages();}}>
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

