import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import FormSearchRides from "../../components/FormSearchRides";
import LoadingSpinner from "../../components/LoadingSpinner";
import { displayNavBar } from "../../redux";

const Find = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { isFormSearchRideSubmitted, isloadingRidesOnline, ridesOnlineData } =
    useSelector((state) => state.ride);

  useEffect(() => {
    dispatch(displayNavBar(true));
  }, [dispatch]);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container-background">
      {!isFormSearchRideSubmitted ? (
        <Container className="overlay">
          <Row className="min-vh-100 align-items-center">
            <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
              <Container className="px-3">
                <Row>
                  <FormSearchRides />
                </Row>

                {isloadingRidesOnline ? (
                  <Row className="mt-3">
                    <Col className="text-center">
                      <LoadingSpinner />
                    </Col>
                  </Row>
                ) : ridesOnlineData.count > 0 ? (
                  <Row className="mt-3">
                    <Col>
                      <p className="text-center text-white fw-bold mb-0">
                        {ridesOnlineData.count}{" "}
                        {t("translation:global.ridesOnline")}
                      </p>
                    </Col>
                  </Row>
                ) : null}
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
