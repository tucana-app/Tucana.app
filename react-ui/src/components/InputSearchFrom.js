import React, { Component } from "react";
import ReactGoogleMapLoader from "react-google-maps-loader";
import ReactGooglePlacesSuggest from "react-google-places-suggest";
import { withTranslation } from "react-i18next";

class inputSearchFrom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      value: "",
    };
  }

  handleInputChange = (e) => {
    this.setState({ search: e.target.value, value: e.target.value });
  };

  handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
    this.setState({
      search: "",
      value: geocodedPrediction.formatted_address,
    });

    this.props.sendBackLocationFrom(
      geocodedPrediction.geometry.viewport.Ra.g,
      geocodedPrediction.geometry.viewport.La.g
    );
  };

  handleNoResult = ({ t }) => {
    console.log(t("translation:rideSearch.noResults"), this.state.search);
  };

  // handleStatusUpdate = (status) => {
  //   console.log(status);
  // };

  render() {
    const { search, value } = this.state;
    const { t, mapsApiKey, isMapsApiKeyLoaded, mapsApiKeyError } = this.props;

    return (
      <>
        {isMapsApiKeyLoaded ? (
          <>
            <ReactGoogleMapLoader
              params={{
                key: mapsApiKey,
                libraries: "places,geocode",
              }}
              render={(googleMaps) =>
                googleMaps && (
                  <ReactGooglePlacesSuggest
                    googleMaps={googleMaps}
                    autocompletionRequest={{
                      // Options for Google
                      // https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest

                      input: search,
                      componentRestrictions: { country: "cr" },
                    }}
                    // Optional props
                    onNoResult={this.handleNoResult}
                    onSelectSuggest={this.handleSelectSuggest}
                    // onStatusUpdate={this.handleStatusUpdate}
                    textNoResults={t("translation:rideSearch.noResults")}
                    customRender={(prediction) => (
                      <div className="wrapperResult">
                        {prediction
                          ? prediction.description
                          : t("translation:rideSearch.noResults")}
                      </div>
                    )}
                  >
                    <input
                      type="text"
                      value={value}
                      placeholder={t("translation:rideSearch.searchLocation")}
                      onChange={this.handleInputChange}
                      className="form-control form-control-lg rounded-0"
                    />
                  </ReactGooglePlacesSuggest>
                )
              }
            />
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default withTranslation()(inputSearchFrom);
