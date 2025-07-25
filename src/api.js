// src/api.js
const API_URL = "http://127.0.0.1:8000/api/user"; // Adjust if needed

export const sendVerificationCode = async (email) => {
  const response = await fetch(`${API_URL}/sendcode/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) throw new Error("Failed to send code");
  return await response.json();
};

export const verifyCode = async (email, code) => {
  const response = await fetch(`${API_URL}/verifycode/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });
  if (!response.ok) throw new Error("Invalid or expired code");
  return await response.json();
};

export const registerUser = async (data) => {
  const response = await fetch(`${API_URL}/completeregistration/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.detail || "Registration failed");
  }
  return await response.json();
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error("Invalid credentials");
  return await response.json();
};

export const requestPasswordReset = async (email) => {
  const response = await fetch(`${API_URL}/resetpasswordemail/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) throw new Error("Password reset failed");
  return await response.json();
};
