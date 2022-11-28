import 'babel-polyfill';
import React, { useState } from "react"
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';

import {CarNoCar} from './model';
import imageURL from './cat.jpeg';

export default function (props) {
  let [authMode, setAuthMode] = useState("signin")
  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  const verifyImage = async () => {
    const img = document.getElementById('img');
    img.src = imageURL;
    await img;
    const resultElement = document.getElementById('result');
    resultElement.innerText = 'Loading CNN model...';

    const imageModel = new CarNoCar();
    console.time('Loading of model');
    await imageModel.load();
    console.timeEnd('Loading of model');
    const pixels = tf.browser.fromPixels(img);
    //const results = imageModel.execute(pixels);
    console.time('First prediction');
    let result = imageModel.predict(pixels);
    const topK = imageModel.getTopKClasses(result, 2);
    console.timeEnd('First prediction');
    resultElement.innerText = '';
  topK.forEach(x => {
    resultElement.innerText += `${x.value.toFixed(3)}: ${x.label}\n`;
  });
    imageModel.dispose();
  }


  if (authMode === "signin") {
    return (
      <div className="login-form-container">
        <form className="login-form">
          <div className="login-form-content">
            <h3 className="login-form-title">Log In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                <u>Sign Up</u>
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
      <form className="login-form">
        <div className="login-form-content">
          <h3 className="login-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              <u>Log In</u>
            </span>
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
            <label>Profile Image</label>
            <img id="img"></img>
            <div id="result"></div>
            <span className="link-primary" onClick={verifyImage}>
              <u>Verify Image</u>
            </span>
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