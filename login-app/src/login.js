import React, { useState, useEffect } from "react";
import "./login.css";

const LoginPage = ({ onPageChange }) => {
  const isMobile = () => window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
  const [panelsSwitched, setPanelsSwitched] = useState(() => {
    if (typeof window === 'undefined') return false;
    return isMobile() ? true : false; // default to Sign in on mobile
  });
  const [showRegisterForm, setShowRegisterForm] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });


  useEffect(() => {
    const handleResize = () => {
      if (isMobile()) {
        // Force login view on mobile
        setPanelsSwitched(true);
        setShowRegisterForm(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleRegisterClick = () => {
    setPanelsSwitched(!panelsSwitched);
    if (!panelsSwitched) {
      setShowRegisterForm(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (panelsSwitched) {
      // Register form submission
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      console.log("Registration data:", formData);
    } else {
      // Login form submission
      console.log("Login form submitted");
    }
  };

  return (
    <div className={`container ${panelsSwitched ? 'panels-switched' : ''}`}>
      {/* Left Panel */}
      <div className="left-panel">
         <div className="logo">Fluid Orbit</div>
        {panelsSwitched && showRegisterForm ? (
          // Register form on left when switched and form is visible
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
              />

              <label htmlFor="register-password">Create password</label>
              <input 
                type="password" 
                id="register-password" 
                name="password"
                placeholder="Password" 
                value={formData.password}
                onChange={handleChange}
              />

              <label htmlFor="register-confirm">Confirm the password</label>
              <input 
                type="password" 
                id="register-confirm" 
                name="confirmPassword"
                placeholder="Confirm password" 
                value={formData.confirmPassword}
                onChange={handleChange}
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

            <button className="google">Sign-up with Google</button>
          </div>
        ) : (
          // Default content on left (when not switched or register form is hidden)
          <div className="overlay">
            <h1>
             <h2>Still early, Still Building</h2>     
             <br/> 
             Not a Marketplace, Not a Store   <br/>
             The shopping Agent engine: where Trust, Quality and Convenience Matters.
            </h1>
          </div>
        )}
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <div className="top-nav">
          <div className="nav-title">{panelsSwitched ? '' : ''}</div>
        </div>
        {panelsSwitched ? (
          // Login form on right when switched
          <div>
            <h2>Welcome back!</h2>
            <p className="desc">
              Shop Anything...
            </p>

            <form onSubmit={handleSubmit}>
              <label htmlFor="login-email">Your email</label>
              <input 
                type="email" 
                id="login-email" 
                name="email"
                placeholder="example@mail.com" 
                value={formData.email}
                onChange={handleChange}
              />

              <label htmlFor="login-password">Password</label>
              <input 
                type="password" 
                id="login-password" 
                name="password"
                placeholder="Password" 
                value={formData.password}
                onChange={handleChange}
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

            <button className="google">Sign-in with Google</button>

            <p className="footer">
              Don't have an account? <a href="#" onClick={handleRegisterClick}>Create account</a>
            </p>
          </div>
        ) : (
          // Default register form on right
          <div>
            <h2>Create an account</h2>
            <p className="desc">
              Join and Shop Anything...
            </p>

            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Your email</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                placeholder="example@mail.com" 
                value={formData.email}
                onChange={handleChange}
              />

              <label htmlFor="password">Create password</label>
              <input 
                type="password" 
                id="password" 
                name="password"
                placeholder="Password" 
                value={formData.password}
                onChange={handleChange}
              />

              <label htmlFor="confirmPassword">Confirm the password</label>
              <input 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword"
                placeholder="Confirm password" 
                value={formData.confirmPassword}
                onChange={handleChange}
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

            <button className="google">Sign-in with Google</button>

            <p className="footer">
              Already have an account? <a href="#" onClick={handleRegisterClick}>Sign in</a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
