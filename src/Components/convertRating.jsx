import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

function convertRating(rating) {
  const starRating = Math.round(rating) / 2;
  let stars = [];

  for (let i = 0; i < Math.floor(starRating); i++) {
    if (!starRating) {
      return "Rating Unavailable!";
    }

    stars.push(
      <FontAwesomeIcon key={`full-${i}`} className="star" icon={faStar} />,
    );
  }

  if (!Number.isInteger(starRating) && Math.ceil(starRating) !== 5) {
    stars.push(
      <FontAwesomeIcon key="half" className="star" icon={faStarHalfAlt} />,
    );
  }

  return stars;
}

export default convertRating;
