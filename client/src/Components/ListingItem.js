import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faDollarSign } from "@fortawesome/free-solid-svg-icons";

function ListingItem({ listing }) {
  function isValidUrl(str) {
    const pattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i; // Simple URL pattern
    return pattern.test(str);
  }

  return (
    <div>
      <Link to={`/listing/${listing._id}`} style={{ textDecoration: "none" }}>
        <div className="card d-flex flex-wrap mt-5" style={{ width: "60%" }}>
          <img
            src={
              listing.imageUrls &&
              listing.imageUrls[0] &&
              isValidUrl(listing.imageUrls[0])
                ? listing.imageUrls[0]
                : "https://img.freepik.com/premium-vector/real-estate-logo-design_260747-324.jpg?w=740"
            }
            className="card-img-top"
            alt={listing.name}
          />
          <div className="card-body">
            <h5 className="card-title">
              {listing.name
                .split(" ")
                .map(
                  (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join(" ")}
            </h5>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex align-items-center">
              <FontAwesomeIcon icon={faLocationDot} />
              <p className="p=0 m-0 ms-2">{listing.address}</p>
            </li>
            <li className="list-group-item d-flex align-items-center">
              <FontAwesomeIcon icon={faDollarSign} />
              <p className="p=0 m-0 ms-2">
                {listing.offer
                  ? listing.discountPrice.toLocaleString("en-US")
                  : listing.regularPrice.toLocaleString("en-US")}
                {listing.type === "rent" ? "/month" : ""}
              </p>
            </li>
          </ul>
          <div className="card-body d-flex align-items-center">
            <p>{listing.beds ? `${listing.beds} Bed` : "1 Bed"}</p>

            <p className="ms-3">
              {listing.bathrooms ? `${listing.bathrooms} Bathroom` : ""}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ListingItem;
