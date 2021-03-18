import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getFollowers } from "../../../store/actions/userAuthActions";
import FollowerCard from "./FollowerCard";
const FollowersList = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  let { loading, followers, isAuthenticated } = auth;

  console.log(followers);
  useEffect(() => {
    dispatch(getFollowers(params.id));
  }, []);
  return (
    <Col lg={12}>
      <Row>
        {followers.length > 0
          ? followers.map((user) => (
              <FollowerCard key={user.user._id} followedUser={user.user} />
            ))
          : null}
      </Row>
    </Col>
  );
};

export default FollowersList;
