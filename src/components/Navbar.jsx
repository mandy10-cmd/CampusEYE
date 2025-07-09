import React from "react";
import { Link } from "react-router-dom";

// ✅ Define linkStyle BEFORE using it!
const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "500"
};

const Navbar = () => {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "1rem 2rem",
      backgroundColor: "#111",
      color: "#fff"
    }}>
      <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>TrinetraAI</div>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/#contact" style={linkStyle}>Contact</Link>
        <Link to="/signin" style={linkStyle}>Sign In</Link>
        <Link to="/signup" style={linkStyle}>Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;