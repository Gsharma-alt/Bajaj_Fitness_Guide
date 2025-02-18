import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import ReactMarkdown from "react-markdown"; // For pretty response formatting
import { Dumbbell, Brain, Bookmark, AlertCircle, ChevronRight, Check } from "lucide-react";

interface QueryHistoryItem {
  query: string;
  response: string;
  timestamp: string;
}

interface SavedQuery {
  query: string;
  response: string;
  timestamp: string;
}

const PersonalizedTraining: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [savedQueries, setSavedQueries] = useState<SavedQuery[]>([]);
  const [queryHistory, setQueryHistory] = useState<QueryHistoryItem[]>([]);
  const [activeTab, setActiveTab] = useState<string>("ask");
  const [characterCount, setCharacterCount] = useState<number>(0);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<QueryHistoryItem | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const API_KEY = "AIzaSyCnhL_b6J3Oe9Z5j8UUdz4f621oR0lhzlk";

  useEffect(() => {
    const saved = localStorage.getItem("savedQueries");
    const history = localStorage.getItem("queryHistory");
    if (saved) setSavedQueries(JSON.parse(saved));
    if (history) setQueryHistory(JSON.parse(history));
  }, []);

  useEffect(() => {
    localStorage.setItem("savedQueries", JSON.stringify(savedQueries));
  }, [savedQueries]);

  useEffect(() => {
    localStorage.setItem("queryHistory", JSON.stringify(queryHistory));
  }, [queryHistory]);

  const handleAskAI = async () => {
    if (!query.trim()) {
      setError("Please enter a valid query.");
      return;
    }

    setIsLoading(true);
    setError("");
    setIsSaved(false);

    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;

    const requestData = {
      contents: [{
        parts: [{
          text: `You are a fitness expert. Provide a detailed, structured response to this fitness question: ${query}. Include specific recommendations, science-based explanations, and safety considerations where applicable.`,
        }],
      }],
    };

    try {
      const res = await axios.post(url, requestData, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data && res.data.candidates && res.data.candidates[0].content.parts[0].text) {
        const aiResponse = res.data.candidates[0].content.parts[0].text;
        setResponse(aiResponse);

        const newHistory: QueryHistoryItem[] = [...queryHistory, { query, response: aiResponse, timestamp: new Date().toISOString() }];
        setQueryHistory(newHistory);
      } else {
        setError("Unexpected response format from AI.");
      }
    } catch (error) {
      console.error(error);
      setError("Failed to fetch response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const saveQuery = () => {
    if (query && response) {
      const newSavedQueries: SavedQuery[] = [...savedQueries, { query, response, timestamp: new Date().toISOString() }];
      setSavedQueries(newSavedQueries);
      setIsSaved(true);
    }
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setQuery(text);
    setCharacterCount(text.length);
  };

  const renderHistoryItem = (item: QueryHistoryItem) => {
    return (
      <div
        key={item.timestamp}
        className="bg-blue-900/50 p-4 rounded-lg cursor-pointer hover:bg-blue-800/50 transition-colors"
        onClick={() => setSelectedHistoryItem(item)}
      >
        <div className="flex justify-between items-center">
          <p className="text-gray-300 font-medium">{item.query}</p>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
        <p className="text-gray-400 text-sm mt-2">{new Date(item.timestamp).toLocaleDateString()}</p>
      </div>
    );
  };

  const renderTab = () => {
    switch (activeTab) {
      case "history":
        return (
          <div className="space-y-4">
            {queryHistory.map((item) => renderHistoryItem(item))}
          </div>
        );
      case "saved":
        return (
          <div className="space-y-4">
            {savedQueries.map((item) => renderHistoryItem(item))}
          </div>
        );
      default:
        return (
          <>
            <div className="mb-8">
              <div className="bg-blue-900/50 p-6 rounded-xl border border-blue-800/50 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-6 h-6 text-lightblue-400" />
                  <h2 className="text-xl font-semibold text-gray-200">Ask Your Question</h2>
                </div>
                <textarea
                  className="w-full p-4 bg-white border border-blue-700/50 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 min-h-[120px]"
                  placeholder="Example: Design a HIIT workout for fat burning? What's the optimal protein intake for muscle growth? How can I improve my deadlift form?"
                  value={query}
                  onChange={handleQueryChange}
                  maxLength={500}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-400">{characterCount}/500 characters</span>
                  <button
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 via-lightblue-500 to-blue-700 rounded-lg font-semibold text-white hover:opacity-90 transition-all duration-200 flex items-center gap-2"
                    onClick={handleAskAI}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                        Processing...
                      </div>
                    ) : (
                      <>
                        <Dumbbell className="w-5 h-5" />
                        Get Expert Advice
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-4 bg-red-950/50 border border-red-900/50 rounded-lg text-red-400 flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5" />
                {error}
              </motion.div>
            )}

            {response && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue-900/50 p-6 rounded-xl border border-blue-800/50 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-lightblue-500 rounded-lg flex items-center justify-center">
                      <Dumbbell className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-200">Expert Response</h2>
                  </div>
                  <button
                    onClick={saveQuery}
                    disabled={isSaved}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-800 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {isSaved ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-4 h-4" />
                        Save
                      </>
                    )}
                  </button>
                </div>

                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown className="text-gray-300 leading-relaxed space-y-4 px-4">
                    {response}
                  </ReactMarkdown>
                </div>

                <div className="mt-6 pt-6 border-t border-blue-800/50">
                  <p className="text-sm text-gray-400 italic">
                    Note: This advice is generated by AI based on general fitness principles. Always consult with a healthcare professional before starting any new fitness program.
                  </p>
                </div>
              </motion.div>
            )}
          </>
        );
    }
  };

  return (
    <div className="p-8 bg-blue-900/50 rounded-2xl max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <button onClick={() => setActiveTab("ask")} className={`px-6 py-3 text-white font-bold ${activeTab === "ask" ? "bg-lightblue-600" : "bg-transparent"}`}>Ask AI</button>
        <button onClick={() => setActiveTab("history")} className={`px-6 py-3 text-white font-bold ${activeTab === "history" ? "bg-lightblue-600" : "bg-transparent"}`}>History</button>
        <button onClick={() => setActiveTab("saved")} className={`px-6 py-3 text-white font-bold ${activeTab === "saved" ? "bg-lightblue-600" : "bg-transparent"}`}>Saved</button>
      </div>

      {renderTab()}
    </div>
  );
};

export default PersonalizedTraining;
