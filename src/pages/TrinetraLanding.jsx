// src/pages/HomePage.jsx
console.log("homepage loaded");
import React from "react";
import FeatureCard from "../components/FeatureCard";

const HomePage = () => {
  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      {/* Hero Section */}
      <div style={{
        width: "100%", display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", textAlign: "center", padding: "3rem 1rem",
        background: "#f0f0ff"
      }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Welcome to TrinetraAI</h1>
        <p style={{ maxWidth: "600px", fontSize: "1.1rem" }}>
          Empowering safety through cutting-edge real-time crime detection using AI and surveillance analytics.
        </p>
      </div>

      {/* Features Section */}
      <div style={{
        padding: "2rem",
        display: "flex",
        flexWrap: "wrap",
        gap: "2rem",
        justifyContent: "center",
        backgroundColor: "#fff"
      }}>
        <FeatureCard
          title="Video Upload Analysis"
          description="Upload your video and detect suspicious activities with exact timestamps powered by AI."
        />
        <FeatureCard
          title="Real-Time CCTV Monitoring"
          description="Monitor in real-time using CCTV feeds to detect crimes and alerts instantly."
        />
        <FeatureCard
          title="No-Man Zone Monitoring"
          description="AI alerts for any activity in No-Man Zones after 12AM – enhancing area security compliance."
        />
      </div>

      {/* Contact (optional stub) */}
      <div id="contact" style={{ padding: "2rem", textAlign: "center", backgroundColor: "#f4f4f4" }}>
        <h2>Contact Us</h2>
        <p>Have questions or want a demo? Reach out at <a href="mailto:support@trinetraai.com">support@trinetraai.com</a></p>
      </div>
    </div>
  );
};

export default HomePage;