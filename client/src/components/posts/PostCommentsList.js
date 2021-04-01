import React from "react";
import PostCommentListItem from "./PostCommentListItem";
import "./PostDetail.css";
const PostCommentsList = ({ comments }) => {
  return (
    <div className="post-detail__content--comment-list col-lg-12">
      {comments !== undefined
        ? comments.map((comment, index) => (
            <PostCommentListItem key={index} comment={comment} />
          ))
        : null}
    </div>
  );
};

export default PostCommentsList;
