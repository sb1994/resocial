import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import Moment from "react-moment";

const PostCommentListItem = ({ comment }) => {
  return (
    <Col sm={12} lg={12} className="post-detail__comment mt-2 mb-2">
      <Row>
        <Col sm={12} xs={12}>
          <img
            className="post-detail__comment-img mr-1"
            src={comment.user.profile_pic}
            alt=""
          />
          <span className="post-detail__comment-name">
            {comment.user.firstName}:
          </span>
          <p className="post-detail__comment-comment">{comment.comment}</p>
        </Col>
        <Col sm={12}>
          <span className="post-detail__comment-date">
            <Moment fromNow>{comment.createdAt}</Moment>
          </span>
        </Col>
      </Row>
    </Col>
  );
};

export default PostCommentListItem;
