import * as tf from "@tensorflow/tfjs";
import React, { useEffect, useState } from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { useLocation, useNavigate } from "react-router-dom";
import { CarNoCar } from "../components/model/model.jsx";
import { Update } from "../Database_api/API.js";

/*TODO: set placeholders to be the current values of the user's profile*/
export default function EditProfile() {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [img, setImg] = useState(null);
  const [loc, setLocation] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [mode, setMode] = useState(" Mode");
  //const [verifyData, setVerifyData] = useState("default");
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state;
  const handlebutton = (value) => {
    if (mode.includes(value)) setMode(mode.replace(" " + value, ""));
    else setMode(mode + " " + value);
  };
  const verify = () => {
    if (password === "") {
      alert("Please enter a password");
      return false;
    }
    if (name === "") {
      alert("Please enter your name");
      return false;
    }
    if (location === "") {
      alert("Please enter your location");
      return false;
    }
    if (make === "") {
      alert("Pleaase enter your car's make");
      return false;
    }
    if (model === "") {
      alert("Please enter your car's model");
      return false;
    }
    if (year === "") {
      alert("Please enter your car's year");
      return false;
    }
    if (img === null) {
      alert("Please upload a picture of your car");
      return false;
    }
    if (mode === " Mode") {
      alert("Please select a mode");
      return false;
    }
    return true;
  };
  const verifyImage = async (img) => {
    // img is the HTMLelement containing the image

    // const resultElement = document.getElementById('result');
    // resultElement.innerText = 'Loading CNN model...';
    let url = URL.createObjectURL(img.files[0]); // create an Object URL
    let image_data = new Image(); // create a temp. image object

    image_data.onload = function () {
      // handle async image loading
      URL.revokeObjectURL(url); // free memory held by Object URL
    };

    image_data.src = url;
    image_data.width = 224;
    image_data.height = 224;

    console.log("Loading CNN model...");

    const imageModel = new CarNoCar();
    console.time("Loading of model");
    await imageModel.load();
    console.timeEnd("Loading of model");
    const pixels = tf.browser.fromPixels(image_data);
    //const results = imageModel.execute(pixels);
    console.time("First prediction");
    let result = imageModel.predict(pixels);
    const topK = imageModel.getTopKClasses(result);
    console.timeEnd("First prediction");

    // resultElement.innerText = '';
    let ML_result_buf = "";

    /* Output */
    topK.forEach((x) => {
      // resultElement.innerText += `${x.value.toFixed(3)}: ${x.label}\n`;
      ML_result_buf += `${x.value.toFixed(3)}: ${x.label}\n`;
    });

    /* Check if is car */
    let target_label = "car";
    let is_valid_image = false;

    console.log(topK[0]["label"]);
    if (topK[0]["label"] === target_label) {
      setImg(img.files[0]);
      is_valid_image = true;
    }

    // If not a valid car image
    if (!is_valid_image) {
      //console.log("Not a car");
      alert("Please input an image of a car");
      // UI changes to notify the user
    }

    imageModel.dispose();
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    if (!verify()) return;
    const data = {
      name: name,
      password: password,
      location: loc,
      img1: img,
      year: year,
      mode: mode,
      model: model,
      make: make,
    };
    Update({ user: { username: userData.username }, updates: data });
    navigate("/profile", { state: userData });
  };
  console.log(userData);
  return (
    <div>
      <div
        className="login-form-container"
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          height: "auto",
        }}
      >
        <form className="login-form" onSubmit={handlesubmit}>
          <div className="login-form-content">
            <h3 className="login-form-title">Edit Profile</h3>
            <h5 className="login-form-subtitle">Must enter all details</h5>
            <div className="text-center">
              Cancel edit?{" "}
              <span className="link-primary">
                <u onClick={() => navigate("/profile", { state: userData })}>
                  Back to Profile
                </u>
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Change Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Change Name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder={userData.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Change Profile Image</label>
              <input
                type="file"
                accept=".jpeg, .png"
                alt="image of car"
                className="form-control mt-1"
                onChange={(e) => verifyImage(e.target)}
              />
            </div>
            {/*or image submit^^ */}

            <div className="form-group mt-3">
              <label>Change Location (State)</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder={userData.location}
                value={loc}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Change Make</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder={userData.make}
                value={make}
                onChange={(e) => setMake(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Change Model</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder={userData.model}
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Change Year</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder={userData.year}
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Change Mode</label>
              <br></br>
              <ToggleButtonGroup
                type="checkbox"
                defaultValue={0}
                className="mb-2"
              >
                <ToggleButton
                  id="tbg-check-1"
                  value={1}
                  variant="outline-success"
                  onClick={() => {
                    handlebutton("Meet");
                  }}
                >
                  Meet
                </ToggleButton>
                <ToggleButton
                  id="tbg-check-2"
                  value={2}
                  variant="outline-success"
                  onClick={() => {
                    handlebutton("Race");
                  }}
                >
                  Race
                </ToggleButton>
                <ToggleButton
                  id="tbg-check-3"
                  value={3}
                  variant="outline-success"
                  onClick={() => {
                    handlebutton("Drift");
                  }}
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
