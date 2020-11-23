import React, { useEffect, useState } from "react";
import "../App.css";
import { Form, Row, Col } from "react-bootstrap";
import axios from "../axios.js";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState("");
  const login = (event) => {
    // props.history.replace("/Main");
    event.preventDefault();
    axios
      .post("auth/login", {
        username: Username,
        password: Password,
      })
      .then((response) => {
        setError("");
        axios.defaults.headers.common.Authorization = response.data;
        localStorage.setItem("token",response.data);
        props.history.replace("/Main");
      })
      .catch(function (error) {
        if (error.response) {
          setError(error.response.data.msg);

        }
      })
  };

  return (
    <div className="login-container">
      <h1 style={{ marginBottom: "60px" }}>Welcome</h1>
      <Form.Group as={Row} controlId="formPlaintextUsername">
        <Form.Label column sm="4">
          Username
          </Form.Label>
        <Col sm="8">
          <Form.Control
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
              setError('')
            }}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formPlaintextPassword">
        <Form.Label column sm="4">
          Password
          </Form.Label>
        <Col sm="8">
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
              setError('')
            }}
          />
        </Col>
      </Form.Group>


      <p style={{ fontSize: "12px", color: "red", margin: 0, height: "18px" }}>
        {Error}
      </p>
      <button
        className="btn btn-success"
        style={{ marginTop: "30px", width: "120px" }}
        disabled={Username !== "" && Password !== "" ? false : true}
        onClick={login}
      >
        Login
        </button>
      <Link to="/Register">or Sign up?</Link>
    </div>
  );
};

export default Login;