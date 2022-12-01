import React from "react";
import Button from "react-bootstrap/Button";
import {
  BsCheckLg,
  BsFillChatTextFill,
  BsFillPersonFill,
  BsXLg,
} from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import PriorityQueue, {
  generate_sorted_stack,
} from "../backend/data-structures/priority-queue";
import Trie from "../backend/data-structures/trie";
import SearchBox from "../components/search.jsx";
import { Search } from "../Database_api/API.js";
import ProfilePublic from "../pages/public-profile.jsx";
import { userData } from "./login";
import "./style/stack.css";
import Modal from 'react-bootstrap/Modal';
import { Update } from "../Database_api/API.js";

export var auto_complete_tree = new Trie();
export var sorted_profile_stack = new PriorityQueue();

async function build_autocomplete_tree() {
  // Mongodb model
  const user_model = require("../backend/model/signup");

  // Find all users and return their 'name' field
  const usernames = await user_model.find("name");
  const auto_complete_tree_buf = new Trie();
  for (var i = 0; i < usernames.length; i++)
    auto_complete_tree_buf.insert(usernames[i]["name"]);

  auto_complete_tree = auto_complete_tree_buf;
}

async function build_sorted_profile_stack(data) {
  let userProfile = require("../backend/model/signup");
  let query = await userProfile.find();
  let result = query.select("-password");

  const USERNAME_NUMERIC_ASCENDING_COMPARATOR = (s1, s2) => {
    if (typeof s1.username === "string" && typeof s2.username === "string")
      return s1.username.localeCompare(s2.username, { numeric: true });
  };

  const s = generate_sorted_stack(
    result,
    USERNAME_NUMERIC_ASCENDING_COMPARATOR
  );
  sorted_profile_stack = s;
}

export default function Stack() {
  const location = useLocation();
  const data = location.state;
  build_autocomplete_tree();

  const [users, setUsers] = useState(null);
  Search(setUsers);

  const [stackUsers, setStack] = useState(null);
  const modes_to_search = data.mode.split(' ').slice(2);

  var regex = '';
  for (var i = 0; i < modes_to_search.length; i++)
  {
    if (i != 0) regex += '|';
    regex += '('
    regex += modes_to_search[i];
    regex += ')'
  }

  const [currentProfile, setCurrentProfile] = useState([]);

  var topProfile;
  useEffect(() => {
    async function loadStackProfiles() {
      const componentPromises = stackUsers.map(async userInfo => {
        const View = <div id={userInfo.username}>
          < ProfilePublic className = "profile" name = { userInfo.name } state = { userInfo.location } year = { userInfo.year } make = { userInfo.make } model = { userInfo.model } />
        </div>
        return View;
      })
      if (topProfile === undefined) {
        topProfile = stackUsers[-1];
        Promise.all(componentPromises).then(setCurrentProfile);
      }
    }

    if (stackUsers == null) {
      console.log("trd==")
      console.log(regex)

      // Search for compatible modes
      // Search(setStack, { mode: new RegExp(regex) });
      Search(setStack, { mode: {$regex: regex, $options: 'i'}, username: {$nin: data.username} });
    }
    else // (stackUsers !== null)
    {
      loadStackProfiles();
      console.log(stackUsers);
    }

  }, [stackUsers]);

  const navigate = useNavigate();
  const like = () => {
    console.log("like");

    if (topProfile !== undefined) {
      Update(
        {
          username: { username: data.username },
          updates: {
            $push: {
              likes: {
                username: topProfile.username
              }
            }
          }
        }

      )
    }

    if (stackUsers.length) {
      topProfile = stackUsers.pop();
      let d = document.getElementById(topProfile.username);
      d.parentNode.removeChild(d);
    }

  };
  const dislike = () => {
    console.log("dislike");
  };

  //modal stuff SEND MESSAGE
  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSend = () => {
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSend = () => {
    alert("Message sent. You will be notified when the user responds.");
  }
  //modal stuff end
  return (
    <div class="container" width="auto" style={{ overflow: "hidden" }}>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Chat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div class="form-group">
              <label for="Textarea">Enter Message</label>
              <textarea class="form-control" id="Textarea" rows="1"></textarea>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>x
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={event => { handleSend(); handleClose(); }}>Send Message</Button>
        </Modal.Footer>
      </Modal>
      <div class="row">
        <div style={{ position: "absolute", left: "17%", top: "50%" }}>
          <Button variant="outline-danger" size="lg" onClick={dislike}>
            <BsXLg class="mb-1" />
          </Button>
        </div>
        <div class="col-md-7">
          <div className="search" class="d-flex d-flex-inline">
            {/* Search Feature */}
            <SearchBox placeholder="Search profiles..." data={users} />
            {/* Profile Button */}
            <Button
              variant="outline-primary"
              size="lg"
              onClick={() => navigate("/profile", { state: data })}
              style={{ position: "absolute", left: "73%", top: "16.5%" }}
            >
              <BsFillPersonFill class="mb-1" />
            </Button>

            {/* TODO: Chat Feature */}
            <Button
              variant="outline-primary"
              size="lg"
              onClick={handleShow}
              style={{ position: "absolute", left: "73%", top: "78%" }}
            >
              <BsFillChatTextFill class="mb-1" />
            </Button>
          </div>
          {/* true stack */}
          <React.Suspense fallback = 'Loading profiles...'>
            <div className="container">{currentProfile}</div>
          </React.Suspense>
        </div>
        <div style={{ position: "absolute", left: "78%", top: "50%" }}>
          <Button variant="outline-success" size="lg" onClick={like}>
            <BsCheckLg class="mb-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
