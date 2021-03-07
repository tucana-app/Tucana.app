import React from "react";
import { IndexLinkContainer } from "react-router-bootstrap";
import { withTranslation } from "react-i18next";

// Importing components
import FormSearch from "../components/FormSearch";
import { Button } from "react-bootstrap";

function Home({ t, isMapsApiKeyLoaded, mapsApiKey, mapsApiKeyError }) {
  return (
    <>
      <div className="container-fluid">
        <div className="row my-5">
          <div className="col-lg-6 text-center displayLargeScreens">
            <div className="h-100 d-flex justify-content-center align-items-center">
              <img
                src="./assets/images/logo.jpg"
                alt="Company logo"
                className=""
              />
            </div>
          </div>
          <div className="col-lg-6 order-1 displayMobileScreens displayMediumScreens text-center pb-5 my-auto">
            <h1 className="h1 mt-0 pt-0">Ride.CR</h1>
            <p className="lead">Share your rides in Costa Rica</p>
            <IndexLinkContainer to="/signup" href="/signup" className="mr-3">
              <Button
                className="font-title text-white rounded-0"
                size="lg"
                variant="outline-success"
              >
                {t("translation:navigationbar.logIn")}
              </Button>
            </IndexLinkContainer>
            <IndexLinkContainer to="/signup" href="/signup">
              <Button
                className="font-title text-white rounded-0"
                size="lg"
                variant="success"
              >
                {t("translation:navigationbar.signUp")}
              </Button>
            </IndexLinkContainer>
          </div>
          <div className="col-lg-6 col-12 text-center order-2">
            <div className="h-100 d-flex justify-content-center align-items-start align-items-md-center">
              <FormSearch
                isMapsApiKeyLoaded={isMapsApiKeyLoaded}
                mapsApiKey={mapsApiKey}
                mapsApiKeyError={mapsApiKeyError}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default withTranslation()(Home);
