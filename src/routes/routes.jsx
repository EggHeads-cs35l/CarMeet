import React from "react";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "../pages/404";
import EditProfile from "../pages/edit-profile";
import Home from "../pages/home";
import Login from "../pages/login";
import ProfilePrivate from "../pages/private-profile";
import ProfilePublic from "../pages/public-profile";
import Signup from "../pages/signup";
import Stack from "../pages/stack";
import Chat from "../components/chat";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<ProfilePrivate />} />
      <Route path="/:user" element={<ProfilePublic />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/stack" element={<Stack />} />
      <Route path="/chat" element={<Chat />}/>
    </Routes>
  );
}

export default Router;
