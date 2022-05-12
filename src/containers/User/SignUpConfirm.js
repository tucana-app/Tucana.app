import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { Link, Redirect, useParams } from "react-router-dom";

import { confirmEmail } from "../../redux";
import LoadingSpinner from "../../components/LoadingSpinner";

const SignUpConfirm = () => {
  const { uuid } = useParams();

  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { isLoadingConfirmEmail } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isLoggedIn) dispatch(confirmEmail(uuid));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle redirection in case the user is already logged in
  if (isLoggedIn) {
    return <Redirect to="/find" />;
  }

  return (
    <Container data-aos="fade-in">
      <Row className="py-5 text-center">
        <Col className="text-center">
          <div>
            <h1 className="display-4 mb-5">Confirm your email address</h1>
            <h3 className="fw-light">
              You can now{" "}
              <Link to="/login" className="link-success">
                login here
              </Link>
            </h3>
          </div>
        </Col>
      </Row>

      <Row>
        {isLoadingConfirmEmail ? (
          <Col className="text-center">
            <LoadingSpinner />
          </Col>
        ) : null}
      </Row>
    </Container>
  );
};

export default SignUpConfirm;
