import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSearchedUser } from "../../../store/actions/userAuthActions";
import ProfileCard from "./ProfileCard";

const Dashboard = ({ match, socket }) => {
  const params = useParams();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  let { loading, searchedUser, isAuthenticated } = auth;

  useEffect(() => {
    dispatch(getSearchedUser(params.id));

    // if (socket) {
    //   console.log(socket);
    //   console.log("Dashboard Socket Connected");
    // }
  }, [loading]);
  // useEffect(() => {
  //   if (socket) {
  //     socket.on("broadcast", (data) => {
  //       console.log(data);
  //     });
  //   }
  // }, []);

  return (
    <Row className="mt-3">
      {loading && searchedUser === undefined ? null : (
        <>
          <ProfileCard searchedUser={searchedUser} />{" "}
        </>
      )}
    </Row>
  );
};

export default Dashboard;
