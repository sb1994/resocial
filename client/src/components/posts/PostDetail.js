import React, { useEffect } from "react";
import { Col, Row, Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { getSelectedPost } from "../../store/actions/postActions";
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

  let { selectedPost, postsLoading } = post;

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
            <Col lg={6} sm={12} className="post-detail__content mt-3">
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
                ) : null}
              </Row>
            </Col>
            <Col sm={12} lg={6}></Col>
          </Row>
        )}
      </Col>
    </>
  );
};

export default PostDetail;
