import React, { useEffect } from "react";
import { Container, Col, Row, Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
// import { Link } from "react-router-dom";
import GoBack from "../../components/GoBack";
import LoadingSpinner from "../../components/LoadingSpinner";
import dateFormat from "dateformat";

import { admin_getRides } from "../../redux";
import { LinkContainer } from "react-router-bootstrap";

function AdminRides() {
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { rideStatusVariant } = useSelector((state) => state.global);
  const { isLoadingRides, ridesData } = useSelector((state) => state.admin);

  useEffect(() => {
    if (isLoggedIn && currentUser.adminId) {
      dispatch(admin_getRides(currentUser));
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
            <h1 className="display-4 text-success text-center">Rides</h1>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            {isLoadingRides ? (
              <LoadingSpinner />
            ) : (
              <>
                <p>TOTAL: {ridesData.length}</p>
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
                      <th></th>
                    </tr>
                  </thead>
                  {ridesData.map((ride, index) => (
                    <tbody key={index}>
                      <tr>
                        <td>{ride.id}</td>
                        <td>
                          {ride.cityOrigin} ({ride.provinceOrigin})
                        </td>
                        <td>
                          {ride.cityDestination} ({ride.provinceDestination})
                        </td>
                        <td>{ride.Driver.User.username}</td>
                        <td>{dateFormat(ride.dateTime, "dd/mm/yyyy HH:MM")}</td>
                        <td>
                          {ride.seatsLeft}/{ride.seatsAvailable}
                        </td>
                        <td>
                          <span
                            className={`text-${rideStatusVariant(
                              ride.RideStatus.id
                            )}`}
                          >
                            {ride.RideStatus.name}
                          </span>
                        </td>
                        <td>
                          <LinkContainer to={`/admin/ride/${ride.id}`}>
                            <Button variant="success">View</Button>
                          </LinkContainer>
                        </td>
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

export default AdminRides;
