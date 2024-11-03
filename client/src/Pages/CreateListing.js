import React, { useState } from "react";

function CreateListing() {
  // State for beds and baths
  const [beds, setBeds] = useState(1);
  const [baths, setBaths] = useState(1);
  const [regular, setRegular] = useState(0);
  const [discount, setDiscount] = useState(0);

  // Functions to handle increment and decrement
  const handleBedsChange = (increment) => {
    setBeds((prev) => {
      if (increment && prev < 10) return prev + 1; // increment if less than max
      if (!increment && prev > 1) return prev - 1; // decrement if more than min
      return prev;
    });
  };

  const handleBathsChange = (increment) => {
    setBaths((prev) => {
      if (increment && prev < 10) return prev + 1; // increment if less than max
      if (!increment && prev > 1) return prev - 1; // decrement if more than min
      return prev;
    });
  };

  const handleRegularChange = (increment) => {
    setRegular((prev) => {
      if (increment && prev < 10) return prev + 1; // increment if less than max
      if (!increment && prev > 1) return prev - 1; // decrement if more than min
      return prev;
    });
  };

  const handleDiscountChange = (increment) => {
    setDiscount((prev) => {
      if (increment && prev < 10) return prev + 1; // increment if less than max
      if (!increment && prev > 1) return prev - 1; // decrement if more than min
      return prev;
    });
  };

  return (
    <main>
      <div className="container">
        <h1 className="text-center py-5">Create a Listing</h1>
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <form className="my-5">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  id="name"
                />
              </div>
              <div className="mb-3">
                <textarea
                  placeholder="Description"
                  className="form-control"
                  id="description"
                  rows="3"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  id="address"
                />
              </div>
              <div className="d-flex flex-wrap justify-content-center mt-4">
                <div className="form-check me-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="check1"
                  />
                  <label className="form-check-label" htmlFor="check1">
                    Sell
                  </label>
                </div>
                <div className="form-check me-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="check2"
                  />
                  <label className="form-check-label" htmlFor="check2">
                    Rent
                  </label>
                </div>
                <div className="form-check me-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="check3"
                  />
                  <label className="form-check-label" htmlFor="check3">
                    Parking
                  </label>
                </div>
                <div className="form-check me-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="check4"
                  />
                  <label className="form-check-label" htmlFor="check4">
                    Furnished
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="check5"
                  />
                  <label className="form-check-label" htmlFor="check5">
                    Offer
                  </label>
                </div>
              </div>

              <div className="d-flex flex-wrap align-items-center mt-5 justify-content-center">
                <div className="d-flex align-items-center me-3 mb-3 ">
                  <label htmlFor="beds" className="form-label me-2">
                    Beds
                  </label>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => handleBedsChange(false)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="form-control w-50 mx-2 text-center"
                    id="beds"
                    name="beds"
                    min="1"
                    max="10"
                    value={beds}
                    readOnly
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => handleBedsChange(true)}
                  >
                    +
                  </button>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <label htmlFor="baths" className="form-label me-2">
                    Baths
                  </label>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => handleBathsChange(false)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="form-control w-50 mx-2 text-center"
                    id="baths"
                    name="baths"
                    min="1"
                    max="10"
                    value={baths}
                    readOnly
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => handleBathsChange(true)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="d-flex flex-wrap align-items-center mt-4 justify-content-center">
                <div className="d-flex align-items-center me-3 mb-1">
                  <label htmlFor="regular-price" className="form-label me-2">
                    Price
                  </label>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => handleRegularChange(false)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="form-control w-50 mx-2 text-center"
                    id="regular-price"
                    name="regular-price"
                    min="1"
                    max="10"
                    value={regular}
                    readOnly
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => handleRegularChange(true)}
                  >
                    +
                  </button>
                </div>
                <div className="d-flex align-items-center mb-1">
                  <label htmlFor="discounted-price" className="form-label me-2">
                    Disc
                  </label>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => handleDiscountChange(false)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="form-control w-50 mx-2 text-center"
                    id="discounted-price"
                    name="discounted-price"
                    min="1"
                    max="10"
                    value={discount}
                    readOnly
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => handleDiscountChange(true)}
                  >
                    +
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="col-lg-6 col-md-12">
            <div className="ms-lg-5">
              <p className="my-5 text-center text-lg-start">
                <b>Images:</b> The first image will be the cover (max 6)
              </p>
              <div className="mb-3">
                <input className="form-control" type="file" id="formFile" />
              </div>
              <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start justify-content-center justify-content-md-start">
                <button type="button" className="btn btn-success my-2 my-md-4">
                  Upload File
                </button>
                <button
                  type="button"
                  className="btn px-5 my-2 my-md-4 ms-md-5"
                  style={{ backgroundColor: "#3D4A5D", color: "white" }}
                >
                  Create Listing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CreateListing;
