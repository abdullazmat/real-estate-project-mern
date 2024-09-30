import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../Redux/user/userSlice";

function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access the Redux state (for alerts and loading)
  const { showAlert, alertMsg, alertColor } = useSelector(
    (state) => state.user
  );

  // Define handleChange to update formData
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dispatch signInStart to indicate that the sign-in process has started
    dispatch(signInStart());

    try {
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // Dispatch signInSuccess and pass the user data to Redux store
        dispatch(signInSuccess(data.user));

        // Navigate to another page after successful login
        setTimeout(() => navigate("/"), 1000);
      } else {
        // Dispatch signInFailure with the error message
        dispatch(signInFailure(data.message));
      }
    } catch (error) {
      // Dispatch signInFailure with a generic error message
      dispatch(signInFailure("An error occurred. Please try again."));
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
