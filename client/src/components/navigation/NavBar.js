import React, { useEffect } from "react";

import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/actions/userAuthActions";
const NavBar = ({ socket }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  let { user, isAuthenticated } = auth;

  const logoutHandler = () => {
    dispatch(logoutUser());

    if (socket) {
      socket.disconnect();
    }
  };

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     history.push("/login");
  //   }
  // }, [isAuthenticated]);
  useEffect(() => {
    if (socket) {
      socket.on("recivedNotification", (data) => {
        console.log(data);
      });
    }
  }, []);
  return (
    <Navbar bg="dark" variant="dark" expand="sm" collapseOnSelect>
      <Navbar.Brand>ReSocial </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {isAuthenticated ? (
            <>
              <LinkContainer to={`/dashboard/${user._id}`}>
                <Nav.Link>Dashboard</Nav.Link>
              </LinkContainer>
              <button onClick={logoutHandler}>Logout</button>
            </>
          ) : (
            <>
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/register">
                <Nav.Link>Register</Nav.Link>
              </LinkContainer>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
