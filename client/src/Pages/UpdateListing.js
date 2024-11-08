import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    beds: 10,
    bathrooms: 10,
    regularPrice: 50,
    discountPrice: 0,
    parking: false,
    furnished: false,
    offer: false,
    sell: false,
  });
  console.log(formData);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      const listingiD = params.listingId;
      if (!listingiD) return setError("Listing ID is missing");

      try {
        const res = await fetch(`/api/listing/get/${listingiD}`);
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          setTimeout(() => setError(false), 3000);
        } else if (data.listing) {
          setFormData((prev) => ({ ...prev, ...data.listing }));
        }
      } catch (error) {
        setError("Failed to fetch listing data");
      }
    };
    fetchListing();
  }, [params.listingId]);

  // Function to handle image submission
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length <= 6) {
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
            return { ...prev, imageUrls: prev.imageUrls.concat(urls) };
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
      imageUrls: prevData.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    if (e.target.id === "sell" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) {
        setError("Please upload at least one image.");
        setTimeout(() => setError(null), 3000);
        return;
      }
      if (+formData.regularPrice < +formData.discountPrice) {
        setError("Discounted price should be less than regular price");
        setTimeout(() => setError(null), 3000);
        return;
      }

      setLoading(true);
      setError(false);
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });

      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
      navigate(`/listing/${params.listingId}`);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form className="my-5" onSubmit={handleSubmit}>
      <div className="container">
        <h1 className="text-center py-5">Update a Listing</h1>
        <div className="row">
          <div className="col-lg-6 col-md-12">
            {/* <form className="my-5"> */}
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                id="name"
                required
                onChange={handleChange}
                value={formData.name}
              />
            </div>
            <div className="mb-3">
              <textarea
                placeholder="Description"
                className="form-control"
                id="description"
                rows="3"
                required
                onChange={handleChange}
                value={formData.description}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Address"
                id="address"
                required
                onChange={handleChange}
                value={formData.address}
              />
            </div>
            <div className="d-flex flex-wrap justify-content-center mt-4">
              <div className="form-check me-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="sell"
                  onChange={handleChange}
                  checked={formData.type === "sell"}
                />
                <label className="form-check-label" htmlFor="check1">
                  Sell
                </label>
              </div>
              <div className="form-check me-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rent"
                  onChange={handleChange}
                  checked={formData.type === "rent"}
                />
                <label className="form-check-label" htmlFor="check2">
                  Rent
                </label>
              </div>
              <div className="form-check me-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="parking"
                  onChange={handleChange}
                  checked={formData.parking}
                />
                <label className="form-check-label" htmlFor="check3">
                  Parking
                </label>
              </div>
              <div className="form-check me-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="furnished"
                  onChange={handleChange}
                  checked={formData.furnished}
                />
                <label className="form-check-label" htmlFor="check4">
                  Furnished
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="offer"
                  onChange={handleChange}
                  checked={formData.offer}
                />
                <label className="form-check-label" htmlFor="check5">
                  Offer
                </label>
              </div>
            </div>

            <div className="d-flex flex-wrap align-items-center mt-5 justify-content-center">
              <div className="d-flex align-items-center me-3 mb-3 ">
                <label
                  htmlFor="beds"
                  className="form-label me-2"
                  style={{ width: "60px" }}
                >
                  Beds
                </label>

                <input
                  type="number"
                  id="beds"
                  className="form-control mx-2 text-center"
                  style={{ width: "100px" }}
                  name="beds"
                  min="1"
                  max="10"
                  value={formData.beds}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex align-items-center mb-3">
                <label
                  htmlFor="bathrooms"
                  className="form-label me-2"
                  style={{ width: "60px" }}
                >
                  Baths
                </label>

                <input
                  type="number"
                  className="form-control  mx-2 text-center"
                  style={{ width: "100px" }}
                  id="bathrooms"
                  name="bathrooms"
                  min="1"
                  max="10"
                  onChange={handleChange}
                  value={formData.bathrooms}
                />
              </div>
            </div>

            <div className="d-flex flex-wrap align-items-center mt-4 justify-content-center">
              <div className="d-flex align-items-center me-3 mb-3">
                <label
                  htmlFor="regularPrice"
                  className="form-label me-2"
                  style={{ width: "60px" }}
                >
                  Price(<b>$</b>)
                </label>

                <input
                  type="number"
                  className="form-control  mx-2 text-center"
                  style={{ width: "100px" }}
                  id="regularPrice"
                  name="regularPrice"
                  min="50"
                  max="1000000"
                  value={formData.regularPrice}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex align-items-center mb-3">
                <label
                  htmlFor="discountPrice"
                  className="form-label me-2"
                  style={{ width: "60px" }}
                  hidden={formData.offer ? false : true}
                >
                  Disc
                </label>

                <input
                  type="number"
                  className="form-control  mx-2 text-center"
                  style={{ width: "100px" }}
                  id="discountPrice"
                  name="discountPrice"
                  min="0"
                  max="1000000"
                  value={formData.discountPrice}
                  onChange={handleChange}
                  hidden={formData.offer ? false : true}
                />
              </div>
            </div>
            {/* </form> */}
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
                  type="submit"
                  className="btn px-5 my-2 my-md-4 ms-md-5 create-listing-fr"
                  style={{ backgroundColor: "#3D4A5D", color: "white" }}
                  disabled={imageUploadError || uploading || loading}
                >
                  {loading ? "Updating..." : "Update Listing"}
                </button>
              </div>
              <p className="text-danger text-center text-md-start">
                {imageUploadError ? imageUploadError : ""}
              </p>
              <p className="text-danger text-center text-md-start">
                {error ? error : ""}
              </p>
              <p className="text-success text-center text-md-start">
                {success ? "Listing Successfully Updated" : ""}
              </p>
              {formData.imageUrls.length > 0 &&
                formData.imageUrls.map((url, index) => (
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
    </form>
  );
}

export default CreateListing;
