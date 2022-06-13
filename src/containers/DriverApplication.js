import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { Trans, useTranslation } from "react-i18next";
import Select from "react-select";
import { Link, Redirect } from "react-router-dom";
import { ArrowLeftIcon, ArrowRightIcon, XIcon } from "@primer/octicons-react";

import LoadingSpinner from "../components/LoadingSpinner";

import {
  setToast,
  getCountries,
  setApplicationIdType,
  setApplicationIdNumber,
  setApplicationIdCountry,
  setApplicationLicenseNumber,
  setApplicationLicenseCountry,
  setApplicationCarMaker,
  setApplicationNumberPlate,
  resetApplicationForm,
  submitFormBecomeDriver,
} from "../redux";
import { LinkContainer } from "react-router-bootstrap";

const DriverApplication = ({ ride }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    user: currentUser,
    isLoggedIn,
    isLoadingSubmitFormBecomeDriver,
    submitFormBecomeDriverSuccess,
    formApplyDriver,
  } = useSelector((state) => state.user);
  const { isLoadingCountries, countries } = useSelector(
    (state) => state.global
  );

  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [idType, setIdType] = useState(formApplyDriver.id.type);
  const [idNumber, setIdNumber] = useState(formApplyDriver.id.number);
  const [idCountry, setIdCountry] = useState(formApplyDriver.id.country);
  const [licenseNumber, setLicenseNumber] = useState(
    formApplyDriver.license.number
  );
  const [licenseCountry, setLicenseCountry] = useState(
    formApplyDriver.license.country
  );
  const [carMaker, setCarMaker] = useState(formApplyDriver.car.maker);
  const [numberPlate, setNumberPlate] = useState(
    formApplyDriver.car.numberPlate
  );

  const countriesSelect = useRef([]);

  const backButton = (handleBackToStep) => {
    return (
      <Col xs={1} className="text-start" style={{ position: "absolute" }}>
        <div className="cursor-pointer" onClick={handleBackToStep}>
          <ArrowLeftIcon size={28} className="text-success" />
        </div>
      </Col>
    );
  };

  // Steps
  // Step 1
  const handleChangeIdType = (e) => {
    setIdType(e.target.value);
    dispatch(setApplicationIdType(e.target.value));
  };

  const handleChangeIdNumber = (e) => {
    setIdNumber(e.target.value);
    dispatch(setApplicationIdNumber(e.target.value));
  };

  const handleChangeIdCountry = (country) => {
    setIdCountry(country);
    dispatch(setApplicationIdCountry(country));
  };

  const handleClickStepOne = () => {
    if (idType !== "" && idNumber !== "" && idCountry !== "") {
      setStepOne(false);
      setStepTwo(true);
    } else {
      dispatch(
        setToast({
          show: true,
          headerText: t("translation:global.errors.error"),
          bodyText: t("translation:global.errors.missingInfo"),
          variant: "warning",
        })
      );
    }
  };

  const handleResetStepOne = () => {
    setIdType("");
    setIdNumber("");
    setIdCountry("");
  };

  // Step 2
  const handleChangeLicenseNumber = (e) => {
    setLicenseNumber(e.target.value);
    dispatch(setApplicationLicenseNumber(e.target.value));
  };

  const handleChangeLicenseCountry = (country) => {
    setLicenseCountry(country);
    dispatch(setApplicationLicenseCountry(country));
  };

  const handleClickStepTwo = () => {
    if (licenseNumber !== "" && licenseCountry !== "") {
      setStepTwo(false);
      setStepThree(true);
    } else {
      dispatch(
        setToast({
          show: true,
          headerText: t("translation:global.errors.error"),
          bodyText: t("translation:global.errors.missingInfo"),
          variant: "warning",
        })
      );
    }
  };

  const handleBackToStepOne = () => {
    setStepOne(true);
    setStepTwo(false);
  };

  const handleResetStepTwo = () => {
    setLicenseNumber("");
    setLicenseCountry("");
  };

  // Step 3
  const handleChangeCarMaker = (e) => {
    setCarMaker(e.target.value);
    dispatch(setApplicationCarMaker(e.target.value));
  };

  const handleChangeNumberPlate = (e) => {
    setNumberPlate(e.target.value);
    dispatch(setApplicationNumberPlate(e.target.value));
  };

  const handleBackToStepTwo = () => {
    setStepTwo(true);
    setStepThree(false);
  };

  const handleResetStepThree = () => {
    setCarMaker("");
    setNumberPlate("");
  };

  // Handlers

  const handleClickCancel = () => {
    dispatch(resetApplicationForm());

    handleResetStepOne();
    handleResetStepTwo();
    handleResetStepThree();
  };

  const handleSubmit = () => {
    if (carMaker !== "" && numberPlate !== "") {
      // If the number plate has the correct format
      if (numberPlate.match(/^([0-9]{1,3}|[a-zA-Z]{3})[0-9]{0,3}$/)) {
        dispatch(submitFormBecomeDriver(currentUser, formApplyDriver));

        setSubmitted(true);
        setStepThree(false);
      } else {
        dispatch(
          setToast({
            show: true,
            headerText: t("translation:global.errors.error"),
            bodyText: t("translation:global.errors.validNumberPlage"),
            variant: "warning",
          })
        );
      }
    } else {
      dispatch(
        setToast({
          show: true,
          headerText: t("translation:global.errors.error"),
          bodyText: t("translation:global.errors.missingInfo"),
          variant: "warning",
        })
      );
    }
  };

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(getCountries());
    } else {
      countries.sort((a, b) => {
        let fa = a.name.common.toLowerCase(),
          fb = b.name.common.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });

      countriesSelect.current = countries.map((country) => {
        return {
          value: country,
          label: country.name.common,
          image: country.flags.svg,
        };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countries]);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Container className="my-5">
      <Row className="mb-3">
        <Col className="text-center">
          <h1 className="title">
            {t("translation:becomeDriver.applicationForm")}
          </h1>
        </Col>
      </Row>

      {stepOne ? (
        <>
          <Row className="mx-1 mx-sm-0">
            <Col
              xs={12}
              md={10}
              sm={8}
              lg={6}
              xl={4}
              className="bg-light border shadow rounded-5 py-3 mx-auto"
            >
              <Container className="px-0 px-md-2">
                <Row className="mb-3">
                  <Col className="text-center">
                    <h3 className="fw-light">
                      {t("translation:becomeDriver.aboutYou")}
                    </h3>
                    <p className="fw-bold mb-0">
                      1. {t("translation:becomeDriver.identification")}
                    </p>
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col className="text-center"></Col>
                </Row>
                <Row className="mb-3">
                  <Col className="text-center">
                    <Form.Group>
                      <Form.Check
                        label={t("translation:becomeDriver.nationalId")}
                        value={t("translation:becomeDriver.nationalId")}
                        name="idType"
                        type="radio"
                        checked={
                          formApplyDriver.id.type ===
                          t("translation:becomeDriver.nationalId")
                        }
                        onChange={handleChangeIdType}
                        inline
                      />
                      <Form.Check
                        label={t("translation:becomeDriver.passport")}
                        value={t("translation:becomeDriver.passport")}
                        name="idType"
                        checked={
                          formApplyDriver.id.type ===
                          t("translation:becomeDriver.passport")
                        }
                        onChange={handleChangeIdType}
                        type="radio"
                        inline
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {formApplyDriver.id.type !== "" ? (
                  <>
                    <Row>
                      <Col xs={12} className="mb-3">
                        <p className="small ms-2 mb-0">
                          {t("translation:global.number")}
                          <span className="text-danger">*</span>
                        </p>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="idNumber"
                            placeholder="11AA22333, 123W333, etc."
                            value={idNumber}
                            onChange={handleChangeIdNumber}
                            maxLength={30}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <Form.Group>
                          <p className="small ms-2 mb-0">
                            {t("translation:becomeDriver.countryIssue")}
                            <span className="text-danger">*</span>
                          </p>
                          <Select
                            value={idCountry}
                            name="idCountry"
                            placeholder={`${t("translation:global.search")}...`}
                            onChange={handleChangeIdCountry}
                            options={countriesSelect.current}
                            isDisabled={isLoadingCountries}
                            formatOptionLabel={(country) => (
                              <div className="d-inline-flex align-items-center mb-0">
                                <img
                                  src={country.image}
                                  alt=""
                                  height={"20"}
                                  className="me-2"
                                />
                                <span>{country.label}</span>
                              </div>
                            )}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mt-3 mb-5">
                      <Col className="text-center line-height-sm">
                        <small className="smaller text-secondary">
                          <Trans i18nKey="translation:becomeDriver.disclaimer">
                            We do not any disclose information about your
                            country of origin. This is solely for verification
                            purposes
                          </Trans>
                        </small>
                      </Col>
                    </Row>
                  </>
                ) : null}

                <Row>
                  <Col className="text-start">
                    <Link to="/become-driver">
                      <Button
                        onClick={handleClickCancel}
                        variant="danger"
                        className="hvr-icon-shrink ms-2"
                      >
                        <XIcon
                          size={18}
                          verticalAlign="middle"
                          className="hvr-icon me-2"
                        />
                        {t("translation:global.cancel")}
                      </Button>
                    </Link>
                  </Col>
                  <Col className="text-end">
                    <Button
                      onClick={handleClickStepOne}
                      variant="success"
                      className="hvr-icon-forward ms-2"
                      disabled={
                        formApplyDriver.id.type === "" ||
                        formApplyDriver.id.number === "" ||
                        formApplyDriver.id.country === ""
                      }
                    >
                      {t("translation:global.next")}
                      <ArrowRightIcon size={24} className="hvr-icon ms-2" />
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>

          <Row className="mt-3 mb-5">
            <Col xs={12} md={10} sm={8} lg={6} xl={4} className="mx-auto">
              <p className="small text-secondary mb-0">
                {t("translation:becomeDriver.message")}
              </p>
            </Col>
          </Row>
        </>
      ) : stepTwo ? (
        <>
          <Row className="mx-1 mx-sm-0">
            <Col
              xs={12}
              md={10}
              sm={8}
              lg={6}
              xl={4}
              className="bg-light border shadow rounded-5 py-3 mx-auto"
            >
              <Container className="px-0 px-md-2">
                <Row className="mb-3">
                  {backButton(handleBackToStepOne)}

                  <Col className="text-center">
                    <h3 className="fw-light">
                      {t("translation:becomeDriver.aboutYou")}
                    </h3>
                    <p className="fw-bold mb-0">
                      2. {t("translation:becomeDriver.drivingLicense")}
                    </p>
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col className="text-center"></Col>
                </Row>

                <>
                  <Row>
                    <Col xs={12} className="mb-3">
                      <p className="small ms-2 mb-0">
                        {t("translation:global.number")}
                        <span className="text-danger">*</span>
                      </p>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          name="licenseNumber"
                          placeholder="11AA22333, 123W333, etc."
                          value={licenseNumber}
                          onChange={handleChangeLicenseNumber}
                          maxLength={30}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group>
                        <p className="small ms-2 mb-0">
                          {t("translation:becomeDriver.countryIssue")}
                          <span className="text-danger">*</span>
                        </p>
                        <Select
                          value={licenseCountry}
                          name="licenseCountry"
                          placeholder={`${t("translation:global.search")}...`}
                          onChange={handleChangeLicenseCountry}
                          options={countriesSelect.current}
                          isDisabled={isLoadingCountries}
                          formatOptionLabel={(country) => (
                            <div className="d-inline-flex align-items-center mb-0">
                              <img
                                src={country.image}
                                alt=""
                                height={"20"}
                                className="me-2"
                              />
                              <span>{country.label}</span>
                            </div>
                          )}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-3 mb-5">
                    <Col className="text-center line-height-sm">
                      <small className="smaller text-secondary">
                        <Trans i18nKey="translation:becomeDriver.disclaimer">
                          We do not disclose any information about your country
                          of origin. This is solely for verification purposes
                        </Trans>
                      </small>
                    </Col>
                  </Row>
                </>

                <Row>
                  <Col className="text-start">
                    <Link to="/become-driver">
                      <Button
                        onClick={handleClickCancel}
                        variant="danger"
                        className="hvr-icon-shrink ms-2"
                      >
                        <XIcon
                          size={18}
                          verticalAlign="middle"
                          className="hvr-icon me-2"
                        />
                        {t("translation:global.cancel")}
                      </Button>
                    </Link>
                  </Col>
                  <Col className="text-end">
                    <Button
                      onClick={handleClickStepTwo}
                      variant="success"
                      className="hvr-icon-forward ms-2"
                      disabled={
                        formApplyDriver.license.type === "" ||
                        formApplyDriver.license.number === "" ||
                        formApplyDriver.license.country === ""
                      }
                    >
                      {t("translation:global.next")}
                      <ArrowRightIcon size={24} className="hvr-icon ms-2" />
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>

          <Row className="mt-3 mb-5">
            <Col xs={12} md={10} sm={8} lg={6} xl={4} className="mx-auto">
              <p className="small text-secondary mb-0">
                {t("translation:becomeDriver.message")}
              </p>
            </Col>
          </Row>
        </>
      ) : stepThree ? (
        <>
          <Row className="mx-1 mx-sm-0">
            <Col
              xs={12}
              md={10}
              sm={8}
              lg={6}
              xl={4}
              className="bg-light border shadow rounded-5 py-3 mx-auto"
            >
              <Container className="px-0 px-md-2">
                <Row className="mb-3">
                  {backButton(handleBackToStepTwo)}

                  <Col className="text-center">
                    <h3 className="fw-light">
                      {t("translation:becomeDriver.titleVehicle")}
                    </h3>
                    <p className="fw-bold mb-0">
                      3. {t("translation:becomeDriver.vehicleDetails")}
                    </p>
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col className="text-center"></Col>
                </Row>

                <Row className="mb-5">
                  <Col xs={12} className="mb-3">
                    <p className="small ms-2 mb-0">
                      {t("translation:becomeDriver.maker")}
                      <span className="text-danger">*</span>
                    </p>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        name="carMaker"
                        placeholder="Toyota, Dodge, etc."
                        value={carMaker}
                        onChange={handleChangeCarMaker}
                        maxLength={30}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group>
                      <p className="small ms-2 mb-0">
                        {t("translation:becomeDriver.numberPlate")}
                        <span className="text-danger">*</span>
                      </p>
                      <Form.Control
                        type="text"
                        name="numberPlate"
                        placeholder="333AAA, 222000, etc."
                        value={numberPlate}
                        onChange={handleChangeNumberPlate}
                        maxLength={6}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col className="text-start">
                    <Link to="/become-driver">
                      <Button
                        onClick={handleClickCancel}
                        variant="danger"
                        className="hvr-icon-shrink ms-2"
                      >
                        <XIcon
                          size={18}
                          verticalAlign="middle"
                          className="hvr-icon me-2"
                        />
                        {t("translation:global.cancel")}
                      </Button>
                    </Link>
                  </Col>
                  <Col className="text-end">
                    <Button
                      onClick={handleSubmit}
                      variant="success"
                      className="hvr-icon-forward ms-2"
                      disabled={
                        formApplyDriver.car.maker === "" ||
                        formApplyDriver.car.numberPlate === ""
                      }
                    >
                      {t("translation:global.submit")}
                      <ArrowRightIcon size={24} className="hvr-icon ms-2" />
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>

          <Row className="mt-3 mb-5">
            <Col xs={12} md={10} sm={8} lg={6} xl={4} className="mx-auto">
              <p className="small text-secondary mb-0">
                {t("translation:becomeDriver.message")}
              </p>
            </Col>
          </Row>
        </>
      ) : submitted ? (
        <>
          {isLoadingSubmitFormBecomeDriver ? (
            <Row>
              <Col className="text-center">
                <LoadingSpinner />
              </Col>
            </Row>
          ) : submitFormBecomeDriverSuccess ? (
            <Row className="mt-5">
              <Col className="text-center">
                <p>{t("translation:becomeDriver.thankYou")}</p>
                <p>
                  <LinkContainer to="/become-driver" className="cursor-pointer">
                    <Button variant="success" className="hvr-icon-back">
                      <ArrowLeftIcon size={24} className="hvr-icon me-2" />
                      {t("translation:global.goBack")}
                    </Button>
                  </LinkContainer>
                </p>
              </Col>
            </Row>
          ) : null}
        </>
      ) : null}
    </Container>
  );
};

export default DriverApplication;
