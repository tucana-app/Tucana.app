import React from "react";
import { StarFillIcon } from "@primer/octicons-react";
import { useTranslation } from "react-i18next";

function DisplayRating(props) {
  const { t } = useTranslation();
  const { rating, type } = props;

  return type === "driver" ? (
    rating.driverRating > 0 ? (
      <p className="mb-0">
        <StarFillIcon size={18} className="text-warning me-1 mb-1" />
        <span>{rating.driverRating}</span> -{" "}
        <span className="text-secondary small">
          {rating.nbDriverRating}{" "}
          <span className="text-lowercase">
            {t("translation:global.ratings")}
          </span>
        </span>
      </p>
    ) : (
      <small className="smaller text-secondary">
        {t("translation:global.noRatings")}
      </small>
    )
  ) : type === "passenger" ? (
    rating.passengerRating > 0 ? (
      <p className="mb-0">
        <StarFillIcon size={18} className="text-warning me-1 mb-1" />
        <span>{rating.passengerRating}</span> -{" "}
        <span className="text-secondary small">
          {rating.nbPassengerRating}{" "}
          <span className="text-lowercase">
            {t("translation:global.ratings")}
          </span>
        </span>
      </p>
    ) : (
      <small className="smaller text-secondary">
        {t("translation:global.noRatings")}
      </small>
    )
  ) : null;
}

export default DisplayRating;
