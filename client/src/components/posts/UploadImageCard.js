import React from "react";
import { Col } from "react-bootstrap";
import "./UploadImageCard.css";
const UploadImageCard = ({ photo, url, name, index, handleRemoveFile }) => {
  const handleRemoveClick = () => {
    handleRemoveFile(url, photo.name);
  };

  return (
    <Col lg={3} sm={3} className="upload-card">
      <img src={url} alt="upload_img-card" srcset="" className="img-fluid" />
      <div className="upload-card__inputs" onClick={handleRemoveClick}>
        X
      </div>
    </Col>
  );
};

export default UploadImageCard;
