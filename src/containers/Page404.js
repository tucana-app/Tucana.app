import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import GoBack from "../components/GoBack";

const Page404 = () => {
  return (
    <>
      <GoBack />
      <Container className="text-center py-5" data-aos="fade-in">
        <Row className="h-100 align-items-center">
          <Col>
            <div>
              <h1 className="display-4 text-warning">404: Page not found</h1>
            </div>
            <div>
              <p className="lead">
                We couldn't find the page you are looking for.
              </p>
              <p>
                Please come back to the{" "}
                <Link to="/" className="text-success">
                  <u>home page</u>
                </Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Page404;
