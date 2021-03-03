import React, { useEffect, useState } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
// application pages that will be used in the route
import LoginPage from "./components/pages/auth/LoginPage";
import RegisterPage from "./components/pages/auth/RegisterPage";
import LandingPage from "./components/pages/landing/LandingPage";
const App = () => {
  const [socket, setSocket] = useState(null);

  const setAuthState = () => {
    const token = localStorage.getItem("token");
    console.log(token);
  };
  useEffect(() => {
    setAuthState();
  }, []);
  return (
    <>
      {socket ? <>Socket Connected</> : <>No Socket</>}
      <Switch>
        <Route path="/" component={LandingPage} exact />

        <Route path="/login" render={() => <LoginPage />} exact />
        <Route path="/register" component={RegisterPage} exact />
        {/* <Route path="/login" component={LoginPage} exact /> */}
        {/* <Route
        path="/dashboard"
        render={() => <DashboardPage socket={socket} />}
        exact
      />
      <Route
        path="/chatroom/:id"
        render={() => <ChatroomPage socket={socket} />}
        exact
      /> */}
      </Switch>
    </>
  );
};

export default App;
