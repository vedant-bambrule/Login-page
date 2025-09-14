import React, { useState } from "react";
import "./login.css"; // import CSS

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    alert("Login Successful (dummy)");
  };

  return (
    <div className="login-container">
      <nav className="navbar">
        <h2 className="logo">FluidOrbit</h2>
        <ul className="nav-links">
          <li>Home</li>
          <li>Explore</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
        <button className="nav-login">Login</button>
      </nav>

      <div className="login-box">
        <h2>Nice to see you Here</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email or phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="/">Forgot password?</a>
          </div>

          <button type="submit" className="btn-login">Login</button>

          <button type="button" className="btn-google">
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="google"
            />
            Or sign in with Google
          </button>
        </form>

        <p className="signup-text">
          Don’t have an account? <a href="/">Sign up now</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
