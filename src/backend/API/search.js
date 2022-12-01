import axios from "axios";

const Search = (setData, props = null) =>{
   axios.post("http://131.179.49.113:4000/app/search", props)
   .then((response) => {
      if (response.data != null){
         const users = Array()
         for (var user of response.data){
            users.push(user)
         }
         console.log(users)
         setData(users);
      }
    }); 
}

export default Search;