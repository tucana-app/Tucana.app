import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Route } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";

function DownloadRedirect(props) {
  return (
    <>
      <Container className="vh-100">
        <Row className="h-100 align-items-center">
          <Col className="text-center">
            <LoadingSpinner />
          </Col>
        </Row>
      </Container>
      <Route
        component={() => {
          window.location.replace(process.env.REACT_APP_DEEP_LINK);
          return null;
        }}
      />
      ;
    </>
  );
}

export default DownloadRedirect;
