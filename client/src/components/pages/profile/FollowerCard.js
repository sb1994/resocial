import React from "react";
import { Card, Col } from "react-bootstrap";
import { NavLink, Row } from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";
import {
  followUser,
  unFollowUser,
} from "../../../store/actions/userAuthActions";
import { useDispatch, useSelector } from "react-redux";
import "./ProfileCard.css";
import { Link } from "react-router-dom";
const FollowerCard = ({ followedUser }) => {
  const auth = useSelector((state) => state.auth);

  let alreadyFollows;
  let { user, isAuthenticated } = auth;

  if (followedUser.followers === undefined) {
    console.log("Searched User Followers Not Found");
  } else {
    alreadyFollows = followedUser.followers.some((follower) => {
      return follower.user.toString() === user._id.toString();
    });
  }
  return (
    <Col lg={3} sm={4}>
      <Card className="follower-list-card">
        <img
          src={followedUser.profile_pic}
          alt=""
          style={{ height: "50px", width: "50px", borderRadius: "50%" }}
          className="img-fluid follower-list-card__img"
        />
        <LinkContainer
          to={`/profile/${followedUser._id}`}
          className="follower-list-card__link"
        >
          <h4 className="follower-list-card__link-text">
            {followedUser.firstName}
          </h4>
        </LinkContainer>

        {followedUser._id !== user._id && isAuthenticated ? (
          alreadyFollows ? (
            <button>Hello</button>
          ) : null
        ) : null}
      </Card>
    </Col>
  );
};

export default FollowerCard;
