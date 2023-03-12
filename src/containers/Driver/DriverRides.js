import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useTranslation } from "react-i18next";
import { ChevronRightIcon, DotFillIcon } from "@primer/octicons-react";
import dateFormat from "dateformat";

import GoBack from "../../components/GoBack";
import LoadingSpinner from "../../components/LoadingSpinner";
import MessageEmpty from "../../components/MessageEmpty";

import { getDriverRides } from "../../redux";
import { isDateInPast } from "../../helpers";

const DriverRides = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { isLoadingDriverRides, driverRidesData } = useSelector(
    (state) => state.ride
  );

  useEffect(() => {
    if (isLoggedIn && currentUser.Driver) {
      dispatch(getDriverRides(currentUser.Driver.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div data-aos="fade-in">
      <GoBack />

      <Container className="mb-5">
        {isLoadingDriverRides ? (
          <Row>
            <Col className="text-center">
              <LoadingSpinner />
            </Col>
          </Row>
        ) : (
          <>
            <Row className="justify-content-center">
              <Col>
                <div className="text-center mb-4">
                  <h1 className="title mb-0">
                    {t("translation:ridesDriver.title")}
                  </h1>
                  <p className="lead">
                    {t("translation:ridesDriver.subTitle")}
                  </p>
                </div>
              </Col>
            </Row>

            {driverRidesData.length > 0 ? (
              <>
                {driverRidesData.map((ride, index) =>
                  isDateInPast(new Date(), ride.dateTimeOrigin) &&
                  ride.RideStatus.id < 3 ? (
                    <Row key={index} className="mb-3 mx-1 mx-sm-0">
                      <Col
                        xs={12}
                        sm={10}
                        md={8}
                        lg={6}
                        xl={4}
                        className="container-box"
                      >
                        <LinkContainer
                          to={`/ride/${ride.id}`}
                          className="cursor-pointer"
                        >
                          <Container className="mt-1 px-0">
                            <Row className="py-2">
                              <Col xs={12}>
                                <p className="line-height-md mb-1">
                                  <DotFillIcon
                                    size="18"
                                    className="text-warning mb-1"
                                    verticalAlign="middle"
                                  />
                                  <strong>{ride.origin.placeName}</strong>
                                  <small>, {ride.origin.placeDetails}</small>
                                </p>
                              </Col>
                              <Col xs={12}>
                                <p className="line-height-md mb-0">
                                  <DotFillIcon
                                    size="18"
                                    className="text-success mb-1"
                                    verticalAlign="middle"
                                  />
                                  <strong>{ride.destination.placeName}</strong>
                                  <small>
                                    , {ride.destination.placeDetails}
                                  </small>
                                </p>
                              </Col>
                            </Row>

                            <Row className="justify-content-center border border-bottom-0 border-start-0 border-end-0 mx-0 py-1">
                              <Col xs={6}>
                                <p className="mb-0">
                                  {dateFormat(
                                    ride.dateTimeOrigin,
                                    "dd/mm/yyyy"
                                  )}
                                </p>
                              </Col>
                              <Col xs={6} className="text-end">
                                <p className="mb-0">
                                  {t("translation:global.passengers")}:{" "}
                                  {ride.seatsAvailable - ride.seatsLeft}/
                                  {ride.seatsAvailable}
                                </p>
                              </Col>
                            </Row>
                          </Container>
                        </LinkContainer>
                      </Col>
                    </Row>
                  ) : null
                )}

                <Row className="mt-5">
                  <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
                    <LinkContainer to="/driver/past-rides">
                      <ListGroup.Item className="border-0 px-2">
                        <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                          <p className="mb-0">
                            {t("translation:global.pastRides")}
                          </p>
                          <ChevronRightIcon size={24} verticalAlign="middle" />
                        </div>
                      </ListGroup.Item>
                    </LinkContainer>
                  </Col>
                </Row>
              </>
            ) : (
              <Row>
                <Col className="text-center">
                  <MessageEmpty title="rides" />
                </Col>
              </Row>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default DriverRides;
