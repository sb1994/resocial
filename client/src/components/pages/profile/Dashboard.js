import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSearchedUser } from "../../../store/actions/userAuthActions";
import { getSelectedFeedPosts } from "../../../store/actions/postActions";
import ProfileCard from "./ProfileCard";
import ProfilePostsList from "../../posts/ProfilePostsList";

const Dashboard = ({ match, socket }) => {
  const params = useParams();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const post = useSelector((state) => state.post);

  let { loading, searchedUser, isAuthenticated, user } = auth;

  useEffect(() => {
    dispatch(getSearchedUser(params.id));

    dispatch(getSelectedFeedPosts(params.id));
  }, [loading]);

  let alreadyFollowed = false;

  if (searchedUser.followers !== undefined && isAuthenticated) {
    console.log("can evaluate searchedUser followers");

    alreadyFollowed = searchedUser.followers.some(
      (follower) => follower.user === user._id
    );
  } else {
    console.log("CANT evaluate searchedUser followers");
  }

  return (
    <Row className="mt-3">
      {loading && searchedUser === undefined ? null : (
        <>
          <ProfileCard searchedUser={searchedUser} />
          <>
            {/* checking the status of the loggedin user with the searchedUser */}
            {(isAuthenticated && user._id === searchedUser._id) ||
            alreadyFollowed ? (
              <>
                <ProfilePostsList />
              </>
            ) : (
              <>
                <p>
                  Need to be Loggedin and following this user to see their posts
                </p>
              </>
            )}
          </>
        </>
      )}
    </Row>
  );
};

export default Dashboard;
