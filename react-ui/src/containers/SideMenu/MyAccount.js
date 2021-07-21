import React from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Col, Container, Row, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import dateFormat from "dateformat";

function MyAccount() {
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div data-aos="slide-left">
      <ListGroup variant="flush">
        <Link to="/menu" className="text-light text-decoration-none">
          <ListGroup.Item className="bg-dark text-white border border-top-0 border-start-0 border-end-0 ">
            <div className="d-inline-flex justify-content-between w-100 py-3">
              <span>
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className="text-success me-3"
                />{" "}
                Go back
              </span>
            </div>
          </ListGroup.Item>
        </Link>
      </ListGroup>

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
