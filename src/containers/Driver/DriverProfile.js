import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { LinkContainer } from "react-router-bootstrap";
import { ChevronRightIcon, StarFillIcon } from "@primer/octicons-react";

import GoBack from "../../components/GoBack";
import car from "../../assets/images/car.png";
import LoadingSpinner from "../../components/LoadingSpinner";

import { getDriverProfile, getDriverEarnings } from "../../redux";

function DriverProfile(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { isloadingDriverProfile, driverProfileData } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (currentUser.Driver) {
      dispatch(getDriverProfile(currentUser.username));
      dispatch(getDriverEarnings(currentUser.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn || !currentUser.Driver) {
    return <Redirect to="/" />;
  }

  return (
    <div data-aos="fade-in">
      <GoBack />

      <Container className="mb-5">
        <Row className="mb-4">
          <Col>
            <h1 className="title text-center">
              {t("translation:global.profile")}
            </h1>
          </Col>
        </Row>

        <Row className="mb-3 mx-1 mx-sm-0">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="container-box">
            <Container className="p-3">
              <Row className="align-items-center mb-3">
                <Col xs={8}>
                  <p className="fw-bold">
                    {t("translation:global.yourRating")}
                  </p>
                  {currentUser.Rating.driverRating > 0 ? (
                    <div className="d-inline-flex align-items-center">
                      <StarFillIcon
                        size={26}
                        className="text-warning me-1 mb-1"
                      />
                      <h1 className="fw-bold mb-0">
                        {currentUser.Rating.driverRating}
                      </h1>
                      <p className="ms-3 mb-0">
                        <span className="text-secondary">
                          - {currentUser.Rating.nbDriverRating}{" "}
                          <span className="text-lowercase">
                            {" "}
                            {t("translation:global.ratings")}
                          </span>
                        </span>
                      </p>
                    </div>
                  ) : (
                    <small className="smaller text-secondary">
                      {t("translation:global.noRatings")}
                    </small>
                  )}
                </Col>

                <Col xs={4} className="text-end">
                  <LinkContainer to="/profile/driver/ratings">
                    <Button variant="success" size={"lg"}>
                      {t("translation:global.view")}
                    </Button>
                  </LinkContainer>
                </Col>
              </Row>

              <Row className="align-items-center">
                <Col>
                  <p className="text-lowercase mb-0">
                    <strong>
                      {isloadingDriverProfile ? (
                        <LoadingSpinner />
                      ) : (
                        driverProfileData.ridesCount
                      )}
                    </strong>{" "}
                    {t("translation:rides.ridesPublished")}
                  </p>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>

        <Row className="mb-3 mx-1 mx-sm-0">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="container-box">
            <Container className="p-3">
              <Row>
                <Col>
                  <p className="fw-bold">
                    {t("translation:global.yourVehicle")}
                  </p>
                </Col>
              </Row>

              <Row>
                <Col>
                  <LinkContainer to="/driver/car" className="cursor-pointer">
                    <Row className="align-items-center mb-2">
                      <Col xs={2} className="text-center pe-0">
                        <img src={car} alt="" height={30} />
                      </Col>
                      <Col>
                        <p className="mb-0">{currentUser.Driver.Car.maker}</p>
                        <p className="mb-0">{currentUser.Driver.Car.model}</p>
                      </Col>
                      <Col>
                        <p className="mb-0">
                          <strong>{currentUser.Driver.Car.numberPlate}</strong>
                        </p>
                      </Col>
                      <Col xs={1} className="text-start ps-0">
                        <ChevronRightIcon size={24} verticalAlign="middle" />
                      </Col>
                    </Row>
                  </LinkContainer>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>

        <Row className="mb-3 mx-1 mx-sm-0">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="container-box">
            <Container className="p-3">
              <Row>
                <Col>
                  <p className="fw-bold">
                    {t("translation:global.yourIdentity")}
                  </p>
                  <p>
                    {t("translation:global.idType")}:{" "}
                    {currentUser.Driver.idType}
                  </p>
                  <p>
                    {t("translation:global.number")}:{" "}
                    {currentUser.Driver.idNumber}
                  </p>
                  <p className="mb-0">
                    {t("translation:global.country")}:{" "}
                    {currentUser.Driver.idCountry}
                  </p>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>

        <Row className="mx-1 mx-sm-0">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="container-box">
            <Container className="p-3">
              <Row>
                <Col>
                  <p className="fw-bold">
                    {t("translation:global.yourLicense")}
                  </p>
                  <p>
                    {t("translation:global.number")}:{" "}
                    {currentUser.Driver.licenseNumber}
                  </p>
                  <p className="mb-0">
                    {t("translation:global.country")}:{" "}
                    {currentUser.Driver.licenseCountry}
                  </p>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DriverProfile;
