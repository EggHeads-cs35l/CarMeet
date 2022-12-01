import axios from "axios";
import FormData from "form-data";
const IP = "131.179.49.113"
const login = (props, setData) =>{
   axios.post("http://" + IP + ":4000/app/login", props)
   .then((response) => {
      if (response.data != ''){
         const userData = {
            username: response.data.username,
            password: response.data.password,
            location: response.data.location,
            img: response.data.img1,
            year: response.data.year,
            mode: response.data.mode,
            model: response.data.model,
            make: response.data.make,
         };
         console.log(response)
         setData(userData)
      }
      else
         setData(null)
    });
}

const Search = (setData, props = null) =>{
   axios.post("http://" + IP + ":4000/app/search", props)
   .then((response) => {
      if (response.data != ''){
         const users = Array()
         for (var user of response.data){
            users.push(user)
         }
         setData(users);
      }
      else
         setData(null)
    }); 
}

const SignUp = (props) =>{
   let data = new FormData();
   Object.keys(props).forEach((key)=>{
    data.append(key,props[key] )
   })
   axios.post("http://" + IP + ":4000/app/signup", data, {headers: {
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

const Update = (props) =>{
   const requests = {
      filter: props.user,
      updates: props.updates
   }
   axios.post("http://" + IP + ":4000/app/update", requests)
   .then((response) => {
      return true
    })
    .catch(() =>{
      return false
    }); 
}

export {login, Search, Update, SignUp};