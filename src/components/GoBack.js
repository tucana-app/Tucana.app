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
    <Row className="mx-1 mx-sm-0">
      <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
        <Container className="mt-4 px-2">
          <Row>
            <Col xs={1}>
              <div onClick={handleGoBack} className="cursor-pointer">
                <ArrowLeftIcon size={28} className="text-success" />
              </div>
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  );
}

export default withRouter(GoBack);
