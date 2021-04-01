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
  let { user, isAuthenticated, loading } = auth;

  const handleFollowUser = () => {
    dispatch(followUser(searchedUser._id));
    console.log(alreadyFollows);
  };
  const handleUnFollowUser = () => {
    console.log(user._id);
    dispatch(unFollowUser(searchedUser._id));
    console.log(alreadyFollows);
  };

  let alreadyFollows;

  if (searchedUser.followers === undefined) {
    console.log("Searched User Followers Not Found");
  } else {
    if (!isAuthenticated) {
      console.log("Not logged in of course i cant follow someone");
    } else {
      alreadyFollows = searchedUser.followers.some((follower) => {
        return follower.user === user._id;
      });
    }
  }

  return (
    <Col sm={12} className="profile-card">
      {loading ? null : (
        <Row>
          <Col sm={6} xs={12} lg={6} className="profile-card__img-container">
            <img
              className="profile-card__img "
              src={searchedUser.profile_pic}
            />
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
                    to={`/user/${user._id}/edit`}
                  >
                    Edit Profile
                  </Link>
                ) : null}
                {isAuthenticated && user._id !== searchedUser._id ? (
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
                <Link
                  className=""
                  to={`/profile/${searchedUser._id}/following`}
                >
                  Following{" "}
                  {searchedUser.following !== undefined
                    ? searchedUser.following.length
                    : 0}
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </Col>
  );
};

export default ProfileCard;
