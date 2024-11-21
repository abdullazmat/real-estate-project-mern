import React from "react";

function Search() {
  return (
    <div className="container-fluid p-0">
      {/* Row for Form and Right Section */}
      <div className="row g-0">
        {/* Left Side - Form */}
        <div
          className="col-12 col-md-4 py-4 px-3 ms-3 border-end h-auto h-md-100 min-vh-md-100"
          style={{ borderColor: "black", borderWidth: "2px" }}
        >
          <form>
            {/* Search Term */}
            <div className="d-flex align-items-center mb-4">
              <b>
                <p className="m-0">Search Term:</p>
              </b>
              <input
                type="text"
                className="form-control w-50 ms-2"
                placeholder="Term"
                id="searchTerm"
              />
            </div>

            {/* Type Section */}
            <div className="mb-4 d-flex">
              <b>
                <p className="m-0 mb-2">Type:</p>
              </b>
              <div className="d-flex flex-wrap gap-3 ms-2">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rent-sale"
                  />
                  <label className="form-check-label" htmlFor="rent-sale">
                    Rent & Sale
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rent"
                  />
                  <label className="form-check-label" htmlFor="rent">
                    Rent
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="sale"
                  />
                  <label className="form-check-label" htmlFor="sale">
                    Sale
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="offer"
                  />
                  <label className="form-check-label" htmlFor="offer">
                    Offer
                  </label>
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            <div className="mb-4 d-flex">
              <b>
                <p className="m-0 mb-2">Amenities:</p>
              </b>
              <div className="d-flex flex-wrap gap-3 ms-2">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="parking"
                  />
                  <label className="form-check-label" htmlFor="parking">
                    Parking
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="furnished"
                  />
                  <label className="form-check-label" htmlFor="furnished">
                    Furnished
                  </label>
                </div>
              </div>
            </div>

            {/* Sort */}
            <div className="mb-4 d-flex align-items-center ">
              <b>
                <p className="m-0 mb-2">Sort:</p>
              </b>
              <select className="form-select w-50 ms-2 " id="sort-order">
                <option selected>Price High To Low</option>
                <option>Price Low To High</option>
                <option>Latest</option>
                <option>Oldest</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="d-flex ">
              <button
                type="submit"
                className="btn w-75 filter-search-btn"
                style={{ backgroundColor: "#334155", color: "white" }}
              >
                Search
              </button>
            </div>
          </form>
        </div>
        {/* Right Side - Placeholder */}
        <div className="col-12 col-md-4 py-4 ms-3">
          <h2 style={{ color: "#334155" }}>Listing Results:</h2>
        </div>
      </div>
    </div>
  );
}

export default Search;
