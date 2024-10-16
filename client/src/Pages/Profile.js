import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useState, useEffect } from "react";

function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fileRef = useRef(null);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  /// Firebase rules
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);

    // Correcting the timestamp generation (use getTime instead of 'gertime')
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
        // Error handling for upload
        console.error("Error uploading file: ", error);
        setFileUploadError(true);
      },
      () => {
        // Completion function to get download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({
            ...formData,
            avatar: downloadURL,
          })
        );
      }
    );
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

        <form className="container my-5 profile-form">
          {fileUploadError ? (
            <p className="text-danger mx-auto fw-bold text-center">
              Image must be less than 2MB.
            </p>
          ) : filePerc > 0 && filePerc < 100 ? (
            <p className="text-success mx-auto fw-bold text-center">
              Uploading file {filePerc}%
            </p>
          ) : filePerc === 100 ? (
            <p className="text-success mx-auto fw-bold text-center">
              Successfully Uploaded
            </p>
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
              id="text"
              required
              value={currentUser.username}
              onChange={(e) => setUsername(e.target.value)}
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
              required
              value={currentUser.email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-grid my-4 col-12">
            <button className="btn update-btn rounded-pill mb-3" type="submit">
              Update
            </button>
            <button
              className="btn create-listing-btn rounded-pill"
              type="submit"
            >
              Create Listing
            </button>
            <div className="my-4 mb-0 d-flex justify-content-between">
              <a className="del-acc-txt ">Delete Account</a>
              <a className="del-acc-txt ">Sign out</a>
            </div>
            <div className="already-acc-signin my-3">
              <a className=" show-listing-txt mx-auto my-2">Show Listings</a>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Profile;
