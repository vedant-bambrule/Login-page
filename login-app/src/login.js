import React, { useState, useEffect } from "react";
import "./login.css";
import { signup, login, signInWithGoogle } from "./firebaseAuth"; // Adjust path if needed

const LoginPage = ({ onPageChange }) => {
  const isMobile = () =>
    window.matchMedia && window.matchMedia("(max-width: 768px)").matches;
  const [panelsSwitched, setPanelsSwitched] = useState(() => {
    if (typeof window === "undefined") return false;
    return isMobile() ? true : false; // default to Sign in on mobile
  });
  const [showRegisterForm, setShowRegisterForm] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });
  const [registerSuccess, setRegisterSuccess] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (isMobile()) {
        setPanelsSwitched(true);
        setShowRegisterForm(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRegisterClick = () => {
    setPanelsSwitched(!panelsSwitched);
    if (!panelsSwitched) {
      setShowRegisterForm(false);
      setRegisterSuccess(false); // reset success message on switch
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (registerSuccess) {
      setRegisterSuccess(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (panelsSwitched) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      try {
        await signup(formData.email, formData.password);
        setRegisterSuccess(true);
        setPanelsSwitched(false);
        setShowRegisterForm(false);
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
          rememberMe: false,
        });
      } catch (error) {
        alert("Registration error: " + error.message);
      }
    } else {
      try {
        await login(formData.email, formData.password);
        alert("Login Successful!");
      } catch (error) {
        alert("Login error: " + error.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      alert("Google sign-in Successful!");
    } catch (error) {
      alert("Google sign-in error: " + error.message);
    }
  };

  return (
    <div className={`container ${panelsSwitched ? "panels-switched" : ""}`}>
      <div className="left-panel">
        <div className="logo">Fluid Orbit</div>
        {panelsSwitched && showRegisterForm ? (
          <div className="register-form-left">
            <h2>Create an account</h2>
            <p className="desc">
              Join thousands of users who trust us with their productivity.
            </p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="register-email">Your email</label>
              <input
                type="email"
                id="register-email"
                name="email"
                placeholder="example@mail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="register-password">Create password</label>
              <input
                type="password"
                id="register-password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label htmlFor="register-confirm">Confirm the password</label>
              <input
                type="password"
                id="register-confirm"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="register-remember"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label htmlFor="register-remember">Remember me</label>
              </div>
              <button type="submit" className="btn">
                Create Account
              </button>
            </form>
            <div className="divider">
              <span>or continue with</span>
            </div>
            <button className="google" onClick={handleGoogleLogin}>
              Sign-up with Google
            </button>
          </div>
        ) : (
          <div className="overlay">
            <h1>
              Still early, Still Building
              <br />
              Not a Marketplace, Not a Store
              <br />
              The shopping Agent engine: where Trust, Quality and Convenience
              Matters.
            </h1>
          </div>
        )}
      </div>
      <div className="right-panel">
        <div className="top-nav">
          <div className="nav-title">{panelsSwitched ? "" : ""}</div>
        </div>
        {panelsSwitched ? (
          <div>
            <h2>Welcome back!</h2>
            {registerSuccess && (
              <div className="success-message">
                Registration successful! Please login.
              </div>
            )}
            <p className="desc">Shop Anything...</p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="login-email">Your email</label>
              <input
                type="email"
                id="login-email"
                name="email"
                placeholder="example@mail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="login-password">Password</label>
              <input
                type="password"
                id="login-password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="login-remember"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label htmlFor="login-remember">Remember me</label>
              </div>
              <button type="submit" className="btn">
                Sign in
              </button>
            </form>
            <div className="divider">
              <span>or continue with</span>
            </div>
            <button className="google" onClick={handleGoogleLogin}>
              Sign-in with Google
            </button>
            <p className="footer">
              Don't have an account?{" "}
              <button
                type="button"
                className="link-btn"
                onClick={handleRegisterClick}
              >
                Back
              </button>
            </p>
          </div>
        ) : (
          <div>
            <h2>Create an account</h2>
            <p className="desc">Join and Shop Anything...</p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Your email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@mail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="password">Create password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label htmlFor="confirmPassword">Confirm the password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="remember"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <button type="submit" className="btn">
                Create Account
              </button>
            </form>
            <div className="divider">
              <span>or continue with</span>
            </div>
            <button className="google" onClick={handleGoogleLogin}>
              Sign-in with Google
            </button>
            <p className="footer">
              Already have an account?{" "}
              <button
                type="button"
                className="link-btn"
                onClick={handleRegisterClick}
              >
                Sign in
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
