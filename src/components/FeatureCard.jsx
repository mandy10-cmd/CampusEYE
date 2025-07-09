// src/components/FeatureCard.jsx
import React from "react";

const FeatureCard = ({ title, description }) => {
  return (
    <div style={{
      border: "1px solid #ddd", padding: "1.2rem", borderRadius: "10px", width: "300px", backgroundColor: "#f9f9f9"
    }}>
      <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>{title}</h3>
      <p style={{ fontSize: "0.95rem" }}>{description}</p>
    </div>
  );
};

export default FeatureCard;