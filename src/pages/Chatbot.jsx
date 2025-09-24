import React, { useState } from "react";

// Replace with your own API key for Gemini Pro
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyCMZBHZxfsYth0TUf4ar5msJOySN5brVd8";

const Chatbot = ({ analysisResults }) => {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async () => {
    if (!input.trim()) return;
    setIsLoading(true);

    // Use most recent analysis events for context (limit to 10 for brevity)
    const context = analysisResults
      .slice(-10)
      .map(
        (r) =>
          `[${r.timestamp}] Action: ${r.action}. Status: ${r.fight_or_tampering}. Description: ${r.description}`
      )
      .join("\n");

    // Compose the prompt
    const prompt = `
Video analysis results:
${context}

Answer this user's question based only on the above video analysis. If relevant, mention detected events, timestamps, and descriptions.
Question: ${input}
`;

    try {
      const resp = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      });
      const data = await resp.json();
      const answer =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't find an answer for that.";

      setChat((prev) => [...prev, { user: input, bot: answer }]);
      setInput("");
    } catch (err) {
      setChat((prev) => [
        ...prev,
        { user: input, bot: "Error reaching Gemini API." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 mt-8 max-w-xl mx-auto">
      <h3 className="font-semibold text-blue-300 mb-4">Ask about this video</h3>
      <div className="h-44 overflow-y-auto text-gray-200 bg-gray-800 rounded-md mb-2 p-3 text-sm">
        {chat.length === 0 && (
          <div className="text-gray-500">
            Ask about incidents, alerts, or any detected scene in the results.
          </div>
        )}
        {chat.map((msg, idx) => (
          <div key={idx} className="mb-3">
            <div><span className="text-blue-400 font-semibold">You:</span> {msg.user}</div>
            <div><span className="text-green-400 font-semibold">AI:</span> {msg.bot}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white"
          placeholder="Ask about the video…"
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={isLoading}
          onKeyDown={e => e.key === "Enter" && handleAsk()}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
          disabled={isLoading}
          onClick={handleAsk}
        >
          {isLoading ? "..." : "Ask"}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
