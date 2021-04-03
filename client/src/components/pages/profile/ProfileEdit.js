import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import FormContainer from "../../form/FormContainer";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faEye as Watched,
  faCoffee,
  faHeart as Liked,
  faInfo,
  fa,
  faComments,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as NotLiked,
  faEye as NotWatched,
} from "@fortawesome/free-regular-svg-icons";

import "./ProfileEdit.css";
import {
  getCurrentUser,
  updateUser,
} from "../../../store/actions/userAuthActions";
const ProfileEdit = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const history = useHistory();

  const params = useParams();
  let { user, isAuthenticated, loading } = auth;

  const handleFile = (e) => {
    // console.log(e.target.files);

    if (e.target.files.length > 0) {
      let file = e.target.files[0];

      let previewImage = URL.createObjectURL(file);

      console.log(previewImage);

      setPreviewImage(previewImage);
      setUploadFile(file);
    } else {
      console.log("No File");
    }
  };
  const handleUpdate = () => {
    console.log(uploadFile, lastName, firstName);
    dispatch(updateUser(uploadFile, firstName, lastName));
  };

  const [uploadFile, setUploadFile] = useState(null);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);

  const [previewImage, setPreviewImage] = useState(user.profile_pic);

  useEffect(() => {
    if (!isAuthenticated && params.id !== user._id) {
      history.push("/login");
    } else {
      // dispatch(getCurrentUser());
      console.log("hello");
    }
  }, [isAuthenticated]);
  return (
    <Row>
      <FormContainer>
        <Form>
          <Col className="photo-upload">
            <img src={previewImage} alt="" className="photo-upload__img" />
            <label className="photo-upload__btn p-1">
              <Icon icon={faUpload} className="mr-1" />
              <input
                type="file"
                style={{ display: "none" }}
                name="photo"
                onChange={handleFile}
                onClick={(e) => (e.target.value = null)}
              />
              <span>Change</span>
            </label>
          </Col>
          <Form.Group>
            <Col>
              <Form.Label>Firstname:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Edit First Name"
                value={firstName}
                name="firstName"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Col>
            <Form.Group>
              <Form.Label>Lastname:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Edit First Name"
                value={lastName}
                name="lastName"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Button onClick={handleUpdate}>Update</Button>
            </Form.Group>
          </Col>
        </Form>
      </FormContainer>
    </Row>
  );
};

export default ProfileEdit;
