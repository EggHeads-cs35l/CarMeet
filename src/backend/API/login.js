import axios from "axios";
import { useState } from "react";

const Login = (props) =>{
   const [data, setData] = useState(null)
    const loginCredetentials = {
          email: props.email, 
          password: props.password
    }
   axios.post("http://149.142.75.182:4000/app/login", loginCredetentials)
   .then((response) => {
      if (response.data != null){
         const userData = {
            _id: response.data._id,
            username: response.data.username,
            email: response.data.email,
            img1: response.data.img1,
            img2: response.data.img2,
            img3: response.data.img3
         };
         setData(data)
      }
    });
    return data;
}

export default Login;