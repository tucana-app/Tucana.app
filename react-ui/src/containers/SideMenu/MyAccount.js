import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import dateFormat from "dateformat";
import GoBack from "../../components/GoBack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

function MyAccount() {
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div data-aos="slide-left">
      <GoBack />

      <Container className="my-5">
        <Row className="mb-5">
          <Col>
            <h1 className="text-success text-center">My account information</h1>
          </Col>
        </Row>

        <Row className="justify-content-center text-center text-sm-start mb-3">
          <Col xs={12} sm={4} className="font-monospace text-secondary">
            First name:
          </Col>
          <Col xs={12} sm={4}>
            {currentUser.firstName}
          </Col>
        </Row>

        <Row className="justify-content-center text-center text-sm-start mb-3">
          <Col xs={12} sm={4} className="font-monospace text-secondary">
            Last name:
          </Col>
          <Col xs={12} sm={4}>
            {currentUser.lastName}
          </Col>
        </Row>

        <Row className="justify-content-center text-center text-sm-start mb-3">
          <Col xs={12} sm={4} className="font-monospace text-secondary">
            Username
          </Col>
          <Col xs={12} sm={4}>
            {currentUser.username}
          </Col>
        </Row>

        <Row className="justify-content-center text-center text-sm-start mb-3">
          <Col xs={12} sm={4} className="font-monospace text-secondary">
            Email
          </Col>
          <Col xs={12} sm={4}>
            {currentUser.email}
          </Col>
        </Row>

        <Row className="justify-content-center text-center text-sm-start mb-3">
          <Col xs={12} sm={4} className="font-monospace text-secondary">
            Phone number
          </Col>
          <Col xs={12} sm={4}>
            {currentUser.phoneNumber}
          </Col>
        </Row>

        <Row className="justify-content-center text-center text-sm-start mb-3">
          <Col xs={12} sm={4} className="font-monospace text-secondary">
            Biography
          </Col>
          <Col xs={12} sm={4}>
            {currentUser.biography}
          </Col>
        </Row>

        <Row className="justify-content-center text-center text-sm-start mb-3">
          <Col xs={12} sm={4} className="font-monospace text-secondary">
            Email verified
          </Col>
          <Col xs={12} sm={4}>
            {currentUser.emailConfirmed ? (
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

        <Row className="justify-content-center text-center text-sm-start mb-3">
          <Col xs={12} sm={4} className="font-monospace text-secondary">
            Phone verified
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
        </Row>

        <Row className="justify-content-center text-center text-sm-start mb-3">
          <Col xs={12} sm={4} className="font-monospace text-secondary">
            Member since
          </Col>
          <Col xs={12} sm={4}>
            {dateFormat(currentUser.createdAt, "dd/mm/yyyy")}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MyAccount;
