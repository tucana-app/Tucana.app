import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import dateFormat from "dateformat";
import { PencilIcon } from "@primer/octicons-react";

import InputSearchLocation from "./InputSearchLocation";

import {
  setSearchDate,
  getFilteredRides,
  setToast,
  resetSearchOrigin,
  resetSearchDestination,
} from "../redux";

const FormSearchRides = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { formSearchRide } = useSelector((state) => state.ride);

  const [date, setDate] = useState(formSearchRide.date);

  // eslint-disable-next-line no-unused-vars
  const [stepThree, setStepThree] = useState(false);

  const handleEditOne = () => {
    dispatch(resetSearchOrigin());
  };

  const handleEditTwo = () => {
    dispatch(resetSearchDestination());
  };

  // Handlers
  const handleChangeDate = (e) => {
    setDate(e.target.value);
    dispatch(setSearchDate(e.target.value));
  };

  const handleSubmit = () => {
    if (
      date !== "" &&
      formSearchRide.origin.city !== "" &&
      formSearchRide.destination.city !== ""
    ) {
      if (
        new Date(date.slice(0, 4), date.slice(5, 7) - 1, date.slice(8, 10)) <
        new Date().setHours(0, 0, 0, 0)
      ) {
        dispatch(
          setToast({
            show: true,
            headerText: "Error",
            bodyText: t("translation:global.errors.dateFuture"),
            variant: "warning",
          })
        );
      } else {
        dispatch(
          getFilteredRides(
            formSearchRide.origin,
            formSearchRide.destination,
            formSearchRide.date
          )
        );
      }
    } else {
      dispatch(
        setToast({
          show: true,
          headerText: "Error",
          bodyText: t("translation:global.errors.missingInfo"),
          variant: "warning",
        })
      );
    }
  };

  return (
    <>
      <Row className="mb-3">
        <Col>
          <p className="mb-0 text-success">{t("translation:global.from")}:</p>
          <>
            {formSearchRide.origin.city !== "" ? (
              <Container className="px-0">
                <Row>
                  <Col xs={8} className="text-start pe-0">
                    <p className="mb-0">
                      <strong>{formSearchRide.origin.city}</strong>,{" "}
                      <small>{formSearchRide.origin.province}</small>
                    </p>
                  </Col>
                  <Col xs={4} className="text-end ps-0">
                    <Button
                      size={"sm"}
                      onClick={handleEditOne}
                      variant="outline-warning"
                    >
                      <PencilIcon size={24} className="me-2" />
                      {t("translation:global.edit")}
                    </Button>
                  </Col>
                </Row>
              </Container>
            ) : (
              <InputSearchLocation inputLocation="searchOrigin" />
            )}
          </>
        </Col>
      </Row>

      <Row className="my-2">
        <Col>
          <p className="mb-0 text-success">{t("translation:global.to")}:</p>
          <>
            {formSearchRide.destination.city !== "" ? (
              <Container className="px-0">
                <Row>
                  <Col xs={8} className="text-start pe-0">
                    <p className="mb-0">
                      <strong>{formSearchRide.destination.city}</strong>,{" "}
                      <small>{formSearchRide.destination.province}</small>
                    </p>
                  </Col>
                  <Col xs={4} className="text-end ps-0">
                    <Button
                      size={"sm"}
                      onClick={handleEditTwo}
                      variant="outline-warning"
                    >
                      <PencilIcon size={24} className="me-2" />
                      {t("translation:global.edit")}
                    </Button>
                  </Col>
                </Row>
              </Container>
            ) : (
              <InputSearchLocation inputLocation="searchDestination" />
            )}
          </>
        </Col>
      </Row>
      <Row className="align-items-center py-3">
        <Col xs={2}>
          <p className="mb-0">{t("translation:global.date")}:</p>
        </Col>
        <Col className="mx-auto">
          <Form.Group>
            <Form.Control
              type="date"
              name="date"
              value={date}
              min={dateFormat(new Date(), "yyyy-mm-dd")}
              onChange={handleChangeDate}
              onKeyPress={(event) => event.key === "Enter" && handleSubmit()}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="py-2">
        <Col className="text-end">
          <Button
            onClick={handleSubmit}
            variant="success"
            size="lg"
            type="submit"
          >
            {t("translation:global.search")}
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default FormSearchRides;
