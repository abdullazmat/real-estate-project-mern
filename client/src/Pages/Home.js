import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import ListingItem from "../Components/ListingItem";

function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log(offerListings);
  // console.log(rentListings);
  console.log(saleListings);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await response.json();
        setOfferListings(data.listings);
        fetchRentListings();
      } catch (error) {
        console.error(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const response = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await response.json();
        setRentListings(data.listings);
        fetchSaleListings();
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const response = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await response.json();
        setSaleListings(data.listings);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchOfferListings();
  }, []);

  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  return (
    <div className="container-fluid ">
      {/* Hero Text */}
      <div className="container">
        <h1
          style={{ color: "#334155", fontWeight: "bold" }}
          className="py-5 mt-5 px-0 px-md-5 text-start fs-1 fs-md-3 fs-lg-1 mb-0"
        >
          Find your next <span style={{ color: "#64748b" }}>perfect</span>
          <br />
          place with ease
        </h1>
        <p style={{ color: "#9ca3af" }} className="px-0 px-md-5 text-start">
          We will help you find your home fast, easy and comfortable.
          <br />
          Our expert support is always available.
        </p>
        <Link
          to="/search"
          className="home-search-btn px-0 px-md-5 text-start "
          style={{
            textDecoration: "none",
            color: "#1e40af",
            fontWeight: "bold",
          }}
        >
          Lets Start Now...
        </Link>
      </div>

      {/* Offer Images */}
      {offerListings && offerListings.length > 0 && (
        <div className="container-fluid px-0 w-100">
          <div id="carouselExample" className="carousel slide py-5 w-100">
            <div className="carousel-inner">
              {offerListings
                .flatMap((listing) => listing.imageUrls.filter(isValidUrl))
                .map((imageUrl, index) => (
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
                  </div>
                ))}
            </div>
            <button
              className="carousel-control-prev"
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
      )}

      {/* Recent Offers */}
      {!loading && (
        <div className="container">
          <h2
            style={{ color: "#334155" }}
            className="py-2  ms-3  text-start fs-3 fs-md-4 fs-lg-3 mb-0"
          >
            Recent Offers:
          </h2>
          <div className="col-12 col-md-8  w-100 ">
            <div>
              {offerListings.length === 0 && (
                <p className="text-danger mt-3 ms-3 fs-5">No listing found!</p>
              )}

              {offerListings && (
                <div className="row g-0 ">
                  {offerListings.map((listing) => (
                    <div
                      key={listing._id}
                      className="col-lg-4 col-md-6 col-sm-12 mt-0"
                    >
                      <ListingItem key={listing._id} listing={listing} />
                    </div>
                  ))}
                </div>
              )}

              {/* {offerListings && showMore && (
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-success ms-3 mt-5 "
                  onClick={onShowMoreClick()}
                >
                  Show More
                </button>
              </div>
            )} */}
            </div>
          </div>
        </div>
      )}

      {/* Recent Places For Rent */}

      <div className="container">
        <h2
          style={{ color: "#334155" }}
          className="mt-5  ms-3  text-start fs-3 fs-md-4 fs-lg-3 mb-0"
        >
          Recent Places For Rent:
        </h2>
        <div className="col-12 col-md-8  w-100 ">
          <div>
            {rentListings.length === 0 && (
              <p className="text-danger mt-3 ms-3 fs-5">No listing found!</p>
            )}

            {rentListings && (
              <div className="row g-0 ">
                {rentListings.map((listing) => (
                  <div
                    key={listing._id}
                    className="col-lg-4 col-md-6 col-sm-12 mt-0"
                  >
                    <ListingItem key={listing._id} listing={listing} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Places For Sale */}
      <div className="container">
        <h2
          style={{ color: "#334155" }}
          className="mt-5  ms-3  text-start fs-3 fs-md-4 fs-lg-3 mb-0"
        >
          Recent Places For Sale:
        </h2>
        <div className="col-12 col-md-8  w-100 ">
          <div>
            {saleListings.length === 0 && (
              <p className="text-danger mt-3 ms-3 fs-5">No listing found!</p>
            )}

            {saleListings && (
              <div className="row g-0 ">
                {saleListings.map((listing) => (
                  <div
                    key={listing._id}
                    className="col-lg-4 col-md-6 col-sm-12 mt-0"
                  >
                    <ListingItem key={listing._id} listing={listing} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
