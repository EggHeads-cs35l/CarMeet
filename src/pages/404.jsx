import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    /*MIT License: Credits to https://codepen.io/felixdorn/pen/YgLovz*/
    <div
      class="container"
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <h1 class="row justify-content-center font-weight-bold">404</h1>
      <br></br>
      <h1>
        <span class="ascii row justify-content-center">(╯°□°）╯︵ ┻━┻</span>
      </h1>
      <br></br>
      <Button
        class="justify-content-center"
        size="lg"
        onClick={() => navigate("/home")}
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        Home
      </Button>
    </div>
  );
}
