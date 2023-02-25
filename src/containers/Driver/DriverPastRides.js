import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useTranslation } from "react-i18next";
import { DotFillIcon } from "@primer/octicons-react";
import dateFormat from "dateformat";

import GoBack from "../../components/GoBack";
import LoadingSpinner from "../../components/LoadingSpinner";
import MessageEmpty from "../../components/MessageEmpty";

import { getDriverRides } from "../../redux";
import { ChevronRight } from "react-bootstrap-icons";
import { isDateInPast } from "../../helpers";

const DriverPastRides = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { isLoadingDriverRides, driverRidesData } = useSelector(
    (state) => state.ride
  );
  const { rideStatusVariant } = useSelector((state) => state.global);

  useEffect(() => {
    if (isLoggedIn || driverRidesData.length === 0) {
      dispatch(getDriverRides(currentUser.Driver.id));
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
        {isLoadingDriverRides ? (
          <Row>
            <Col className="text-center">
              <LoadingSpinner />
            </Col>
          </Row>
        ) : (
          <>
            <Row className="justify-content-center text-center mb-3">
              <Col>
                <h1 className="title mb-0">
                  {t("translation:global.pastRides")}
                </h1>
              </Col>
            </Row>

            {driverRidesData.length > 0 ? (
              <>
                {driverRidesData.map((ride, index) =>
                  isDateInPast(ride.dateTimeOrigin, new Date()) ||
                  ride.RideStatus.id > 2 ? (
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
                            <Row className="align-items-center mx-2 my-1">
                              <Col xs={5} className="text-center">
                                <p className="fw-bold mb-0">
                                  {ride.origin.placeName}
                                </p>
                                <p className="small mb-0">
                                  {ride.origin.placeDetails}
                                </p>
                              </Col>
                              <Col xs={1} className="text-lowercase">
                                {t("translation:global.to")}
                              </Col>
                              <Col xs={5} className="text-center">
                                <p className="fw-bold mb-0">
                                  {ride.destination.placeName}
                                </p>
                                <p className="small mb-0">
                                  {ride.destination.placeDetails}
                                </p>
                              </Col>
                              <Col xs={1}>
                                <ChevronRight />
                              </Col>
                            </Row>

                            <Row className="text-center justify-content-center border border-bottom-0 border-start-0 border-end-0 mx-0 py-1">
                              <Col>
                                <p className="mb-0">
                                  {dateFormat(
                                    ride.dateTimeOrigin,
                                    "dd/mm/yyyy"
                                  )}
                                </p>
                              </Col>
                              <Col>
                                <small
                                  className={`text-${rideStatusVariant(
                                    ride.RideStatusId
                                  )}`}
                                >
                                  <DotFillIcon
                                    size="16"
                                    verticalAlign="middle"
                                  />
                                  {t(
                                    `translation:global.statuses.ride.${ride.RideStatus.id}`
                                  )}
                                </small>
                              </Col>
                              <Col>
                                <p className="mb-0">
                                  {t("translation:global.seat")}
                                  {ride.seatsAvailable > 1 ? "s" : null}:{" "}
                                  <span className="text-success">
                                    {ride.seatsLeft}
                                  </span>
                                  /{ride.seatsAvailable}
                                </p>
                              </Col>
                            </Row>
                          </Container>
                        </LinkContainer>
                      </Col>
                    </Row>
                  ) : null
                )}
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

export default DriverPastRides;
