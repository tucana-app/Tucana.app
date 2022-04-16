import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import dateFormat from "dateformat";

import LoadingSpinner from "../../components/LoadingSpinner";
import FeedbackMessage from "../../components/FeedbackMessage";
import MessageEmpty from "../../components/MessageEmpty";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";

import { getDriverRides } from "../../redux";
import GoBack from "../../components/GoBack";

const MyRidesDriver = () => {
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { rideStatusVariant, isDateInPast } = useSelector(
    (state) => state.global
  );
  const { isLoadingDriverRides, driverRidesData } = useSelector(
    (state) => state.ride
  );

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getDriverRides(currentUser.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div data-aos="slide-right">
      <GoBack />

      <Container className="mt-4 mb-5">
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
                  <h1 className="font-title text-success mb-0">
                    Rides as a driver
                  </h1>
                  <p className="lead">All the rides you have submitted</p>
                </div>
              </Col>
            </Row>

            {driverRidesData.length > 0 ? (
              <>
                {driverRidesData.map((ride, index) => (
                  <Row
                    className="justify-content-center justify-content-md-start justify-content-lg-center align-items-center border border-start-0 border-end-0 py-3 mx-1 mx-sm-2"
                    key={index}
                  >
                    <Col xs={6} sm={3} lg={2} className="mb-3">
                      <p className="mb-0">Origin:</p>
                      <p className="mb-0">Province: </p>
                    </Col>
                    <Col xs={6} sm={3} lg={2} className="mb-3">
                      <p className="text-warning mb-0">{ride.cityOrigin}</p>
                      <p className="text-warning mb-0">{ride.provinceOrigin}</p>
                    </Col>

                    <Col xs={6} sm={3} lg={2} className="mb-3">
                      <p className="mb-0">Destination:</p>
                      <p className="mb-0">Province:</p>
                    </Col>
                    <Col xs={6} sm={3} lg={2} className="mb-3">
                      <p className="text-success mb-0">
                        {ride.cityDestination}
                      </p>
                      <p className="text-success mb-0">
                        {ride.provinceDestination}
                      </p>
                    </Col>

                    <Col xs={6} md={4} lg={2} className="mb-3 mb-lg-3">
                      <p className="mb-0">
                        Date: {dateFormat(ride.dateTime, "dd/mm/yyyy")}
                      </p>
                      <p className="mb-0">
                        Time: {dateFormat(ride.dateTime, "HH:MM TT")}
                      </p>
                    </Col>

                    <Col xs={6} md={4} lg={3} className="">
                      <p className="mb-0">
                        Created:{" "}
                        <span>{dateFormat(ride.createdAt, "dd/mm/yyyy")}</span>
                      </p>
                      <p className="mb-0">
                        Seats left:{" "}
                        <span className="text-success">{ride.seatsLeft}</span> /{" "}
                        {ride.seatsAvailable}
                      </p>
                    </Col>

                    <Col xs={6} md={4} lg={3} className="my-3">
                      Status:{" "}
                      <span
                        className={`text-${rideStatusVariant(
                          ride.RideStatus.id
                        )}`}
                      >
                        {ride.RideStatus.name}
                      </span>
                    </Col>

                    <Col
                      xs={6}
                      md={0}
                      lg={0}
                      xl={0}
                      xxl={0}
                      className="d-md-none"
                    ></Col>

                    {!(ride.comment === "") ? (
                      <Col
                        xs={12}
                        xl={3}
                        className="text-lg-center text-xl-start mt-lg-3"
                      >
                        <p className="mb-0">Your comment:</p>
                        <i>"{ride.comment}"</i>
                      </Col>
                    ) : null}

                    {isDateInPast(ride.dateTime, new Date()) ? (
                      <Col xs={12} className="text-center text-warning">
                        This is a past ride
                      </Col>
                    ) : null}

                    <Col xs={12} className="text-center mx-auto my-3">
                      <LinkContainer to={`/ride/${ride.id}`}>
                        <Button variant="success rounded-0 fw-bold text-uppercase">
                          Manage
                        </Button>
                      </LinkContainer>
                    </Col>
                  </Row>
                ))}
              </>
            ) : (
              <>
                <Row>
                  <Col xs={12} sm={10} md={8} lg={6} className="mx-auto">
                    <FeedbackMessage />
                  </Col>
                </Row>
                <Row>
                  <Col className="text-center">
                    <MessageEmpty title="rides" />
                  </Col>
                </Row>
              </>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default MyRidesDriver;
