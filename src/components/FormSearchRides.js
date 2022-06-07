import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Button, Container, Offcanvas } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import dateFormat from "dateformat";
import { XIcon } from "@primer/octicons-react";
import DatePicker, { registerLocale } from "react-datepicker";
import en from "date-fns/locale/en-US";
import es from "date-fns/locale/es";
import fr from "date-fns/locale/fr";
import i18n from "i18next";

import InputSearchLocation from "./InputSearchLocation";

import {
  setSearchDate,
  getFilteredRides,
  setToast,
  resetSearchOrigin,
  resetSearchDestination,
} from "../redux";

// Enable translation for the date picker
registerLocale("en", en);
registerLocale("es", es);
registerLocale("fr", fr);

const FormSearchRides = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { formSearchRide } = useSelector((state) => state.ride);

  const [showOffcanvaDate, setShowOffcanvaDate] = useState(false);

  var now = new Date();
  var dateMax;
  if (now.getMonth() === 11) {
    dateMax = new Date(now.getFullYear() + 1, 2, 0);
  } else {
    dateMax = new Date(now.getFullYear(), now.getMonth() + 4, 0);
  }

  // Date picker
  const [date, setDate] = useState(
    formSearchRide.date === "" ? now : formSearchRide.date
  );

  if (formSearchRide.date === "") {
    dispatch(setSearchDate(now));
  }

  // Handlers
  const handleEditOne = () => {
    dispatch(resetSearchOrigin());
  };

  const handleEditTwo = () => {
    dispatch(resetSearchDestination());
  };

  // Handlers
  const handleChangeDate = (date) => {
    setDate(date);
    dispatch(setSearchDate(date));
    setShowOffcanvaDate(false);
  };

  const handleSubmit = () => {
    if (
      formSearchRide.date !== "" &&
      formSearchRide.origin.city !== "" &&
      formSearchRide.destination.city !== ""
    ) {
      if (date < new Date().setHours(0, 0, 0, 0)) {
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
                      className="p-0"
                    >
                      <XIcon size={24} />
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
                      className="p-0"
                    >
                      <XIcon size={24} />
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
              type="text"
              name="date"
              value={dateFormat(date, "dd/mm/yyyy")}
              className="cursor-pointer no-caret"
              onClick={() => setShowOffcanvaDate(true)}
              required
              readOnly
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

      <Offcanvas
        show={showOffcanvaDate}
        onHide={() => setShowOffcanvaDate(false)}
        placement="bottom"
        className="vh-100"
      >
        <Container>
          <Row>
            <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                  <h1>{t("translation:global.date")}</h1>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="text-center">
                <DatePicker
                  selected={date}
                  onChange={handleChangeDate}
                  monthsShown={2}
                  minDate={now}
                  maxDate={dateMax}
                  locale={i18n.language}
                  inline
                />
              </Offcanvas.Body>
            </Col>
          </Row>
        </Container>
      </Offcanvas>
    </>
  );
};

export default FormSearchRides;
