import React from "react";
import Button from "react-bootstrap/Button";
import { BsArrowBarLeft } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import ProfilePublic from "../pages/public-profile.jsx";

export default function View() {
  const location = useLocation();
  const value = location.state;
  const navigate = useNavigate();
  return (
    <>
      <div style={{ position: "absolute", left: "18%", top: "18.5%" }}>
        <Button variant="outline-danger" size="lg" onClick={() => navigate(-1)}>
          <BsArrowBarLeft class="mb-1" />
        </Button>
      </div>
      <div>
        <ProfilePublic
          className="profile"
          name={value.name}
          state={value.state}
          year={value.year}
          make={value.make}
          model={value.model}
          img1={value.img1}
        />
      </div>
    </>
  );
}
