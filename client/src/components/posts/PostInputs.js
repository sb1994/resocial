import React from "react";
import { Col } from "react-bootstrap";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faEye as Watched,
  faCoffee,
  faHeart as Liked,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as NotLiked,
  faEye as NotWatched,
} from "@fortawesome/free-regular-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./PostInputs.css";
import { addPostLike, removePostLike } from "../../store/actions/postActions";

const PostInputs = ({ likes }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const post = useSelector((state) => state.post);

  let { isAuthenticated, user } = auth;
  let { selectedPost } = post;

  const likePost = () => {
    console.log("add post like");
    dispatch(addPostLike(selectedPost._id));
  };
  const removeFromLikesList = () => {
    console.log("remove like");
    dispatch(removePostLike(selectedPost._id));
  };

  let postAlreadyLiked;

  postAlreadyLiked = likes.some((like) => {
    return like.user === user._id;
  });

  return (
    <Col lg={12} className="post-inputs">
      {isAuthenticated ? (
        <>
          {postAlreadyLiked ? (
            <Icon
              icon={Liked}
              size={"2x"}
              onClick={removeFromLikesList}
              style={{ cursor: "pointer", color: "red" }}
            />
          ) : (
            <Icon
              icon={NotLiked}
              size={"2x"}
              onClick={likePost}
              style={{ cursor: "pointer" }}
            />
          )}
        </>
      ) : (
        <Icon icon={NotLiked} />
      )}

      <span className="post-inputs__likes-count-text">{likes.length}</span>
    </Col>
  );
};

export default PostInputs;
