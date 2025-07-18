import React, { useState } from "react";
import "./Login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace this with your auth logic (API call, token, etc.)
    alert(`Logging in as: ${email}`);
  };

  return (
    <div className="login-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">NewsFlow</div>
      </nav>

      {/* Login Form Section */}
      <section className="login-section">
        <div className="login-card">
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Log in to your account</p>

          <form onSubmit={handleLogin} className="login-form">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="login-btn">Log In</button>
          </form>

          <p className="signup-link">Don't have an account? <a href="#">Sign up</a></p>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;