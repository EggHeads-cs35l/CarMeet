import React from "react";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "../pages/404";
import EditProfile from "../pages/edit-profile";
import Home from "../pages/home";
import Login from "../pages/login";
import ProfilePrivate from "../pages/private-profile";
import Signup from "../pages/signup";
import Stack from "../pages/stack";
import View from "../pages/view"

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<ProfilePrivate />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/view" element={<View />} />
      <Route path="/stack" element={<Stack />} />
    </Routes>
  );
}

export default Router;
