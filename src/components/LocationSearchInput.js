import React from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { SearchIcon, XIcon } from "@primer/octicons-react";

import { setSearchAddress, setLocation, resetSearch } from "../redux";

function LocationSearchInput(props) {
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
    setValue(searchAddress);
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
        (type) => type === "neighborhood" || type === "locality"
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
          className="hvr-highlight cursor-pointer mb-0"
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <>
      <div>
        <InputGroup>
          <FormControl
            value={searchAddress}
            onChange={handleInput}
            disabled={!ready}
            placeholder="Search a city"
            required
            aria-label="Search"
            onKeyPress={(event) => event.key === "Enter" && handleSubmit()}
          />
          <Button onClick={handleSubmit} variant="success">
            <SearchIcon size={24} />
          </Button>
          <Button onClick={handleReset} variant="warning">
            <XIcon size={24} />
          </Button>
        </InputGroup>
      </div>

      {status === "OK" ? (
        <ul>
          <p className="small text-secondary mt-2">Search results:</p>
          {renderSuggestions()}
        </ul>
      ) : null}
    </>
  );
}

export default LocationSearchInput;
