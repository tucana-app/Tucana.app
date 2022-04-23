import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import { setOrigin, setDestination } from "../redux";

function LocationSearchInput(props) {
  const { location } = props;

  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [result, setResult] = useState({});

  const searchOptions = {
    componentRestrictions: { country: ["cr"] },
  };

  const handleChange = (address) => {
    setAddress(address);
  };

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => {
        setResult(results[0]);
        return getLatLng(results[0]);
      })
      .then((latLng) => {
        switch (location) {
          case "origin":
            dispatch(setOrigin({ address, result, latLng }));
            break;

          case "destination":
            dispatch(setDestination({ address, result, latLng }));
            break;

          default:
            break;
        }
      })
      .catch((error) => console.error("Error", error));
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
      searchOptions={searchOptions}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: "Search a place...",
              className: "location-search-input",
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion, index) => {
              const className = suggestion.active
                ? "suggestion-item--active"
                : "suggestion-item";
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: "#fafafa", cursor: "pointer" }
                : { backgroundColor: "#ffffff", cursor: "pointer" };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                  key={index}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}

export default LocationSearchInput;
