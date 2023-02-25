import React from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  ArrowDownIcon,
  ChevronRightIcon,
  DotFillIcon,
} from "@primer/octicons-react";
import dateFormat from "dateformat";
import { formatDistance, formatPrice, formatTimeSecond } from "../helpers";
import { Map } from "react-bootstrap-icons";

function RideDetails({ ride }) {
  const { t } = useTranslation();
  const { rideStatusVariant } = useSelector((state) => state.global);

  return (
    <Row className="mb-3 mx-1 mx-sm-0">
      <Col
        xs={12}
        sm={10}
        md={8}
        lg={6}
        xl={4}
        className="container-box mx-auto"
      >
        <Container className="p-2">
          <Row className="mb-3">
            <Col className="text-center">
              {dateFormat(ride.dateTimeOrigin, "dd/mm/yyyy")}
            </Col>
          </Row>

          <Row className="px-2">
            <Col xs={2} className="mt-1 px-0">
              <p className="smaller line-height-md text-secondary text-end mb-2">
                {dateFormat(ride.dateTimeOrigin, "HH:MM TT")}
              </p>
              <p className="smaller fw-bold line-height-md text-secondary text-end mb-0">
                {formatTimeSecond(ride.ETA.durationValue)}
              </p>
            </Col>
            <Col xs={10}>
              <p className="line-height-md mb-1">
                <strong>{ride.origin.placeName}, </strong>
                <small>{ride.origin.placeDetails}</small>
              </p>
              <p className="mb-2">
                <ArrowDownIcon size={24} className="text-success" />
              </p>
            </Col>
          </Row>

          <Row className="align-items-center px-2">
            <Col xs={2} className="px-0">
              <p className="smaller line-height-md text-secondary text-end mb-0">
                {dateFormat(ride.dateTimeDestination, "hh:MM TT")}
              </p>
            </Col>
            <Col xs={10}>
              <p className="line-height-md mb-0">
                <strong>{ride.destination.placeName}, </strong>
                <small>{ride.destination.placeDetails}</small>
              </p>
            </Col>
            <Col xs={3}></Col>
          </Row>

          <hr />

          <Row className="align-items-center">
            <Col xs={10}>
              <p className="mb-0">
                {t("translation:publish.estimatedTime")}:{" "}
                <strong>{formatTimeSecond(ride.ETA.durationValue)}</strong>
              </p>
              <p className="mb-0">
                {t("translation:publish.estimatedDistance")}:{" "}
                <strong>{formatDistance(ride.ETA.distanceValue)}</strong>
              </p>
            </Col>
            <Col xs={2} className="text-center ps-0">
              <a
                href={`https://www.google.com/maps/dir/?api=1&origin=${ride.origin.address}&destination=${ride.destination.address}&travelmode=driving`}
                target="_blank"
                className="text-success"
                rel="noopener noreferrer"
              >
                <Map size={24} />
                <ChevronRightIcon size={24} />
              </a>
            </Col>
          </Row>

          <hr />

          <Row className="align-items-center">
            <Col xs={8}>
              <p className="mb-0">
                {t("translation:global.seatsAvailable")}:{" "}
                <span className="text-success">{ride.seatsLeft}</span>/
                {ride.seatsAvailable}
              </p>
              <p className="mb-0">
                {t("translation:global.status")}:{" "}
                <span
                  className={`text-${rideStatusVariant(ride.RideStatus.id)}`}
                >
                  <DotFillIcon size="16" verticalAlign="middle" />
                  {t(`translation:global.statuses.ride.${ride.RideStatus.id}`)}
                </span>
              </p>
            </Col>
            <Col xs={4} className="text-center">
              <div className="line-height-sm mb-0">
                <h3 className="p fw-bold mb-0">{formatPrice(ride.price)}</h3>
                <span className="smaller text-secondary">
                  {t("translation:global.perSeat")}
                </span>
              </div>
            </Col>
          </Row>
          {!(ride.comment === "") ? (
            <Row>
              <Col>
                <p className="mb-0">
                  {t("translation:global.comment")}: "{ride.comment}"
                </p>
              </Col>
            </Row>
          ) : null}
        </Container>
      </Col>
    </Row>
  );
}

export default RideDetails;
