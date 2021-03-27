import React from "react";
import { Col } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import Moment from "react-moment";
const HeaderDetails = ({ user, createdAt, position }) => {
  return (
    <Col lg={12} sm={12} className={`post-detail__header header-${position}`}>
      <div className="post-detail__header-avatar">
        <img
          src={user.profile_pic}
          alt=""
          className="post-detail__header-img "
        />

        <div className="post-detail__header-details">
          <Link
            to={`/profile/${user._id}`}
            className="post-detail__header-name"
          >
            {user.firstName}
          </Link>
          <p className="post-detail__header-date">
            <Moment fromNow>{createdAt}</Moment>
          </p>
        </div>
      </div>
    </Col>
  );
};

export default HeaderDetails;
