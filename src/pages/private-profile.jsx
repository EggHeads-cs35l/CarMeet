import React, { Component, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import {
  BsArrowBarLeft,
  BsFillInboxesFill,
  BsPencilFill,
} from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import generate_decoded_image from "../components/image_decoder.js";
import { Search, Update } from "../Database_api/API.js";
import "./style/profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state;

  const img = generate_decoded_image(userData.img1);

  // Like users stuff

  let testData = { username: "none", name: "Find Some Friends" };

  const [likeUsers, setLikeUsers] = useState(null);
  const [likeUsersProfile, setLikeProfile] = useState([]);

  var likes = userData.likes;
  likes = likes.reverse();
  console.log(userData.likes);

  var regex = "^(";
  for (var i = 0; i < (likes.length > 4 ? 4 : likes.length); i++) {
    if (i != 0) regex += "|";
    regex += "(";
    regex += likes[i];
    regex += ")";
  }
  regex += ")$";

  console.log(regex);

  var likeUsers_buf;

  useEffect(() => {
    console.log("Likeusers value changed");
    console.log(likeUsers);

    async function loadLikeProfiles() {
      const componentPromises = likeUsers_buf.map(async (userInfo) => {
        const View = (
          <div id={userInfo.username}>
            <Col>
              <Card
                onClick={() => {
                  clickable(userInfo);
                }}
              >
                <Card.Img
                  variant="top"
                  src={generate_decoded_image(userInfo.img1)}
                />
                <Card.Body>
                  <Card.Title>{userInfo.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </div>
        );
        return View;
      });
      Promise.all(componentPromises).then(setLikeProfile);
      console.log("All loaded from the db");
    }

    if (likeUsers == null) {
      console.log("Reading likeUsers from the db...");
      console.log(regex);

      if (regex === "^$") {
        likeUsers_buf = [];
        for (var i = 0; i < 4; i++) {
          likeUsers_buf.push(testData);
        }
        loadLikeProfiles();
      } else {
        Search(setLikeUsers, {
          username: { $regex: regex },
        });
      }
    } // (likeUsers !== null)
    else {
      likeUsers_buf = likeUsers;
      let length = 4 - likeUsers_buf.length;

      if (likeUsers_buf.length < 4)
        for (var i = 0; i < length; i++) likeUsers_buf.push(testData);
      else likeUsers_buf = likeUsers_buf.slice(0, 4);

      loadLikeProfiles();
      console.log(likeUsers);
    }
  }, [likeUsers]);

  function clickable(inData) {
    if (inData === null || inData.username == "none") {
      return navigate("/stack", { state: userData });
    } else {
      return navigate("/view", { state: inData });
    }
  }

  // end of likes

  //reply stuff
  const [currentRecipent, setCurrentRecipent] = useState("");
  const [show, setShow] = useState(false);
  const handleCloseReply = () => setShow(false);
  const handleShowReply = () => setShow(true);
  const handleSendReply = () => {
    alert("Successfully replied to " + currentRecipent)
    Update({
      user: { username: currentRecipent },
      updates: {
        $push: {
          messages: {
            username: userData.username,
            message: document.getElementById("Textarea").value,
          },
        },
      },
    });
    //alert("Message " + document.getElementById("Textarea").value + " sent to " + currentRecipent + " from " + userData.username);
  };
  //reply stuff end

  //const messages = userData.messages;

  const [allMessages, setAllMessages] = useState([
    { message: "loading messages", username: "" },
  ]);

  const listMessages = allMessages.map((message) => (
    <Card key={message.username.toString()}>
      <Card.Body>{message.message}</Card.Body>

      <footer align="right">{"- " + message.username}</footer>
      <Button variant="primary" onClick={(event) => {handleShowReply(); setCurrentRecipent(message.username);}}>
        Reply
      </Button>
    </Card>
  ));

  //inbox stuff
  const [showInbox, setShowInbox] = useState(false);
  const handleCloseInbox = () => setShowInbox(false);
  const handleShowInbox = () => setShowInbox(true);
  const handleLoadMessages = () => {
    console.log(userData.messages);
    setAllMessages(userData.messages);
  };
  //Inbox end

  return (
    <div className="profile" style={{position:"absolute", top:"30%"}}>
      <Modal
        show={show}
        onHide={handleCloseReply}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Reply to {currentRecipent}</Modal.Title>
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
          <Button
            variant="primary"
            onClick={(event) => {
              handleSendReply();
              handleCloseReply();
            }}
          >
            Reply
          </Button>
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
        <Modal.Body
          style={{
            maxHeight: "calc(100vh - 210px)",
            overflowY: "auto",
          }}
        >
          <form>
            <div>{listMessages}</div>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <div style={{ position: "absolute", left: "17%", top: "25%" }}>
        <Button variant="outline-danger" size="lg" onClick={() => navigate(-1)}>
          <BsArrowBarLeft class="mb-1" />
        </Button>
      </div>
      {/* inboox button */}
      <div style={{ position: "absolute", right: "17%", top: "25%" }}>
        <Button
          size="lg"
          variant="outline-primary"
          onClick={(event) => {
            handleShowInbox();
            handleLoadMessages();
          }}
        >
          <BsFillInboxesFill class="mb-1" />
        </Button>
      </div>
      {/* edit profile button */}
      <div
        className="edit-profile"
        style={{ position: "absolute", right: "17%", top: "35%" }}
      >
        <Button
          size="lg"
          variant="outline-primary"
          onClick={() => {
            navigate("/edit-profile", { state: userData });
          }}
        >
          <BsPencilFill class="mb-1" />
        </Button>
      </div>
      <div className="profile-container">
        <Card style={{ height: "480px", width: "720px" }}>
          <Card.Img src={img} style={{ height: "480px", width: "720px" }} />
          <Card.Body>
            <Card.Title>
              <h2>{userData.name}</h2>
            </Card.Title>
            <Card.Subtitle class="mb-2 text-muted">
              <h4>{userData.location}</h4>
            </Card.Subtitle>
            <h4 align="center">
              {userData.year} {userData.make} {userData.model}
            </h4>
            <br></br>
            <Row xs={1} md={2} className="g-4">
              {likeUsersProfile}
            </Row>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

class George extends Component {
  render() {
    return <div>card html</div>;
  }
}
