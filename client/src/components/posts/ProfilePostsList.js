import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import ProfilePostCard from "./ProfilePostCard";

const ProfilePostsList = () => {
  const post = useSelector((state) => state.post);

  let { selectedFeedPosts, postsLoading } = post;
  // console.log(post.selectedFeedPosts);

  return (
    <>
      {postsLoading ? (
        <p>Loading</p>
      ) : (
        <Col lg={12}>
          <h2>Posts</h2>
          <Row>
            {selectedFeedPosts !== undefined
              ? selectedFeedPosts.map((post) => (
                  <ProfilePostCard post={post} key={post._id} />
                ))
              : null}
          </Row>
        </Col>
      )}
    </>
  );
};

export default ProfilePostsList;
