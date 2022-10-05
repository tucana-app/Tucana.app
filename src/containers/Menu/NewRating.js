import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link, useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { StarFillIcon, StarIcon } from "@primer/octicons-react";
import { useTranslation } from "react-i18next";
import dateFormat from "dateformat";

import LoadingSpinner from "../../components/LoadingSpinner";
import GoBack from "../../components/GoBack";
import { isEmptyObject } from "../../helpers";

import {
  getRatingsToDoDriver,
  getRatingsToDoPassenger,
  submitPassengerRatingForm,
  submitDriverRatingForm,
  setToast,
} from "../../redux";

const NewRating = () => {
  const { t } = useTranslation();
  const { rideId } = useParams();

  const [note, setNote] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const {
    isLoadingGetRatingsToDoPassenger,
    getRatingsToDoPassengerData,
    isLoadingGetRatingsToDoDriver,
    getRatingsToDoDriverData,
    isLoadingSubmitPassengerRatingForm,
    submitPassengerRatingFormData,
    submitPassengerRatingFormFail,
    isLoadingSubmitDriverRatingForm,
    submitDriverRatingFormData,
    submitDriverRatingFormFail,
  } = useSelector((state) => state.rating);

  const handleSubmitPassengerRatingForm = () => {
    if (comment === "" || comment.length < 10) {
      dispatch(
        setToast({
          show: true,
          headerText: "Error",
          bodyText: t("translation:global.errors.missingComment"),
          variant: "warning",
        })
      );
    } else if (note < 1) {
      dispatch(
        setToast({
          show: true,
          headerText: "Error",
          bodyText: t("translation:global.errors.missingRating"),
          variant: "warning",
        })
      );
    } else {
      setSubmitted(true);
      dispatch(
        submitPassengerRatingForm(ridePassenger.Booking.id, note, comment)
      );
    }
  };

  const handleSubmitDriverRatingForm = () => {
    if (comment === "" || comment.length < 10) {
      dispatch(
        setToast({
          show: true,
          headerText: "Error",
          bodyText: t("translation:global.errors.missingComment"),
          variant: "warning",
        })
      );
    } else if (note < 1) {
      dispatch(
        setToast({
          show: true,
          headerText: "Error",
          bodyText: t("translation:global.errors.missingRating"),
          variant: "warning",
        })
      );
    } else {
      setSubmitted(true);
      dispatch(submitDriverRatingForm(rideDriver.Booking.id, note, comment));
    }
  };

  useEffect(() => {
    if (isLoggedIn && rideId) {
      dispatch(getRatingsToDoPassenger(currentUser.id));
      if (currentUser.Driver) {
        dispatch(getRatingsToDoDriver(currentUser.id, currentUser.Driver.id));
      }
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
                  <h1 className="title text-center">
                    {t("translation:newRating.title")}
                  </h1>
                </Col>
              </Row>

              {isLoadingGetRatingsToDoPassenger ||
              isLoadingGetRatingsToDoDriver ||
              isLoadingSubmitDriverRatingForm ? (
                <Row className="mt-5">
                  <Col className="text-center">
                    <LoadingSpinner />
                  </Col>
                </Row>
              ) : submitted &&
                submitPassengerRatingFormFail === "" &&
                submitDriverRatingFormFail === "" ? (
                <Row className="mt-5">
                  <Col className="text-center">
                    <p className="fw-bold">
                      {t("translation:global.thankYou")} 🎉
                    </p>
                    {t("translation:newRating.ratingReceived")}
                  </Col>
                </Row>
              ) : (
                <Row>
                  <Col>
                    {/* Makes the form appear if the user is a passenger rating a driver */}
                    {!isLoadingGetRatingsToDoPassenger &&
                    !(isEmptyObject(ridePassenger) === undefined) ? (
                      <>
                        <Row className="mb-3">
                          <Col className="text-center">
                            <p className="lead mb-0">
                              {t("translation:global.driver")}:
                            </p>
                            <p className="h3">
                              {ridePassenger.Driver.User.firstName}
                            </p>
                          </Col>
                        </Row>

                        <Row className="mb-2">
                          <Col className="text-center">
                            <p className="small mb-0">
                              {t("translation:newRating.rideSummary")}
                            </p>
                            <p className="mb-0">
                              <strong>{ridePassenger.origin.city}</strong>{" "}
                              <span className="text-lowercase">
                                {t("translation:global.to")}
                              </span>{" "}
                              <strong>{ridePassenger.destination.city}</strong>
                            </p>
                            <p className="mb-2">
                              {t("translation:global.date")}:{" "}
                              <strong>
                                {dateFormat(
                                  ridePassenger.dateTimeOrigin,
                                  "dd/mm/yyyy"
                                )}
                              </strong>
                            </p>
                            <Link to={`/ride/${ridePassenger.id}`}>
                              <Button variant="dark">
                                <p className="lead mb-0">
                                  {t("translation:global.view")}
                                </p>
                              </Button>
                            </Link>
                          </Col>
                        </Row>

                        <hr className="w-75 mx-auto" />

                        <Row className="mb-3">
                          <Col className="text-center">
                            <p>
                              {t("translation:global.comment")}
                              <span className="text-danger">*</span>
                            </p>
                            <Form.Control
                              type="text"
                              name="message"
                              placeholder={t(
                                "translation:global.errors.min10characters"
                              )}
                              onChange={(e) => setComment(e.target.value)}
                              disabled={
                                submitPassengerRatingFormData.flag === "SUCCESS"
                              }
                              required
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col className="d-inline-flex justify-content-center">
                            {note === 0 ? (
                              <div
                                className="m-0 p-0"
                                onClick={() =>
                                  submitDriverRatingFormData.flag !== "SUCCESS"
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
                                  submitDriverRatingFormData.flag !== "SUCCESS"
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
                                  submitDriverRatingFormData.flag !== "SUCCESS"
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
                                  submitDriverRatingFormData.flag !== "SUCCESS"
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
                                  submitDriverRatingFormData.flag !== "SUCCESS"
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
                                  submitDriverRatingFormData.flag !== "SUCCESS"
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
                                  submitDriverRatingFormData.flag !== "SUCCESS"
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
                                  submitDriverRatingFormData.flag !== "SUCCESS"
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
                                  submitDriverRatingFormData.flag !== "SUCCESS"
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
                                  submitDriverRatingFormData.flag !== "SUCCESS"
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
                                submitPassengerRatingFormData.flag === "SUCCESS"
                              }
                            >
                              {isLoadingSubmitPassengerRatingForm ? (
                                <LoadingSpinner />
                              ) : null}{" "}
                              {t("translation:global.submit")}
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
                            <p className="lead mb-0">
                              {t("translation:global.passenger")}:
                            </p>
                            <p className="h3">
                              {rideDriver.Booking.User.firstName}
                            </p>
                          </Col>
                        </Row>

                        <Row className="mb-2">
                          <Col className="text-center">
                            <p className="small mb-0">
                              {t("translation:newRating.rideSummary")}
                            </p>
                            <p className="mb-0">
                              <strong>{rideDriver.origin.city}</strong>{" "}
                              <span className="text-lowercase">
                                {t("translation:global.to")}
                              </span>{" "}
                              <strong>{rideDriver.destination.city}</strong>
                            </p>
                            <p className="mb-2">
                              {t("translation:global.date")}:{" "}
                              <strong>
                                {dateFormat(
                                  rideDriver.dateTimeOrigin,
                                  "dd/mm/yyyy"
                                )}
                              </strong>
                            </p>
                            <Link to={`/ride/${rideDriver.id}`}>
                              <Button variant="dark">
                                <p className="small mb-0">
                                  {t("translation:global.view")}
                                </p>
                              </Button>
                            </Link>
                          </Col>
                        </Row>

                        <hr className="w-75 mx-auto" />

                        <Row className="mb-3">
                          <Col className="text-center">
                            <p>
                              {t("translation:global.comment")}
                              <span className="text-danger">*</span>
                            </p>
                            <Form.Control
                              type="text"
                              name="message"
                              placeholder={t(
                                "translation:global.errors.min10characters"
                              )}
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
                                  submitDriverRatingFormData.flag !== "SUCCESS"
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
                                  submitDriverRatingFormData.flag !== "SUCCESS"
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
                                  submitDriverRatingFormData.flag !== "SUCCESS"
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
                                  submitDriverRatingFormData.flag !== "SUCCESS"
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
                                  submitDriverRatingFormData.flag !== "SUCCESS"
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
                                  submitDriverRatingFormData.flag !== "SUCCESS"
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
                                  submitDriverRatingFormData.flag !== "SUCCESS"
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
                                  submitDriverRatingFormData.flag !== "SUCCESS"
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
                                  submitDriverRatingFormData.flag !== "SUCCESS"
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
                                  submitDriverRatingFormData.flag !== "SUCCESS"
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
                              {t("translation:global.submit")}
                            </Button>
                          </Col>
                        </Row>
                      </>
                    ) : null}
                  </Col>
                </Row>
              )}
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NewRating;
