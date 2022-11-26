import React from "react";
import { Route, Routes} from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import ProfilePrivate from "../pages/private-profile";
import ProfilePublic from "../pages/public-profile";
import Stack from "../pages/stack";

function Router() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<ProfilePrivate />} />
        <Route path="/:user" element={<ProfilePublic />} />
        <Route path="/login" element={<Login />} />
        {/* For testing stack */}
        <Route path="/stack" element={<Stack />} />
      </Routes>
  );
}

export default Router;
