import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";

class Home extends Component {
  render() {
    const { t } = this.props;

    return (
      <>
        <h1>{t("translation:navigationbar.home")}</h1>
      </>
    );
  }
}
export default withTranslation()(Home);
