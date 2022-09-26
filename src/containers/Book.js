import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { DashCircle, PlusCircle } from "react-bootstrap-icons";

import GoBack from "../components/GoBack";
import RideDetails from "../components/RideDetails";

import { setSearchSeats, submitFormBookRide } from "../redux";

import { formatPrice } from "../helpers";

const Book = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { rideId } = useParams();

  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { commission } = useSelector((state) => state.global);
  const { rideData, formSearchRide, submitBookingRideSuccess } = useSelector(
    (state) => state.ride
  );

  const [seats, setSeats] = useState(formSearchRide.seats);
  const [totalPaidPassenger, setTotalPaidPassenger] = useState(
    rideData.ride ? rideData.ride.price * seats : null
  );
  const [totalReceivedDriver, setTotalReceivedDriver] = useState(
    rideData.ride ? rideData.ride.price * seats * commission : null
  );

  const handleDecreaseSeats = () => {
    let s = seats <= 1 ? 1 : seats - 1;

    setSeats(s);
    dispatch(setSearchSeats(s));
    setTotalPaidPassenger(s * rideData.ride.price);
    setTotalReceivedDriver(s * rideData.ride.price * commission);
  };

  const handleIncreaseSeats = () => {
    let s =
      seats >= rideData.ride.seatsAvailable
        ? rideData.ride.seatsAvailable
        : seats + 1;

    setSeats(s);
    dispatch(setSearchSeats(s));
    setTotalPaidPassenger(s * rideData.ride.price);
    setTotalReceivedDriver(s * rideData.ride.price * commission);
  };

  const handleSubmit = () => {
    dispatch(
      submitFormBookRide(
        currentUser,
        rideData.ride,
        seats,
        totalPaidPassenger,
        totalReceivedDriver
      )
    );
  };

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  if (
    submitBookingRideSuccess.flag === "SUCCESS" &&
    rideData.ride.id === submitBookingRideSuccess.rideId
  ) {
    return <Redirect to={`/booking/${submitBookingRideSuccess.bookingId}`} />;
  }

  return rideData.ride && rideData.ride.id === parseInt(rideId) ? (
    <div>
      <GoBack />

      <Container>
        <RideDetails ride={rideData.ride} />

        <Row className="mb-3 mx-1 mx-sm-0">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="container-box">
            <Container className="py-3 px-2">
              <Row>
                <Col xs={7}>
                  <h1 className="mb-0 ms-3">{t("translation:global.total")}</h1>
                </Col>
                <Col xs={5} className="text-center">
                  <h1 className="mb-0">{formatPrice(totalPaidPassenger)}</h1>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>

        <Row className="mb-3 mx-1 mx-sm-0">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="container-box">
            <Container className="py-1 px-2">
              <Row>
                <Col>
                  <h3 className="title text-center mb-0">
                    {t("translation:global.seats")}
                  </h3>
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col xs={3} className="text-center">
                  {seats === 1 ? (
                    <span variant="outline-success" className="text-secondary">
                      <DashCircle size={36} />
                    </span>
                  ) : (
                    <span
                      onClick={handleDecreaseSeats}
                      variant="outline-success"
                      className="cursor-pointer text-success"
                    >
                      <DashCircle size={36} />
                    </span>
                  )}
                </Col>
                <Col xs={6} className="text-center">
                  <Form.Control
                    plaintext
                    readOnly
                    value={seats}
                    className="h3 fw-bold text-center"
                  />
                </Col>
                <Col xs={3} className="text-center">
                  {seats === rideData.ride.seatsAvailable ? (
                    <span variant="outline-success" className="text-secondary">
                      <PlusCircle size={36} />
                    </span>
                  ) : (
                    <span
                      onClick={handleIncreaseSeats}
                      variant="outline-success"
                      disabled={seats === rideData.ride.seatsAvailable}
                      className="cursor-pointer text-success"
                    >
                      <PlusCircle size={36} />
                    </span>
                  )}
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>

        <Row className="mb-3 mx-1 mx-sm-0">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
            <Container className="py-3 px-2">
              <Row>
                <Col className="text-center">
                  <Button
                    onClick={handleSubmit}
                    variant="success"
                    size="lg"
                    className="px-5"
                  >
                    <h1 className="mb-0">{t("translation:global.book")}</h1>
                  </Button>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  ) : (
    <Redirect to="/find" />
  );
};

export default Book;
