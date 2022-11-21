
import React, { useState } from "react"

export default function (props) {
  let [authMode, setAuthMode] = useState("signin")

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  if (authMode === "signin") {
    return (
      <div className="login-form-container">
        <form className="login-form">
          <div className="login-form-content">
            <h3 className="login-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Name</label>
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
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="login-form-container">
      <form className="login-form-up">
        <div className="login-form-content">
          <h3 className="login-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Photo</label>
            <input
              type="file"
              accept=".jpeg, .png"
              alt = "image of car"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
            />
          </div>
          {/*or image submit^^ */}
          <div className="form-group mt-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="form-group mt-3">
            <label>Location</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Select from dropdown"
            />
          </div>
          <div className="form-group mt-3">
            <label>Make of Car</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Toyota"
            />
          </div>
          <div className="form-group mt-3">
            <label>Model</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Supra"
            />
          </div>
          <div className="form-group mt-3">
            <label>Year</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Select from Year dropdown"
            />
          </div>
          <div className="form-group mt-3">
            <label>Engine</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Dropdown for liters and V"
            />
          </div>
          <div className="form-group mt-3">
            <label>Color</label>
            <input
              type="color"
              className="form-control mt-1"
              placeholder="E.g Black"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}