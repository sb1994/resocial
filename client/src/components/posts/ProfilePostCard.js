import React from "react";
import { Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./ProfilePostCard.css";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faEye as Watched,
  faCoffee,
  faHeart as Liked,
  faInfo,
  fa,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as NotLiked,
  faEye as NotWatched,
} from "@fortawesome/free-regular-svg-icons";

const ProfilePostCard = ({ post }) => {
  return (
    <Col lg={3} sm={4} xs={6} className="profile-post-card">
      <LinkContainer to={`/post/${post._id}`}>
        <div className="profile-post-card__img-container">
          <img
            src={post.photos[0]}
            alt=""
            className=" profile-post-card__img"
          />
          <div className="profile-post-card__overlay">
            <span>
              {post.likes.length}
              <Icon icon={Liked} style={{ cursor: "pointer" }} />
            </span>
            <span>
              <Icon icon={faComments} style={{ cursor: "pointer" }} />
              {post.comments.length}
            </span>
          </div>
        </div>
      </LinkContainer>
    </Col>
  );
};

export default ProfilePostCard;
