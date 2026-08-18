import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

function convertRating(rating) {
  if (rating === "N/A") {
    return "(Rating Unavailable!)";
  }

  const starRating = Math.round(rating) / 2;
  let stars = [];

  for (let i = 0; i < Math.floor(starRating); i++) {
    stars.push(
      <FontAwesomeIcon key={`full-${i}`} className="star card__item" icon={faStar} />,
    );
  }

  if (!Number.isInteger(starRating) && Math.floor(starRating) !== 5) {
    stars.push(
      <FontAwesomeIcon key="half" className="star card__item" icon={faStarHalfAlt} />,
    );
  }

  return stars;
}

export default convertRating;
