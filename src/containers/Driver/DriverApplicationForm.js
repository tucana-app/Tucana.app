import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { Trans, useTranslation } from "react-i18next";
import Select from "react-select";
import { Redirect } from "react-router-dom";
import { ArrowLeftIcon, ArrowRightIcon, XIcon } from "@primer/octicons-react";

import LoadingSpinner from "../../components/LoadingSpinner";

import {
  setToast,
  getCountries,
  setApplicationIdType,
  setApplicationIdNumber,
  setApplicationIdCountry,
  setApplicationLicenseNumber,
  setApplicationLicenseCountry,
  setApplicationCarMaker,
  setApplicationCarModel,
  setApplicationNumberPlate,
  setApplicationCarYear,
  setApplicationCarColor,
  setApplicationCarMarchamo,
  setApplicationCarRiteveMonth,
  setApplicationCarRiteveYear,
  resetApplicationForm,
  submitFormBecomeDriver,
} from "../../redux";
import { LinkContainer } from "react-router-bootstrap";

const DriverApplicationForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    user: currentUser,
    isLoggedIn,
    isLoadingSubmitFormBecomeDriver,
    submitFormBecomeDriverSuccess,
    formApplyDriver,
  } = useSelector((state) => state.user);
  const { isLoadingCountries, countries, carMakers, months } = useSelector(
    (state) => state.global
  );

  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [stepFour, setStepFour] = useState(false);
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
  const [carMakerFromUser, setCarMakerFromUser] = useState(
    formApplyDriver.car.maker
  );
  const [carModel, setCarModel] = useState(formApplyDriver.car.model);
  const [numberPlate, setNumberPlate] = useState(
    formApplyDriver.car.numberPlate
  );
  const [carYear, setCarYear] = useState(formApplyDriver.car.year);
  const [carColor, setCarColor] = useState(formApplyDriver.car.color);
  const [carMarchamo, setCarMarchamo] = useState(formApplyDriver.car.marchamo);
  const [carRiteveMonth, setCarRiteveMonth] = useState(
    formApplyDriver.car.riteve.month
  );
  const [carRiteveYear, setCarRiteveYear] = useState(
    formApplyDriver.car.riteve.year
  );

  const countriesSelect = useRef([]);
  const selectCarMakers = [];
  const selectMonths = [];

  carMakers.map((carMaker) => {
    return selectCarMakers.push({
      value: carMaker,
      label: carMaker,
    });
  });

  Object.keys(months).map((month) =>
    selectMonths.push({
      value: month,
      label: months[month],
    })
  );

  const cancelButton = () => {
    return (
      <LinkContainer to="/become-driver">
        <Col
          xs={2}
          className="cursor-pointer text-secondary"
          onClick={handleClickCancel}
        >
          <XIcon size="28" />
        </Col>
      </LinkContainer>
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
    setCarMaker(e);
    setCarMakerFromUser(e);
    dispatch(setApplicationCarMaker(e));
  };

  const handleChangeCarMakerFromUser = (e) => {
    setCarMakerFromUser({ value: e.target.value, label: e.target.value });
    dispatch(
      setApplicationCarMaker({ value: e.target.value, label: e.target.value })
    );
  };

  const handleChangeCarModel = (e) => {
    setCarModel(e.target.value);
    dispatch(setApplicationCarModel(e.target.value));
  };

  const handleChangeNumberPlate = (e) => {
    setNumberPlate(e.target.value);
    dispatch(setApplicationNumberPlate(e.target.value));
  };

  const handleChangeCarYear = (e) => {
    setCarYear(e.target.value);
    dispatch(setApplicationCarYear(e.target.value));
  };

  const handleChangeCarColor = (e) => {
    setCarColor(e.target.value);
    dispatch(setApplicationCarColor(e.target.value));
  };

  const handleBackToStepTwo = () => {
    setStepTwo(true);
    setStepThree(false);
  };

  const handleResetStepThree = () => {
    setCarMaker("");
    setCarModel("");
    setNumberPlate("");
    setCarYear("");
    setCarColor("");
  };

  const handleClickStepThree = () => {
    if (
      carMaker.value !== "" &&
      carMakerFromUser.value !== "" &&
      carModel !== "" &&
      numberPlate !== "" &&
      carYear !== "" &&
      carYear <= new Date().getFullYear() &&
      carColor !== ""
    ) {
      setStepThree(false);
      setStepFour(true);
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

  // Step 4
  const handleChangeCarMarchamo = (e) => {
    setCarMarchamo(e.target.value);
    dispatch(setApplicationCarMarchamo(e.target.value));
  };

  const handleChangeCarRiteveMonth = (e) => {
    setCarRiteveMonth(e);
    dispatch(setApplicationCarRiteveMonth(e));
  };

  const handleChangeCarRiteveYear = (e) => {
    setCarRiteveYear(e.target.value);
    dispatch(setApplicationCarRiteveYear(e.target.value));
  };

  const handleBackToStepThree = () => {
    setStepThree(true);
    setStepFour(false);
  };

  const handleResetStepFour = () => {
    setCarMarchamo("");
    setCarRiteveMonth("");
    setCarRiteveYear("");
  };

  // Handlers

  const handleClickCancel = () => {
    dispatch(resetApplicationForm());

    handleResetStepOne();
    handleResetStepTwo();
    handleResetStepThree();
    handleResetStepFour();
  };

  const handleSubmit = () => {
    if (carMarchamo !== "" && carRiteveMonth !== "" && carRiteveYear !== "") {
      // If the number plate has the correct format
      if (numberPlate.match(/^([0-9]{1,3}|[a-zA-Z]{3})[0-9]{0,3}$/)) {
        dispatch(submitFormBecomeDriver(currentUser, formApplyDriver));

        setSubmitted(true);
        setStepFour(false);
      } else {
        dispatch(
          setToast({
            show: true,
            headerText: t("translation:global.errors.error"),
            bodyText: t("translation:global.errors.validNumberPlate"),
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
                <Row className="align-items-center mb-3">
                  <Col xs={10} className="text-center">
                    <h3>1. {t("translation:global.yourIdentity")}</h3>
                  </Col>

                  {cancelButton()}
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
                          {t("translation:becomeDriver.disclaimer")}
                        </small>
                      </Col>
                    </Row>
                  </>
                ) : null}

                <Row>
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
                <Row className="align-items-center mb-3">
                  <Col xs={10} className="text-center">
                    <h3>2. {t("translation:global.yourLicense")}</h3>
                  </Col>

                  {cancelButton()}
                </Row>

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
                        We do not disclose any information about your country of
                        origin. This is solely for verification purposes
                      </Trans>
                    </small>
                  </Col>
                </Row>

                <Row>
                  <Col className="text-start">
                    <Button
                      onClick={handleBackToStepOne}
                      variant="outline-warning"
                      className="ms-2"
                    >
                      <ArrowLeftIcon
                        size={18}
                        verticalAlign="middle"
                        className="me-2"
                      />
                      {t("translation:global.goBack")}
                    </Button>
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
                <Row className="align-items-center mb-3">
                  <Col xs={10} className="text-center">
                    <h3>3. {t("translation:global.yourVehicle")}</h3>
                  </Col>

                  {cancelButton()}
                </Row>

                <Row className="mb-5">
                  <Col xs={6} className="mb-3">
                    <p className="small ms-2 mb-0">
                      {t("translation:global.maker")}
                      <span className="text-danger">*</span>
                    </p>
                    <Form.Group>
                      <Select
                        value={carMaker}
                        name="carMaker"
                        placeholder={`${t("translation:global.search")}...`}
                        onChange={handleChangeCarMaker}
                        options={selectCarMakers}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6} className="mb-3">
                    <p className="small ms-2 mb-0">
                      {t("translation:global.model")}
                      <span className="text-danger">*</span>
                    </p>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        name="carModel"
                        placeholder="RAV4, Trooper, Wrangler, etc. "
                        value={carModel}
                        onChange={handleChangeCarModel}
                        maxLength={30}
                        required
                      />
                    </Form.Group>
                  </Col>
                  {carMaker.value === "Other" ? (
                    <Col xs={12} className="mb-3">
                      <Form.Group>
                        <Form.Control
                          type="text"
                          name="carMakerFromUser"
                          placeholder={t("translation:becomeDriver.typeMaker")}
                          value={carMakerFromUser.value}
                          onChange={handleChangeCarMakerFromUser}
                          maxLength={30}
                          required
                        />
                      </Form.Group>
                    </Col>
                  ) : null}
                  <Col xs={12} className="mb-3">
                    <Form.Group>
                      <p className="small ms-2 mb-0">
                        {t("translation:global.numberPlate")}
                        <span className="text-danger">*</span>
                      </p>
                      <Form.Control
                        type="text"
                        name="numberPlate"
                        placeholder="AAA333, 222000, etc."
                        value={numberPlate}
                        onChange={handleChangeNumberPlate}
                        maxLength={6}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group>
                      <p className="small ms-2 mb-0">
                        {t("translation:global.color")}
                        <span className="text-danger">*</span>
                      </p>
                      <Form.Control
                        type="text"
                        name="carColor"
                        placeholder={t(
                          "translation:becomeDriver.colorPlaceholder"
                        )}
                        value={carColor}
                        onChange={handleChangeCarColor}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group>
                      <p className="small ms-2 mb-0">
                        {t("translation:global.year")}
                        <span className="text-danger">*</span>
                      </p>
                      <Form.Control
                        type="number"
                        name="carYear"
                        value={carYear}
                        onChange={handleChangeCarYear}
                        min={1960}
                        max={new Date().getFullYear()}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col className="text-start">
                    <Button
                      onClick={handleBackToStepTwo}
                      variant="outline-warning"
                      className="ms-2"
                    >
                      <ArrowLeftIcon
                        size={18}
                        verticalAlign="middle"
                        className="me-2"
                      />
                      {t("translation:global.goBack")}
                    </Button>
                  </Col>

                  <Col className="text-end">
                    <Button
                      onClick={handleClickStepThree}
                      variant="success"
                      className="hvr-icon-forward ms-2"
                      disabled={
                        formApplyDriver.car.maker === "" ||
                        formApplyDriver.car.model === "" ||
                        formApplyDriver.car.numberPlate === "" ||
                        formApplyDriver.car.year === "" ||
                        formApplyDriver.car.color === ""
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
      ) : stepFour ? (
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
                <Row className="align-items-center mb-3">
                  <Col xs={10} className="text-center">
                    <h3>4. {t("translation:global.yourVehicle")}</h3>
                  </Col>

                  {cancelButton()}
                </Row>

                <Row className="mb-4">
                  <Col xs={12} className="mb-3">
                    <p className="small ms-2 mb-0">
                      {t("translation:global.marchamo")}
                      <span className="text-danger">*</span>
                    </p>
                    <Form.Group>
                      <Form.Control
                        type="number"
                        name="carMarchamo"
                        placeholder={t("translation:global.year")}
                        value={carMarchamo}
                        onChange={handleChangeCarMarchamo}
                        min="2000"
                        max={new Date().getFullYear()}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <p className="small ms-2 mb-0">
                      {t("translation:global.riteve")}
                      <span className="text-danger">*</span>
                    </p>
                  </Col>
                  <Col xs={6} className="mb-3">
                    <Form.Group>
                      <Select
                        value={carRiteveMonth}
                        name="carRiteveMonth"
                        placeholder={t("translation:global.month")}
                        onChange={handleChangeCarRiteveMonth}
                        options={selectMonths}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6} className="mb-3">
                    <Form.Group>
                      <Form.Control
                        type="number"
                        name="carRiteveYear"
                        placeholder={t("translation:global.year")}
                        value={carRiteveYear}
                        onChange={handleChangeCarRiteveYear}
                        min="2000"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col className="text-start">
                    <Button
                      onClick={handleBackToStepThree}
                      variant="outline-warning"
                      className="ms-2"
                    >
                      <ArrowLeftIcon
                        size={18}
                        verticalAlign="middle"
                        className="me-2"
                      />
                      {t("translation:global.goBack")}
                    </Button>
                  </Col>
                  <Col className="text-end">
                    <Button
                      onClick={handleSubmit}
                      variant="success"
                      className="hvr-icon-forward ms-2"
                      disabled={
                        formApplyDriver.car.marchamo === "" ||
                        formApplyDriver.car.riteve.month === "" ||
                        formApplyDriver.car.riteve.year === ""
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

          <Row className="mt-3 mb-5 pb-5">
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

export default DriverApplicationForm;
