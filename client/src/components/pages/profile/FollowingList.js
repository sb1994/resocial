import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getFollowing } from "../../../store/actions/userAuthActions";
import FollowingCard from "./FollowingCard";
const FollowingList = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  let { loading, following, isAuthenticated } = auth;

  console.log(following);
  useEffect(() => {
    dispatch(getFollowing(params.id));
  }, []);
  return (
    <Col lg={12}>
      <Row>
        {following.length > 0
          ? following.map((user) => (
              <FollowingCard key={user.user._id} followingUser={user.user} />
            ))
          : null}
      </Row>
    </Col>
  );
};

export default FollowingList;
