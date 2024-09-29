import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [alertColor, setAlertColor] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);
  const navigate = useNavigate();

  // Define handleChange to update formData
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      // Check for error statuses
      if (res.ok) {
        // res.ok is true for status codes 200-299
        setAlertColor("primary");
        setShowAlert(true);
        setAlertMsg(data.message || "Sign In Successful");
        setFormData({ email: "", password: "" }); // Reset form fields here
        setTimeout(() => navigate("/"), 1000); // Redirect after successful login
      } else {
        // Handle non-2xx HTTP statuses
        setAlertColor("warning");
        setShowAlert(true);
        setAlertMsg(data.message || "Wrong Credentials");
        setFormData({ email: "", password: "" }); // Reset form fields here
      }

      // Hide the alerts after 1 seconds
      setTimeout(() => setShowAlert(false), 1000);
    } catch (error) {
      setAlertColor("danger");
      setShowAlert(true);
      setAlertMsg("An error occurred. Please try again.");
      setTimeout(() => setShowAlert(false), 1000);
    }
  };

  return (
    <>
      {showAlert && (
        <div className={`alert text-center alert-${alertColor}`} role="alert">
          {alertMsg}
        </div>
      )}

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
          <button className="btn signup-btn rounded-pill" type="submit">
            Sign In
          </button>
          <div className="already-acc-signin my-4">
            <p className="form-text">Don't have an account?</p>
            <Link to={"/sign-up"} style={{ textDecoration: "none" }}>
              <span>Sign Up</span>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}

export default SignIn;
