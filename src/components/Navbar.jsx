import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

function Navbar() {

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  function openLogin() {
    setShowSignup(false);
    setShowLogin(true);
  }

  function openSignup() {
    setShowLogin(false);
    setShowSignup(true);
  }

  function closeForms() {
    setShowLogin(false);
    setShowSignup(false);
  }

  return (
    <>
      <nav className="kq-navbar">

        <div className="nav-container">

          <div className="brand-logo">
            <span className="red-badge">K</span>
            Kenya Airways

            <small className="tagline">
              The Pride of Africa
            </small>
          </div>

          <div className="nav-actions">

            <button
              className="login-btn"
              onClick={openLogin}
            >
              Login
            </button>

            <button
              className="signup-btn"
              onClick={openSignup}
            >
              Sign Up
            </button>

          </div>

        </div>

      </nav>

      {showLogin && (
        <Login
          onClose={closeForms}
          onSwitchToSignup={openSignup}
        />
      )}

      {showSignup && (
        <Signup
          onClose={closeForms}
          onSwitchToLogin={openLogin}
        />
      )}

    </>
  );
}

export default Navbar;