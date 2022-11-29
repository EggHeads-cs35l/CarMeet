import React from "react";
import Button from "react-bootstrap/Button";
import ProfilePublic from "../pages/public-profile.jsx";

const like = () => {console.log("like")}
const dislike = () => {console.log("dislike")}

export default function Stack() {
  /*TODO: Add search bar*/
  /*TODO: Add profile button*/
  return (
      <div class="row">
        <div class="col" style={{position:"absolute", left:"15%",top:"50%"}}>
          <Button variant="outline-danger" size="lg" onClick={dislike}>&#9746;</Button>
        </div>
        <div class="col-md-7">
          <ProfilePublic manual="anish" />
        </div>
        <div class="col" style={{position:"absolute", left: "80%",top:"50%"}}>
          <Button variant="outline-success" color="green" size="lg-5" onClick={like}>&#9745;</Button>
        </div>
      </div>
  );
}
