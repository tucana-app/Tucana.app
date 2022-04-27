import React from "react";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import GoBack from "../components/GoBack";

import map1 from "../assets/images/maps/costa_rica_political_map_1_worldometers.info.jpg";
import map2 from "../assets/images/maps/costa_rica_political_map_2_costaricalaw.com.jpg";
import map3 from "../assets/images/maps/costa_rica_political_map_3_orangesmile.com.jpg";

const Map = () => {
  return (
    <>
      <GoBack />

      <Container data-aos="fade-in">
        <Row className="pt-5 text-center">
          <Col>
            <h1 className="text-success">Maps</h1>
            <p className="lead">Different maps of Costa Rica</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Map #1</Accordion.Header>
                <Accordion.Body>
                  <p>
                    <a href={map1} target={"_blank"} rel="noreferrer">
                      <img src={map1} alt="" className="img-fluid" />
                    </a>
                  </p>
                  <p>
                    Photo courtesy of{" "}
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
                <Accordion.Header>Map #2</Accordion.Header>
                <Accordion.Body>
                  <p>
                    <a href={map2} target={"_blank"} rel="noreferrer">
                      <img src={map2} alt="" className="img-fluid" />
                    </a>
                  </p>
                  <p>
                    Photo courtesy of{" "}
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
                <Accordion.Header>Map #3</Accordion.Header>
                <Accordion.Body>
                  <p>
                    <a href={map3} target={"_blank"} rel="noreferrer">
                      <img src={map3} alt="" className="img-fluid" />
                    </a>
                  </p>
                  <p>
                    Photo courtesy of{" "}
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
