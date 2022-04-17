import React, { useEffect } from "react";
import { Container, Col, Row, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
import GoBack from "../../components/GoBack";
import LoadingSpinner from "../../components/LoadingSpinner";
import dateFormat from "dateformat";

import {
  admin_getSingleRide,
  admin_getSingleRideAllBookings,
} from "../../redux";

function AdminSingleRide() {
  const dispatch = useDispatch();

  const { rideId } = useParams();

  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const {
    isLoadingSingleRide,
    singleRideData,
    isLoadingSingleRideAllBookings,
    singleRideAllBookingsData,
  } = useSelector((state) => state.admin);
  const { bookingStatusVariant } = useSelector((state) => state.global);

  useEffect(() => {
    if (isLoggedIn && currentUser.adminId) {
      dispatch(admin_getSingleRide(currentUser, rideId));
      dispatch(admin_getSingleRideAllBookings(currentUser, rideId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle redirection in case the user is already logged in
  if (!isLoggedIn || !currentUser.adminId) {
    return <Redirect to="/page-404" />;
  }

  return (
    <div>
      <GoBack />

      <Container className="my-5">
        <Row className="mb-3">
          <Col>
            <h1 className="display-4 text-success text-center">
              Single Ride: {rideId}
            </h1>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            {isLoadingSingleRide ? (
              <LoadingSpinner />
            ) : singleRideData.id ? (
              <>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Origin</th>
                      <th>Destination</th>
                      <th>Driver</th>
                      <th>Date</th>
                      <th>Seats</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{singleRideData.id}</td>
                      <td>
                        {singleRideData.cityOrigin} (
                        {singleRideData.provinceOrigin})
                      </td>
                      <td>
                        {singleRideData.cityDestination} (
                        {singleRideData.provinceDestination})
                      </td>
                      <td>{singleRideData.Driver.User.firstName}</td>
                      <td>
                        {dateFormat(
                          singleRideData.dateTime,
                          "dd/mm/yyyy HH:MM"
                        )}
                      </td>
                      <td>
                        {singleRideData.seatsLeft}/
                        {singleRideData.seatsAvailable}
                      </td>
                      <td>{singleRideData.RideStatus.name}</td>
                    </tr>
                  </tbody>
                </Table>
              </>
            ) : (
              <></>
            )}
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <h1 className="text-center">Bookings for this ride</h1>
          </Col>
          <Col xs={12}>
            {isLoadingSingleRideAllBookings ? (
              <LoadingSpinner />
            ) : (
              <>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>User</th>
                      <th>Seats booked</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  {singleRideAllBookingsData.map((booking, index) => (
                    <tbody key={index}>
                      <tr>
                        <td>{booking.id}</td>
                        <td>{booking.User.username}</td>
                        <td>{booking.seatsBooked}</td>
                        <td>
                          <span
                            className={`text-${bookingStatusVariant(
                              booking.BookingStatusId
                            )}`}
                          >
                            {booking.BookingStatus.name}
                          </span>
                        </td>
                        <td>{dateFormat(booking.createdAt, "dd/mm/yyyy")}</td>
                      </tr>
                    </tbody>
                  ))}
                </Table>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminSingleRide;
