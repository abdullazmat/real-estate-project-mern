import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Listing() {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

  return (
    <div>
      {listing && !loading && !error && (
        <div id="carouselExample" className="carousel slide">
          <div className="carousel-inner">
            {listing.imageUrls.map((imageUrl, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={index}
              >
                <img
                  src={imageUrl}
                  className="d-block w-100 "
                  alt={`Slide ${index + 1}`}
                  style={{ height: "60vh", objectFit: "cover" }}
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
      )}
      <h3 className="py-5 text-center">
        {error
          ? "Something Went Wrong ..."
          : loading
          ? "Loading ..."
          : listing.name}
      </h3>
    </div>
  );
}

export default Listing;
