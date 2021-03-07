import React, { Component } from "react";
import InputSearchTo from "./InputSearchTo";
import InputSearchFrom from "./InputSearchFrom";
import { withTranslation } from "react-i18next";
import { Form, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class FormSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      longitudeFrom: 0,
      latitudeFrom: 0,
      longitudeTo: 0,
      latitudeTo: 0,
    };
  }

  getLocationFrom = (longitudeFrom, latitudeFrom) => {
    this.setState({ longitudeFrom, latitudeFrom });
    console.log(
      `LongitudeFrom: ${this.state.longitudeFrom}, LatitudeFrom: ${this.state.latitudeFrom}`
    );
  };

  getLocationTo = (longitudeTo, latitudeTo) => {
    this.setState({ longitudeTo, latitudeTo });
    console.log(
      `LongitudeTo: ${this.state.longitudeTo}, LatitudeTo: ${this.state.latitudeTo}`
    );
  };

  render() {
    const { t, isMapsApiKeyLoaded, mapsApiKey, mapsApiKeyError } = this.props;

    return (
      <>
        <Form className="bg-light p-3 rounded">
          <Form.Group>
            <Form.Row>
              <Form.Label column="lg" lg={2} className="text-dark">
                {t("translation:rideSearch.from")}
                <span className="text-danger">*</span>
              </Form.Label>
              <Col>
                <InputSearchFrom
                  mapsApiKey={mapsApiKey}
                  isMapsApiKeyLoaded={isMapsApiKeyLoaded}
                  mapsApiKeyError={mapsApiKeyError}
                  sendBackLocationFrom={this.getLocationFrom}
                />
              </Col>
            </Form.Row>
          </Form.Group>
          <Form.Group>
            <Form.Row>
              <Form.Label column="lg" lg={2} className="text-dark">
                {t("translation:rideSearch.to")}
                <span className="text-danger">*</span>
              </Form.Label>
              <Col>
                <InputSearchTo
                  isMapsApiKeyLoaded={isMapsApiKeyLoaded}
                  mapsApiKey={mapsApiKey}
                  mapsApiKeyError={mapsApiKeyError}
                  sendBackLocationTo={this.getLocationTo}
                />
              </Col>
            </Form.Row>
          </Form.Group>
          <Form.Group>
            <Form.Row>
              <Col>
                <Form.Label lg={2} className="text-dark">
                  {t("translation:rideSearch.dateTimePickUp")}
                </Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="dateTime"
                  size="lg"
                  className="rounded-0"
                  value=""
                />
              </Col>
            </Form.Row>
          </Form.Group>
          <Form.Group>
            <Form.Row>
              <Col>
                <Form.Label lg={2} className="text-dark">
                  {t("translation:rideSearch.numberPassengers")}
                </Form.Label>
                <Form.Control
                  type="number"
                  name="numberPassengers"
                  size="lg"
                  className="rounded-0"
                  min="1"
                  max="4"
                  defaultValue="1"
                />
              </Col>
            </Form.Row>
          </Form.Group>
          <Form.Group>
            <Form.Row>
              <Col>
                <Button
                  variant="success"
                  size="lg"
                  type="submit"
                  className="rounded-0 hvr-grow"
                >
                  <FontAwesomeIcon icon={faSearch} />{" "}
                  {t("translation:rideSearch.submitSearch")}
                </Button>
              </Col>
            </Form.Row>
          </Form.Group>
        </Form>
      </>
    );
  }
}

export default withTranslation()(FormSearch);
