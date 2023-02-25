import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link, useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { StarFillIcon, StarIcon } from "@primer/octicons-react";
import { useTranslation } from "react-i18next";
import dateFormat from "dateformat";

import LoadingSpinner from "../../components/LoadingSpinner";
import GoBack from "../../components/GoBack";

import { getRatingToDo, submitRatingForm, setToast } from "../../redux";

const NewRating = () => {
  const { t } = useTranslation();
  const { bookingId } = useParams();

  const [note, setNote] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const {
    isLoadingRatingToDo,
    ratingToDoData,
    ratingToDoError,
    isLoadingSubmitRatingForm,
    submitRatingFormData,
    submitRatingFormFail,
  } = useSelector((state) => state.rating);

  const handleSubmitRatingForm = () => {
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
      dispatch(submitRatingForm(currentUser, bookingId, note, comment));
    }
  };

  useEffect(() => {
    if (isLoggedIn && bookingId) {
      dispatch(getRatingToDo(bookingId, currentUser.id));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

              {isLoadingRatingToDo || isLoadingSubmitRatingForm ? (
                <Row className="mt-5">
                  <Col className="text-center">
                    <LoadingSpinner />
                  </Col>
                </Row>
              ) : submitted && submitRatingFormFail === "" ? (
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
                    {ratingToDoData.id ? (
                      <>
                        <Row className="mb-3">
                          <Col className="text-center">
                            {/* If viewer is the passenger */}
                            {ratingToDoData.UserId === currentUser.id ? (
                              <div>
                                <p className="lead mb-0">
                                  {t("translation:global.driver")}:
                                </p>

                                <p className="h3">
                                  {ratingToDoData.Ride.Driver.User.firstName}
                                </p>
                              </div>
                            ) : (
                              <div>
                                {/* If viewer is the driver */}
                                <p className="lead mb-0">
                                  {t("translation:global.passenger")}:
                                </p>

                                <p className="h3">
                                  {ratingToDoData.User.firstName}
                                </p>
                              </div>
                            )}
                          </Col>
                        </Row>

                        <Row className="mb-2">
                          <Col className="text-center">
                            <p className="small mb-0">
                              {t("translation:newRating.rideSummary")}
                            </p>
                            <p className="mb-0">
                              <strong>
                                {ratingToDoData.Ride.origin.placeName}
                              </strong>{" "}
                              <span className="text-lowercase">
                                {t("translation:global.to")}
                              </span>{" "}
                              <strong>
                                {ratingToDoData.Ride.destination.placeName}
                              </strong>
                            </p>
                            <p className="mb-2">
                              {t("translation:global.date")}:{" "}
                              <strong>
                                {dateFormat(
                                  ratingToDoData.Ride.dateTimeOrigin,
                                  "dd/mm/yyyy"
                                )}
                              </strong>
                            </p>
                            <Link to={`/ride/${ratingToDoData.id}`}>
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
                                  submitRatingFormData.flag !== "SUCCESS"
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
                                  submitRatingFormData.flag !== "SUCCESS"
                                    ? setNote(1)
                                    : null
                                }
                              >
                                <StarFillIcon
                                  size={40}
                                  className="text-warning ms-2"
                                  onClick={() =>
                                    submitRatingFormData.flag !== "SUCCESS"
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
                                  submitRatingFormData.flag !== "SUCCESS"
                                    ? setNote(2)
                                    : null
                                }
                              >
                                <StarFillIcon
                                  size={40}
                                  className="text-warning ms-2"
                                  onClick={() =>
                                    submitRatingFormData.flag !== "SUCCESS"
                                      ? setNote(2)
                                      : null
                                  }
                                />
                              </div>
                            ) : (
                              <div
                                className="m-0 p-0"
                                onClick={() =>
                                  submitRatingFormData.flag !== "SUCCESS"
                                    ? setNote(2)
                                    : null
                                }
                              >
                                <StarIcon
                                  size={40}
                                  className="text-warning ms-2"
                                  onClick={() =>
                                    submitRatingFormData.flag !== "SUCCESS"
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
                                  submitRatingFormData.flag !== "SUCCESS"
                                    ? setNote(3)
                                    : null
                                }
                              >
                                <StarFillIcon
                                  size={40}
                                  className="text-warning ms-2"
                                  onClick={() =>
                                    submitRatingFormData.flag !== "SUCCESS"
                                      ? setNote(3)
                                      : null
                                  }
                                />
                              </div>
                            ) : (
                              <div
                                className="m-0 p-0"
                                onClick={() =>
                                  submitRatingFormData.flag !== "SUCCESS"
                                    ? setNote(3)
                                    : null
                                }
                              >
                                <StarIcon
                                  size={40}
                                  className="text-warning ms-2"
                                  onClick={() =>
                                    submitRatingFormData.flag !== "SUCCESS"
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
                                  submitRatingFormData.flag !== "SUCCESS"
                                    ? setNote(4)
                                    : null
                                }
                              >
                                <StarFillIcon
                                  size={40}
                                  className="text-warning ms-2"
                                  onClick={() =>
                                    submitRatingFormData.flag !== "SUCCESS"
                                      ? setNote(4)
                                      : null
                                  }
                                />
                              </div>
                            ) : (
                              <div
                                className="m-0 p-0"
                                onClick={() =>
                                  submitRatingFormData.flag !== "SUCCESS"
                                    ? setNote(4)
                                    : null
                                }
                              >
                                <StarIcon
                                  size={40}
                                  className="text-warning ms-2"
                                  onClick={() =>
                                    submitRatingFormData.flag !== "SUCCESS"
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
                                  submitRatingFormData.flag !== "SUCCESS"
                                    ? setNote(5)
                                    : null
                                }
                              >
                                <StarFillIcon
                                  size={40}
                                  className="text-warning ms-2"
                                  onClick={() =>
                                    submitRatingFormData.flag !== "SUCCESS"
                                      ? setNote(5)
                                      : null
                                  }
                                />
                              </div>
                            ) : (
                              <div
                                className="m-0 p-0"
                                onClick={() =>
                                  submitRatingFormData.flag !== "SUCCESS"
                                    ? setNote(5)
                                    : null
                                }
                              >
                                <StarIcon
                                  size={40}
                                  className="text-warning ms-2"
                                  onClick={() =>
                                    submitRatingFormData.flag !== "SUCCESS"
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
                              onClick={handleSubmitRatingForm}
                            >
                              {isLoadingSubmitRatingForm ? (
                                <LoadingSpinner />
                              ) : null}{" "}
                              {t("translation:global.submit")}
                            </Button>
                          </Col>
                        </Row>
                      </>
                    ) : ratingToDoError ? (
                      <Redirect to="/ratings" />
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
