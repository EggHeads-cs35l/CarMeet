import axios from "axios";
import { useState } from "react";

const Login = (props, setData) =>{
    const loginCredetentials = {
          email: props.email, 
          password: props.password
    }
   axios.post("http://169.232.189.191:4000/app/login", loginCredetentials)
   .then((response) => {
      if (response.data != null){
         const userData = {
            _id: response.data._id,
            username: response.data.username,
            email: response.data.email,
            img1: response.data.img1
         };
         setData(userData)
      }
      else{
         alert("Please fill the sign-up form.");
         document.getElementById("login-form-container").focus();
      }
    });
}

export default Login;