import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const ProfileEdit = () => {
  const auth = useSelector((state) => state.auth);

  let { user, isAuthenticated } = auth;
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/login");
    }
  }, [isAuthenticated]);
  return (
    <div>
      <h1>Profile Edit</h1>
    </div>
  );
};

export default ProfileEdit;
