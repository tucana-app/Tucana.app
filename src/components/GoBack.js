import React from "react";
import { withRouter } from "react-router-dom";
import { ArrowLeftIcon } from "@primer/octicons-react";
import { Col, Container, Row } from "react-bootstrap";

function GoBack(props) {
  const { history } = props;

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col xs={1}>
          <div onClick={handleGoBack} className="cursor-pointer">
            <ArrowLeftIcon size={28} className="text-success" />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default withRouter(GoBack);
