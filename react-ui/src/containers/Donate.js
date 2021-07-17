import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Donate = () => {
  return (
    <Container>
      <Row className="py-5 text-center" data-aos="slide-left">
        <Col>
          <h1 className="text-success">Donate</h1>
          <p className="lead">
            Thank you so much for your consideration
            <br />
            We need funds to hire more people and improve our platform
          </p>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <form
            action="https://www.paypal.com/donate"
            method="post"
            target="_top"
          >
            <input type="hidden" name="business" value="DAA9LC3MG6KDQ" />
            <input type="hidden" name="no_recurring" value="0" />
            <input type="hidden" name="currency_code" value="USD" />
            <input
              type="image"
              src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif"
              border="0"
              name="submit"
              title="PayPal - The safer, easier way to pay online!"
              alt="Donate with PayPal button"
            />
            <img
              alt=""
              border="0"
              src="https://www.paypal.com/en_US/i/scr/pixel.gif"
              width="1"
              height="1"
            />
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default Donate;
