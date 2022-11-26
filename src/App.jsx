import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./App.css";
import Router from "./routes/routes";
function App() {
  return (
    <div className="wrapper">
      <Router />
    </div>
  );
}

export default App;
