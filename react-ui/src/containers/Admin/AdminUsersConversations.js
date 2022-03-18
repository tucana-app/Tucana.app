import React, { useEffect } from "react";
import { Container, Col, Row, Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import GoBack from "../../components/GoBack";
import LoadingSpinner from "../../components/LoadingSpinner";

import { admin_getUsersConversations } from "../../redux";

function AdminUsersConversations() {
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { isLoadingUsersConversations, usersConversationsData } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(admin_getUsersConversations(currentUser));
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
              USERS CONVERSATIONS
            </h1>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            {isLoadingUsersConversations ? (
              <LoadingSpinner />
            ) : (
              <>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Driver</th>
                      <th>Passenger</th>
                      <th>Ride</th>
                      <th>Booking</th>
                      <th></th>
                    </tr>
                  </thead>
                  {usersConversationsData.map((conversation, index) => (
                    <tbody key={index}>
                      <tr>
                        <td>{conversation.id} </td>
                        <td>
                          {conversation.Driver.User.firstName}{" "}
                          {conversation.Driver.User.lastName}
                        </td>
                        <td>
                          {conversation.User.firstName}{" "}
                          {conversation.User.lastName}
                        </td>
                        <td>
                          <LinkContainer
                            to={`/ride/${conversation.RideId}`}
                            className="cursor-pointer text-decoration-underline text-success"
                          >
                            <span>
                              {conversation.Ride.cityOrigin} to{" "}
                              {conversation.Ride.cityDestination}
                            </span>
                          </LinkContainer>
                        </td>
                        <td>
                          <LinkContainer
                            to={`/booking/${conversation.BookingId}`}
                          >
                            <Button variant="warning" className="rounded-0">
                              {conversation.BookingId}
                            </Button>
                          </LinkContainer>
                        </td>
                        <td>View</td>
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

export default AdminUsersConversations;
