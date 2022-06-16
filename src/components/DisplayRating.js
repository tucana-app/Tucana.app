import React from "react";
import { StarFillIcon } from "@primer/octicons-react";
import { useTranslation } from "react-i18next";

function GoBack(props) {
  const { t } = useTranslation();
  const { user, type } = props;

  return type === "driver" ? (
    user.driverRating > 0 ? (
      <p className="mb-0">
        <StarFillIcon size={18} className="text-warning me-1 mb-1" />
        <span>{user.driverRating}</span>
      </p>
    ) : (
      <small className="smaller text-secondary">
        {t("translation:global.noRatings")}
      </small>
    )
  ) : type === "passenger" ? (
    user.passengerRating > 0 ? (
      <p className="mb-0">
        <StarFillIcon size={18} className="text-warning me-1 mb-1" />
        <span>{user.passengerRating}</span>
      </p>
    ) : (
      <small className="smaller text-secondary">
        {t("translation:global.noRatings")}
      </small>
    )
  ) : null;
}

export default GoBack;
