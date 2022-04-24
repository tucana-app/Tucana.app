import React, { useEffect } from "react";
import { Container, Col, Row, Table, Button, Tabs, Tab } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Redirect } from "react-router-dom";
import { CheckIcon, XIcon } from "@primer/octicons-react";
import dateFormat from "dateformat";

import GoBack from "../../components/GoBack";
import LoadingSpinner from "../../components/LoadingSpinner";

import {
  admin_getPassengersRatings,
  admin_getDriversRatings,
} from "../../redux";

function AdminRatings() {
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const {
    isLoadingPassengersRatings,
    passengersRatingsData,
    isLoadingDriversRatings,
    driversRatingsData,
  } = useSelector((state) => state.admin);

  useEffect(() => {
    if (isLoggedIn && currentUser.adminId) {
      dispatch(admin_getPassengersRatings(currentUser));
      dispatch(admin_getDriversRatings(currentUser));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleAcceptPassengerRating = (PassengerRatingId) => {
  //   console.log(PassengerRatingId);
  // };

  // const handleRefusePassengerRating = (PassengerRatingId) => {
  //   console.log(PassengerRatingId);
  // };

  // const handleAcceptDriverRating = (DriverRatingId) => {
  //   console.log(DriverRatingId);
  // };

  // const handleRefuseDriverRating = (DriverRatingId) => {
  //   console.log(DriverRatingId);
  // };

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
            <h1 className="display-4 text-success text-center">Ratings</h1>
          </Col>
        </Row>
      </Container>

      <Tabs className="tabRating mb-3" defaultActiveKey="passenger">
        <Tab eventKey="passenger" title="Passenger" className="mx-auto">
          <Container>
            <Row>
              <Col>
                {isLoadingPassengersRatings ? (
                  <LoadingSpinner />
                ) : passengersRatingsData.length ? (
                  <>
                    TOTAL: {passengersRatingsData.length}
                    <Table striped bordered hover variant="dark">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Ride</th>
                          <th>Booking</th>
                          <th>Note</th>
                          <th>Comment</th>
                          <th>Time</th>
                          <th>AdminVerif</th>
                          <th>Admin name</th>
                          <th>Date verified</th>
                        </tr>
                      </thead>

                      {passengersRatingsData.map((rating, index) => (
                        <tbody key={index}>
                          <tr>
                            <td>{index}</td>
                            <td>
                              <LinkContainer
                                to={`/admin/ride/${rating.rating.Ride.id}`}
                              >
                                <Button variant="success">
                                  {rating.rating.Ride.id}
                                </Button>
                              </LinkContainer>
                            </td>
                            <td>
                              <LinkContainer
                                to={`/admin/booking/${rating.rating.Booking.id}`}
                              >
                                <Button variant="info">
                                  {rating.rating.Booking.id}
                                </Button>
                              </LinkContainer>
                            </td>
                            <td>{rating.rating.value}</td>
                            <td>{rating.rating.comment}</td>
                            <td>
                              {dateFormat(
                                rating.rating.Ride.dateTime,
                                "dd/mm/yyyy hh:mm"
                              )}
                            </td>
                            <td>
                              {rating.AdminVerif &&
                              rating.AdminVerif.accepted === true ? (
                                <span className="text-success">
                                  <CheckIcon size={24} className="me-2" />
                                  Yes
                                </span>
                              ) : (
                                <span className="text-danger">
                                  <XIcon size={24} className="me-2" />
                                  No
                                </span>
                              )}
                            </td>
                            <td>
                              {rating.AdminVerif &&
                                rating.AdminVerif.Admin.username}
                            </td>
                            <td>
                              {rating.AdminVerif &&
                                dateFormat(
                                  rating.AdminVerif.createdAt,
                                  "dd/mm/yyyy"
                                )}
                            </td>
                          </tr>
                        </tbody>
                      ))}
                    </Table>
                  </>
                ) : null}
              </Col>
            </Row>
          </Container>
        </Tab>
        <Tab eventKey="driver" title="Driver">
          <Container>
            <Row>
              <Col>
                {isLoadingDriversRatings ? (
                  <LoadingSpinner />
                ) : driversRatingsData.length ? (
                  <>
                    TOTAL: {driversRatingsData.length}
                    <Table striped bordered hover variant="dark">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Ride</th>
                          <th>Booking</th>
                          <th>Note</th>
                          <th>Comment</th>
                          <th>Time</th>
                          <th>AdminVerif</th>
                          <th>Admin name</th>
                          <th>Date verified</th>
                        </tr>
                      </thead>

                      {driversRatingsData.map((rating, index) => (
                        <tbody key={index}>
                          <tr>
                            <td>{index}</td>
                            <td>
                              <LinkContainer
                                to={`/admin/ride/${rating.rating.Ride.id}`}
                              >
                                <Button variant="success">
                                  {rating.rating.Ride.id}
                                </Button>
                              </LinkContainer>
                            </td>
                            <td>
                              <LinkContainer
                                to={`/admin/booking/${rating.rating.Booking.id}`}
                              >
                                <Button variant="info">
                                  {rating.rating.Booking.id}
                                </Button>
                              </LinkContainer>
                            </td>
                            <td>{rating.rating.value}</td>
                            <td>{rating.rating.comment}</td>
                            <td>
                              {dateFormat(
                                rating.rating.Ride.dateTime,
                                "dd/mm/yyyy hh:mm TT"
                              )}
                            </td>
                            <td>
                              {rating.AdminVerif &&
                              rating.AdminVerif.accepted === true ? (
                                <span className="text-success">
                                  <CheckIcon size={24} className="me-2" />
                                  Yes
                                </span>
                              ) : (
                                <span className="text-danger">
                                  <XIcon size={24} className="me-2" />
                                  No
                                </span>
                              )}
                            </td>
                            <td>
                              {rating.AdminVerif &&
                                rating.AdminVerif.Admin.username}
                            </td>
                            <td>
                              {rating.AdminVerif &&
                                dateFormat(
                                  rating.AdminVerif.createdAt,
                                  "dd/mm/yyyy"
                                )}
                            </td>
                          </tr>
                        </tbody>
                      ))}
                    </Table>
                  </>
                ) : null}
              </Col>
            </Row>
          </Container>
        </Tab>
      </Tabs>
    </div>
  );
}

export default AdminRatings;
