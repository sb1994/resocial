import React, { useEffect, useState } from "react";

import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import {
  Nav,
  Navbar,
  Modal,
  ModalBody,
  Button,
  Row,
  Col,
} from "react-bootstrap";
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
import "./NavBar.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/actions/userAuthActions";
import UploadImageCard from "../posts/UploadImageCard";
const NavBar = ({ socket }) => {
  const [show, setShow] = useState(true);
  const [photosFiles, setPhotosFiles] = useState([]);
  const [photosFilesUrls, setPhotosFilesUrls] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let { user, isAuthenticated } = auth;

  const history = useHistory();
  const logoutHandler = () => {
    dispatch(logoutUser());

    if (socket) {
      socket.disconnect();
    }
  };

  const handleRemoveFile = (url, name) => {
    let filteredFileList = photosFiles.filter(
      (photo, i) => photo.name.toString() !== name.toString()
    );

    // console.log(filteredFileList, photosFiles);

    // console.log(filteredFileUrls, photosFilesUrls);

    const fileURLsArray = Array.from(filteredFileList).map((file) =>
      URL.createObjectURL(file)
    );

    const fileObjects = Array.from(filteredFileList).map((file) => file);

    setPhotosFilesUrls(fileURLsArray);
    setPhotosFiles(fileObjects);
  };

  const handleFiles = (e) => {
    console.log(e.target.files);

    if (e.target.files.length > 0) {
      // creating the preview urls
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      const fileObjects = Array.from(e.target.files).map((file) => file);

      setPhotosFilesUrls(fileArray);
      setPhotosFiles(fileObjects);
    } else {
      console.log("Not working");
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("recivedNotification", (data) => {
        console.log(data);
      });
    }
  }, []);

  let renderPhotos = (source) => {
    return source.map((photo, index) => {
      return (
        <UploadImageCard
          key={index}
          index={index}
          name={photo.name}
          photo={photosFiles[index]}
          handleRemoveFile={handleRemoveFile}
          url={photo}
        />
      );
    });
  };
  return (
    <Navbar bg="dark" variant="dark" expand="sm" collapseOnSelect>
      <Navbar.Brand>ReSocial </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {isAuthenticated ? (
            <>
              <Button onClick={setShow}>Add Post</Button>
              <LinkContainer to={`/dashboard/${user._id}`}>
                <Nav.Link>Dashboard</Nav.Link>
              </LinkContainer>
              <Button onClick={logoutHandler}>Logout</Button>
            </>
          ) : (
            <>
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/register">
                <Nav.Link>Register</Nav.Link>
              </LinkContainer>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
      <Modal show={show} onHide={setShow}>
        <Modal.Header closeButton>
          <Modal.Title>Add Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="form">
            <Col lg={12} className="form__description">
              <textarea
                name="description"
                className="w-100 form__description-input"
                id="description"
                placeholder={`${user.firstName}, what is on your mind? `}
              ></textarea>
            </Col>
            <Col lg={12} className="form__upload-inputs mb-3">
              <Row>{renderPhotos(photosFilesUrls)}</Row>
              <Row>
                <Col sm={12}>
                  <label class="btn btn-default btn-file">
                    <Icon icon={faUpload} />
                    <input
                      type="file"
                      style={{ display: "none" }}
                      multiple
                      name="photos"
                      onChange={handleFiles}
                      onClick={(e) => (e.target.value = null)}
                    />
                  </label>
                  <span></span>
                </Col>
              </Row>
            </Col>
            <Col lg={12}>
              <Button variant="primary" className="btn-block">
                Save
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </Navbar>
  );
};

export default NavBar;
