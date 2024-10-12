import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Header() {
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    console.log("currentUser updated:", currentUser);
  }, [currentUser]); // Log whenever currentUser changes

  // Get the current path using `useLocation`
  const location = useLocation();

  // Define the active state based on the current pathname
  const [active, setActive] = useState(location.pathname);

  // Update the active state when a new page is clicked
  const handleSetActive = (path) => {
    setActive(path);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light py-3 app-header">
      <div className="container">
        {/* Logo on the left */}
        <Link
          className={`navbar-brand ${active === "/" ? "active" : ""}`}
          to="/"
          onClick={() => handleSetActive("/")}
        >
          <span className="MernText">Mern</span>{" "}
          <span className="EstateText">Estate</span>
        </Link>

        {/* Toggler for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="d-flex w-100 justify-content-between align-items-center">
            {/* Search form centered */}
            <div className="d-flex justify-content-center flex-grow-1">
              <form className="d-flex" style={{ width: "350px" }}>
                <div className="input-group">
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <span className="input-group-text">
                    <a className="searchicon">
                      <i className="fas fa-search"></i>
                    </a>
                  </span>
                </div>
              </form>
            </div>

            {/* Navigation items on the right */}
            <ul className="navbar-nav mb-2 mb-lg-0 ms-auto navlinks">
              <li className="nav-item">
                <Link
                  className={`nav-link navtext ${
                    active === "/" ? "active" : ""
                  }`}
                  to="/"
                  onClick={() => handleSetActive("/")}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link navtext ${
                    active === "/about-us" ? "active" : ""
                  }`}
                  to="/about-us"
                  onClick={() => handleSetActive("/about-us")}
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  style={{ textDecoration: "none" }}
                  to={currentUser ? "/profile" : "/sign-in"}
                  onClick={() => !currentUser && handleSetActive("/sign-in")}
                >
                  {currentUser ? (
                    <img
                      src={currentUser.avatar}
                      className="pfp-image"
                      alt={currentUser.name}
                    />
                  ) : (
                    <span
                      className={`nav-link navtext ${
                        active === "/sign-in" ? "active" : ""
                      }`}
                    >
                      Log In
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
