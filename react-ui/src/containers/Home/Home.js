import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Home({ t, cities, isFetchingCities }) {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <>
      <div className="container-fluid vh-100">
        <div className="row h-100">
          <div className="col-lg-6 col text-center order-2 order-md-1 displayLargeScreens">
            <div className="h-100 d-flex justify-content-center align-items-center">
              <img
                src="./assets/images/logo.jpg"
                alt="Company logo"
                className=""
              />
            </div>
          </div>
          <div className="col-lg-6 col-12 text-center h-100 order-1 order-md-2">
            <div className="h-100 d-flex justify-content-center align-items-center">
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Row>
                  <Form.Group md="4" controlId="validationDeparturePlace">
                    <Form.Label>
                      {t("translation:homePage.departurePlace")}
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder={t("translation:homePage.chooseLocation")}
                    />
                  </Form.Group>
                  <Form.Group md="4" controlId="validationCustom02">
                    <Form.Label>
                      {t("translation:homePage.arrivalPlace")}
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder={t("translation:homePage.chooseLocation")}
                    />
                  </Form.Group>
                </Form.Row>
                <Button type="submit">
                  <FontAwesomeIcon icon={faSearch} />{" "}
                  {t("translation:homePage.search")}
                </Button>
              </Form>

              {/* <form className="border border-success rounded-0 p-2 p-md-3 p-lg-5">
                <div className="form-group">
                  <label for="date-of-bith">
                    First &amp; Last name<span class="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullname"
                    required
                  />
                </div>

                <div className="form-group">
                  <label for="date-of-bith">
                    Date of birth<span class="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date-of-birth"
                    required
                  />
                </div>

                <div className="form-group">
                  <label for="email">
                    Email<span class="text-danger">*</span>
                  </label>
                  <input type="email" className="form-control" required />
                </div>

                <p className="small">
                  <span class="text-danger">*</span> : this field is required
                </p>

                <button
                  type="submit"
                  className="btn btn-warning btn-lg text-uppercase rounded-0 hvr-glow"
                >
                  Submit
                </button>
              </form> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default withTranslation()(Home);
