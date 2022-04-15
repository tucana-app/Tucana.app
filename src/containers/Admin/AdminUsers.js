import React, { useEffect } from "react";
import { Container, Col, Row, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
// import { Link } from "react-router-dom";
import GoBack from "../../components/GoBack";
import LoadingSpinner from "../../components/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import dateFormat from "dateformat";

import { admin_getUsers } from "../../redux";

function AdminUsers() {
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { isLoadingUsers, usersData } = useSelector((state) => state.admin);

  useEffect(() => {
    if (isLoggedIn && currentUser.adminId) {
      dispatch(admin_getUsers(currentUser));
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
            <h1 className="display-4 text-success text-center">USERS</h1>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            {isLoadingUsers ? (
              <LoadingSpinner />
            ) : (
              <>
                <p>TOTAL: {usersData.length}</p>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Email confirmed</th>
                      <th>Phone</th>
                      <th>Phone confirmed</th>
                      <th>Since</th>
                      <th></th>
                    </tr>
                  </thead>
                  {usersData.map((user, index) => (
                    <tbody key={index}>
                      <tr>
                        <td>{user.id}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.username}</td>
                        <td>
                          <a href={`mailto:${user.email}`}>{user.email}</a>
                        </td>
                        <td>
                          {user.emailConfirmed ? (
                            <span className="text-success">
                              <FontAwesomeIcon
                                icon={faCheckCircle}
                                className="me-2"
                              />
                              Yes
                            </span>
                          ) : (
                            <span className="text-danger">
                              <FontAwesomeIcon
                                icon={faTimesCircle}
                                className="me-2"
                              />
                              No
                            </span>
                          )}
                        </td>
                        <td>{user.phoneNumber}</td>
                        <td>
                          {user.phoneConfirmed ? (
                            <span className="text-success">
                              <FontAwesomeIcon
                                icon={faCheckCircle}
                                className="me-2"
                              />
                              Yes
                            </span>
                          ) : (
                            <span className="text-danger">
                              <FontAwesomeIcon
                                icon={faTimesCircle}
                                className="me-2"
                              />
                              No
                            </span>
                          )}
                        </td>
                        <td>{dateFormat(user.createdAt, "dd/mm/yyyy")}</td>
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

export default AdminUsers;
