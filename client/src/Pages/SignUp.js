import { Link } from "react-router-dom"

function SignUp() {
    return (
        <>
        <h1 className = "container my-5 ms-auto text-center fw-bold">Sign Up</h1>
        <form className = "container my-5 signup-form">
        <div className="mb-3">
            <label for="username" className="form-label" >username</label>
            <input type="text" className="form-control" id="username" autocomplete="off"  required placeholder = "abdullah"/>
        </div>
        <div className="mb-3">
            <label for="password" className="form-label">Email</label>
            <input type="email" className="form-control" id="password" required placeholder = "abc@gmail.com"/>
        </div>
        <div className="mb-3">
            <label for="password" className="form-label">Password</label>
            <input type="password" className="form-control" required id="password"/>
        </div>
        <div class="d-grid my-4 col-12 ">
        <button class="btn signup-btn rounded-pill" type="button">Sign Up </button>
        <p  class="form-text my-3">Already have an account?</p> <Link to={"/sign-in"}>Sign In</Link>
        </div>        
</form>

</>
    )
}

export default SignUp
