import React from "react";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../../form/FormContainer";
import { registerUser } from "../../../store/actions/userAuthActions";

const RegisterPage = () => {
  const [email, setEmail] = useState("sbboyle94@gmail.com");
  const [password, setPassword] = useState("Seancal123");
  const [firstName, setFirstName] = useState("Sean");
  const [lastName, setLastName] = useState("Boyle");
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.auth);

  const { loading, error, user, isAuthenticated } = auth;

  useEffect(() => {
    if (isAuthenticated) {
      // history.push("/login");
      history.push(`/dashboard/${user._id}`);
      // console.log('');
    }
  }, [isAuthenticated]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser({ firstName, lastName, email, password }));
    console.log("You can register");
  };
  return (
    <FormContainer>
      <h1>RegisterPage</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></Form.Control>
        </Form.Group>
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
          <Form.Label>Password</Form.Label>
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
          Already have an account? <Link to={"/login"}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterPage;
