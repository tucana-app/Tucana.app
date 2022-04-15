import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link, useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import FeedbackMessage from "../../components/FeedbackMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarHollow } from "@fortawesome/free-regular-svg-icons";

import {} from "../../redux";
import LoadingSpinner from "../../components/LoadingSpinner";
import GoBack from "../../components/GoBack";
import dateFormat from "dateformat";

import {
  getRatingsToDoDriver,
  getRatingsToDoPassenger,
  submitPassengerRatingForm,
  submitDriverRatingForm,
} from "../../redux";

const NewRating = () => {
  const { rideId } = useParams();

  const [note, setNote] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const {
    isLoadingGetRatingsToDoPassenger,
    getRatingsToDoPassengerData,
    isLoadingGetRatingsToDoDriver,
    getRatingsToDoDriverData,
    isLoadingSubmitPassengerRatingForm,
    submitPassengerRatingFormData,
    isLoadingSubmitDriverRatingForm,
    submitDriverRatingFormData,
  } = useSelector((state) => state.rating);
  const { isEmptyObject } = useSelector((state) => state.global);

  const handleSubmitPassengerRatingForm = () => {
    dispatch(submitPassengerRatingForm(ridePassenger, note, comment));
  };

  const handleSubmitDriverRatingForm = () => {
    dispatch(submitDriverRatingForm(rideDriver, note, comment));
  };

  useEffect(() => {
    if (isLoggedIn && rideId) {
      dispatch(getRatingsToDoPassenger(currentUser.id));
      dispatch(getRatingsToDoDriver(currentUser.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let ridePassenger = getRatingsToDoPassengerData.find(
    (ride) => ride.id === parseInt(rideId)
  );
  let rideDriver = getRatingsToDoDriverData.find(
    (ride) => ride.id === parseInt(rideId)
  );

  // Handle redirection in case we haven't found a rating to do
  if (!ridePassenger && !rideDriver) {
    return <Redirect to="/ratings" />;
  }

  // Handle redirection in case the user is already logged in
  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div data-aos="slide-left">
      <GoBack />

      <Container className="pt-5">
        <Row>
          <Col className="text-center">
            <h1 className="text-success">Give a rating</h1>
            {/* <p className="lead"></p> */}
          </Col>
        </Row>
      </Container>

      {isLoadingGetRatingsToDoPassenger || isLoadingGetRatingsToDoDriver ? (
        <LoadingSpinner />
      ) : null}

      {/* Makes the form appear if the user is a passenger rating a driver */}
      {!isLoadingGetRatingsToDoPassenger &&
      !(isEmptyObject(ridePassenger) === undefined) ? (
        <>
          <Container className="pb-5">
            <Row className="mb-2">
              <Col className="text-center">
                <Link to={`/ride/${ridePassenger.id}`}>
                  <p className="lead mb-0">Ride:</p>
                </Link>
                <p className="mb-0">
                  {ridePassenger.cityOrigin} - {ridePassenger.cityDestination}
                </p>
                <p>Date: {dateFormat(ridePassenger.dateTime, "dd/mm/yyyy")}</p>
              </Col>
            </Row>

            <Row>
              <Col className="text-center">
                <p className="lead mb-0">Driver:</p>
                <p className="h3">{ridePassenger.Driver.User.firstName}</p>
              </Col>
            </Row>

            <hr className="w-75 mx-auto" />

            <Row className="mb-3">
              <Col xs={12} sm={10} md={8} className="text-center mx-auto">
                <p className="mb-0">Comment</p>
                <Form.Control
                  type="text"
                  name="message"
                  placeholder="Type your comment here"
                  className=""
                  onChange={(e) => setComment(e.target.value)}
                  disabled={submitPassengerRatingFormData.flag === "SUCCESS"}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} className="text-center">
                <FontAwesomeIcon
                  icon={note === 0 ? faStarHollow : faStar}
                  className="text-warning ms-2"
                  size={"2x"}
                  onClick={() =>
                    submitPassengerRatingFormData.flag !== "SUCCESS"
                      ? setNote(1)
                      : null
                  }
                />
                <FontAwesomeIcon
                  icon={note > 1 ? faStar : faStarHollow}
                  className="text-warning ms-2"
                  size={"2x"}
                  onClick={() =>
                    submitPassengerRatingFormData.flag !== "SUCCESS"
                      ? setNote(2)
                      : null
                  }
                />
                <FontAwesomeIcon
                  icon={note > 2 ? faStar : faStarHollow}
                  className="text-warning ms-2"
                  size={"2x"}
                  onClick={() =>
                    submitPassengerRatingFormData.flag !== "SUCCESS"
                      ? setNote(3)
                      : null
                  }
                />
                <FontAwesomeIcon
                  icon={note > 3 ? faStar : faStarHollow}
                  className="text-warning ms-2"
                  size={"2x"}
                  onClick={() =>
                    submitPassengerRatingFormData.flag !== "SUCCESS"
                      ? setNote(4)
                      : null
                  }
                />
                <FontAwesomeIcon
                  icon={note > 4 ? faStar : faStarHollow}
                  className="text-warning ms-2"
                  size={"2x"}
                  onClick={() =>
                    submitPassengerRatingFormData.flag !== "SUCCESS"
                      ? setNote(5)
                      : null
                  }
                />
              </Col>

              <Col className="text-center mx-auto">
                <p>
                  You are rating {ridePassenger.Driver.User.firstName}: {note} /
                  5
                </p>
              </Col>
            </Row>

            <Row>
              <Col xs={12} sm={10} md={8} className="text-center mx-auto">
                <Button
                  variant="success"
                  onClick={handleSubmitPassengerRatingForm}
                  className="rounded-0 text-uppercase"
                  disabled={submitPassengerRatingFormData.flag === "SUCCESS"}
                >
                  {isLoadingSubmitPassengerRatingForm ? (
                    <LoadingSpinner />
                  ) : null}{" "}
                  Submit
                </Button>
              </Col>
            </Row>

            <FeedbackMessage />
          </Container>
        </>
      ) : null}

      {/* Makes the form appear if the user is a driver rating a passenger */}
      {!isLoadingGetRatingsToDoDriver &&
      !(isEmptyObject(rideDriver) === undefined) ? (
        <>
          <Container className="pb-5">
            <Row className="mb-2">
              <Col className="text-center">
                <Link to={`/ride/${rideDriver.id}`}>
                  <p className="lead mb-0">Ride:</p>
                </Link>
                <p className="mb-0">
                  {rideDriver.cityOrigin} - {rideDriver.cityDestination}
                </p>
                <p>Date: {dateFormat(rideDriver.dateTime, "dd/mm/yyyy")}</p>
              </Col>
            </Row>

            <Row>
              <Col className="text-center">
                <p className="lead mb-0">Passenger:</p>
                <p className="h3">{rideDriver.Booking.User.firstName}</p>
              </Col>
            </Row>

            <hr className="w-75 mx-auto" />

            <Row className="mb-3">
              <Col xs={12} sm={10} md={8} className="text-center mx-auto">
                <p className="mb-0">Comment</p>
                <Form.Control
                  type="text"
                  name="message"
                  placeholder="Type your comment here"
                  className=""
                  onChange={(e) => setComment(e.target.value)}
                  disabled={submitDriverRatingFormData.flag === "SUCCESS"}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} className="text-center">
                <FontAwesomeIcon
                  icon={note === 0 ? faStarHollow : faStar}
                  className="text-warning ms-2"
                  size={"2x"}
                  onClick={() =>
                    submitDriverRatingFormData.flag !== "SUCCESS"
                      ? setNote(1)
                      : null
                  }
                />
                <FontAwesomeIcon
                  icon={note > 1 ? faStar : faStarHollow}
                  className="text-warning ms-2"
                  size={"2x"}
                  onClick={() =>
                    submitDriverRatingFormData.flag !== "SUCCESS"
                      ? setNote(2)
                      : null
                  }
                />
                <FontAwesomeIcon
                  icon={note > 2 ? faStar : faStarHollow}
                  className="text-warning ms-2"
                  size={"2x"}
                  onClick={() =>
                    submitDriverRatingFormData.flag !== "SUCCESS"
                      ? setNote(3)
                      : null
                  }
                />
                <FontAwesomeIcon
                  icon={note > 3 ? faStar : faStarHollow}
                  className="text-warning ms-2"
                  size={"2x"}
                  onClick={() =>
                    submitDriverRatingFormData.flag !== "SUCCESS"
                      ? setNote(4)
                      : null
                  }
                />
                <FontAwesomeIcon
                  icon={note > 4 ? faStar : faStarHollow}
                  className="text-warning ms-2"
                  size={"2x"}
                  onClick={() =>
                    submitDriverRatingFormData.flag !== "SUCCESS"
                      ? setNote(5)
                      : null
                  }
                />
              </Col>

              <Col className="text-center mx-auto">
                <p>
                  You are rating {rideDriver.Booking.User.firstName}: {note} / 5
                </p>
              </Col>
            </Row>

            <Row>
              <Col xs={12} sm={10} md={8} className="text-center mx-auto">
                <Button
                  variant="success"
                  onClick={handleSubmitDriverRatingForm}
                  className="rounded-0 text-uppercase"
                  disabled={submitDriverRatingFormData.flag === "SUCCESS"}
                >
                  {isLoadingSubmitDriverRatingForm ? <LoadingSpinner /> : null}{" "}
                  Submit
                </Button>
              </Col>
            </Row>

            <FeedbackMessage />
          </Container>
        </>
      ) : null}
    </div>
  );
};

export default NewRating;