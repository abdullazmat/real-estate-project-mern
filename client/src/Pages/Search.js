import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  console.log(listings);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    )
      setSidebarData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });

    const fetchListings = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebarData({ ...sidebardata, type: e.target.id });
    }
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebardata, searchTerm: e.target.value });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebarData({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSidebarData({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="container-fluid p-0">
      {/* Row for Form and Right Section */}
      <div className="row g-0">
        {/* Left Side - Form */}
        <div
          className="col-12 col-md-4 py-4 px-3 ms-3 border-end h-auto h-md-100 min-vh-md-100"
          style={{ borderColor: "black", borderWidth: "2px" }}
        >
          <form onSubmit={handleSubmit}>
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
                value={sidebardata.searchTerm}
                onChange={handleChange}
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
                    id="all"
                    onChange={handleChange}
                    checked={sidebardata.type === "all"}
                  />
                  <label className="form-check-label" htmlFor="all">
                    Rent & Sale
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rent"
                    onChange={handleChange}
                    checked={sidebardata.type === "rent"}
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
                    onChange={handleChange}
                    checked={sidebardata.type === "sale"}
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
                    onChange={handleChange}
                    checked={sidebardata.offer}
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
                    onChange={handleChange}
                    checked={sidebardata.parking}
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
                    onChange={handleChange}
                    checked={sidebardata.furnished}
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
              <select
                className="form-select w-50 ms-2 "
                id="sort_order"
                onChange={handleChange}
                defaultValue={"created_at_desc"}
              >
                <option value="regularPrice_desc" selected>
                  Price High To Low
                </option>
                <option value="regularPrice_asc">Price Low To High</option>
                <option value="createdAt_desc">Latest</option>
                <option value="createdAt_asc">Oldest</option>
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
