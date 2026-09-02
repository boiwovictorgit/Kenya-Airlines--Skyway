import { useState } from "react";

function Signup({ onClose, onSwitchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSignup(event) {
    event.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Check if the email already exists
      const response = await fetch(
        `http://localhost:3000/users?email=${encodeURIComponent(email)}`
      );

      const existingUsers = await response.json();

      if (existingUsers.length > 0) {
        alert("An account with this email already exists!");
        return;
      }

      // Create the new user
      const newUser = {
        name: name,
        email: email,
        password: password
      };

      // Save user to db.json
      const saveResponse = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      });

      if (!saveResponse.ok) {
        throw new Error("Failed to create account");
      }

      alert("Account created successfully!");

      // Clear form
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Open Login
      onSwitchToLogin();

    } catch (error) {
      console.error("Signup error:", error);
      alert("Unable to create account. Make sure json-server is running.");
    }
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

        <h2>Sign Up</h2>

        <p>Create your Kenya Airways account</p>

        <form onSubmit={handleSignup}>

          <label>Full Name</label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

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
            placeholder="Create a password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <label>Confirm Password</label>

          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(event) =>
              setConfirmPassword(event.target.value)
            }
            required
          />

          <button
            type="submit"
            className="auth-submit"
          >
            Create Account
          </button>

        </form>

        <p className="auth-switch">
          Already have an account?

          <button
            type="button"
            onClick={onSwitchToLogin}
          >
            Login
          </button>
        </p>

      </div>
    </div>
  );
}

export default Signup;