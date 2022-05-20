import React from "react";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import GoBack from "../components/GoBack";
import { useTranslation } from "react-i18next";

import map1 from "../assets/images/maps/costa_rica_political_map_1_worldometers.info.jpg";
import map2 from "../assets/images/maps/costa_rica_political_map_2_costaricalaw.com.jpg";
import map3 from "../assets/images/maps/costa_rica_political_map_3_orangesmile.com.jpg";

const Map = () => {
  const { t } = useTranslation();

  return (
    <>
      <GoBack />

      <Container data-aos="fade-in">
        <Row className="text-center">
          <Col>
            <h1 className="title">{t("translation:maps.title")}</h1>
            <p className="lead">{t("translation:maps.subTitle")}</p>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="pb-5 mx-auto">
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  {t("translation:maps.map")} #1
                </Accordion.Header>
                <Accordion.Body>
                  <p>
                    <a href={map1} target={"_blank"} rel="noreferrer">
                      <img src={map1} alt="" className="img-fluid" />
                    </a>
                  </p>
                  <p>
                    {t("translation:maps.courtesy")}{" "}
                    <a
                      href="https://www.worldometers.info/maps/costa-rica-political-map-full/"
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      worldometers.info
                    </a>{" "}
                    (
                    <a
                      href="https://www.worldometers.info/img/maps/costa_rica_political_map.gif"
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      source
                    </a>
                    )
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  {t("translation:maps.map")} #2
                </Accordion.Header>
                <Accordion.Body>
                  <p>
                    <a href={map2} target={"_blank"} rel="noreferrer">
                      <img src={map2} alt="" className="img-fluid" />
                    </a>
                  </p>
                  <p>
                    {t("translation:maps.courtesy")}{" "}
                    <a
                      href="https://costaricalaw.com/costa-rica-facts/maps-of-costa-rica/maps-of-the-provinces-and-cantons-of-costa-rica/"
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      costaricalaw.com
                    </a>{" "}
                    (
                    <a
                      href="https://costaricalaw.com/wp-content/uploads/2015/09/political-map-of-Costa-Rica.gif"
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      source
                    </a>
                    )
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  {t("translation:maps.map")} #3
                </Accordion.Header>
                <Accordion.Body>
                  <p>
                    <a href={map3} target={"_blank"} rel="noreferrer">
                      <img src={map3} alt="" className="img-fluid" />
                    </a>
                  </p>
                  <p>
                    {t("translation:maps.courtesy")}{" "}
                    <a
                      href="https://www.orangesmile.com/travelguide/costa-rica/country-maps-provinces.htm"
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      orangesmile.com
                    </a>{" "}
                    (
                    <a
                      href="https://www.orangesmile.com/common/img_country_maps_provinces/costa-rica-map-provinces-0.jpg"
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      source
                    </a>
                    )
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Map;
