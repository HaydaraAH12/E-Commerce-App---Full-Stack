import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input
        style={{ padding: "10px", marginBottom: "15px" }}
        type="text"
        placeholder="username"
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        style={{ padding: "10px", marginBottom: "15px" }}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleClick} style={{padding:'10px',width:"100px"}}>Login</button>
    </div>
  );
};

export default Login;
