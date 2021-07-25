import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import dateFormat from "dateformat";
import GoBack from "../../components/GoBack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { LinkContainer } from "react-router-bootstrap";

function MyAccount() {
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);

  const [showModalRemoveAccount, setShowModalRemoveAccount] = useState(false);
  const [showModalRequestData, setShowModalRequestData] = useState(false);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div data-aos="slide-left">
      <GoBack pageName="My account" />

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
            Driver's profile verified
          </Col>
          <Col xs={12} sm={4}>
            {currentUser.Driver.verified ? (
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

        <Row className="justify-content-center text-center text-sm-start mb-5">
          <Col xs={12} sm={4} className="font-monospace text-secondary">
            Member since
          </Col>
          <Col xs={12} sm={4}>
            {dateFormat(currentUser.createdAt, "dd/mm/yyyy")}
          </Col>
        </Row>

        <Row>
          <Col className="d-flex justify-content-center">
            <Button
              variant="outline-warning"
              size="sm"
              className="rounded-0 me-3"
              onClick={() => setShowModalRequestData(true)}
            >
              Request my data
            </Button>

            <Button
              variant="outline-danger"
              size="sm"
              className="rounded-0"
              onClick={() => setShowModalRemoveAccount(true)}
            >
              Remove my account
            </Button>
          </Col>
        </Row>
      </Container>

      <Modal
        show={showModalRequestData}
        onHide={() => setShowModalRequestData(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-dark">
            <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
            Confirm
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="text-dark mb-0">This feature is coming soon.</p>
        </Modal.Body>

        <Modal.Footer>
          <LinkContainer to="/coming-soon">
            <Button variant="success">Let's do it</Button>
          </LinkContainer>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showModalRemoveAccount}
        onHide={() => setShowModalRemoveAccount(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-dark">
            <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
            Confirm
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="text-dark mb-0">This feature is coming soon.</p>
        </Modal.Body>

        <Modal.Footer>
          <LinkContainer to="/coming-soon">
            <Button variant="danger">I want my account removed</Button>
          </LinkContainer>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MyAccount;
