import axios from "axios";

const Search = (setData, props = null) =>{
   axios.post("http://131.179.49.113:4000/app/search", {})
   .then((response) => {
      if (response.data != null){
         const users = Array()
         for (var user of response.data){
            users.push(user)
         }
         setData(users);
      }
    });
}

export default Search;