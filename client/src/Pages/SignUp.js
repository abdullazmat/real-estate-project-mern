import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../Components/OAuth.js";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        "https://shaz-mern-api.vercel.app/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        setFormData({
          username: "",
          email: "",
          password: "",
        });
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <>
      <h1 className="container my-5 ms-auto text-center fw-bold">Sign Up</h1>
      <form className="container my-5 signup-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            required
            placeholder="abdullah"
            onChange={handleChange}
            value={formData.username}
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
            placeholder="abc@gmail.com"
            onChange={handleChange}
            value={formData.email}
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
            onChange={handleChange}
            value={formData.password}
          />
        </div>
        <div className="d-grid my-4 col-12">
          <button
            disabled={loading}
            className="btn signup-btn rounded-pill"
            type="submit"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <OAuth />
          <div className="already-acc-signin my-4">
            <p className="form-text">Already have an account?</p>
            <Link to={"/sign-in"} style={{ textDecoration: "none" }}>
              <span>Sign In</span>
            </Link>
          </div>
          <div>{error && <p className="text-danger">{error}</p>}</div>
        </div>
      </form>
    </>
  );
}

export default SignUp;
