import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import FeedbackMessage from "../../components/FeedbackMessage";

const Test = () => {
  // const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);

  // Handle redirection in case the user is already logged in
  if (!isLoggedIn || currentUser.id !== 1) {
    return <Redirect to="/page-404" />;
  }

  return (
    <Container>
      <Row className="py-5 text-center" data-aos="slide-left">
        <Col>
          <FeedbackMessage />
        </Col>
      </Row>
    </Container>
  );
};

export default Test;
