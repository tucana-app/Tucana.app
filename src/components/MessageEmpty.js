import React from "react";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";

function MessageEmpty(props) {
  const { t } = useTranslation();

  const { title } = props;
  return (
    <div>
      <h2>
        <Trans i18nKey="translation:messageEmpty.message" title={title}>
          No {{ title }} found
        </Trans>
      </h2>
      {/* <h1 className="title mb-4">No {title} found</h1> */}
      <p>
        <Link to="/find">
          <Button variant="success" className="me-2">
            {t("translation:messageEmpty.bookRide")}
          </Button>
        </Link>
        <Link to="/publish" className="text-warning">
          <Button variant="warning">
            {t("translation:messageEmpty.publishRide")}
          </Button>
        </Link>
      </p>
    </div>
  );
}

export default MessageEmpty;
