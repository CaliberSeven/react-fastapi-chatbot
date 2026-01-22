import React, { useState } from 'react';

function App() {
  // State definitions
  const [skill, setSkill] = useState("Press Release");
  const [scenario, setScenario] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Backend API Call
  const handleGenerate = async () => {
    if (!scenario.trim()) {
      setError("Please describe a scenario first.");
      return;
    }

    const apiUrl = import.meta.env.VITE_PROD === "1"
    ? "https://react-fastapi-chatbot.onrender.com"
    : "http://localhost:8000";

    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await fetch(`${apiUrl}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skill: skill,
          scenario: scenario
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.result);
      } else {
        setError(data.detail || "The AI could not generate a response.");
      }
    } catch (err) {
      setError("Connection failed. Make sure your FastAPI server is running on port 8000.");
      console.error("Full Error Details:", err);
    } finally {
      setLoading(false);
    }
  };

  // Clear function to reset the form
  const handleClear = () => {
    setScenario("");
    setResult("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="text-3xl font-extrabold text-blue-800 tracking-tight">
            Campaign Comms Aide
          </h1>
          <p className="text-slate-600 mt-1">
            AI-powered strategic messaging for Democratic campaigns.
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Made by Ethan Chen {" "}
            <a
              href="https://github.com/CaliberSeven/react-fastapi-chatbot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline font-medium"
            >
              (GitHub)
            </a>
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
                Skill Type
              </label>
              <select
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              >
                <option value="Press Release">Press Release</option>
                <option value="Rapid Response">Rapid Response</option>
              </select>

              <label className="block text-sm font-bold text-slate-700 mt-6 mb-2 uppercase tracking-wide">
                Scenario Context
              </label>
              <textarea
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                placeholder="Describe the political event or opponent attack..."
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 h-48 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
              />

              <div className="flex gap-2 mt-6">
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className={`flex-1 py-3 px-4 rounded-lg font-bold text-white shadow-md transition-all
                    ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'}`}
                >
                  {loading ? "Generating..." : "Generate Draft"}
                </button>
                <button
                  onClick={handleClear}
                  className="px-4 py-3 bg-slate-100 text-slate-600 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
                >
                  Clear
                </button>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg animate-pulse">
                  <strong>Error:</strong> {error}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 min-h-[500px] flex flex-col">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                <h2 className="font-bold text-slate-800">Generated Output</h2>
                {result && (
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    DRAFT READY
                  </span>
                )}
              </div>

              <div className="p-8 flex-1">
                  {result ? (
                    <div className="prose prose-slate max-w-none">
                      <div className="whitespace-pre-wrap text-slate-700 text-lg leading-relaxed">
                        {result}
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-6">
                      {/* Icon or Spinner Container */}
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                        {loading ? (
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        ) : (
                          <span className="text-2xl">✍️</span>
                        )}
                      </div>

                      <div className="text-center">
                        <p className="italic text-lg">
                          {loading ? "Strategizing with Gemini..." : "Your drafted content will appear here."}
                        </p>

                        {loading && (
                          <div className="mt-8 pt-4 border-t border-slate-100 max-w-xs mx-auto">
                            <p className="text-sm text-slate-400">
                              <span className="font-semibold text-slate-500">Note:</span> Since this is a free server,
                              the first request may take ~30s to wake up.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;