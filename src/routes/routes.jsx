import React from "react";
import { Route, Routes} from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Signup from "../pages/signup";
import EditProfile from "../pages/edit-profile";
import ProfilePrivate from "../pages/private-profile";
import ProfilePublic from "../pages/public-profile";
import Stack from "../pages/stack";

function Router() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProfilePrivate />} />
        <Route path="/:user" element={<ProfilePublic />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/stack" element={<Stack />} />
      </Routes>
  );
}

export default Router;
