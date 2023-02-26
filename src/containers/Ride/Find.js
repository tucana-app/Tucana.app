import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import FormSearchRides from "../../components/FormSearchRides";

const Find = () => {
  const { t } = useTranslation();
  const { isFormSearchRideSubmitted } = useSelector((state) => state.ride);

  return (
    <div className="container-homepage">
      {!isFormSearchRideSubmitted ? (
        <Container className="overlay pb-5">
          <Row className="min-vh-100 align-items-center">
            <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
              <Container className="px-3">
                <Row className="mb-4">
                  <Col xs={12}>
                    <h1 className="title text-success text-center mb-3">
                      {t("translation:find.catchPhrase")}
                    </h1>
                  </Col>
                </Row>

                <Row>
                  <FormSearchRides />
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      ) : (
        <Redirect to="/search-results" />
      )}
    </div>
  );
};

export default Find;
