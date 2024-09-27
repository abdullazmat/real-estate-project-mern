import { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [alertColor, setAlertColor] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (data.success === false) {
            setAlertColor("warning");
            setShowAlert(true);
            setFormData({ username: '', email: '', password: '' }); // Reset form fields here

            // Setting Error Message
            if (data.message) {
                const slicedMsg = data.message.split(':')[0];
                if (slicedMsg === "E11000 duplicate key error collection")
                    setAlertMsg("Username or Email Already excists");
            }
             else {
                setAlertMsg("An unknown error occured");
            }
        }
        else {
            setAlertColor("primary");
            setShowAlert(true);
            setAlertMsg("User Created Successfully");
            setFormData({ username: '', email: '', password: '' }); // Reset form fields here
        }

        // Hide the alerts after 3 seconds
        setTimeout(() => {
            setShowAlert(false);
        }, 1000);
    };

    return (
        <>
            {showAlert && (
                <div className={`alert text-center alert-${alertColor}`} role="alert">
                    {alertMsg}
                </div>
            )}

            <h1 className="container my-5 ms-auto text-center fw-bold">Sign Up</h1>
            <form className="container my-5 signup-form" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" required placeholder="abdullah" onChange={handleChange} value={formData.username} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" required placeholder="abc@gmail.com" onChange={handleChange} value={formData.email} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" required onChange={handleChange} value={formData.password} />
                </div>
                <div className="d-grid my-4 col-12">
                    <button className="btn signup-btn rounded-pill" type="submit">Sign Up</button>
                    <div className="already-acc-signin my-4">
                        <p className="form-text">Already have an account?</p>
                        <Link to={"/sign-in"} style={{ textDecoration: "none" }}>
                            <span>Sign In</span>
                        </Link>
                    </div>
                </div>
            </form>
        </>
    );
}

export default SignUp;
