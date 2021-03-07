import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// Importing components
import FormSearch from "../components/FormSearch";

function Home({ t, isMapsApiKeyLoaded, mapsApiKey, mapsApiKeyError }) {
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
              <FormSearch
                isMapsApiKeyLoaded={isMapsApiKeyLoaded}
                mapsApiKey={mapsApiKey}
                mapsApiKeyError={mapsApiKeyError}
              />
              {/* <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
              </Form> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default withTranslation()(Home);
