import React from "react";
import { Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { SearchIcon, XIcon } from "@primer/octicons-react";

import {
  setSearchAddress,
  setLocation,
  resetSearch,
  setIsLoadingLocation,
} from "../redux";

function LocationSearchInput(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { searchAddress, location } = useSelector((state) => state.ride);

  var { details, city, province } = "";

  const {
    ready,
    // value,
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
    dispatch(resetSearch());
  };

  const handleInput = (e) => {
    dispatch(setSearchAddress(e.target.value));
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();
      dispatch(setIsLoadingLocation());

      // Get latitude and longitude via utility functions
      getGeocode({ address: description })
        .then((results) => {
          details = results[0];
          setCityProvince();
          return getLatLng(results[0]);
        })
        .then((latLng) => {
          dispatch(
            setLocation({
              city,
              province,
              address: description,
              details,
              latLng,
            })
          );
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    };

  const setCityProvince = () => {
    city = details.address_components.find((address) =>
      address.types.find(
        (type) =>
          type === "neighborhood" ||
          type === "locality" ||
          type === "sublocality"
      )
    );

    // If the city is not found, we take the words from the
    // address until the first coma
    if (city === undefined) {
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

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={place_id}
          onClick={handleSelect(suggestion)}
          className="hvr-highlight cursor-pointer py-1"
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <>
      <div className="d-inline-flex w-100">
        <FormControl
          value={searchAddress}
          onChange={handleInput}
          disabled={!ready}
          placeholder={t("translation:locationSearchInput.searchCity")}
          required
          aria-label={t("translation:global.search")}
          onKeyPress={(event) => event.key === "Enter" && handleSubmit()}
        />
        <Button
          onClick={handleSubmit}
          variant="success"
          size="sm"
          className="ms-1"
        >
          <SearchIcon size={24} />
        </Button>
        <Button onClick={handleReset} variant="white" className="px-0 ms-1">
          <XIcon size={24} />
        </Button>
      </div>

      {status === "OK" ? (
        <>
          <p className="small text-secondary mt-2 mb-0">
            {t("translation:global.searchResults")}:
          </p>
          <ul>{renderSuggestions()}</ul>
        </>
      ) : null}
    </>
  );
}

export default LocationSearchInput;
