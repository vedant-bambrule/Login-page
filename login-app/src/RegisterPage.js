import React, { useState } from "react";


const RegisterPage = ({ onPageChange }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Registration data:", formData);
    // Optionally navigate back to login
    if (onPageChange) {
      onPageChange('login');
    }
  };

  const containerStyle = {
    background: "whitesmoke",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    fontFamily: "'Michroma', sans-serif",
  };

  const cardStyle = {
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    width: "350px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "8px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  };

  const btnStyle = {
    width: "100%",
    padding: "12px",
    background: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "12px",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: "10px" }}>Create an Account</h2>
        <p style={{ fontSize: "14px", color: "#666", marginBottom: "20px" }}>
          Register to access your tasks, notes, and projects.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            style={inputStyle}
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            style={inputStyle}
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            style={inputStyle}
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <label style={{ fontSize: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            Remember me
          </label>

          <button type="submit" style={btnStyle}>
            Register
          </button>
        </form>
        
        {onPageChange && (
          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
            Already have an account? <a href="#" onClick={() => onPageChange('login')} style={{ color: '#f97316', textDecoration: 'none' }}>Login</a>
          </p>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
