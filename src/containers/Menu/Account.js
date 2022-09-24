import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useTranslation } from "react-i18next";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import {
  CheckCircleFillIcon,
  StarFillIcon,
  XCircleFillIcon,
} from "@primer/octicons-react";
import dateFormat from "dateformat";
import { formatPhoneNumberIntl } from "react-phone-number-input";

import GoBack from "../../components/GoBack";

function Account() {
  const { t } = useTranslation();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { srcAvatar } = useSelector((state) => state.global);

  const [showModalRemoveAccount, setShowModalRemoveAccount] = useState(false);
  const [showModalRequestData, setShowModalRequestData] = useState(false);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div data-aos="fade-in">
      <GoBack />

      <Container className="mb-4">
        <Row className="mb-3 mx-1 mx-sm-0">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
            <div className="d-inline-flex justify-content-between align-items-center w-100 py-1 border-0">
              <div>
                <h3 className="mb-0">{currentUser.firstName}</h3>
                <p className="small text-secondary mb-0">
                  {t("translation:menu.memberSince")}:{" "}
                  {dateFormat(currentUser.createdAt, "mm/yyyy")}
                </p>
              </div>
              <img
                src={srcAvatar(currentUser)}
                alt="Avatar"
                className="img-fluid rounded-round img-avatar me-3"
                style={{ width: "75px" }}
              />
            </div>
          </Col>
        </Row>

        <Row className="mb-3 mx-1 mx-sm-0">
          <Col
            xs={12}
            sm={10}
            md={8}
            lg={6}
            xl={4}
            className="border shadow rounded-5 mx-auto"
          >
            <Container className="p-3">
              <Row className="align-items-center mb-3">
                <Col xs={12} md={4}>
                  <p className="text-secondary mb-0">
                    {t("translation:global.username")}
                  </p>
                </Col>
                <Col>
                  <p className="mb-0">{currentUser.username}</p>
                </Col>
              </Row>

              <Row className="align-items-center mb-3">
                <Col xs={12} md={4}>
                  <p className="text-secondary mb-0">
                    {t("translation:global.email")}
                  </p>
                </Col>
                <Col>
                  <p className="mb-0">{currentUser.email}</p>
                </Col>
              </Row>

              <Row className="align-items-center mb-3">
                <Col xs={12} md={4}>
                  <p className="text-secondary mb-0">
                    {t("translation:global.phone")}
                  </p>
                </Col>
                <Col>
                  <p className="mb-0">
                    {formatPhoneNumberIntl(currentUser.phoneNumber)}
                  </p>
                  {currentUser.phoneConfirmed ? (
                    <p className="small text-secondary mb-0">
                      <CheckCircleFillIcon
                        size={24}
                        className="text-success me-2"
                      />
                      {t("translation:global.verified")}
                    </p>
                  ) : (
                    <p className="small text-secondary mb-0">
                      <XCircleFillIcon
                        verticalAlign="middle"
                        className="text-warning me-2"
                      />
                      {t("translation:global.notVerified")}
                    </p>
                  )}
                </Col>
              </Row>

              <Row className="align-items-center mb-3">
                <Col xs={12} md={4}>
                  <p className="text-secondary mb-0">
                    {t("translation:global.memberSince")}
                  </p>
                </Col>
                <Col>
                  <p className="mb-0">
                    {dateFormat(currentUser.createdAt, "dd/mm/yyyy")}
                  </p>
                </Col>
              </Row>

              <Row className="align-items-center">
                <Col xs={12} md={4}>
                  <p className="text-secondary mb-0">
                    {t("translation:global.bio")}
                  </p>
                </Col>
                <Col>
                  {currentUser.biography && currentUser.biography !== "" ? (
                    <p className="mb-0">{currentUser.biography}</p>
                  ) : (
                    <p className="mb-0">-</p>
                  )}
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>

        <Row className="mb-3 mx-1 mx-sm-0">
          <Col
            xs={12}
            sm={10}
            md={8}
            lg={6}
            xl={4}
            className="border shadow rounded-5 mx-auto"
          >
            <Container className="p-3">
              <Row>
                <Col>
                  <p className="fw-bold">
                    {t("translation:global.yourRating")}
                  </p>
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col xs={6}>
                  {currentUser.Rating.passengerRating > 0 ? (
                    <div className="d-inline-flex align-items-center">
                      <StarFillIcon size={26} className="text-warning me-2" />
                      <h1 className="fw-bold mb-0">
                        {currentUser.Rating.passengerRating}{" "}
                      </h1>
                    </div>
                  ) : (
                    <span>{t("translation:global.noRatings")}</span>
                  )}
                </Col>
                <Col xs={6} className="text-end">
                  <LinkContainer to="/profile/passenger/ratings">
                    <Button variant="success" size={"lg"}>
                      {t("translation:global.view")}
                    </Button>
                  </LinkContainer>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>

        <Row className="mb-3 mx-1 mx-sm-0">
          <Col
            xs={12}
            sm={10}
            md={8}
            lg={6}
            xl={4}
            className="border shadow rounded-5 mx-auto"
          >
            <Container className="p-3">
              <Row>
                <Col className="text-center px-0">
                  <Button
                    variant="outline-primary"
                    onClick={() => setShowModalRequestData(true)}
                    className="me-3"
                  >
                    {t("translation:passengerProfile.requestData")}
                  </Button>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>

      <Container className="mb-3">
        <Row>
          <Col className="text-center">
            <Button
              variant="link"
              onClick={() => setShowModalRemoveAccount(true)}
              className="link-secondary text-decoration-none text-center"
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

export default Account;
