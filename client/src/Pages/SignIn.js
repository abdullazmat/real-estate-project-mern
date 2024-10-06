import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
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
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        setTimeout(() => {
          setError(null);
        }, 3000);
        return;
      } else {
        setLoading(false);
        setError(null);
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      setError("An error occurred. Please try again.");
      setTimeout(() => {
        setError(null);
      }, 1000);
    }
  };

  return (
    <>
      <h1 className="container my-5 ms-auto text-center fw-bold">Sign In</h1>
      <form className="container my-5 signup-form" onSubmit={handleSubmit}>
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
            className="btn signup-btn rounded-pill"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading ..." : "Sign In"}
          </button>
          <div className="already-acc-signin my-4">
            <p className="form-text">Don't have an account?</p>
            <Link to={"/sign-up"} style={{ textDecoration: "none" }}>
              <span>Sign Up</span>
            </Link>
          </div>
          <div>{error && <p className="text-danger">{error}</p>}</div>
        </div>
      </form>
    </>
  );
}

export default SignIn;
