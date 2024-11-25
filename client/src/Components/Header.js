import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const { currentUser } = useSelector((state) => state.user);

  // Get the current path using `useLocation`
  const location = useLocation();

  // Define the active state based on the current pathname
  const [active, setActive] = useState(location.pathname);

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Update the active state when a new page is clicked
  const handleSetActive = (path) => {
    setActive(path);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light py-3 app-header">
      <div className="container">
        {/* Logo on the left */}
        <Link
          className={`navbar-brand ${active === "/" ? "active" : ""}`}
          to="/"
          onClick={() => handleSetActive("/")}
        >
          <span className="MernText">Shaz</span>{" "}
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
          <div className="d-flex w-100 flex-wrap justify-content-between align-items-center">
            {/* Search form centered */}
            <div className="d-flex justify-content-center flex-grow-1 mb-2 mb-lg-0">
              <form
                className="d-flex"
                style={{ width: "350px" }}
                onSubmit={handleSubmit}
              >
                <div className="input-group search-form">
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="p-0 m-0 border-0">
                    <span className="input-group-text">
                      <a className="searchicon">
                        <i className="fas fa-search"></i>
                      </a>
                    </span>
                  </button>
                </div>
              </form>
            </div>

            {/* Navigation items on the right */}
            <ul className="navbar-nav mb-2 mb-lg-0 ms-auto navlinks text-center">
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
