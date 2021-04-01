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
import PostDetail from "./components/posts/PostDetail";
const App = () => {
  // const [socket, setSocket] = useState(null);
  // const [currentUsers, setCurrentUsers] = useState([]);
  const auth = useSelector((state) => state.auth);
  let { isAuthenticated, loading } = auth;

  const setAuthState = () => {
    // console.log(token);
  };
  useEffect(() => {
    // setupSocket();
    const token = localStorage.getItem("token");

    if (token) {
      setUserToken(token);
      store.dispatch(getCurrentUser());
    }
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
              path="/post/:id"
              render={() => (
                // <Dashboard socket={socket} currentUsers={currentUsers} />
                <PostDetail />
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
              path="/user/:id/edit"
              component={
                ProfileEdit
                // <ProfileEdit socket={socket} currentUsers={currentUsers} />
              }
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
