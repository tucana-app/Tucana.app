import { t } from "i18next";
import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Coin, CurrencyBitcoin, Paypal } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { Trans } from "react-i18next";

function DonateComponent() {
  return (
    <>
      <Row>
        <Col className="text-center mx-auto">
          <p>
            <Trans i18nKey="translation:logIn.messageService">
              <strong>You are using a free app</strong>, and no service fee is
              being charged on your rides for now. To help us expand this
              project across all Costa Rica, so everyone can carpool,{" "}
              <strong>please consider making a donation</strong>.
            </Trans>
          </p>
        </Col>
      </Row>

      <Row className="justify-content-between mb-3">
        <Col className="text-end mx-auto">
          <a
            href="https://giveth.io/project/tucana-carpooling-app-in-costa-rica"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="giveth" size={"lg"}>
              <CurrencyBitcoin className="mb-1" /> Giveth.io
            </Button>
          </a>
        </Col>
        <Col className="text-start">
          <a
            href="https://www.paypal.com/donate/?hosted_button_id=M4QRJF5GDHCKA"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="warning" size="lg" className="px-4">
              <Paypal className="mb-1" /> PayPal
            </Button>
          </a>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col className="text-center mx-auto">
          <a href="https://fund.tucana.app" target="_blank" rel="noreferrer">
            <Button variant="primary" className="text-white">
              <Coin className="mb-1" /> Tucána Funds
            </Button>
          </a>
        </Col>
      </Row>

      <Row>
        <Col className="text-center mx-auto">
          <p>{t("translation:logIn.platforms")}</p>
        </Col>
      </Row>

      <Row>
        <Col className="text-center mx-auto">
          <p>
            <Link
              to="/contact"
              target="_blank"
              rel="noreferrer"
              className="text-success"
            >
              {t("translation:global.contact")}
            </Link>
          </p>
        </Col>
      </Row>
    </>
  );
}

export default DonateComponent;
