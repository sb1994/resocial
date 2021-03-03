import React from "react";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FormContainer from "../../form/FormContainer";

import { loginAuth } from "../../../store/actions/userAuthActions";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
const LoginPage = () => {
  const [email, setEmail] = useState("sbboyle94@gmail.com");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.auth);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginAuth(email, password));
  };
  return (
    <FormContainer>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>password Address</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Login
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer? <Link to={"/register"}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;
