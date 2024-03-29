import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Form, Row, Col, Button, ListGroup } from "react-bootstrap";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import * as Yup from "yup";

import LoadingSpinner from "../../components/LoadingSpinner";
import GoBack from "../../components/GoBack";

import { submitCloseAccount } from "../../redux";
import { ChevronRightIcon, InfoIcon } from "@primer/octicons-react";
import { LinkContainer } from "react-router-bootstrap";
import EyePassword from "../../components/EyePassword";

require("yup-password")(Yup); // extend yup

const CloseAccount = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    user: currentUser,
    isLoggedIn,
    isLoadingSubmitCloseAccount,
    submitCloseAccountSuccess,
  } = useSelector((state) => state.user);
  const { labelRequiredField } = useSelector((state) => state.global);

  const [showPassword, setShowPassword] = useState(false);

  const schema = Yup.object().shape({
    password: Yup.string().required(labelRequiredField),
  });

  const handleSubmit = (values, formikBag) => {
    dispatch(submitCloseAccount(currentUser, values));
    formikBag.setSubmitting(false);
  };

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  if (submitCloseAccountSuccess.flag === "SUCCESS") {
    history.push("/");
    window.location.reload(true);
  }

  return (
    <div data-aos="fade-in">
      <GoBack />

      <Container>
        <Row className="mb-3">
          <Col>
            <h1 className="title text-center">
              {t("translation:closeAccount.title")}
            </h1>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
            <p>{t("translation:closeAccount.confirmCloseAccount1")}</p>
            <p>{t("translation:closeAccount.confirmCloseAccount2")}</p>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
            <Formik
              validationSchema={schema}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={handleSubmit}
              initialValues={{
                password: "",
              }}
            >
              {({
                handleSubmit,
                handleChange,
                // handleBlur,
                values,
                touched,
                isValid,
                errors,
                isSubmitting,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group className="input-password mb-4">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder={t("translation:closeAccount.typePassword")}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                      isValid={touched.password && !errors.password}
                      disabled={submitCloseAccountSuccess.flag === "SUCCESS"}
                      spellCheck="false"
                      autoCorrect="off"
                      autoCapitalize="off"
                      autoComplete="password"
                      required
                    />
                    <EyePassword
                      isShow={showPassword}
                      touched={touched.password}
                      setShowPassword={setShowPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="text-end">
                    <Link to="/account">
                      <Button variant="secondary" className="me-3">
                        {t("translation:global.cancel")}
                      </Button>
                    </Link>

                    <Button
                      variant="danger"
                      className="text-white"
                      type="submit"
                      disabled={
                        submitCloseAccountSuccess.flag === "SUCCESS" ||
                        isSubmitting ||
                        isLoadingSubmitCloseAccount
                      }
                    >
                      {isSubmitting || isLoadingSubmitCloseAccount ? (
                        <LoadingSpinner />
                      ) : null}
                      {t("translation:closeAccount.closeAccount")}
                    </Button>
                  </Form.Group>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="p-0 mx-auto">
            <LinkContainer to="/faq" className="cursor-pointer">
              <ListGroup.Item className="border-0">
                <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                  <p className="mb-0">{t("translation:FAQ.question4")}</p>
                  <ChevronRightIcon size={24} verticalAlign="middle" />
                </div>
              </ListGroup.Item>
            </LinkContainer>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
            <p className="text-secondary">
              <InfoIcon size="20" verticalAlign="middle" />{" "}
              <span className="align-middle">
                {t("translation:edit.password.forgotPassword")}
              </span>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CloseAccount;
