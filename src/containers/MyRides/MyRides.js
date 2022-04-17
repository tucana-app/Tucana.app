import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Badge, Container, ListGroup } from "react-bootstrap";
import { ChevronRightIcon } from "@primer/octicons-react";
import { Link } from "react-router-dom";

import {
  getDriverRides,
  getUserBookings,
  getDriverBookings,
  getRidesToConfirm,
} from "../../redux";

import LoadingSpinner from "../../components/LoadingSpinner";

const MyRides = () => {
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { isDateInPast, countDriverBookings, countDriverRides } = useSelector(
    (state) => state.global
  );
  const {
    isLoadingDriverRides,
    driverRidesData,
    isLoadingDriverBookings,
    driverBookingsData,
    isLoadingUserBookings,
    userBookingsData,
    isLoadingRidesToConfirm,
    ridesToConfirmData,
  } = useSelector((state) => state.ride);

  const countUserBookings = (userBookingsData) => {
    let count = 0;

    userBookingsData.map((booking, index) => {
      return booking.BookingStatusId === 1 &&
        !isDateInPast(booking.Ride.dateTime, new Date())
        ? count++
        : null;
    });

    return count;
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getDriverRides(currentUser.id));
      dispatch(getUserBookings(currentUser.id));
      dispatch(getDriverBookings(currentUser.id));
      dispatch(getRidesToConfirm(currentUser.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Container fluid className="p-0">
      <ListGroup variant="flush" className="pt-2">
        {!isLoadingRidesToConfirm && ridesToConfirmData.length ? (
          <div data-aos="fade-up">
            <Link
              to="/rides/rides-to-confirm"
              className="text-light text-decoration-none"
            >
              <ListGroup.Item className="border-0">
                <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                  <div>
                    <span className="fw-bold">Rides to confirm</span>
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

            <hr className="my-2" />
          </div>
        ) : null}
        <Link to="/bookings" className="text-light text-decoration-none">
          <ListGroup.Item className="border-0">
            <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
              <div>
                My bookings
                {userBookingsData.length > 0 ? (
                  countUserBookings(userBookingsData) ? (
                    <Badge bg="primary" className="ms-2">
                      {isLoadingUserBookings ? (
                        <LoadingSpinner size="sm" />
                      ) : (
                        countUserBookings(userBookingsData)
                      )}
                    </Badge>
                  ) : null
                ) : null}
              </div>
              <ChevronRightIcon size={24} verticalAlign="middle" />
            </div>
          </ListGroup.Item>
        </Link>

        <hr className="my-2" />

        <Link to="/my-rides/driver" className="text-light text-decoration-none">
          <ListGroup.Item className="border-0">
            <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
              <div>
                Ride offered
                {driverRidesData.length > 0 ? (
                  countDriverRides(driverRidesData) ? (
                    <Badge bg="success" className="text-dark ms-2">
                      {isLoadingDriverRides ? (
                        <LoadingSpinner size="sm" />
                      ) : (
                        countDriverRides(driverRidesData)
                      )}
                    </Badge>
                  ) : null
                ) : null}
              </div>
              <ChevronRightIcon size={24} verticalAlign="middle" />
            </div>
          </ListGroup.Item>
        </Link>

        <Link
          to="/my-rides/bookings"
          className="text-light text-decoration-none"
        >
          <ListGroup.Item className="border-0 ">
            <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
              <div>
                Booking received
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

        <hr className="my-2" />

        <Link to="/help" className="text-light text-decoration-none">
          <ListGroup.Item className="border-0">
            <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
              Help
              <ChevronRightIcon size={24} verticalAlign="middle" />
            </div>
          </ListGroup.Item>
        </Link>

        <hr className="my-2" />
      </ListGroup>
    </Container>
  );
};

export default MyRides;
