import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import GoBack from "../../components/GoBack";
import { CheckIcon } from "@primer/octicons-react";

function Settings() {
  const { isLoggedIn } = useSelector((state) => state.user);

  const [showModalRemoveAccount, setShowModalRemoveAccount] = useState(false);
  const [showModalRequestData, setShowModalRequestData] = useState(false);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div data-aos="fade-in">
      <GoBack />

      <Container className="my-5">
        <Row className="mb-5">
          <Col>
            <h1 className="text-success text-center">Settings</h1>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col className="text-center">
            <Button
              variant="outline-primary"
              onClick={() => setShowModalRequestData(true)}
            >
              Request my data
            </Button>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col className="text-center">
            <Button
              variant="outline-danger"
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
            <CheckIcon size={24} className="me-2" />
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
            <CheckIcon size={24} className="me-2" />
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

export default Settings;
