import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useTranslation } from "react-i18next";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import {
  // ChevronRightIcon,
  // StarFillIcon,
  CircleIcon,
} from "@primer/octicons-react";
import dateFormat from "dateformat";
import { formatPhoneNumberIntl } from "react-phone-number-input";

import GoBack from "../../components/GoBack";

function PassengerProfile() {
  const { t } = useTranslation();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);

  const [showModalRemoveAccount, setShowModalRemoveAccount] = useState(false);
  const [showModalRequestData, setShowModalRequestData] = useState(false);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div data-aos="fade-in">
      <GoBack />

      <Container className="text-center mb-5">
        <Row>
          <Col className="text-center">
            <CircleIcon size={78} className="text-secondary" />
          </Col>
        </Row>

        <Row className="justify-content-center align-items-center text-center text-sm-start mb-3">
          <Col xs={12} sm={4} className="text-center">
            <h3 className="mb-0">
              {currentUser.firstName} {currentUser.lastName}{" "}
            </h3>
            <p>
              <Link to="/coming-soon">{t("translation:global.edit")}</Link>
            </p>
          </Col>
        </Row>

        {/* RATINGS */}
        {/* <Row className="justify-content-center align-items-center text-center text-sm-start mb-1">
          <Col xs={12} sm={4} className="text-center">
            <h4>
              <span className="text-secondary">
                <StarFillIcon size={24} className="text-warning me-2 mb-1" />-
              </span>
              /5
            </h4>
          </Col>
        </Row>

        <Row className="text-center mb-5">
          <Col>
            <LinkContainer to="/profile/passenger/ratings">
              <Button variant="warning" size={"lg"}>
                Ratings <ChevronRightIcon size={24} />
              </Button>
            </LinkContainer>
          </Col>
        </Row> */}

        <Row className="justify-content-center align-items-center text-center text-sm-start mb-3">
          <Col xs={12} md={6} className="text-center text-md-end">
            <span className="text-secondary">
              {t("translation:global.username")}
            </span>
          </Col>
          <Col className="text-center text-md-start">
            <span>{currentUser.username}</span>
          </Col>
        </Row>

        <Row className="justify-content-center align-items-center text-center text-sm-start mb-3">
          <Col xs={12} md={6} className="text-center text-md-end">
            <span className="text-secondary">
              {t("translation:global.email")}
            </span>
          </Col>
          <Col className="text-center text-md-start">
            <span>{currentUser.email}</span>
          </Col>
        </Row>

        <Row className="justify-content-center align-items-center text-center text-sm-start mb-3">
          <Col xs={12} md={6} className="text-center text-md-end">
            <span className="text-secondary">Phone number</span>
          </Col>
          <Col className="text-center text-md-start">
            <span>{formatPhoneNumberIntl(currentUser.phoneNumber)}</span>
          </Col>
        </Row>

        {/* <Row className="justify-content-center align-items-center text-center text-sm-start mb-3">
          <Col  xs={12} md={6} className="text-center text-md-end">
            <span className="text-secondary">Biography</span>
          </Col>
          <Col className="text-center text-md-start">
            <span>{currentUser.biography}</span>
          </Col>
        </Row> */}

        {/* <Row className="justify-content-center align-items-center text-center text-sm-start mb-3">
          <Col  xs={12} md={6} className="text-center text-md-end">
            <span className="text-secondary">Phone verified</span>
          </Col>
          <Col className="text-center text-md-start">
            {currentUser.phoneConfirmed ? (
              <span className="text-success">
                        <CheckIcon size={24} className="me-2" />
                Yes
              </span>
            ) : (
              <span className="text-danger">
                        <XIcon size={24} className="me-2" />
                No
              </span>
            )}
          </Col>
        </Row> */}

        <Row className="justify-content-center align-items-center text-center text-sm-start mb-5">
          <Col xs={12} md={6} className="text-center text-md-end">
            <span className="text-secondary">
              {t("translation:global.memberSince")}
            </span>
          </Col>
          <Col className="text-center text-md-start">
            {dateFormat(currentUser.createdAt, "dd/mm/yyyy")}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
            <h1 className="title">{t("translation:global.settings")}</h1>
          </Col>
        </Row>
        <Row>
          <Col
            xs={12}
            sm={10}
            md={8}
            lg={6}
            xl={4}
            className="text-center mx-auto"
          >
            <Button
              variant="outline-primary"
              onClick={() => setShowModalRequestData(true)}
              className="me-3"
            >
              {t("translation:passengerProfile.requestData")}
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => setShowModalRemoveAccount(true)}
            >
              {t("translation:passengerProfile.removeAccount")}
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
            {t("translation:passengerProfile.requestData")}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="mb-0">
            {t("translation:passengerProfile.contactRequestData")}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="outline-secondary"
            size="lg"
            onClick={() => setShowModalRequestData(false)}
          >
            {t("translation:global.close")}
          </Button>
          <LinkContainer to="/contact">
            <Button variant="primary" size="lg">
              {t("translation:global.contact")}
            </Button>
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
            {t("translation:passengerProfile.removeAccount")}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="mb-0">
            {t("translation:passengerProfile.contactRemoveAccount")}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="outline-secondary"
            size="lg"
            onClick={() => setShowModalRemoveAccount(false)}
          >
            {t("translation:global.close")}
          </Button>
          <LinkContainer to="/contact">
            <Button variant="danger" size="lg">
              {t("translation:global.contact")}
            </Button>
          </LinkContainer>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PassengerProfile;
