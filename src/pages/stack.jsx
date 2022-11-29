import React from "react";
import Button from "react-bootstrap/Button";
import { BsCheckLg, BsFillPersonFill, BsXLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Search from "../components/search.jsx";
import Data from "../data/testdata.json";
import ProfilePublic from "../pages/public-profile.jsx";
import "./style/stack.css";

export default function Stack() {
  const navigate = useNavigate();
  const like = () => {
    console.log("like");
  };
  const dislike = () => {
    console.log("dislike");
  };
  return (
    <div class="container">
      <div class="row">
        <div style={{ position: "absolute", left: "17%", top: "50%" }}>
          <Button variant="outline-danger" size="lg" onClick={dislike}>
            <BsXLg class="mb-1" />
          </Button>
        </div>
        <div class="col-md-7">
          <div className="search" class="d-flex d-flex-inline">
            <Search placeholder="Search profiles..." data={Data} />
            <Button
              variant="outline-primary"
              size="lg"
              onClick={() => navigate("/profile")}
              style={{position: "absolute", left: "73%", top:"16.5%"}}
            >
              <BsFillPersonFill class="mb-1" />
            </Button>
          </div>
          <ProfilePublic manual="anish" className="profile" />
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
