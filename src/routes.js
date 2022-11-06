import React from 'react'
import Home from "./home";
import Profile from "./profile";
import {Routes, Route} from "react-router-dom";

const routes=()=>{
    return(
        <Routes>
            <Route path="/Home" component={Home}/>
            <Route path="/Profile" component={Profile}/>
        </Routes>
    )
}

export default routes