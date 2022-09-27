import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import * as Yup from "yup";

import LoadingSpinner from "../../components/LoadingSpinner";
import GoBack from "../../components/GoBack";

import { submitCloseAccount } from "../../redux";
import { InfoIcon } from "@primer/octicons-react";

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
            <p>{t("translation:dataProtection.content")}</p>
            <p>{t("translation:closeAccount.confirmCloseAccount2")}</p>
            <p>{t("translation:closeAccount.confirmCloseAccount3")}</p>
          </Col>
        </Row>

        <Row className="mb-5">
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
                  <Form.Group className="mb-4">
                    <Form.Label></Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder={t("translation:closeAccount.typePassword")}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                      isValid={touched.password && !errors.password}
                      disabled={submitCloseAccountSuccess.flag === "SUCCESS"}
                      required
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
