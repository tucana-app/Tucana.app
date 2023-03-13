import React from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ArrowDownIcon, DotFillIcon } from "@primer/octicons-react";
import dateFormat from "dateformat";
import { formatDistance, formatPrice, formatTimeSecond } from "../helpers";
import { PinMap } from "react-bootstrap-icons";

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
            <Col xs={2} className="text-center px-0">
              <p className="smaller mb-2">
                <span className="fw-bold">
                  {dateFormat(ride.dateTimeOrigin, "hh:MM")}
                </span>
                <br />
                <span>{dateFormat(ride.dateTimeOrigin, "TT")}</span>
              </p>
            </Col>
            <Col xs={10} className="ps-0">
              <div className="line-height-sm mb-1">
                <p className="fw-bold mb-0">{ride.origin.placeName}</p>{" "}
                <small className="smaller">{ride.origin.placeDetails}</small>
              </div>
              <p className="mb-2">
                <ArrowDownIcon size={24} className="text-success" />
              </p>
            </Col>
          </Row>

          <Row className="px-2">
            <Col xs={2} className="text-center px-0">
              <p className="smaller line-height-md text-center mb-0">
                <span className="fw-bold">
                  {dateFormat(ride.dateTimeDestination, "hh:MM")}
                </span>
                <br />
                <span>{dateFormat(ride.dateTimeDestination, "TT")}</span>
              </p>
            </Col>
            <Col xs={10} className="ps-0">
              <div className="line-height-sm mb-1">
                <p className="fw-bold mb-0">{ride.destination.placeName}</p>{" "}
                <small className="smaller">
                  {ride.destination.placeDetails}
                </small>
              </div>
            </Col>
            <Col xs={3}></Col>
          </Row>

          <hr />

          <Row className="align-items-center">
            <Col xs={6} className="pe-0">
              <p className="mb-0">{t("translation:publish.estimatedTime")}: </p>
              <p className="mb-0">
                {t("translation:publish.estimatedDistance")}:{" "}
              </p>
            </Col>
            <Col xs={4}>
              <p className="mb-0">
                <strong>{formatTimeSecond(ride.ETA.durationValue)}</strong>
              </p>
              <p className="mb-0">
                <strong>{formatDistance(ride.ETA.distanceValue)}</strong>
              </p>
            </Col>
            <Col xs={2} className="text-center">
              <a
                href={`https://www.google.com/maps/dir/?api=1&origin=${ride.origin.address}&destination=${ride.destination.address}&travelmode=driving`}
                target="_blank"
                className="text-success"
                rel="noopener noreferrer"
              >
                <PinMap size={24} />
              </a>
            </Col>
          </Row>

          <hr />

          <Row className="align-items-center">
            <Col xs={8} className="pe-0">
              <p className="mb-0">
                {t("translation:global.seatsAvailable")}: {ride.seatsLeft}/
                {ride.seatsAvailable}
              </p>
              {ride.comment ? (
                <p className="mb-0">
                  {t("translation:global.comment")}: <em>"{ride.comment}"</em>
                </p>
              ) : null}
              <p className="mb-0">
                <span
                  className={`text-${rideStatusVariant(ride.RideStatus.id)}`}
                >
                  <DotFillIcon size="16" verticalAlign="middle" />
                  {t("translation:global.ride")}{" "}
                  <span className="text-lowercase">
                    {t(
                      `translation:global.statuses.ride.${ride.RideStatus.id}`
                    )}
                  </span>
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
        </Container>
      </Col>
    </Row>
  );
}

export default RideDetails;
