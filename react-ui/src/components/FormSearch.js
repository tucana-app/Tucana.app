import React, { Component } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
// import InputSearchTo from "./InputSearchTo";
// import InputSearchFrom from "./InputSearchFrom";
import { withTranslation } from "react-i18next";
import { Form, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

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
    const { t } = this.props;

    return (
      <>
        <Tabs>
          <TabList>
            <Tab>Ride search</Tab>
            <Tab>Offer a ride</Tab>
          </TabList>

          <TabPanel>
            <Form className="bg-light p-3 rounded">
              <Form.Group>
                <Form.Row>
                  <Col>
                    <InputGroup className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          {t("translation:rideSearch.from")}
                          <span className="text-danger">*</span>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        aria-label="from"
                        aria-describedby="Address from"
                      />
                    </InputGroup>
                    {/* <InputSearchFrom sendBackLocationFrom={this.getLocationFrom} /> */}
                  </Col>
                </Form.Row>
              </Form.Group>
              <Form.Group>
                <Form.Row>
                  <Col>
                    <InputGroup className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          {t("translation:rideSearch.to")}
                          <span className="text-danger">*</span>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        aria-label="from"
                        aria-describedby="Address from"
                      />
                    </InputGroup>
                    {/* <InputSearchTo sendBackLocationTo={this.getLocationTo} /> */}
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
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          {t("translation:rideSearch.numberPassengers")}
                          <span className="text-danger">*</span>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        type="number"
                        name="numberPassengers"
                        size="lg"
                        className="rounded-0"
                        min="1"
                        max="4"
                        defaultValue="1"
                        aria-label="from"
                        aria-describedby="Address from"
                      />
                    </InputGroup>
                  </Col>
                </Form.Row>
              </Form.Group>
              <Form.Group>
                <Form.Row>
                  <Col>
                    <p className="mb-0">
                      <span className="text-danger">*</span>
                      <span className="text-dark">
                        {t("translation:rideSearch.fieldMandatoryLabel")}
                      </span>
                    </p>
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
          </TabPanel>
          <TabPanel>2nd pannel</TabPanel>
        </Tabs>
      </>
    );
  }
}

export default withTranslation()(FormSearch);
