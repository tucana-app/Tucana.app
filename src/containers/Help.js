import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { AlertFillIcon, ChevronRightIcon } from "@primer/octicons-react";

import GoBack from "../components/GoBack";

const Help = () => {
  return (
    <div>
      <GoBack />

      <Container fluid data-aos="fade-in">
        <Row>
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
            <ListGroup variant="flush">
              <ListGroup.Item className="border-0">
                <p className="mb-0">
                  <AlertFillIcon size={24} className="text-warning me-2" />
                  If anything happens during your ride, call{" "}
                  <strong>911</strong> immediatly, the local emergency services
                </p>
              </ListGroup.Item>

              <hr className="my-2" />

              <Link to="/how-it-works" className="text-decoration-none">
                <ListGroup.Item className="border-0">
                  <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                    <p className="mb-0">How does it works?</p>
                    <ChevronRightIcon size={24} verticalAlign="middle" />
                  </div>
                </ListGroup.Item>
              </Link>

              <Link to="/map" className="text-decoration-none">
                <ListGroup.Item className="border-0">
                  <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                    <p className="mb-0">Map of Costa Rica</p>
                    <ChevronRightIcon size={24} verticalAlign="middle" />
                  </div>
                </ListGroup.Item>
              </Link>

              <Link to="/contact" className="text-decoration-none">
                <ListGroup.Item className="border-0">
                  <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                    <p className="mb-0">Report a problem</p>
                    <ChevronRightIcon size={24} verticalAlign="middle" />
                  </div>
                </ListGroup.Item>
              </Link>

              <Link to="/refund-policy" className="text-decoration-none">
                <ListGroup.Item className="border-0">
                  <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                    <p className="mb-0">Refund policy</p>
                    <ChevronRightIcon size={24} verticalAlign="middle" />
                  </div>
                </ListGroup.Item>
              </Link>

              <Link to="/faq" className="text-decoration-none">
                <ListGroup.Item className="border-0">
                  <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                    <p className="mb-0">FAQ</p>
                    <ChevronRightIcon size={24} verticalAlign="middle" />
                  </div>
                </ListGroup.Item>
              </Link>

              <hr className="my-2" />

              <Link to="/contact" className="text-decoration-none">
                <ListGroup.Item className="border-0">
                  <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                    <p className="mb-0">Contact Us</p>
                    <ChevronRightIcon size={24} verticalAlign="middle" />
                  </div>
                </ListGroup.Item>
              </Link>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Help;
