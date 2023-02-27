import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Trans, useTranslation } from "react-i18next";
import { DashCircle, PlusCircle } from "react-bootstrap-icons";

import GoBack from "../../components/GoBack";

import { setSearchSeats, submitFormBookRide } from "../../redux";

import { formatPrice } from "../../helpers";
import { LinkContainer } from "react-router-bootstrap";

const Book = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { rideId } = useParams();

  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { commissionOnPassenger } = useSelector((state) => state.global);
  const { rideData, formSearchRide, submitBookingRideData } = useSelector(
    (state) => state.ride
  );

  const [seats, setSeats] = useState(formSearchRide.seats);
  const [totalPaidPassenger, setTotalPaidPassenger] = useState(
    rideData.ride ? rideData.ride.price * seats * commissionOnPassenger : null
  );
  const [totalReceivedDriver, setTotalReceivedDriver] = useState(
    rideData.ride ? rideData.ride.price * seats : null
  );

  const handleDecreaseSeats = () => {
    let s = seats <= 1 ? 1 : seats - 1;

    setSeats(s);
    dispatch(setSearchSeats(s));
    setTotalPaidPassenger(s * rideData.ride.price * commissionOnPassenger);
    setTotalReceivedDriver(s * rideData.ride.price);
  };

  const handleIncreaseSeats = () => {
    let s =
      seats >= rideData.ride.seatsAvailable
        ? rideData.ride.seatsAvailable
        : seats + 1;

    setSeats(s);
    dispatch(setSearchSeats(s));
    setTotalPaidPassenger(s * rideData.ride.price * commissionOnPassenger);
    setTotalReceivedDriver(s * rideData.ride.price);
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

  if (submitBookingRideData.flag === "SUCCESS") {
    return <Redirect to={`/book/${rideId}/book-success`} />;
  }

  return rideData.ride && rideData.ride.id === parseInt(rideId) ? (
    <div>
      <GoBack />

      <Container>
        <Row className="mb-3 mx-1 mx-sm-0">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="container-box">
            <Container className="py-1 px-2">
              <Row className="my-2">
                <Col className="text-center">
                  <p className="mb-0">
                    <span className="fw-bold">
                      {rideData.ride.origin.placeName}{" "}
                    </span>
                    <span className="text-lowercase">
                      {t("translation:global.to")}
                    </span>{" "}
                    <span className="fw-bold">
                      {rideData.ride.destination.placeName}
                    </span>
                  </p>
                  <p className="mb-0">
                    {t("translation:global.driver")}:{" "}
                    <span className="fw-bold">
                      {rideData.ride.Driver.User.firstName}
                    </span>
                  </p>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>

        <Row className="mb-3 mx-1 mx-sm-0">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="container-box">
            <Container className="py-1 px-2">
              <Row className="my-2">
                <Col>
                  <h4 className="title text-center fw-light mb-0">
                    {t("translation:book.seatsNeeded")}
                  </h4>
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
                  {seats === rideData.ride.seatsLeft ? (
                    <span variant="outline-success" className="text-secondary">
                      <PlusCircle size={36} />
                    </span>
                  ) : (
                    <span
                      onClick={handleIncreaseSeats}
                      variant="outline-success"
                      disabled={seats === rideData.ride.seatsLeft}
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

        <Row className="mx-1 mx-sm-0">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="container-box">
            <Container className="py-3 px-2">
              <Row>
                <Col xs={7}>
                  <p className="mb-2 ms-3">
                    {t("translation:book.driverReceives")}
                  </p>
                </Col>
                <Col xs={5} className="text-end pe-4">
                  <p className="mb-0">{formatPrice(totalReceivedDriver)}</p>
                </Col>
              </Row>
              <Row>
                <Col xs={7}>
                  <p className="mb-0 ms-3">{t("translation:book.fees")}</p>
                </Col>
                <Col xs={5} className="text-end pe-4">
                  <p className="mb-0">
                    {formatPrice(
                      (commissionOnPassenger - 1) * totalReceivedDriver
                    )}
                    <span className="text-danger fw-bold">*</span>
                  </p>
                </Col>
              </Row>

              <hr className="mx-2" />

              <Row className="align-items-center">
                <Col xs={7}>
                  <h2 className="mb-0 ms-3">
                    {t("translation:global.totalPrice")}
                  </h2>
                  <small className="small fw-light ms-3">
                    <Trans i18nKey="translation:book.forPassengers">
                      For {{ seats }} passenger
                    </Trans>
                    {seats > 1 ? "s" : ""}
                  </small>
                </Col>
                <Col xs={5} className="text-end pe-4">
                  <h2 className="mb-0">{formatPrice(totalPaidPassenger)}</h2>
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

        <Row className="mb-3 mx-1 mx-sm-0">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
            <p className="text-secondary fw-light small">
              <span className="text-danger">*</span>
              {t("translation:global.messageFree")}{" "}
              <LinkContainer to="/faq" className="cursor-pointer text-primary">
                <u>{t("translation:global.learnMore")}</u>
              </LinkContainer>
              .
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  ) : (
    <Redirect to="/find" />
  );
};

export default Book;
