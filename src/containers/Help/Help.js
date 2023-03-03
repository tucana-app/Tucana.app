import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { AlertFillIcon, ChevronRightIcon } from "@primer/octicons-react";
import { useTranslation } from "react-i18next";

import GoBack from "../../components/GoBack";

const Help = () => {
  const { t } = useTranslation();

  return (
    <div>
      <GoBack />

      <Container fluid data-aos="fade-in">
        <Row>
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="px-0 mx-auto">
            <ListGroup variant="flush">
              <hr className="mb-2" />

              <Link to="/how-it-works" className="text-decoration-none">
                <ListGroup.Item className="border-0">
                  <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                    <p className="mb-0">{t("translation:global.howItWorks")}</p>
                    <ChevronRightIcon size={24} verticalAlign="middle" />
                  </div>
                </ListGroup.Item>
              </Link>

              <Link to="/refund-policy" className="text-decoration-none">
                <ListGroup.Item className="border-0">
                  <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                    <p className="mb-0">
                      {t("translation:global.refundPolicy")}
                    </p>
                    <ChevronRightIcon size={24} verticalAlign="middle" />
                  </div>
                </ListGroup.Item>
              </Link>

              <Link to="/faq" className="text-decoration-none">
                <ListGroup.Item className="border-0">
                  <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                    <p className="mb-0">{t("translation:global.faq")}</p>
                    <ChevronRightIcon size={24} verticalAlign="middle" />
                  </div>
                </ListGroup.Item>
              </Link>

              <Link to="/map" className="text-decoration-none">
                <ListGroup.Item className="border-0">
                  <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                    <p className="mb-0">{t("translation:global.maps")}</p>
                    <ChevronRightIcon size={24} verticalAlign="middle" />
                  </div>
                </ListGroup.Item>
              </Link>

              <Link to="/contact" className="text-decoration-none">
                <ListGroup.Item className="border-0">
                  <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                    <p className="mb-0">{t("translation:global.report")}</p>
                    <ChevronRightIcon size={24} verticalAlign="middle" />
                  </div>
                </ListGroup.Item>
              </Link>

              <Link to="/legal" className="text-decoration-none">
                <ListGroup.Item className="border-0">
                  <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                    <p className="mb-0">{t("translation:menu.legal")}</p>
                    <ChevronRightIcon size={24} verticalAlign="middle" />
                  </div>
                </ListGroup.Item>
              </Link>

              <hr className="my-2" />

              <Link to="/contact" className="text-decoration-none">
                <ListGroup.Item className="border-0">
                  <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                    <p className="mb-0">{t("translation:global.contactUs")}</p>
                    <ChevronRightIcon size={24} verticalAlign="middle" />
                  </div>
                </ListGroup.Item>
              </Link>

              <hr className="my-2" />

              <ListGroup.Item className="border-0">
                <p className="mb-0">
                  <AlertFillIcon size={24} className="text-warning me-2" />
                  {t("translation:help.message1")} <strong>911</strong>{" "}
                  {t("translation:help.message2")}
                </p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Help;
