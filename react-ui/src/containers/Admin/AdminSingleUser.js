import React, { useEffect } from "react";
import { Container, Col, Row, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
// import { Link } from "react-router-dom";
import GoBack from "../../components/GoBack";
import LoadingSpinner from "../../components/LoadingSpinner";

import { admin_getUsers } from "../../redux";

function AdminSingleUser() {
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { isLoadingUsers, usersData } = useSelector((state) => state.admin);

  useEffect(() => {
    if (isLoggedIn) {
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
        <Row>
          <Col>
            <h1 className="display-4 text-success text-center">Single User</h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminSingleUser;
