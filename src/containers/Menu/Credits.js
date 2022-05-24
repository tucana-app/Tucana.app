import React from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";

import GoBack from "../../components/GoBack";

const Credits = () => {
  return (
    <div>
      <GoBack />

      <Container>
        <Row>
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
            <h1 className="title text-center">Credits</h1>

            <ListGroup>
              <ListGroup.Item>
                <a
                  href="https://www.freepik.com/vectors/rocky-mountains"
                  target="_blank"
                  rel="noreferrer"
                >
                  Rocky mountains vector created by vectorpocket -
                  www.freepik.com
                </a>
              </ListGroup.Item>
              <ListGroup.Item>
                "man driving straight on pathway during day time photo" by{" "}
                <a
                  href="https://alexjumper.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Alex Jumper
                </a>{" "}
                on Unsplash
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Credits;
