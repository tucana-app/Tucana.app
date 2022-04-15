import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faUserCircle,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import dateFormat from "dateformat";

import GoBack from "../../components/GoBack";

function MyPassengerProfile(props) {
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div data-aos="slide-left">
      <GoBack />

      <Container className="pt-5 text-center">
        <Row>
          <Col>
            <h1 className="text-success">Your profile</h1>
          </Col>
        </Row>

        <Row className="py-3">
          <Col className="text-center">
            <FontAwesomeIcon
              icon={faUserCircle}
              className="text-secondary mb-1"
              size={"6x"}
            />
          </Col>
        </Row>

        <Row className="justify-content-center align-items-center text-center text-sm-start mb-3">
          <Col xs={12} sm={4} className="text-center">
            <h3 className="mb-0">
              {currentUser.firstName} {currentUser.lastName}{" "}
            </h3>
            <p>
              <Link to="/coming-soon">Edit</Link>
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center align-items-center text-center text-sm-start mb-1">
          <Col xs={12} sm={4} className="text-md-end">
            <h4 className="text-secondary">Rating</h4>
          </Col>
          <Col xs={12} sm={4}>
            <h4>
              <span className="text-secondary">-</span> / 5
            </h4>
          </Col>
        </Row>

        <Row className="text-center mb-5">
          <Col>
            <LinkContainer to="/my-profile/passenger/ratings">
              <Button variant="warning" size={"lg"} className="rounded-0">
                Ratings{" "}
                <FontAwesomeIcon icon={faChevronRight} className="ms-2" />
              </Button>
            </LinkContainer>
          </Col>
        </Row>

        <Row className="justify-content-center align-items-center text-center text-sm-start mb-3">
          <Col xs={12} sm={4} className="text-md-end">
            <span className="text-secondary">Username</span>
          </Col>
          <Col xs={12} sm={4}>
            <span>{currentUser.username}</span>
          </Col>
        </Row>

        <Row className="justify-content-center align-items-center text-center text-sm-start mb-3">
          <Col xs={12} sm={4} className="text-md-end">
            <span className="text-secondary">Email</span>
          </Col>
          <Col xs={12} sm={4}>
            <span>{currentUser.email}</span>
          </Col>
        </Row>

        <Row className="justify-content-center align-items-center text-center text-sm-start mb-3">
          <Col xs={12} sm={4} className="text-md-end">
            <span className="text-secondary">Phone number</span>
          </Col>
          <Col xs={12} sm={4}>
            <span>{currentUser.phoneNumber}</span>
          </Col>
        </Row>

        {/* <Row className="justify-content-center align-items-center text-center text-sm-start mb-3">
          <Col xs={12} sm={4} className="text-md-end">
            <span className="text-secondary">Biography</span>
          </Col>
          <Col xs={12} sm={4}>
            <span>{currentUser.biography}</span>
          </Col>
        </Row> */}

        {/* <Row className="justify-content-center align-items-center text-center text-sm-start mb-3">
          <Col xs={12} sm={4} className="text-md-end">
            <span className="text-secondary">Phone verified</span>
          </Col>
          <Col xs={12} sm={4}>
            {currentUser.phoneConfirmed ? (
              <span className="text-success">
                <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
                Yes
              </span>
            ) : (
              <span className="text-danger">
                <FontAwesomeIcon icon={faTimesCircle} className="me-2" />
                No
              </span>
            )}
          </Col>
        </Row> */}

        <Row className="justify-content-center align-items-center text-center text-sm-start mb-3">
          <Col xs={12} sm={4} className="text-md-end">
            <span className="text-secondary">Driver's profile verified</span>
          </Col>
          <Col xs={12} sm={4}>
            {currentUser.Driver && currentUser.Driver.verified ? (
              <span className="text-success">
                <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
                Yes
              </span>
            ) : (
              <span className="text-danger">
                <FontAwesomeIcon icon={faTimesCircle} className="me-2" />
                No
              </span>
            )}
          </Col>
        </Row>

        <Row className="justify-content-center align-items-center text-center text-sm-start mb-5">
          <Col xs={12} sm={4} className="text-md-end">
            <span className="text-secondary">Member since</span>
          </Col>
          <Col xs={12} sm={4}>
            {dateFormat(currentUser.createdAt, "dd/mm/yyyy")}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MyPassengerProfile;