
import React, { useEffect, useState } from "react";
import "../App.css";
import { Form, Row, Col } from "react-bootstrap";
import axios from "../axios.js";
import { Link } from "react-router-dom";

const Registration = props => {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [Error, setError] = useState("");
    const [confirm, setconfirm] = useState("");
    const [email, setemail] = useState("");

    const Register = () => {
        axios
            .post("register", {
                username: Username,
                password: Password,
                confirm: confirm,
                email: email
            })
            .then((response) => {
                setError("");
                console.log(response)
                props.history.replace("/Login");
            })
            .catch(function (error) {
                if (error.response) {
                setError(error.response.data.msg);

                }
            })
    }
    return (
        <div className="login-container">
            <h1 style={{ marginBottom: "60px" }}>Registration</h1>
            <div>
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
                <Form.Group as={Row} controlId="formPlaintextEmail">
                    <Form.Label column sm="4">
                        Email
          </Form.Label>
                    <Col sm="8">
                        <Form.Control
                            type="text"
                            placeholder="Email@something.com"
                            onChange={(e) => {
                                setemail(e.target.value);
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
                <Form.Group as={Row} controlId="formPlaintextConfirmPassword">
                    <Form.Label column sm="4" style={{ whiteSpace: 'nowrap', fontSize: "15px" }}>
                        Confirm Password
          </Form.Label>
                    <Col sm="8">
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            onChange={(e) => {
                                setconfirm(e.target.value);
                                setError('')
                            }}
                        />
                    </Col>
                </Form.Group>
            </div>


            <p style={{ fontSize: "12px", color: "red", margin: 0, height: "18px" }}>
                {Error}
            </p>
            <button
                className="btn btn-success"
                style={{ marginTop: "30px", width: "120px" }}
                disabled={Username !== "" && Password !== "" && confirm !== "" && email !== "" ? false : true}
                onClick={Register}
            >
                Register
        </button>
            <Link to="/Login">or Sign in?</Link>
        </div>
    );
};

export default Registration;