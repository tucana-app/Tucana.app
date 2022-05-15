import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link, useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { StarFillIcon, StarIcon } from "@primer/octicons-react";
import dateFormat from "dateformat";

import LoadingSpinner from "../../components/LoadingSpinner";
import GoBack from "../../components/GoBack";

import {
  getRatingsToDoDriver,
  getRatingsToDoPassenger,
  submitPassengerRatingForm,
  submitDriverRatingForm,
  setToast,
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
    if (note < 1) {
      dispatch(
        setToast({
          show: true,
          headerText: "Error",
          bodyText: "Make sure you give a rating",
          variant: "warning",
        })
      );
    } else {
      dispatch(submitPassengerRatingForm(ridePassenger, note, comment));
    }
  };

  const handleSubmitDriverRatingForm = () => {
    if (note < 1) {
      dispatch(
        setToast({
          show: true,
          headerText: "Error",
          bodyText: "Make sure you give a rating",
          variant: "warning",
        })
      );
    } else {
      dispatch(submitDriverRatingForm(rideDriver, note, comment));
    }
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
    <div data-aos="fade-in">
      <GoBack />

      <Container>
        <Row>
          <Col
            xs={12}
            sm={10}
            md={8}
            lg={6}
            xl={4}
            className="text-center mx-auto"
          >
            <Container>
              <Row>
                <Col>
                  <h1 className="title text-center">Give a rating</h1>

                  {isLoadingGetRatingsToDoPassenger ||
                  isLoadingGetRatingsToDoDriver ? (
                    <Col className="text-center">
                      <LoadingSpinner />
                    </Col>
                  ) : (
                    <>
                      {/* Makes the form appear if the user is a passenger rating a driver */}
                      {!isLoadingGetRatingsToDoPassenger &&
                      !(isEmptyObject(ridePassenger) === undefined) ? (
                        <>
                          <Row className="mb-3">
                            <Col className="text-center">
                              <p className="lead mb-0">Driver:</p>
                              <p className="h3">
                                {ridePassenger.Driver.User.firstName}
                              </p>
                            </Col>
                          </Row>

                          <Row className="mb-2">
                            <Col className="text-center">
                              <p className="small mb-0">Ride summary</p>
                              <p className="mb-0">
                                {ridePassenger.origin.city} -{" "}
                                {ridePassenger.destination.city}
                              </p>
                              <p className="mb-2">
                                Date:{" "}
                                {dateFormat(
                                  ridePassenger.dateTime,
                                  "dd/mm/yyyy"
                                )}
                              </p>
                              <Link to={`/ride/${ridePassenger.id}`}>
                                <Button variant="outline-success">
                                  <p className="lead mb-0">View</p>
                                </Button>
                              </Link>
                            </Col>
                          </Row>

                          <hr className="w-75 mx-auto" />

                          <Row className="mb-3">
                            <Col className="text-center">
                              <p className="mb-0">Comment</p>
                              <Form.Control
                                type="text"
                                name="message"
                                placeholder="Type your comment here"
                                onChange={(e) => setComment(e.target.value)}
                                disabled={
                                  submitPassengerRatingFormData.flag ===
                                  "SUCCESS"
                                }
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col className="d-inline-flex justify-content-center">
                              {note === 0 ? (
                                <div
                                  className="m-0 p-0"
                                  onClick={() =>
                                    submitDriverRatingFormData.flag !==
                                    "SUCCESS"
                                      ? setNote(1)
                                      : null
                                  }
                                >
                                  <StarIcon
                                    size={40}
                                    className="text-warning ms-2"
                                  />
                                </div>
                              ) : (
                                <div
                                  className="m-0 p-0"
                                  onClick={() =>
                                    submitDriverRatingFormData.flag !==
                                    "SUCCESS"
                                      ? setNote(1)
                                      : null
                                  }
                                >
                                  <StarFillIcon
                                    size={40}
                                    className="text-warning ms-2"
                                    onClick={() =>
                                      submitDriverRatingFormData.flag !==
                                      "SUCCESS"
                                        ? setNote(1)
                                        : null
                                    }
                                  />
                                </div>
                              )}

                              {note > 1 ? (
                                <div
                                  className="m-0 p-0"
                                  onClick={() =>
                                    submitDriverRatingFormData.flag !==
                                    "SUCCESS"
                                      ? setNote(2)
                                      : null
                                  }
                                >
                                  <StarFillIcon
                                    size={40}
                                    className="text-warning ms-2"
                                    onClick={() =>
                                      submitDriverRatingFormData.flag !==
                                      "SUCCESS"
                                        ? setNote(2)
                                        : null
                                    }
                                  />
                                </div>
                              ) : (
                                <div
                                  className="m-0 p-0"
                                  onClick={() =>
                                    submitDriverRatingFormData.flag !==
                                    "SUCCESS"
                                      ? setNote(2)
                                      : null
                                  }
                                >
                                  <StarIcon
                                    size={40}
                                    className="text-warning ms-2"
                                    onClick={() =>
                                      submitDriverRatingFormData.flag !==
                                      "SUCCESS"
                                        ? setNote(2)
                                        : null
                                    }
                                  />
                                </div>
                              )}

                              {note > 2 ? (
                                <div
                                  className="m-0 p-0"
                                  onClick={() =>
                                    submitDriverRatingFormData.flag !==
                                    "SUCCESS"
                                      ? setNote(3)
                                      : null
                                  }
                                >
                                  <StarFillIcon
                                    size={40}
                                    className="text-warning ms-2"
                                    onClick={() =>
                                      submitDriverRatingFormData.flag !==
                                      "SUCCESS"
                                        ? setNote(3)
                                        : null
                                    }
                                  />
                                </div>
                              ) : (
                                <div
                                  className="m-0 p-0"
                                  onClick={() =>
                                    submitDriverRatingFormData.flag !==
                                    "SUCCESS"
                                      ? setNote(3)
                                      : null
                                  }
                                >
                                  <StarIcon
                                    size={40}
                                    className="text-warning ms-2"
                                    onClick={() =>
                                      submitDriverRatingFormData.flag !==
                                      "SUCCESS"
                                        ? setNote(3)
                                        : null
                                    }
                                  />
                                </div>
                              )}

                              {note > 3 ? (
                                <div
                                  className="m-0 p-0"
                                  onClick={() =>
                                    submitDriverRatingFormData.flag !==
                                    "SUCCESS"
                                      ? setNote(4)
                                      : null
                                  }
                                >
                                  <StarFillIcon
                                    size={40}
                                    className="text-warning ms-2"
                                    onClick={() =>
                                      submitDriverRatingFormData.flag !==
                                      "SUCCESS"
                                        ? setNote(4)
                                        : null
                                    }
                                  />
                                </div>
                              ) : (
                                <div
                                  className="m-0 p-0"
                                  onClick={() =>
                                    submitDriverRatingFormData.flag !==
                                    "SUCCESS"
                                      ? setNote(4)
                                      : null
                                  }
                                >
                                  <StarIcon
                                    size={40}
                                    className="text-warning ms-2"
                                    onClick={() =>
                                      submitDriverRatingFormData.flag !==
                                      "SUCCESS"
                                        ? setNote(4)
                                        : null
                                    }
                                  />
                                </div>
                              )}

                              {note > 4 ? (
                                <div
                                  className="m-0 p-0"
                                  onClick={() =>
                                    submitDriverRatingFormData.flag !==
                                    "SUCCESS"
                                      ? setNote(5)
                                      : null
                                  }
                                >
                                  <StarFillIcon
                                    size={40}
                                    className="text-warning ms-2"
                                    onClick={() =>
                                      submitDriverRatingFormData.flag !==
                                      "SUCCESS"
                                        ? setNote(5)
                                        : null
                                    }
                                  />
                                </div>
                              ) : (
                                <div
                                  className="m-0 p-0"
                                  onClick={() =>
                                    submitDriverRatingFormData.flag !==
                                    "SUCCESS"
                                      ? setNote(5)
                                      : null
                                  }
                                >
                                  <StarIcon
                                    size={40}
                                    className="text-warning ms-2"
                                    onClick={() =>
                                      submitDriverRatingFormData.flag !==
                                      "SUCCESS"
                                        ? setNote(5)
                                        : null
                                    }
                                  />
                                </div>
                              )}
                            </Col>
                          </Row>

                          <Row className="mt-3">
                            <Col className="text-center">
                              <Button
                                variant="success"
                                size="lg"
                                onClick={handleSubmitPassengerRatingForm}
                                disabled={
                                  submitPassengerRatingFormData.flag ===
                                  "SUCCESS"
                                }
                              >
                                {isLoadingSubmitPassengerRatingForm ? (
                                  <LoadingSpinner />
                                ) : null}{" "}
                                Submit
                              </Button>
                            </Col>
                          </Row>
                        </>
                      ) : null}

                      {/* Makes the form appear if the user is a driver rating a passenger */}
                      {!isLoadingGetRatingsToDoDriver &&
                      !(isEmptyObject(rideDriver) === undefined) ? (
                        <>
                          <Row className="mb-3">
                            <Col className="text-center">
                              <p className="lead mb-0">Passenger:</p>
                              <p className="h3">
                                {rideDriver.Booking.User.firstName}
                              </p>
                            </Col>
                          </Row>

                          <Row className="mb-2">
                            <Col className="text-center">
                              <p className="small mb-0">Ride summary</p>
                              <p className="mb-0">
                                {rideDriver.origin.city} -{" "}
                                {rideDriver.destination.city}
                              </p>
                              <p className="mb-2">
                                Date:{" "}
                                {dateFormat(rideDriver.dateTime, "dd/mm/yyyy")}
                              </p>
                              <Link to={`/ride/${rideDriver.id}`}>
                                <Button variant="outline-success">
                                  <p className="small mb-0">View</p>
                                </Button>
                              </Link>
                            </Col>
                          </Row>

                          <hr className="w-75 mx-auto" />

                          <Row className="mb-3">
                            <Col className="text-center">
                              <p className="mb-0">Comment</p>
                              <Form.Control
                                type="text"
                                name="message"
                                placeholder="Type your comment here"
                                onChange={(e) => setComment(e.target.value)}
                                disabled={
                                  submitDriverRatingFormData.flag === "SUCCESS"
                                }
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col className="d-inline-flex justify-content-center">
                              {note === 0 ? (
                                <div
                                  className="m-0 p-0"
                                  onClick={() =>
                                    submitDriverRatingFormData.flag !==
                                    "SUCCESS"
                                      ? setNote(1)
                                      : null
                                  }
                                >
                                  <StarIcon
                                    size={40}
                                    className="text-warning ms-2"
                                  />
                                </div>
                              ) : (
                                <div
                                  className="m-0 p-0"
                                  onClick={() =>
                                    submitDriverRatingFormData.flag !==
                                    "SUCCESS"
                                      ? setNote(1)
                                      : null
                                  }
                                >
                                  <StarFillIcon
                                    size={40}
                                    className="text-warning ms-2"
                                    onClick={() =>
                                      submitDriverRatingFormData.flag !==
                                      "SUCCESS"
                                        ? setNote(1)
                                        : null
                                    }
                                  />
                                </div>
                              )}

                              {note > 1 ? (
                                <div
                                  className="m-0 p-0"
                                  onClick={() =>
                                    submitDriverRatingFormData.flag !==
                                    "SUCCESS"
                                      ? setNote(2)
                                      : null
                                  }
                                >
                                  <StarFillIcon
                                    size={40}
                                    className="text-warning ms-2"
                                    onClick={() =>
                                      submitDriverRatingFormData.flag !==
                                      "SUCCESS"
                                        ? setNote(2)
                                        : null
                                    }
                                  />
                                </div>
                              ) : (
                                <div
                                  className="m-0 p-0"
                                  onClick={() =>
                                    submitDriverRatingFormData.flag !==
                                    "SUCCESS"
                                      ? setNote(2)
                                      : null
                                  }
                                >
                                  <StarIcon
                                    size={40}
                                    className="text-warning ms-2"
                                    onClick={() =>
                                      submitDriverRatingFormData.flag !==
                                      "SUCCESS"
                                        ? setNote(2)
                                        : null
                                    }
                                  />
                                </div>
                              )}

                              {note > 2 ? (
                                <div
                                  className="m-0 p-0"
                                  onClick={() =>
                                    submitDriverRatingFormData.flag !==
                                    "SUCCESS"
                                      ? setNote(3)
                                      : null
                                  }
                                >
                                  <StarFillIcon
                                    size={40}
                                    className="text-warning ms-2"
                                    onClick={() =>
                                      submitDriverRatingFormData.flag !==
                                      "SUCCESS"
                                        ? setNote(3)
                                        : null
                                    }
                                  />
                                </div>
                              ) : (
                                <div
                                  className="m-0 p-0"
                                  onClick={() =>
                                    submitDriverRatingFormData.flag !==
                                    "SUCCESS"
                                      ? setNote(3)
                                      : null
                                  }
                                >
                                  <StarIcon
                                    size={40}
                                    className="text-warning ms-2"
                                    onClick={() =>
                                      submitDriverRatingFormData.flag !==
                                      "SUCCESS"
                                        ? setNote(3)
                                        : null
                                    }
                                  />
                                </div>
                              )}

                              {note > 3 ? (
                                <div
                                  className="m-0 p-0"
                                  onClick={() =>
                                    submitDriverRatingFormData.flag !==
                                    "SUCCESS"
                                      ? setNote(4)
                                      : null
                                  }
                                >
                                  <StarFillIcon
                                    size={40}
                                    className="text-warning ms-2"
                                    onClick={() =>
                                      submitDriverRatingFormData.flag !==
                                      "SUCCESS"
                                        ? setNote(4)
                                        : null
                                    }
                                  />
                                </div>
                              ) : (
                                <div
                                  className="m-0 p-0"
                                  onClick={() =>
                                    submitDriverRatingFormData.flag !==
                                    "SUCCESS"
                                      ? setNote(4)
                                      : null
                                  }
                                >
                                  <StarIcon
                                    size={40}
                                    className="text-warning ms-2"
                                    onClick={() =>
                                      submitDriverRatingFormData.flag !==
                                      "SUCCESS"
                                        ? setNote(4)
                                        : null
                                    }
                                  />
                                </div>
                              )}

                              {note > 4 ? (
                                <div
                                  className="m-0 p-0"
                                  onClick={() =>
                                    submitDriverRatingFormData.flag !==
                                    "SUCCESS"
                                      ? setNote(5)
                                      : null
                                  }
                                >
                                  <StarFillIcon
                                    size={40}
                                    className="text-warning ms-2"
                                    onClick={() =>
                                      submitDriverRatingFormData.flag !==
                                      "SUCCESS"
                                        ? setNote(5)
                                        : null
                                    }
                                  />
                                </div>
                              ) : (
                                <div
                                  className="m-0 p-0"
                                  onClick={() =>
                                    submitDriverRatingFormData.flag !==
                                    "SUCCESS"
                                      ? setNote(5)
                                      : null
                                  }
                                >
                                  <StarIcon
                                    size={40}
                                    className="text-warning ms-2"
                                    onClick={() =>
                                      submitDriverRatingFormData.flag !==
                                      "SUCCESS"
                                        ? setNote(5)
                                        : null
                                    }
                                  />
                                </div>
                              )}
                            </Col>
                          </Row>

                          <Row className="mt-3">
                            <Col className="text-center">
                              <Button
                                variant="success"
                                size="lg"
                                onClick={handleSubmitDriverRatingForm}
                                disabled={
                                  submitDriverRatingFormData.flag === "SUCCESS"
                                }
                              >
                                {isLoadingSubmitDriverRatingForm ? (
                                  <LoadingSpinner />
                                ) : null}{" "}
                                Submit
                              </Button>
                            </Col>
                          </Row>
                        </>
                      ) : null}
                    </>
                  )}
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NewRating;
