import React, { useEffect, useState } from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
// import { Link } from "react-router-dom";
import GoBack from "../../components/GoBack";
import LoadingSpinner from "../../components/LoadingSpinner";

import { admin_sendTestEmail } from "../../redux";

function AdminEmail() {
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { isLoadingSendTestEmail, sendTestEmailData, sendTestEmailError } =
    useSelector((state) => state.admin);

  const [emailAddress, setEmailAddress] = useState("info@ride.cr");

  useEffect(() => {
    if (isLoggedIn && currentUser.adminId) {
      // dispatch(admin_sendTestEmail(currentUser));
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
            <h1 className="display-4 text-success text-center">Email</h1>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Type your email address here"
                className="rounded-0"
                onChange={(e) => setEmailAddress(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col className="text-center">
            <Button
              variant="success"
              size="lg"
              className="rounded-0"
              type="submit"
              disabled={isLoadingSendTestEmail}
              onClick={() =>
                dispatch(admin_sendTestEmail(currentUser, emailAddress))
              }
            >
              <>
                {isLoadingSendTestEmail ? <LoadingSpinner /> : <></>}
                Send to "{emailAddress}"
              </>
            </Button>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col xs={12}>
            {isLoadingSendTestEmail ? (
              <LoadingSpinner />
            ) : (
              <>
                <p>Data: {JSON.stringify(sendTestEmailData)}</p>
                <p>Error: {JSON.stringify(sendTestEmailError)}</p>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminEmail;
