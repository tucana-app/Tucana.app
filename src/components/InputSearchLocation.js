import React from "react";
import { Button, FormControl, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { XIcon } from "@primer/octicons-react";

import {
  setSearchOrigin,
  setSearchDestination,
  setPublishOrigin,
  setPublishDestination,
  setToast,
} from "../redux";

function InputSearchLocation(props) {
  const { inputLocation } = props;

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { searchAddress, location } = useSelector((state) => state.ride);

  var { details, city, province } = "";

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: {
        country: "cr",
      },
      types: ["geocode"],
    },
    debounce: 0,
  });

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

  const handleSelect =
    ({ description }) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description })
        .then((results) => {
          details = results[0];
          setCityProvince();
          return getLatLng(results[0]);
        })
        .then((latLng) => {
          switch (inputLocation) {
            case "searchOrigin":
              dispatch(
                setSearchOrigin({
                  city,
                  province,
                  address: description,
                  details,
                  latLng,
                })
              );

              break;

            case "searchDestination":
              dispatch(
                setSearchDestination({
                  city,
                  province,
                  address: description,
                  details,
                  latLng,
                })
              );
              break;

            case "publishOrigin":
              dispatch(
                setPublishOrigin({
                  city,
                  province,
                  address: description,
                  details,
                  latLng,
                })
              );
              break;

            case "publishDestination":
              dispatch(
                setPublishDestination({
                  city,
                  province,
                  address: description,
                  details,
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

  const setCityProvince = () => {
    city = details.address_components.find((address) =>
      address.types.find(
        (type) =>
          type === "neighborhood" ||
          type === "locality" ||
          type === "sublocality" ||
          type === "route"
      )
    );

    // If the city is not found, we take the words from the
    // address until the first coma
    if (city === undefined) {
      dispatch(
        setToast({
          show: true,
          headerText: "Error",
          bodyText: t("translation:global.errors.searchCity"),
          variant: "warning",
        })
      );

      city = location.address.slice(0, location.address.indexOf(","));
    } else {
      city = city.long_name;
    }

    province = details.address_components.find((address) =>
      address.types.find((type) => type === "administrative_area_level_1")
    );

    // Remove the term "Province"
    if (province) {
      province = province.long_name
        .replace(" Province", "")
        .replace("Provincia de ", "");
    }
  };

  // Renders the suggestions

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      let isCity = suggestion.types.find(
        (type) =>
          type === "neighborhood" ||
          type === "locality" ||
          type === "sublocality" ||
          type === "route"
      );

      if (isCity) {
        return (
          <ListGroup.Item
            action
            key={place_id}
            onClick={handleSelect(suggestion)}
          >
            <strong>{main_text}</strong>{" "}
            <small>{secondary_text.replace(", Costa Rica", "")}</small>
          </ListGroup.Item>
        );
      } else {
        return null;
      }
    });

  return (
    <>
      <div className="d-inline-flex w-100">
        <FormControl
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder={t("translation:inputSearchLocation.searchCity")}
          required
          aria-label={t("translation:global.search")}
          onKeyPress={(event) => event.key === "Enter" && handleSubmit()}
        />
        <Button onClick={handleReset} variant="white" className="px-0 ms-1">
          <XIcon size={24} />
        </Button>
      </div>

      {status === "OK" ? (
        <ListGroup className="bg-white">{renderSuggestions()}</ListGroup>
      ) : null}
    </>
  );
}

export default InputSearchLocation;
