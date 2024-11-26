import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faBed,
  faBath,
  faSquareParking,
  faChair,
  faShare,
} from "@fortawesome/free-solid-svg-icons"; // Correct import
import { useSelector } from "react-redux";

function Listing() {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [landlord, setLandlord] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      if (!listingId) {
        setError("Listing ID is missing");
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${listingId}`);
        if (!res.ok) {
          throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }

        const data = await res.json();
        if (data.success === false) {
          setLoading(false);
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 3000);
        }
        setListing(data.listing);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);

        setTimeout(() => {
          setError(false);
        }, 3000);
      }
    };

    fetchListing();
  }, [params.listingId]);

  useEffect(() => {
    const fetchLandlord = async () => {
      if (!listing || !listing.userRef) return;

      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLandlord();
  }, [listing]);

  return (
    <div className="container-fluid">
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "60vh" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        listing &&
        !error && (
          <div className="container-fluid px-0  w-100">
            <div id="carouselExample" className="carousel slide  w-100 ">
              <div className="carousel-inner">
                {listing.imageUrls.map((imageUrl, index) => (
                  <div
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                    key={index}
                  >
                    <img
                      src={imageUrl}
                      className="d-block w-100"
                      alt={`Slide ${index + 1}`}
                      style={{
                        height: "60vh",
                        objectFit: "cover",
                        width: "100%",
                        margin: 0,
                        padding: 0,
                      }}
                    />
                    <div
                      className="position-absolute top-0 end-0 m-5 p-2 bg-light border rounded-circle"
                      style={{ zIndex: 10 }}
                    >
                      <FontAwesomeIcon
                        icon={faShare}
                        className="text-primary"
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          setCopied(true);
                          setTimeout(() => {
                            setCopied(false);
                          }, 2000);
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              {/* Copy Notification */}
              {copied && (
                <p
                  className="position-absolute top-0 end-0 me-5 mt-5 bg-light px-3 py-2 rounded"
                  style={{ zIndex: 10 }}
                >
                  Link copied!
                </p>
              )}
              <button
                className="carousel-control-prev "
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        )
      )}
      <div className="container">
        <h3 className="py-4 pb-2 text-start">
          {error
            ? "Something Went Wrong ..."
            : loading
            ? "Loading ..."
            : `${listing.name} - $  ${listing.regularPrice}`}
        </h3>

        <div
          className="py-3 text-start d-flex align-items-center"
          style={{ color: "#525569" }}
        >
          <FontAwesomeIcon icon={faLocationDot} />
          <p className="ms-3 mb-0">{listing?.address || "Address Not given"}</p>
        </div>

        <div className="row py-3">
          <div className="col-12 col-md-6 mb-3 mb-md-0">
            <button
              className="btn text-white w-100 px-5"
              style={{ backgroundColor: "#7F1D1D" }}
            >
              {` ${listing?.type ? "For Sale" : "Type Not Given"}`}
            </button>
          </div>

          {listing?.offer && (
            <div className="col-12 col-md-6">
              <button
                className="btn text-white w-100 px-5"
                style={{ backgroundColor: "#14532D" }}
              >
                ${listing.discountPrice} Discount
              </button>
            </div>
          )}
        </div>

        <div className="py-2">
          {listing?.description && (
            <p className="py-1">
              <b>Description: </b>
              {listing.description}
            </p>
          )}
        </div>

        <div className="d-flex flex-column flex-md-row align-items-start">
          {listing?.beds > 0 && (
            <div className="d-flex align-items-center mb-2 mb-md-0">
              <FontAwesomeIcon icon={faBed} className="mb-0 ms-4" />
              <p className="ms-2 mb-0">{listing.beds} Beds</p>
            </div>
          )}

          {listing?.bathrooms > 0 && (
            <div className="d-flex align-items-center mb-2 mb-md-0">
              <FontAwesomeIcon icon={faBath} className="mb-0 ms-4" />
              <p className="ms-2 mb-0">{listing.bathrooms} Baths</p>
            </div>
          )}

          {listing?.parking && (
            <div className="d-flex align-items-center mb-2 mb-md-0">
              <FontAwesomeIcon icon={faSquareParking} className="mb-0 ms-4" />
              <p className="ms-2 mb-0">
                {listing.parking ? "Parking" : "No Parking"}
              </p>
            </div>
          )}

          {listing?.furnished && (
            <div className="d-flex align-items-center mb-2 mb-md-0">
              <FontAwesomeIcon icon={faChair} className="mb-0 ms-4" />
              <p className="ms-2 mb-0">Furnished</p>
            </div>
          )}
        </div>

        <div className="mb-5">
          {currentUser && listing?.userRef !== currentUser._id && (
            <button
              className="btn text-white px-5 mt-4 w-100 contact-lord-btn"
              style={{ backgroundColor: "#334155" }}
              onClick={() => {
                window.open(
                  `mailto:${landlord?.email}?subject=Inquiry about Listing&body=Hi, I'm interested in your listing and would like to know more about ${listing?.name}.`,
                  "_blank"
                );
              }}
            >
              CONTACT LANDLORD
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Listing;
