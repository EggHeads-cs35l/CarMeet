import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Profile from "../pages/profile";
import Stack from "../pages/stack";

function Router(){
    return (
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                {/* For testing stack */}
                <Route path="/stack" element={<Stack />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router