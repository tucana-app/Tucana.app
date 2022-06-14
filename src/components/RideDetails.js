import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ArrowDownIcon, LinkExternalIcon } from "@primer/octicons-react";
import dateFormat from "dateformat";
import { formatDistance, formatTimeSecond } from "../helpers";

function RideDetails({ ride }) {
  const { t } = useTranslation();

  return (
    <Row className="mb-3 mx-1 mx-sm-0">
      <Col
        xs={12}
        sm={10}
        md={8}
        lg={6}
        xl={4}
        className="border shadow rounded-5 pb-3 mx-auto"
      >
        <Container className="p-2">
          <Row className="mb-3">
            <Col className="text-center">
              {dateFormat(ride.dateTimeOrigin, "dd/mm/yyyy")}
            </Col>
          </Row>
          <Row>
            <Col xs={2} className="mt-1 px-0">
              <p className="smaller line-height-md text-secondary text-end mb-2">
                {dateFormat(ride.dateTimeOrigin, "HH:MM TT")}
              </p>
              <p className="smaller fw-bold line-height-md text-secondary text-end mb-0">
                {formatTimeSecond(ride.ETA.durationValue)}
              </p>
            </Col>
            <Col xs={8}>
              <p className="line-height-md mb-1">
                <strong>{ride.origin.city}, </strong>
                <small>{ride.origin.province}</small>
              </p>
              <p className="mb-2">
                <ArrowDownIcon size={24} className="text-success" />
              </p>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col xs={2} className="px-0">
              <p className="smaller line-height-md text-secondary text-end mb-0">
                {dateFormat(ride.dateTimeDestination, "hh:MM TT")}
              </p>
            </Col>
            <Col xs={7}>
              <p className="line-height-md mb-0">
                <strong>{ride.destination.city}, </strong>
                <small>{ride.destination.province}</small>
              </p>
            </Col>
            <Col xs={3}></Col>
          </Row>
          <hr />
          <Row className="align-items-center">
            <Col xs={12} md={8}>
              <p className="mb-0">
                {t("translation:offer.estimatedTime")}:{" "}
                <strong>{formatTimeSecond(ride.ETA.durationValue)}</strong>
              </p>
              <p className="mb-0">
                {t("translation:offer.estimatedDistance")}:{" "}
                <strong>{formatDistance(ride.ETA.distanceValue)}</strong>
              </p>
            </Col>
            <Col xs={12} md={4} className="text-center mt-3 mt-md-0">
              <a
                href={`https://www.google.com/maps/dir/?api=1&origin=${ride.origin.address}&destination=${ride.destination.address}&travelmode=driving`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline-success" size="sm">
                  {t("translation:ride.viewTrip")}
                  <LinkExternalIcon size={18} className="ms-2" />
                </Button>
              </a>
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  );
}

export default RideDetails;
