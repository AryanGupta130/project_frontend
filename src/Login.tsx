import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS file

type Errors = {
  email?: string;
  password?: string;
  server?: string;
};

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Errors = {};
    if (!email.trim()) newErrors.email = "Email is required.";
    if (!password.trim()) newErrors.password = "Password is required.";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.ok && data.token) {
          localStorage.setItem("jwt", data.token);
          navigate("/dashboard");
        } else {
          setErrors({ server: "Invalid credentials. Please try again." });
        }
      } catch {
        setErrors({ server: "Unable to connect. Please try again later." });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin} noValidate>
          <div className="login-logo">
            {/* Replace with your logo if you want */}
            <svg className="login-logo-svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <h2 className="login-title">Welcome to TaxMax Finance</h2>
          <p className="login-subtitle">Securely log in to maximize your tax savings.</p>
          {errors.server && (
            <div className="login-error">{errors.server}</div>
          )}
          <div className="login-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              disabled={loading}
              placeholder="you@email.com"
            />
            {errors.email && (
              <p className="login-error">{errors.email}</p>
            )}
          </div>
          <div className="login-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              disabled={loading}
              placeholder="Your password"
            />
            {errors.password && (
              <p className="login-error">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
          <div className="login-links">
            <button type="button" className="login-link" disabled aria-disabled="true">
              Forgot Password?
            </button>
            <button type="button" className="login-link" disabled aria-disabled="true">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;