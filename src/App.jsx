import React from 'react';
import {BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Profile from './profile';
import Login from './login';
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
function App(){
    return (
        <div className = "wrapper">
            <BrowserRouter>
            {/*<nav>
                <ul>
                    <li><Link to="/Profile">Profile</Link></li>
                    <li><Link to="/Login">Login</Link></li>
                </ul>
            </nav>*/}
                <Routes>
                    <Route path="/Profile" element={<Profile />}/>
                    <Route path="/" element={<Login />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;