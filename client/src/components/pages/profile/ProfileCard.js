import React, { useEffect } from "react";
import { Col, NavLink, Row } from "react-bootstrap";
import {
  followUser,
  unFollowUser,
} from "../../../store/actions/userAuthActions";
import { useDispatch, useSelector } from "react-redux";
import "./ProfileCard.css";
import { Link } from "react-router-dom";
const ProfileCard = ({ searchedUser }) => {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  let { user, isAuthenticated } = auth;

  const handleFollowUser = () => {
    dispatch(followUser(searchedUser._id));
  };
  const handleUnFollowUser = () => {
    console.log(user._id);
    dispatch(unFollowUser(searchedUser._id));
  };

  let alreadyFollows;

  if (searchedUser.followers === undefined) {
    console.log("hello");
  } else {
    console.log(searchedUser.followers);
    alreadyFollows = searchedUser.followers.some((follower) => {
      return follower.user.toString() === user._id.toString();
    });
  }

  console.log(alreadyFollows);

  return (
    <Col sm={12} className="profile-card">
      <Row>
        <Col sm={6} xs={12} lg={6} className="profile-card__img-container">
          <img className="profile-card__img " src={searchedUser.profile_pic} />
        </Col>
        <Col sm={6} xs={12} lg={6}>
          <Row>
            <Col lg={12} sm={12} className="profile-card__info-container">
              <h3 className="profile-card__info-container-name">
                {" "}
                {searchedUser.firstName} {searchedUser.lastName}
              </h3>

              {user._id === searchedUser._id && isAuthenticated ? (
                <Link
                  className="btn btn-warning profile-card__info-container-link"
                  to="/user/edit"
                >
                  Edit Profile
                </Link>
              ) : null}
              {user._id !== searchedUser._id && isAuthenticated ? (
                alreadyFollows ? (
                  // console.log(alreadyFollows)
                  <button
                    className="btn btn-primary"
                    onClick={handleUnFollowUser}
                  >
                    Unfollow {}
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={handleFollowUser}
                  >
                    Follow {}
                  </button>
                  // console.log();
                )
              ) : null}
            </Col>
            <Col lg={12} sm={12} className="profile-card__social-container">
              <Link
                className="mr-5"
                to={`/profile/${searchedUser._id}/followers`}
              >
                Followers{" "}
                {searchedUser.followers !== undefined
                  ? searchedUser.followers.length
                  : 0}
              </Link>
              <Link className="" to={`/profile/${searchedUser._id}/following`}>
                Following{" "}
                {searchedUser.following !== undefined
                  ? searchedUser.following.length
                  : 0}
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default ProfileCard;
