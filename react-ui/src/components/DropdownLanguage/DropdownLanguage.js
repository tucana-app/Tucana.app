import React from "react";
import { Dropdown } from "react-bootstrap";
import ReactCountryFlag from "react-country-flag";

const DropdownLanguage = ({ onClick, lg }) => {
  switch (lg) {
    case "en":
      return (
        <Dropdown>
          <Dropdown.Toggle id="dropdownLanguage" className="rounded-0">
            <ReactCountryFlag countryCode="US" svg /> English
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#" onClick={onClick.bind(this, "fr")}>
              <ReactCountryFlag countryCode="FR" svg /> Français
            </Dropdown.Item>
            {/* <Dropdown.Item href="#" onClick={onClick.bind(this, "es")}>
              <ReactCountryFlag countryCode="CR" svg /> Español
            </Dropdown.Item> */}
            {/* <Dropdown.Item href="#" onClick={onClick.bind(this, "de")}>
              <ReactCountryFlag countryCode="DE" svg /> Deuetsche
            </Dropdown.Item> */}
            {/* <Dropdown.Item href="#" onClick={onClick.bind(this, "hebr")}>
              <ReactCountryFlag countryCode="IL" svg /> עברית
            </Dropdown.Item> */}
          </Dropdown.Menu>
        </Dropdown>
      );
    case "fr":
      return (
        <Dropdown>
          <Dropdown.Toggle id="dropdownLanguage" className="rounded-0">
            <ReactCountryFlag countryCode="FR" svg /> Français
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#" onClick={onClick.bind(this, "en")}>
              <ReactCountryFlag countryCode="US" svg /> English
            </Dropdown.Item>
            {/* <Dropdown.Item href="#" onClick={onClick.bind(this, "es")}>
              <ReactCountryFlag countryCode="CR" svg /> Español
            </Dropdown.Item> */}
            {/* <Dropdown.Item href="#" onClick={onClick.bind(this, "de")}>
              <ReactCountryFlag countryCode="DE" svg /> Deuetsche
            </Dropdown.Item> */}
            {/* <Dropdown.Item href="#" onClick={onClick.bind(this, "hebr")}>
              <ReactCountryFlag countryCode="IL" svg /> עברית
            </Dropdown.Item> */}
          </Dropdown.Menu>
        </Dropdown>
      );
    // case "es":
    //   return (
    //     <Dropdown>
    //       <Dropdown.Toggle id="dropdownLanguage" className="rounded-0">
    //         <ReactCountryFlag countryCode="CR" svg /> Español
    //       </Dropdown.Toggle>
    //       <Dropdown.Menu>
    //         <Dropdown.Item href="#" onClick={onClick.bind(this, "en")}>
    //           <ReactCountryFlag countryCode="US" svg /> English
    //         </Dropdown.Item>
    //         <Dropdown.Item href="#" onClick={onClick.bind(this, "fr")}>
    //           <ReactCountryFlag countryCode="FR" svg /> Français
    //         </Dropdown.Item>
    //         {/* <Dropdown.Item href="#" onClick={onClick.bind(this, "de")}>
    //           <ReactCountryFlag countryCode="DE" svg /> Deuetsche
    //         </Dropdown.Item> */}
    //         {/* <Dropdown.Item href="#" onClick={onClick.bind(this, "hebr")}>
    //           <ReactCountryFlag countryCode="IL" svg /> עברית
    //         </Dropdown.Item> */}
    //       </Dropdown.Menu>
    //     </Dropdown>
    //   );
    // case "de":
    //   return (
    //     <Dropdown>
    //       <Dropdown.Toggle id="dropdownLanguage" className="rounded-0">
    //         <ReactCountryFlag countryCode="DE" svg /> Deuetsche
    //       </Dropdown.Toggle>
    //       <Dropdown.Menu>
    //         <Dropdown.Item href="#" onClick={onClick.bind(this, "en")}>
    //           <ReactCountryFlag countryCode="US" svg /> English
    //         </Dropdown.Item>
    //         <Dropdown.Item href="#" onClick={onClick.bind(this, "fr")}>
    //           <ReactCountryFlag countryCode="FR" svg /> Français
    //         </Dropdown.Item>
    //         <Dropdown.Item href="#" onClick={onClick.bind(this, "es")}>
    //           <ReactCountryFlag countryCode="CR" svg /> Español
    //         </Dropdown.Item>
    //         <Dropdown.Item href="#" onClick={onClick.bind(this, "hebr")}>
    //           <ReactCountryFlag countryCode="IL" svg /> עברית
    //         </Dropdown.Item>
    //       </Dropdown.Menu>
    //     </Dropdown>
    //   );
    // case "hebr":
    //   return (
    //     <Dropdown>
    //       <Dropdown.Toggle id="dropdownLanguage" className="rounded-0">
    //         <ReactCountryFlag countryCode="IL" svg /> עברית
    //       </Dropdown.Toggle>
    //       <Dropdown.Menu>
    //         <Dropdown.Item href="#" onClick={onClick.bind(this, "en")}>
    //           <ReactCountryFlag countryCode="US" svg /> English
    //         </Dropdown.Item>
    //         <Dropdown.Item href="#" onClick={onClick.bind(this, "fr")}>
    //           <ReactCountryFlag countryCode="FR" svg /> Français
    //         </Dropdown.Item>
    //         <Dropdown.Item href="#" onClick={onClick.bind(this, "es")}>
    //           <ReactCountryFlag countryCode="CR" svg /> Español
    //         </Dropdown.Item>
    //         <Dropdown.Item href="#" onClick={onClick.bind(this, "de")}>
    //           <ReactCountryFlag countryCode="DE" svg /> Deuetsche
    //         </Dropdown.Item>
    //       </Dropdown.Menu>
    //     </Dropdown>
    //   );
    default:
      return (
        <Dropdown>
          <Dropdown.Toggle id="dropdownLanguage" className="rounded-0">
            <ReactCountryFlag countryCode="US" svg /> English
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#" onClick={onClick.bind(this, "fr")}>
              <ReactCountryFlag countryCode="FR" svg /> Français
            </Dropdown.Item>
            {/* <Dropdown.Item href="#" onClick={onClick.bind(this, "es")}>
              <ReactCountryFlag countryCode="CR" svg /> Español
            </Dropdown.Item> */}
            {/* <Dropdown.Item href="#" onClick={onClick.bind(this, "de")}>
              <ReactCountryFlag countryCode="DE" svg /> Deuetsche
            </Dropdown.Item> */}
            {/* <Dropdown.Item href="#" onClick={onClick.bind(this, "hebr")}>
              <ReactCountryFlag countryCode="IL" svg /> עברית
            </Dropdown.Item> */}
          </Dropdown.Menu>
        </Dropdown>
      );
  }
};

export default DropdownLanguage;
