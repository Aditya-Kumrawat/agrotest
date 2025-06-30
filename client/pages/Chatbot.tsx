import { useState } from "react";
import Layout from "@/components/Layout";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const initialMessage: Message = {
  id: 1,
  text: "Welcome to CropSage Assistant! Ask me anything about your crops, diseases, or treatment tips.",
  sender: "bot",
  timestamp: new Date(),
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Mock bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: "Thanks for your question! I'm here to help you with your agricultural needs. Based on your query, I recommend checking your plant's leaves for early signs of disease and ensuring proper watering schedules.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);

    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Layout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-agro-border">
          <h1 className="text-3xl font-bold text-agro-text-secondary">
            CropSage Assistant
          </h1>
          <p className="text-agro-text-secondary mt-2">
            Welcome to CropSage Assistant! Ask me anything about your crops,
            diseases, or treatment tips.
          </p>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-md px-4 py-3 rounded-lg ${
                  message.sender === "user"
                    ? "bg-agro-primary text-agro-text-primary"
                    : "bg-agro-secondary text-agro-text-primary"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-agro-border">
          <div className="flex items-center gap-3">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2dea3abc60d0fbc4435fadfffe7358c9ffa6cbac?width=80"
              alt="Bot avatar"
              className="w-10 h-10 rounded-full flex-shrink-0"
            />
            <div className="flex-1 flex items-center bg-agro-secondary rounded-xl">
              <input
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-transparent px-4 py-3 text-agro-text-primary placeholder:text-agro-text-light focus:outline-none"
              />
              <div className="flex items-center gap-2 pr-2">
                <button className="p-2 text-agro-text-light hover:text-agro-text-primary transition-colors">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 14 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7 12.75C9.07018 12.7478 10.7478 11.0702 10.75 9V4C10.75 1.92893 9.07107 0.25 7 0.25C4.92893 0.25 3.25 1.92893 3.25 4V9C3.25215 11.0702 4.92982 12.7478 7 12.75ZM4.5 4C4.5 2.61929 5.61929 1.5 7 1.5C8.38071 1.5 9.5 2.61929 9.5 4V9C9.5 10.3807 8.38071 11.5 7 11.5C5.61929 11.5 4.5 10.3807 4.5 9V4ZM7.625 15.2188V17.125C7.625 17.4702 7.34518 17.75 7 17.75C6.65482 17.75 6.375 17.4702 6.375 17.125V15.2188C3.18323 14.894 0.753942 12.2082 0.75 9C0.75 8.65482 1.02982 8.375 1.375 8.375C1.72018 8.375 2 8.65482 2 9C2 11.7614 4.23858 14 7 14C9.76142 14 12 11.7614 12 9C12 8.65482 12.2798 8.375 12.625 8.375C12.9702 8.375 13.25 8.65482 13.25 9C13.2461 12.2082 10.8168 14.894 7.625 15.2188Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="bg-agro-primary-dark text-agro-text-primary px-4 py-2 rounded-2xl text-sm font-medium hover:bg-agro-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
