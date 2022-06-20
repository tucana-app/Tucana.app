import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import GoBack from "../../components/GoBack";

function PassengerProfile(props) {
  const { t } = useTranslation();
  const { username } = useParams();

  return (
    <div>
      <GoBack />

      <Container>
        <Row>
          <Col
            xs={12}
            sm={10}
            md={8}
            lg={6}
            xl={4}
            className="text-center mx-auto"
          >
            <h1 className="text-success">{username}</h1>
            <p className="lead">
              {t("translation:comingSoon.subTitle")}
              <br />
              {t("translation:comingSoon.thankYou")}
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PassengerProfile;
