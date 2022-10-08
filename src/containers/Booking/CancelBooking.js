import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import { Trans, useTranslation } from "react-i18next";
import { Link, Redirect, useParams } from "react-router-dom";
import { ArrowLeftIcon, CheckIcon, XIcon } from "@primer/octicons-react";

import GoBack from "../../components/GoBack";
import LoadingSpinner from "../../components/LoadingSpinner";

import { getBooking, setToast, submitCancelBooking } from "../../redux";
import { isDateInPast, isEmptyObject } from "../../helpers";

function CancelBooking(props) {
  const { t } = useTranslation();
  const { bookingId } = useParams();

  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { isloadingBooking, bookingData, bookingError } = useSelector(
    (state) => state.ride
  );
  const {
    isloadingSubmitCancelBooking,
    submitCancelBookingData,
    // submitCancelBookingError,
  } = useSelector((state) => state.booking);

  const [submitted, setSubmitted] = useState(false);
  const [comment, setComment] = useState("");

  const handleConfirm = () => {
    if (comment === "" || comment.length < 10) {
      dispatch(
        setToast({
          show: true,
          headerText: "Error",
          bodyText: t("translation:global.errors.missingComment"),
          variant: "warning",
        })
      );
    } else {
      dispatch(submitCancelBooking(bookingId, comment));
      setSubmitted(true);
    }
  };

  useEffect(() => {
    if (isLoggedIn && isEmptyObject(bookingData)) {
      dispatch(getBooking(bookingId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <GoBack />

      <Container>
        <Row className="mb-3">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
            <h2 className="text-center">
              {t("translation:cancelBooking.title")}
            </h2>

            <p>
              <Trans i18nKey={"translation:cancelBooking.refundPolicy"}>
                Make sure you review our{" "}
                <Link to="/refund-policy" className="fw-bold link-success">
                  refund policy
                </Link>{" "}
                before canceling
              </Trans>
            </p>
          </Col>
        </Row>

        {isloadingBooking ? (
          <Row>
            <Col className="text-cene">
              <LoadingSpinner />
            </Col>
          </Row>
        ) : submitted && submitCancelBookingData.flag === "SUCCESS" ? (
          <Row>
            <Col
              xs={12}
              sm={10}
              md={8}
              lg={6}
              xl={4}
              className="text-center mx-auto"
            >
              <Alert variant="success">
                {t("translation:cancelBooking.success")}
              </Alert>

              <Link to={`/booking/${bookingId}`}>
                <Button variant="dark">
                  <ArrowLeftIcon size={24} className="me-2" />{" "}
                  {t("translation:global.goBack")}
                </Button>
              </Link>
            </Col>
          </Row>
        ) : bookingData.id ? (
          currentUser.id === bookingData.User.id &&
          !isDateInPast(bookingData.Ride.dateTimeOrigin, new Date()) &&
          bookingData.Ride.RideStatusId === 1 &&
          bookingData.BookingStatusId < 4 ? (
            <>
              <Row className="mb-3 mx-1 mx-sm-0">
                <Col
                  xs={12}
                  sm={10}
                  md={8}
                  lg={6}
                  xl={4}
                  className="container-box mx-auto"
                >
                  <Container className="py-3 px-2">
                    <Row>
                      <Col>
                        <p className="text-center">
                          {t("translation:cancelBooking.confirm")}
                        </p>

                        <div className="mb-3">
                          <Form.Group>
                            <Form.Label>
                              {t("translation:global.comment")}
                              <span className="text-danger">*</span>
                            </Form.Label>
                          </Form.Group>
                          <Form.Control
                            type="text"
                            name="message"
                            placeholder={t(
                              "translation:global.errors.min10characters"
                            )}
                            onChange={(e) => setComment(e.target.value)}
                            required
                          />
                        </div>

                        <div className="text-center">
                          <Link to={`/booking/${bookingId}`}>
                            <Button
                              variant="danger"
                              type="submit"
                              className="me-2"
                              disabled={isloadingSubmitCancelBooking}
                            >
                              <span>
                                <XIcon size={24} className="me-2" />
                                {t("translation:global.no")}
                              </span>
                            </Button>
                          </Link>

                          <Button
                            variant="success"
                            type="submit"
                            disabled={isloadingSubmitCancelBooking}
                            onClick={handleConfirm}
                          >
                            <span>
                              <CheckIcon size={24} className="me-2" />
                              {t("translation:global.yes")}
                            </span>
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </>
          ) : (
            <Redirect to="/bookings" />
          )
        ) : bookingError ? (
          <Redirect to="/bookings" />
        ) : null}
      </Container>
    </div>
  );
}

export default CancelBooking;
