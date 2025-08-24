import React, { useState } from "react";
import { LuBot, LuSendHorizontal } from "react-icons/lu";
import useChatbot from "../hooks/useChatbot";

function Chat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, loading } = useChatbot();

  const handleSend = () => {
    if (input.trim() === "") return;
    sendMessage(input);
    setInput("");
  };

  return (
    <div 
    className="flex flex-col h-[70vh] max-w-2xl mx-auto mt-10 rounded-3xl shadow-2xl overflow-hidden border border-white/20 bg-gradient-to-br from-blue-500 via-purple-300 to-blue-300"
    >
      {/* Header */}
      <h2 className="p-4 font-bold text-lg md:text-xl text-center bg-white/20 backdrop-blur-lg text-white flex justify-center items-center gap-2 shadow-sm">
        React + Gemini Chatbot <LuBot size={26} className="text-yellow-300" />
      </h2>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white/10 backdrop-blur-md">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 max-w-xs md:max-w-md rounded-2xl shadow-md text-sm ${
                msg.role === "user"
                  ? "bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-br-none"
                  : "bg-white/80 text-gray-800 backdrop-blur-md rounded-bl-none"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="p-3 bg-white/60 text-gray-700 rounded-2xl rounded-bl-none shadow-md animate-pulse text-sm">
              Gemini is typing...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white/20 backdrop-blur-lg flex items-center gap-2 border-t border-white/20">
        <input
          type="text"
          className="flex-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && !loading && handleSend()}
        />
        <button
          onClick={handleSend}
          className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 transition disabled:opacity-50"
          disabled={loading}
        >
          <LuSendHorizontal size={22} />
        </button>
      </div>
    </div>
  );
}

export default Chat;