import React from "react";
import { Card, Col } from "react-bootstrap";
import { NavLink, Row } from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";
import {
  followUser,
  unFollowUser,
} from "../../../store/actions/userAuthActions";
import { useDispatch, useSelector } from "react-redux";

const FollowingCard = ({ followingUser }) => {
  let alreadyFollows;
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  let { user, isAuthenticated } = auth;

  if (followingUser.followers !== undefined && isAuthenticated) {
    console.log("Searched User Followers Not Found");
    alreadyFollows = followingUser.followers.some((follower) => {
      return follower.user.toString() === user._id.toString();
    });
  } else {
  }
  return (
    <Col lg={3} sm={4}>
      <Card className="follower-list-card">
        <img
          src={followingUser.profile_pic}
          alt=""
          style={{ height: "50px", width: "50px", borderRadius: "50%" }}
          className="img-fluid follower-list-card__img"
        />
        <LinkContainer
          to={`/profile/${followingUser._id}`}
          className="follower-list-card__link"
        >
          <h4 className="follower-list-card__link-text">
            {followingUser.firstName}
          </h4>
        </LinkContainer>
      </Card>
    </Col>
  );
};

export default FollowingCard;
