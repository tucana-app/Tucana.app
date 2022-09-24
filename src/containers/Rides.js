import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Badge, Col, Container, ListGroup, Row } from "react-bootstrap";
import { ChevronRightIcon } from "@primer/octicons-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  getDriverRides,
  getUserBookings,
  getDriverBookings,
  getRidesToConfirm,
} from "../redux";

import LoadingSpinner from "../components/LoadingSpinner";

import {
  // countUserBookings,
  // countDriverRides,
  countDriverBookings,
} from "../helpers";

const Rides = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const {
    // isLoadingDriverRides,
    // driverRidesData,
    // isLoadingUserBookings,
    // userBookingsData,
    // isLoadingRidesToConfirm,
    ridesToConfirmData,
    isLoadingDriverBookings,
    driverBookingsData,
  } = useSelector((state) => state.ride);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserBookings(currentUser.id));
      dispatch(getRidesToConfirm(currentUser));

      if (currentUser.Driver) {
        dispatch(getDriverRides(currentUser.Driver.id));
        dispatch(getDriverBookings(currentUser.Driver.id));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Container fluid data-aos="fade-in">
      <Row className="my-4">
        <Col className="text-center">
          <h2 className="title text-center mb-0">
            {t("translation:rides.ridesBookings")}
          </h2>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={10} md={8} lg={6} xl={4} className="p-0 mx-auto">
          <hr className="my-2" />

          <ListGroup variant="flush">
            {ridesToConfirmData.length ? (
              <>
                <Link
                  to="/rides/rides-to-confirm"
                  className="text-light text-decoration-none"
                >
                  <ListGroup.Item className="border-0">
                    <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                      <div>
                        <span className="fw-bold">
                          {t("translation:rides.ridesToConfirm")}
                        </span>
                        <Badge
                          bg="warning"
                          className="text-dark ms-2 animate__animated animate__heartBeat animate__slower animate__infinite"
                        >
                          {ridesToConfirmData.length}
                        </Badge>
                      </div>
                      <ChevronRightIcon size={24} verticalAlign="middle" />
                    </div>
                  </ListGroup.Item>
                </Link>

                <hr className="mt-2 mb-2" />
              </>
            ) : null}

            <Link to="/bookings" className="text-light text-decoration-none">
              <ListGroup.Item className="border-0">
                <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                  <div>
                    {t("translation:global.bookings")}
                    {/* {userBookingsData.length > 0 ? (
                      countUserBookings(userBookingsData) ? (
                        <Badge bg="primary" className="ms-2">
                          {isLoadingUserBookings ? (
                            <LoadingSpinner size="sm" />
                          ) : (
                            countUserBookings(userBookingsData)
                          )}
                        </Badge>
                      ) : null
                    ) : null} */}
                  </div>
                  <ChevronRightIcon size={24} verticalAlign="middle" />
                </div>
              </ListGroup.Item>
            </Link>

            {currentUser.Driver ? (
              <>
                <hr className="my-2" />

                <Link
                  to="/driver/rides"
                  className="text-light text-decoration-none"
                >
                  <ListGroup.Item className="border-0">
                    <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                      <div>
                        {t("translation:rides.ridesPublished")}
                        {/* {driverRidesData.length > 0 ? (
                          countDriverRides(driverRidesData) ? (
                            <Badge bg="success" className="text-dark ms-2">
                              {isLoadingDriverRides ? (
                                <LoadingSpinner size="sm" />
                              ) : (
                                countDriverRides(driverRidesData)
                              )}
                            </Badge>
                          ) : null
                        ) : null} */}
                      </div>
                      <ChevronRightIcon size={24} verticalAlign="middle" />
                    </div>
                  </ListGroup.Item>
                </Link>

                <Link
                  to="/driver/bookings"
                  className="text-light text-decoration-none"
                >
                  <ListGroup.Item className="border-0 ">
                    <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                      <div>
                        {t("translation:rides.bookingsReceived")}
                        {driverBookingsData.length > 0 ? (
                          countDriverBookings(driverBookingsData) ? (
                            <Badge bg="info" className="text-dark ms-2">
                              {isLoadingDriverBookings ? (
                                <LoadingSpinner size="sm" />
                              ) : (
                                countDriverBookings(driverBookingsData)
                              )}
                            </Badge>
                          ) : null
                        ) : null}
                      </div>
                      <ChevronRightIcon size={24} verticalAlign="middle" />
                    </div>
                  </ListGroup.Item>
                </Link>
              </>
            ) : null}

            <hr className="my-2" />

            {!currentUser.Driver ? (
              <Link
                to="/become-driver"
                className="text-light text-decoration-none"
              >
                <ListGroup.Item className="border-0">
                  <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                    <p className="text-success fw-bold mb-0">
                      {t("translation:global.becomeDriver")}
                    </p>
                    <ChevronRightIcon size={24} verticalAlign="middle" />
                  </div>
                </ListGroup.Item>
              </Link>
            ) : null}

            <Link to="/help" className="text-light text-decoration-none">
              <ListGroup.Item className="border-0">
                <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                  {t("translation:global.help")}
                  <ChevronRightIcon size={24} verticalAlign="middle" />
                </div>
              </ListGroup.Item>
            </Link>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Rides;
