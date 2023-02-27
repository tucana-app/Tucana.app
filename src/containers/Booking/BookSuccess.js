import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { displayNavBar, resetBookRide } from "../../redux";

import DonateComponent from "../../components/DonateComponent";
import LoadingSpinner from "../../components/LoadingSpinner";

const BookSuccess = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { rideId } = useParams();

  const { isLoggedIn } = useSelector((state) => state.user);
  const { isloadingBookingRide, submitBookingRideData } = useSelector(
    (state) => state.ride
  );

  if (!isLoggedIn || !rideId) {
    return <Redirect to="/" />;
  }

  if (submitBookingRideData.flag === "SUCCESS") {
    dispatch(resetBookRide());
    dispatch(displayNavBar(true));
  }

  return (
    <div className="mt-5">
      <Container className="mt-5">
        {isloadingBookingRide ? (
          <Row className="min-vh-100 align-items-center">
            <Col className="text-center">
              <LoadingSpinner />
            </Col>
          </Row>
        ) : rideId && submitBookingRideData.bookingId ? (
          <>
            <Row className="">
              <Col className="text-center">
                <h1 className="title">{t("translation:global.success")} 🎉</h1>
                <p>{t("translation:book.success")}</p>
                <p className="mb-4">
                  <Link
                    to={`/booking/${submitBookingRideData.bookingId}`}
                    className="link-success cursor-pointer"
                  >
                    {t("translation:publish.checkItOut")}
                  </Link>
                </p>

                <div className="container-box py-3 mb-5">
                  <DonateComponent />
                </div>
              </Col>
            </Row>
          </>
        ) : (
          <Alert variant="danger">
            {t("translation:global.errors.errorBook")}
          </Alert>
        )}
      </Container>
    </div>
  );
};

export default BookSuccess;
