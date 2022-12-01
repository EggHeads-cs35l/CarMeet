import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/img1.png";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div class="container" style={{ marginTop: "3%" }}>
        <div class="row">
          <div class="col-md-12 col-lg-6">
            <div class="container">
              <img src={image1} style={{ width: "100%" }} />
            </div>
          </div>
          <div class="col-md-12 col-lg-6">
            <div class="container" style={{ marginTop: "7%" }}>
              <div class="base_header">
                <span>
                  <small class="bor_header_left"></small>Welcome to CarMeet: A
                  Community for Car Enthusiasts
                  <small class="bor_header_right"></small>
                </span>
                <h3>Meet the perfect driver and their car</h3>
              </div>
              <div class="base_footer">
                <p>
                  There is no better place to find someone with the perfect car.
                  Race with them, just meet up to compare cars or just go for a
                  drive together
                </p>
              </div>
              <br></br>
              <Button
                variant="outline-primary"
                size="lg"
                style={{ width: "100%", height: "auto" }}
                onClick={() => navigate("/login")}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
      <br />
    </>
  );
}
