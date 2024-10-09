import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../Redux/user/userSlice.js";
import OAuth from "../Components/OAuth.js";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null); // To manage error state

  const { loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        setError(data.message); // Set the error message
        setTimeout(() => {
          setError(null);
        }, 3000);
        return;
      } else {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
      setError(error.message); // Set the error message
      setTimeout(() => {
        setError(null);
      }, 3000);
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
          <OAuth />
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
