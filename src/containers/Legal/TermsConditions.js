import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import GoBack from "../../components/GoBack";

const TermsConditions = () => {
  const { t } = useTranslation();

  return (
    <div>
      <GoBack />

      <Container className="mb-5">
        <Row>
          <Col xs={12} sm={10} md={8} lg={6} className="mx-auto">
            <h1 className="title text-center">
              {t("translation:legal.terms")}
            </h1>

            <ListGroup as="ol" variant="flush" numbered className="mb-5">
              <ListGroup.Item as="li">
                Acceptance of Terms: By downloading and using Tucána, you agree
                to be bound by these terms and conditions. If you do not agree
                to these terms, you may not use the Tucána app.
              </ListGroup.Item>

              <ListGroup.Item as="li">
                Eligibility: In order to use Tucána, as a passenger, you must be
                at least 18 years. For drivers, you must be at least 18 years
                old and possess a valid driver's license.
              </ListGroup.Item>

              <ListGroup.Item as="li">
                Services Offered: Tucána provides a platform for users to
                connect with drivers who travel around Costa Rica and offer
                their seats for free. Tucána does not own or operate any
                vehicles, and the drivers are independent civilians who are not
                affiliated with Tucána.
              </ListGroup.Item>

              <ListGroup.Item as="li">
                Liability: Tucána is not liable for any accidents, incidents, or
                injuries that occur before, during, or after a ride. Users of
                Tucána assume all risks associated with using the transportation
                services provided by the drivers. Tucána is not responsible for
                any damage to personal property, including but not limited to,
                vehicles, personal belongings, or electronic devices.
              </ListGroup.Item>

              <ListGroup.Item as="li">
                Insurance: All drivers who use Tucána are required to carry
                their own liability insurance. Tucána is not responsible for any
                damages or injuries caused by drivers while providing
                transportation services.
              </ListGroup.Item>

              <ListGroup.Item as="li">
                Conduct: Users of Tucána are expected to behave in a respectful
                and appropriate manner at all times. Any form of harassment,
                discrimination, or inappropriate behavior towards other users or
                drivers will not be tolerated and may result in suspension or
                termination of the user's account.
              </ListGroup.Item>

              <ListGroup.Item as="li">
                Ratings and Reviews: After each ride, users of Tucána are
                encouraged to rate each other and leave a review. These ratings
                and reviews are used to improve the quality of Tucána and to
                help other users make informed decisions when selecting a driver
                or passenger.
              </ListGroup.Item>

              <ListGroup.Item as="li">
                Changes to Terms: Tucána reserves the right to modify these
                terms and conditions at any time. Users of Tucána will be
                notified of any changes to the terms via the app or email.
              </ListGroup.Item>

              <ListGroup.Item as="li">
                Governing Law: These terms and conditions shall be governed by
                and construed in accordance with the laws of the jurisdiction in
                which Tucána is registered.
              </ListGroup.Item>

              <ListGroup.Item as="li">
                User Account: In order to use Tucána, users must create an
                account by providing their name, phone number, and email
                address. Users are responsible for maintaining the
                confidentiality of their login credentials and are liable for
                any activity that occurs under their account. This ensures that
                only authorized users are able to use the app and that their
                personal information is protected.
              </ListGroup.Item>

              <ListGroup.Item as="li">
                Cancellation Policy: Users are allowed to cancel a ride request
                at any time before the driver arrives.
              </ListGroup.Item>

              <ListGroup.Item as="li">
                Prohibited Items: Users are prohibited from bringing any illegal
                substances, weapons, or hazardous materials into the vehicle
                while using Tucána. This ensures that drivers and other
                passengers are not put at risk and that the app remains a safe
                and secure platform for transportation services.
              </ListGroup.Item>

              <ListGroup.Item as="li">
                Driver Background Checks: Tucána conducts background checks on
                all drivers before allowing them to provide transportation
                services. The background check includes a review of the driver's
                ID if possible, vehicle insurance and registration.
              </ListGroup.Item>

              <ListGroup.Item as="li">
                Maintenance and Safety: Drivers who use Tucána are responsible
                for maintaining their vehicle in a safe and roadworthy
                condition. Drivers who fail to maintain their vehicle in a safe
                condition may be disqualified from offering their seats. This
                ensures that users are transported in safe and well-maintained
                vehicles.
              </ListGroup.Item>

              <ListGroup.Item as="li">
                Lost Items: Tucána is not responsible for any items lost or left
                behind in the vehicle by users. However, drivers are encouraged
                to return any lost items to their rightful owner if they are
                found in the vehicle. Users who lose an item in the vehicle may
                contact the driver through the app to arrange for the item to be
                returned. This ensures that users have a mechanism to recover
                lost items and that drivers are incentivized to return lost
                items to their rightful owner.
              </ListGroup.Item>

              <ListGroup.Item as="li">
                Customer Support: Tucána provides customer support at{" "}
                <a href="mailto:info@tucana.app">info@tucana.app</a> or{" "}
                <a
                  href="http://wa.me/50687882262"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +506 8788 2262
                </a>{" "}
                to users who experience issues or problems while using the app.
                Users may contact customer support through the app or email to
                report any issues or problems. Customer support may provide
                assistance with issues related to trip details, or driver
                behavior. This ensures that users have a mechanism to resolve
                any issues they may encounter while using
              </ListGroup.Item>
            </ListGroup>

            <p>
              By using Tucána, you acknowledge that you have read, understood,
              and agree to the above terms and conditions.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TermsConditions;
