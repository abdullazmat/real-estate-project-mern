import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useState, useEffect } from "react";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../Redux/user/userSlice";
import { Link } from "react-router-dom";

function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [fileUploaded, setFileUploaded] = useState(false); // Track image upload completion
  const [messageVisible, setMessageVisible] = useState(false); // Set initially to false
  const [SucessMessageVisible, setSucessMessageVisible] = useState(false); // Set initially to false
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListing, setUserListing] = useState([]);
  const [showUserListing, setShowUserListing] = useState(false);
  const dispatch = useDispatch();

  // Handle image file upload
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  /// Img Successfully uploaded timeout
  const showSuccessMessage = () => {
    setSucessMessageVisible(true);
    setTimeout(() => {
      setSucessMessageVisible(false);
    }, 3000); // Hide after 3 seconds
  };

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.error("Error uploading file: ", error);
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prev) => ({
            ...prev,
            avatar: downloadURL, // Add the image URL to formData
          }));
          setFileUploaded(true); // Set to true when file upload completes
          showSuccessMessage();
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fileUploaded && file) {
      // Ensure the image is uploaded before submitting the form
      alert("Please wait for the image to upload before submitting.");
      return;
    }

    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update user");
      }

      const data = await res.json();

      dispatch(updateUserSuccess(data));
      setMessageVisible(true); // Show message on success

      // Hide message after 3 seconds
      setTimeout(() => {
        setMessageVisible(false);
      }, 3000);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      setMessageVisible(true); // Show message on failure

      // Hide message after 3 seconds
      setTimeout(() => {
        setMessageVisible(false);
      }, 3000);
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.error(data.message); // Log error message
        dispatch(deleteUserFailure(data.message));
        return;
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(`/api/auth/signout`, {
        method: "GET",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
      } else {
        dispatch(signOutUserSuccess(data));
      }
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleShowListings = async (e) => {
    e.preventDefault();
    if (showUserListing) {
      setShowUserListing(false);
      return;
    } else {
      try {
        const res = await fetch(`/api/user/listings/${currentUser._id}`, {
          method: "GET",
        });
        const data = await res.json();
        if (data.success === false) {
          setShowListingsError(true);
          return;
        }
        console.log(data);
        setUserListing(data);
        setShowUserListing(true);
      } catch (error) {
        setShowListingsError(true);
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="container mb-0">
        <h1 className="py-5 text-center">Profile</h1>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-circle mx-auto d-block img-avatar"
        />

        <form className="container my-5 profile-form" onSubmit={handleSubmit}>
          {fileUploadError ? (
            <p className="text-danger mx-auto fw-bold text-center">
              Image must be less than 2MB.
            </p>
          ) : filePerc > 0 && filePerc < 100 ? (
            <p className="text-success mx-auto fw-bold text-center">
              Uploading file {filePerc}%
            </p>
          ) : filePerc === 100 ? (
            SucessMessageVisible && (
              <p className="text-success mx-auto fw-bold text-center">
                Successfully Uploaded
              </p>
            )
          ) : (
            <p className="mx-auto"></p>
          )}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              defaultValue={currentUser.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              defaultValue={currentUser.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={handleChange}
            />
          </div>
          <div className="d-grid my-4 col-12">
            <button
              className="btn update-btn rounded-pill mb-3"
              disabled={loading}
              type="submit"
            >
              {loading ? "Loading..." : "Update"}
            </button>
            <Link
              to="/create-listing"
              className="btn create-listing-btn rounded-pill"
            >
              Create Listing
            </Link>
            <div className="d-flex">
              <button
                className="btn delete-account-btn text-danger py-4 me-auto"
                type="button"
                onClick={handleDeleteUser}
              >
                Delete Account
              </button>
              <button
                className="btn sign-out-btn text-danger py-4"
                type="button"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
            <div className="py-3 d-flex justify-content-center">
              <a
                href="#"
                className="text-success my-listing-link"
                onClick={handleShowListings}
              >
                Show Listings
              </a>
            </div>
            {messageVisible && (
              <p
                className={`fw-bold py-4 ${
                  error ? "text-danger" : "text-success"
                }`}
              >
                {error ? error : "User Info Updated"}
              </p>
            )}
            {showListingsError && (
              <p className="text-danger fw-bold py-4">
                Error fetching listings
              </p>
            )}
            {userListing && showUserListing && userListing.length > 0 && (
              <div className="text-center my-5 ">
                <h2 className="font-weight-bold">Your Listings</h2>
                {userListing.map((listing) => (
                  <div
                    className="container my-3 d-flex justify-content-between"
                    key={listing._id}
                    style={{ border: "1px solid #ccc", padding: "10px" }}
                  >
                    <div className="listing-detail d-flex">
                      <div
                        className="listing-image d-flex"
                        style={{ flexWrap: "wrap" }}
                      >
                        {listing.imageUrls.map((imageUrl, index) => (
                          <img
                            key={index}
                            src={imageUrl}
                            alt={listing.name}
                            className="listing-image"
                            style={{
                              maxWidth: "100px",
                              marginRight: "10px",
                              marginBottom: "10px",
                            }}
                          />
                        ))}
                      </div>

                      <div className="listing-info">
                        <p>
                          <b>{listing.name}</b>
                        </p>
                      </div>
                    </div>
                    <div className="listings-edit pe-1">
                      <div>
                        <Link
                          to={`/edit-listing/${listing._id}`}
                          style={{
                            color: "green",
                            display: "block",
                            textDecoration: "none",
                          }}
                        >
                          Edit
                        </Link>
                      </div>
                      <div>
                        <Link
                          to={`/delete-listing/${listing._id}`}
                          style={{
                            color: "red",
                            display: "block",
                            textDecoration: "none",
                          }}
                        >
                          Delete
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default Profile;
