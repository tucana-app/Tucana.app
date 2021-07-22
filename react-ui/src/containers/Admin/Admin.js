import React, { useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import LoadingMessage from "../../components/LoadingMessage";

import { getUsers } from "../../redux";

function Admin() {
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { isLoadingUsers, usersData } = useSelector((state) => state.admin);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUsers(currentUser.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle redirection in case the user is already logged in
  if (!isLoggedIn || currentUser.id !== 1) {
    return <Redirect to="/page-404" />;
  }

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1 className="display-4 text-succes text-center">Admin</h1>
        </Col>
      </Row>

      <Row>
        <Col>
          {isLoadingUsers ? (
            <LoadingMessage />
          ) : (
            <>
              TOTAL: {usersData.length}
              {usersData.map((user, index) => (
                <div key={index}>
                  Username: {user.username}. ({user.firstName} {user.lastName})
                </div>
              ))}
            </>
          )}
        </Col>

        <Col>
          <Link to="/admin/test">Test page</Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Admin;
