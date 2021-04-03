import React, { useEffect, useState } from "react";
import { Col, Row, Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  createComment,
  getSelectedPost,
} from "../../store/actions/postActions";
import Moment from "react-moment";
import "./PostDetail.css";
import HeaderDetails from "./HeaderDetails";
import PostCommentsList from "./PostCommentsList";
import PostInputs from "./PostInputs";
const PostDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const post = useSelector((state) => state.post);
  const auth = useSelector((state) => state.auth);

  const [commentText, setCommentText] = useState("");

  let { selectedPost, postsLoading } = post;

  const handleChangeCommentText = (e) => {
    setCommentText(e.target.value);
  };
  const handleCommentEnter = (e) => {
    // console.log(e.);

    if (e.key === "Enter" && commentText !== "") {
      console.log(e.key);
      // console.log(commentText);
      dispatch(createComment(selectedPost._id, commentText));

      setCommentText("");
    }
  };

  let { user, isAuthenticated } = auth;
  // let { user } = selectedPost;
  useEffect(() => {
    dispatch(getSelectedPost(params.id));
  }, [postsLoading]);
  return (
    <>
      <Col lg={12} className="post-detail card mt-3">
        {postsLoading && selectedPost.user === undefined ? (
          <p>Loading</p>
        ) : (
          <Row>
            {selectedPost.user !== undefined ? (
              <HeaderDetails
                position="higher"
                user={selectedPost.user}
                createdAt={selectedPost.createdAt}
              />
            ) : null}

            <Col lg={6} sm={12} className="post-detail__carousel mt-3">
              <Carousel>
                {!postsLoading && selectedPost.photos !== undefined
                  ? selectedPost.photos.map((photo, i) => (
                      <Carousel.Item key={i}>
                        <img
                          className="dp-block w-100 post-detail__carousel-img img-fluid"
                          src={photo}
                          alt="First slide"
                        />
                      </Carousel.Item>
                    ))
                  : null}
              </Carousel>
            </Col>
            <Col lg={6} sm={12} className="post-detail__content mt-3 ">
              <Row>
                {selectedPost.user !== undefined ? (
                  <HeaderDetails
                    position="lower"
                    user={selectedPost.user}
                    createdAt={selectedPost.createdAt}
                  />
                ) : null}
              </Row>
              <Row>
                {selectedPost.likes !== undefined && (
                  <PostInputs likes={selectedPost.likes} />
                )}
              </Row>
              <Row>
                {!postsLoading && selectedPost.comments !== undefined ? (
                  <PostCommentsList comments={selectedPost.comments} />
                ) : (
                  <h2>No Comments</h2>
                )}
              </Row>
              <Row>
                {isAuthenticated ? (
                  <input
                    type="text"
                    className="post-detail__content--comment-input"
                    value={commentText}
                    placeholder="Press enter to save post"
                    onChange={handleChangeCommentText}
                    onKeyPress={handleCommentEnter}
                  />
                ) : null}
              </Row>
            </Col>
          </Row>
        )}
      </Col>
    </>
  );
};

export default PostDetail;
