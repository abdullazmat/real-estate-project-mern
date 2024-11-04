import React, { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";

function CreateListing() {
  // State for beds and baths count
  const [beds, setBeds] = useState(1);
  const [baths, setBaths] = useState(1);
  const [regular, setRegular] = useState(0);
  const [discount, setDiscount] = useState(0);

  // Functions to handle increment and decrement for bed count
  const handleBedsChange = (increment) => {
    setBeds((prev) => {
      if (increment && prev < 10) return prev + 1;
      if (!increment && prev > 1) return prev - 1;
      return prev;
    });
  };

  // Functions to handle increment and decrement for bath count
  const handleBathsChange = (increment) => {
    setBaths((prev) => {
      if (increment && prev < 10) return prev + 1;
      if (!increment && prev > 1) return prev - 1;
      return prev;
    });
  };

  // Functions to handle increment and decrement for regular price
  const handleRegularChange = (increment) => {
    setRegular((prev) => {
      if (increment && prev < 10) return prev + 1;
      if (!increment && prev > 1) return prev - 1;
      return prev;
    });
  };

  // Functions to handle increment and decrement for discount price
  const handleDiscountChange = (increment) => {
    setDiscount((prev) => {
      if (increment && prev < 10) return prev + 1;
      if (!increment && prev > 1) return prev - 1;
      return prev;
    });
  };

  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageURls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Function to handle image submission
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageURls.length <= 6) {
      setUploading(true);
      const promises = []; // Array to hold promises for each image upload

      // Loop through selected files and store each upload promise in the array
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i])); // Push each upload promise
      }

      // Wait for all promises (uploads) to resolve
      Promise.all(promises)
        .then((urls) => {
          // Once all images are uploaded, update formData with URLs
          setFormData((prev) => {
            return { ...prev, imageURls: prev.imageURls.concat(urls) };
          });
          setImageUploadError(null);
          setUploading(false);
        })
        .catch((error) => {
          setImageUploadError("Image Upload Failed. 2 MB max size.");
          setTimeout(() => setImageUploadError(null), 3000);
          setUploading(false);
        });
    } else {
      setImageUploadError("Please select between 1 and 6 images.");
      setTimeout(() => setImageUploadError(null), 3000);
    }
  };

  // Function to upload a single image to Firebase and return its download URL
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app); // Get Firebase storage instance
      const fileName = new Date().getTime() + file.name; // Generate unique file name with timestamp
      const storageRef = ref(storage, fileName); // Create a storage reference for the file
      const uploadTask = uploadBytesResumable(storageRef, file); // Start the file upload

      // Set up event listener for upload progress, success, or failure
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Track upload progress, if needed
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          // Reject promise if there's an upload error
          reject(error);
        },
        () => {
          // On successful upload, get the file's download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL); // Resolve promise with download URL
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      imageURls: prevData.imageURls.filter((_, i) => i !== index),
    }));
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
                <input
                  className="form-control"
                  type="file"
                  multiple
                  id="formFile"
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start justify-content-center justify-content-md-start">
                <button
                  type="button"
                  className="btn btn-success my-2 my-md-4"
                  onClick={handleImageSubmit}
                  disabled={imageUploadError ? false : uploading}
                >
                  {uploading ? "Uploading..." : "Upload Images"}
                </button>
                <button
                  type="button"
                  className="btn px-5 my-2 my-md-4 ms-md-5 create-listing-fr"
                  style={{ backgroundColor: "#3D4A5D", color: "white" }}
                >
                  Create Listing
                </button>
              </div>
              <p className="text-danger text-center text-md-start">
                {imageUploadError ? imageUploadError : ""}
              </p>
              {formData.imageURls.length > 0 &&
                formData.imageURls.map((url, index) => (
                  <div
                    key={url || index}
                    className="d-flex justify-content-between p-3 border align-items-center"
                  >
                    <img
                      src={url}
                      alt="listing image"
                      className="img-thumbnail w-25 h-25 rounded-3"
                      style={{ objectFit: "contain" }}
                    />
                    <button
                      className="btn btn-danger text-uppercase rounded-3 px-3"
                      type="button"
                      style={{ opacity: 0.95 }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CreateListing;
