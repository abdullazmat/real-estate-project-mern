import { useSelector } from "react-redux";

function Profile() {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <>
      <div className="container mb-0">
        <h1 className="py-5 text-center">Profile</h1>
        <img
          src={currentUser.avatar}
          alt="profile"
          className="rounded-circle mx-auto d-block"
        />
        <form className="container my-5 profile-form">
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
