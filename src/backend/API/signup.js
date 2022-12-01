import axios from "axios";
import FormData from "form-data";
const SignUp = (props) =>{
   let data = new FormData();
   Object.keys(props).forEach((key)=>{
    data.append(key,props[key] )
   })
   axios.post("http://131.179.49.113:4000/app/signup", data, {headers: {
    "Content-Type": "multipart/form-data"
    }
  })
   .then((response) => {
        return true
    })
    .catch((response) =>{
      return false
    });
}

export default SignUp;