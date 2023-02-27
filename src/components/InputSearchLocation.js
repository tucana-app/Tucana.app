import React from "react";
import { FormControl, ListGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { XCircleIcon } from "@primer/octicons-react";

import {
  setSearchOrigin,
  setSearchDestination,
  setPublishOrigin,
  setPublishDestination,
} from "../redux";

function InputSearchLocation(props) {
  const { inputLocation, disabled, placeholder } = props;

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { searchAddress } = useSelector((state) => state.ride);
  const { provincesCostaRica, countriesAvailable } = useSelector(
    (state) => state.global
  );

  var { placeName, placeDetails, province, country, locationObject } = "";

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: {
        country: ["cr"],
      },
    },
    debounce: 0,
  });

  const findIndice = (array, str) => {
    let indice = -1;
    array.forEach((element, index) => {
      if (str.includes(element)) {
        indice = index;
      }
    });
    return indice;
  };

  const handleSubmit = () => {
    if (searchAddress !== "") {
      setValue(searchAddress);
    }
  };

  const handleReset = () => {
    clearSuggestions();
    setValue("");
  };

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect = (suggestion) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(suggestion.description, false);
    setPlaceProvince(suggestion);
    clearSuggestions();

    // Get latitude and longitude via utility functions
    getGeocode({ address: suggestion.description })
      .then((results) => {
        locationObject = results[0];
        return getLatLng(results[0]);
      })
      .then((latLng) => {
        switch (inputLocation) {
          case "searchOrigin":
            dispatch(
              setSearchOrigin({
                placeName,
                placeDetails,
                province,
                country,
                address: suggestion.description,
                locationObject,
                latLng,
              })
            );

            break;

          case "searchDestination":
            dispatch(
              setSearchDestination({
                placeName,
                placeDetails,
                province,
                address: suggestion.description,
                country,
                locationObject,
                latLng,
              })
            );
            break;

          case "publishOrigin":
            dispatch(
              setPublishOrigin({
                placeName,
                placeDetails,
                province,
                address: suggestion.description,
                country,
                locationObject,
                latLng,
              })
            );
            break;

          case "publishDestination":
            dispatch(
              setPublishDestination({
                placeName,
                placeDetails,
                province,
                address: suggestion.description,
                country,
                locationObject,
                latLng,
              })
            );
            break;

          default:
            break;
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  // Set the city and the province

  const setPlaceProvince = (suggestion) => {
    placeName = suggestion.structured_formatting.main_text;
    placeDetails = suggestion.structured_formatting.secondary_text
      .replace("Province ", "")
      .replace("Provincia de ", "");

    province =
      provincesCostaRica[
        findIndice(
          provincesCostaRica,
          suggestion.structured_formatting.secondary_text
        )
      ];

    if (!province) {
      province = "Unknown";
    }

    country =
      countriesAvailable[
        findIndice(
          countriesAvailable,
          suggestion.structured_formatting.secondary_text
        )
      ];

    if (!country) {
      country = "Unknown";
    }
  };

  // Renders the suggestions

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <ListGroup.Item
          action
          key={place_id}
          onClick={handleSelect(suggestion)}
          className="py-1"
          style={{ whiteSpace: "nowrap", overflow: "hidden" }}
        >
          <p className="text-nowrap mb-0">
            <small className="fw-bold">{main_text}</small>
          </p>
          <small className="text-nowrap text-secondary ">
            {secondary_text}
          </small>
        </ListGroup.Item>
      );
    });

  return (
    <>
      <div className="position-relative">
        <div className="input-city">
          <FormControl
            value={value}
            onChange={handleInput}
            disabled={!ready || disabled}
            placeholder={
              placeholder || t("translation:inputSearchLocation.searchCity")
            }
            required
            aria-label={t("translation:global.search")}
            onKeyPress={(event) => event.key === "Enter" && handleSubmit()}
          />
          {status === "OK" ? (
            <Button
              onClick={handleReset}
              variant="white"
              className="btn-reset pt-0 px-3"
            >
              <XCircleIcon size={18} />
            </Button>
          ) : null}
        </div>

        {status === "OK" ? (
          <ListGroup
            className="bg-white position-absolute w-100"
            style={{ zIndex: 1 }}
          >
            {renderSuggestions()}
          </ListGroup>
        ) : null}
      </div>
    </>
  );
}

export default InputSearchLocation;
