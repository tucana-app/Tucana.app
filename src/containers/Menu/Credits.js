import React from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import GoBack from "../../components/GoBack";

const Credits = () => {
  const { t } = useTranslation();
  return (
    <div>
      <GoBack />

      <Container>
        <Row>
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
            <h1 className="title text-center">
              {t("translation:global.credits")}
            </h1>

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
                "two men sitting inside vehicle" by{" "}
                <a
                  href="https://unsplash.com/@davidemrich"
                  target="_blank"
                  rel="noreferrer"
                >
                  David Emrich
                </a>{" "}
                on Unsplash
              </ListGroup.Item>
              <ListGroup.Item>
                <a
                  href="https://www.flaticon.com/free-icons/car"
                  target="_blank"
                  rel="noreferrer"
                >
                  Car icons created by Kiranshastry - Flaticon
                </a>
              </ListGroup.Item>
              <ListGroup.Item>
                <a
                  href="https://undraw.co/illustrations"
                  target="_blank"
                  rel="noreferrer"
                >
                  Illustrations from UnDraw.co
                </a>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Credits;
