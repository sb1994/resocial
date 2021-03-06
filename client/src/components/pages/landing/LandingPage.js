import React, { useEffect } from "react";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const LandingPage = () => {
  const history = useHistory();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push(`/dashboard/${auth.user._id}`);
    }
  }, []);
  return (
    <div>
      <h1>LandingPage</h1>
    </div>
  );
};

export default LandingPage;
