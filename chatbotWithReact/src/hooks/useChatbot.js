import axios from "axios";
import { useState } from "react";

const useChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message) => {
    const newMessages = [...messages, { role: "user", content: message }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          contents: [{ parts: [{ text: message }] }],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const botMessage =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
      setMessages([...newMessages, { role: "assistant", content: botMessage }]);
    } catch (err) {
      console.log("Error fetching response: ", err);
    } finally {
      setLoading(false);
    }
  };

  return { messages, sendMessage, loading };
};

export default useChatbot;
