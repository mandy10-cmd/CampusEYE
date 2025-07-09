// src/pages/SignIn.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const styles = {
    wrapper: {
      minHeight: '100vh',
      width: '100%',
      background: 'linear-gradient(135deg, #0e0e0e 0%, #1a1a1a 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '5rem',
    },
    card: {
      background: '#1f1f1f',
      color: '#fff',
      padding: '2rem 2rem',
      borderRadius: '15px',
      width: '75%',
      maxWidth: '450px',
      boxShadow: '0 0 25px rgba(255, 48, 48, 0.6)',
      opacity: fadeIn ? 1 : 0,
      transform: fadeIn ? 'scale(1)' : 'scale(0.95)',
      transition: 'all 0.6s ease',
    },
    title: {
      textAlign: 'center',
      fontSize: '1.8rem',
      fontWeight: 'bold',
      marginBottom: '2rem',
    },
    input: {
      width: '85%',
      height: '58px',
      padding: '1rem',
      marginBottom: '1.5rem',
      borderRadius: '3px',
      backgroundColor: '#2a2a2a',
      color: '#fff',
      fontSize: '1.5rem',
      border: '10px solid #444',
      outline: 'none',
      boxSizing: 'border-box',
    },
    button: {
      width: '100%',
      backgroundColor: '#ff3131',
      color: '#fff',
      padding: '1rem',
      border: 'none',
      fontSize: '1rem',
      fontWeight: 'bold',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: '0.3s ease',
    },
    text: {
      textAlign: 'center',
      marginTop: '1.5rem',
      color: '#ccc',
      fontSize: '0.95rem',
    },
    link: {
      color: '#ff3131',
      fontWeight: 'bold',
      textDecoration: 'none',
      marginLeft: '5px',
    }
  };

  return (
    <div style={styles.wrapper}>
      <style>
        {`
          input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0px 1000px #2a2a2a inset !important;
            box-shadow: 0 0 0px 1000px #2a2a2a inset !important;
            -webkit-text-fill-color: #fff !important;
          }
        `}
      </style>
      <div style={styles.card}>
        <h2 style={styles.title}>🔐 Sign In to <span style={{ color: '#ff3131' }}>TrinetraAI</span></h2>

        <form autoComplete="off">
          {/* force autocomplete off to prevent autofill issues */}
          <input
            type="email"
            name="email"
            placeholder="✉️  Enter your email"
            required
            autoComplete="off"
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="🔒  Enter your password"
            required
            autoComplete="off"
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Sign In</button>
        </form>

        <p style={styles.text}>
          Don’t have an account?
          <Link to="/signup" style={styles.link}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;