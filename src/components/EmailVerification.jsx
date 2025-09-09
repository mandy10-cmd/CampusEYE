import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MailCheck, ShieldCheck } from "lucide-react";

const EmailVerification = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState("enterEmail");
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSendCode = async () => {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    setError("");
    setVerifying(true);
    try {
      const response = await fetch("https://campuseye-backend-4dlk.onrender.com/api/user/sendcode/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setStep("enterCode");
      } else {
        setError(data?.email?.[0] || data?.detail || "Failed to send code.");
      }
    } catch (err) {
      setError("Failed to send code. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!code) {
      setError("Please enter the verification code.");
      return;
    }

    setError("");
    setVerifying(true);
    try {
      const response = await fetch("https://campuseye-backend-4dlk.onrender.com/api/user/verifycode/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await response.json();
      if (response.ok) {
        setEmail("");
        setCode("");
        setStep("enterEmail");
        navigate("/signup", { state: { email } });
      } else {
        setError(data?.detail || "Invalid or expired code.");
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4 text-white">
      <div className="bg-black/60 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            {step === "enterEmail" ? (
              <MailCheck className="w-6 h-6 text-white" />
            ) : (
              <ShieldCheck className="w-6 h-6 text-white" />
            )}
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
          {step === "enterEmail" ? "Verify Your Email" : "Enter Verification Code"}
        </h2>

        <p className="text-sm text-center text-gray-400 mb-6">
          {step === "enterEmail"
            ? "We'll send a 6-digit code to your email to continue."
            : `Enter the code sent to ${email} to continue.`}
        </p>

        {error && (
          <div className="mb-4 text-red-400 text-sm bg-red-500/10 border border-red-400/30 px-4 py-2 rounded-lg">{error}</div>
        )}

        {step === "enterEmail" ? (
          <>
            <label htmlFor="email" className="text-sm mb-1 block text-gray-300">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 mb-4 bg-white/10 border border-gray-600 rounded-lg focus:outline-none text-white placeholder-gray-400"
              disabled={verifying}
            />
            <button
              onClick={handleSendCode}
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg text-white font-medium transition-all"
              disabled={verifying}
            >
              {verifying ? "Sending..." : "Send Verification Code"}
            </button>
          </>
        ) : (
          <>
            <label htmlFor="code" className="text-sm mb-1 block text-gray-300">
              Verification Code
            </label>
            <input
              id="code"
              type="text"
              placeholder="Enter 6-digit code"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-3 mb-4 bg-white/10 border border-gray-600 rounded-lg focus:outline-none text-white placeholder-gray-400"
              disabled={verifying}
            />
            <button
              onClick={handleVerifyCode}
              className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg text-white font-medium transition-all"
              disabled={verifying}
            >
              {verifying ? "Verifying..." : "Verify & Continue"}
            </button>
          </>
        )}

        <button
          className="block w-full mt-4 text-sm text-gray-400 underline text-center"
          onClick={() => {
            setStep("enterEmail");
            setEmail("");
            setCode("");
            setError("");
          }}
          disabled={verifying}
        >
          {step === "enterCode" ? "← Go Back to Email" : "Cancel"}
        </button>
      </div>
    </div>
  );
};

export default EmailVerification;