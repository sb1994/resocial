// import React, { useEffect, useState } from "react";
import React, { useEffect } from "react";
import "./App.css";
// import io from "socket.io-client";
import { Switch, Route } from "react-router-dom";
// application pages that will be used in the route
import LoginPage from "./components/pages/auth/LoginPage";
import RegisterPage from "./components/pages/auth/RegisterPage";
import Dashboard from "./components/pages/profile/Dashboard";
import LandingPage from "./components/pages/landing/LandingPage";
import { useSelector } from "react-redux";
import setUserToken from "./utils/setUserToken";
import store from "./store";
import { getCurrentUser } from "./store/actions/userAuthActions";
import NavBar from "./components/navigation/NavBar";
import { Container } from "react-bootstrap";
import ProfileEdit from "./components/pages/profile/ProfileEdit";
import FollowersList from "./components/pages/profile/FollowersList";
import FollowingList from "./components/pages/profile/FollowingList";
const App = () => {
  // const [socket, setSocket] = useState(null);
  // const [currentUsers, setCurrentUsers] = useState([]);
  const auth = useSelector((state) => state.auth);
  let { isAuthenticated, loading } = auth;

  const setAuthState = () => {
    // console.log(token);
    const token = localStorage.getItem("token");
    console.log(isAuthenticated);

    if (token) {
      console.log("authenticated");
      setUserToken(token);
      store.dispatch(getCurrentUser());
    }
    // if (!loading && isAuthenticated && !socket) {
    //   console.log("can create the socket");
    //   const newSocket = io("http://localhost:5000", {
    //     query: {
    //       token,
    //     },
    //   });
    //   newSocket.on("connectedUsers", (data) => {
    //     setCurrentUsers(data.connectedUsers);
    //     console.log(data);
    //   });

    //   newSocket.on("disconnect", () => {
    //     setTimeout(setAuthState, 3000);
    //     setSocket(null);
    //   });

    //   newSocket.on("connection", (data) => {
    //     // console.log(data);
    //   });
    //   setSocket(newSocket);
    // }
  };
  useEffect(() => {
    setAuthState();
    // setupSocket();
  }, [isAuthenticated]);
  return (
    <Container>
      <NavBar />
      {/* <NavBar socket={socket ? socket : null} /> */}
      <Switch>
        {!loading ? (
          <>
            <Route path="/" component={LandingPage} exact />

            <Route path="/login" render={() => <LoginPage />} exact />
            <Route path="/register" component={RegisterPage} exact />
            <Route
              path="/dashboard/:id"
              render={() => (
                // <Dashboard socket={socket} currentUsers={currentUsers} />
                <Dashboard />
              )}
              exact
            />
            <Route
              path="/profile/:id"
              render={() => (
                // <Dashboard socket={socket} currentUsers={currentUsers} />
                <Dashboard />
              )}
              exact
            />
            <Route
              path="/user/edit"
              render={() => (
                <ProfileEdit />
                // <ProfileEdit socket={socket} currentUsers={currentUsers} />
              )}
            />
            <Route
              path="/profile/:id/followers"
              render={() => (
                // <FollowersList socket={socket} currentUsers={currentUsers} />
                <FollowersList />
              )}
              exact
            />
            <Route
              path="/profile/:id/following"
              render={() => (
                // <FollowersList socket={socket} currentUsers={currentUsers} />
                <FollowingList />
              )}
              exact
            />
          </>
        ) : null}
      </Switch>
    </Container>
  );
};

export default App;
