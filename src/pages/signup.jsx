import * as tf from "@tensorflow/tfjs"
import React from "react";
import { useState } from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { useNavigate } from "react-router-dom";
import SignUp from "../backend/API/signup";
import { CarNoCar } from "../components/model";

export let ML_result = "";

export default function Signup(props) {
  const [data, setData] = useState(null);
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [name, setName] = useState("");
  const [img, setImg] = useState(null);
  const [location, setLocation] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [mode, setMode] = useState(" Mode");

  const navigate = useNavigate();

  const handlebutton = (value) =>{
    if (mode.includes(value))
      setMode(mode.replace(" " + value, ''))
    else
      setMode(mode + " " + value)
  }

  const handlesubmit =(e) =>{
    e.preventDefault();
    const data = {
      name: name,
      username: username,
      password: password,
      location: location,
      img1: img,
      year: year,
      mode: mode,
      model: model,
      make: make,
    }
    SignUp(data)
  }

  const verifyImage = async (img) => {
    // img is the HTMLelement containing the image

    // const resultElement = document.getElementById('result');
    // resultElement.innerText = 'Loading CNN model...';
    let url = URL.createObjectURL(img.files[0]);           // create an Object URL
    let image_data = new Image();                         // create a temp. image object

    image_data.onload = function() {                    // handle async image loading
      URL.revokeObjectURL(url);             // free memory held by Object URL
    };

    image_data.src = url;
    image_data.width = 224;
    image_data.height = 224;

    console.log('Loading CNN model...');

    const imageModel = new CarNoCar();
    console.time('Loading of model');
    await imageModel.load();
    console.timeEnd('Loading of model');
    const pixels = tf.browser.fromPixels(image_data);
    //const results = imageModel.execute(pixels);
    console.time('First prediction');
    let result = imageModel.predict(pixels);
    const topK = imageModel.getTopKClasses(result, 3);
    console.timeEnd('First prediction');

    // resultElement.innerText = '';
    let ML_result_buf = "";

    /* Output */
    topK.forEach(x => {
      // resultElement.innerText += `${x.value.toFixed(3)}: ${x.label}\n`;
      ML_result_buf += `${x.value.toFixed(3)}: ${x.label}\n`;
    });

    ML_result = ML_result_buf;

    /* Check if is car */
    let target_labels = ["passenger car, coach, carriage", "racer, race car, racing car", "sports car, sport car", "streetcar", "convertible"];
    let is_valid_image = false;

    console.log(topK);

    for (var i = 0; i < 3; i++) {
      // If the image is indeed a car
      console.log(topK[i]['label']);

      for (var j = 0; j < target_labels.length; j++)
        if (topK[i]['label'] === target_labels[j]) {
          setImg(img.files[0]);
          is_valid_image = true;
          break;
        }
    }

    // If not a valid car image
    if (!is_valid_image) {
      //console.log("Not a car");
      alert("Please input an image of a car");
      console.log()
      let form = document.getElementById("login-form");
      form.reset();
      console.log(form);
      // UI changes to notify the user
    }

    imageModel.dispose();
  }

  return (
    <div>
      <div className="login-form-container" style={{position:"absolute", top:"50%", transform: "translateY(-50%)", height:"auto"}}>
        <form className="login-form" onSubmit={handlesubmit}>
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
                value = {username}
                onChange = {(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="First Last"
                value = {name}
                onChange = {(e) => setName(e.target.value)}
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
                onChange={(e) => verifyImage(e.target)}
              />
            </div>
            {/*or image submit^^ */}
            
            <div className="form-group mt-3">
              <label>Location (State)</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g. California"
                value = {location}
                onChange = {(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Make</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g. Toyota"
                value={make}
                onChange = {(e) => setMake(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Model</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g. Supra"
                value={model}
                onChange = {(e) => setModel(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Year</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Model year"
                value={year}
                onChange = {(e) => setYear(e.target.value)}
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
                  onClick={() =>{handlebutton("Meet")}}
                >
                  Meet
                </ToggleButton>
                <ToggleButton
                  id="tbg-check-2"
                  value={2}
                  variant="outline-success"
                  onClick={() =>{handlebutton("Race")}}
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
              <button type="submit" className="btn btn-primary" onClick={()=>navigate('/login')}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
