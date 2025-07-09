// src/pages/SignUp.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div style={{
      backgroundColor: '#111',
      color: '#fff',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: '#1a1a1a',
        padding: '2.5rem',
        borderRadius: '10px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 0 10px blue'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>🛡️ Create TrinetraAI Account</h2>
        <form>
          <input
            type="text"
            placeholder="Full Name"
            style={inputStyle} />
          <input
            type="email"
            placeholder="Email"
            style={inputStyle} />
          <input
            type="password"
            placeholder="Password"
            style={inputStyle} />
          <button type="submit" style={buttonStyle}>Sign Up</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Already have an account? <Link to="/signin" style={{ color: 'blue' }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '0.8rem',
  marginBottom: '1rem',
  borderRadius: '5px',
  border: 'none',
  outline: 'none',
  backgroundColor: '#2a2a2a',
  color: '#fff'
};

const buttonStyle = {
  width: '100%',
  backgroundColor: 'blue',
  color: '#fff',
  padding: '0.8rem',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

export default SignUp;