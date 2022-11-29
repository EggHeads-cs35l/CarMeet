import React from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { useNavigate } from "react-router-dom";

export default function Signup(props) {
  const navigate = useNavigate();
  return (
    <div>
      <div className="login-form-container">
        <form className="login-form">
          <div className="login-form-content">
            <h3 className="login-form-title">Sign Up</h3>
            <div className="text-center">
              Already registered?{" "}
              <span className="link-primary" >
                <u onClick={()=>navigate("/login")}>Log In</u>
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter username"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            <div className="form-group mt-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="First Last"
              />
            </div>
            <div className="form-group mt-3">
              <label>Profile Image (1080x720 recommended)</label>
              <input
                type="file"
                accept=".jpeg, .png"
                alt="image of car"
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
              />
            </div>
            {/*or image submit^^ */}
            
            <div className="form-group mt-3">
              <label>Location (State)</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g. California"
              />
            </div>
            <div className="form-group mt-3">
              <label>Make</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g. Toyota"
              />
            </div>
            <div className="form-group mt-3">
              <label>Model</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g. Supra"
              />
            </div>
            <div className="form-group mt-3">
              <label>Year</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Model year"
              />
            </div>
            <div className="form-group mt-3">
              <label>Mode</label>
              <br></br>
              <ToggleButtonGroup
                type="checkbox"
                defaultValue={1}
                className="mb-2"
              >
                <ToggleButton
                  id="tbg-check-1"
                  value={1}
                  variant="outline-success"
                >
                  Meet
                </ToggleButton>
                <ToggleButton
                  id="tbg-check-2"
                  value={2}
                  variant="outline-success"
                >
                  Race
                </ToggleButton>
                <ToggleButton
                  id="tbg-check-3"
                  value={3}
                  variant="outline-success"
                >
                  Drift
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
