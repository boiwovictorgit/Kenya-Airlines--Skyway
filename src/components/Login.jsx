import { useState } from "react";

function Login({ onClose, onSwitchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(event) {
    event.preventDefault();

    console.log("Login:", {
      email,
      password
    });

    alert("Login submitted!");
  }

  return (
    <div className="auth-overlay">
      <div className="auth-box">

        <button
          className="close-auth"
          onClick={onClose}
        >
          ×
        </button>

        <h2>Login</h2>

        <p>Welcome back to Kenya Airways</p>

        <form onSubmit={handleLogin}>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <button
            type="submit"
            className="auth-submit"
          >
            Login
          </button>

        </form>

        <p className="auth-switch">
          Don't have an account?

          <button onClick={onSwitchToSignup}>
            Sign Up
          </button>
        </p>

      </div>
    </div>
  );
}

export default Login;