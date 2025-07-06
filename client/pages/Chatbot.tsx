import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const TypingIndicator = () => (
  <motion.div
    className="flex items-center gap-1 p-3"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
  >
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-agro-primary rounded-full"
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
    <span className="text-sm text-agro-text-muted ml-2">
      CropSage is typing...
    </span>
  </motion.div>
);

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm CropSage, your AI farming assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponses = [
        "Based on your description, it sounds like your crop might be experiencing leaf spot disease. I recommend applying a copper-based fungicide.",
        "For tomato plants, ensure adequate spacing for air circulation and avoid overhead watering to prevent diseases.",
        "This looks like nutrient deficiency. Consider testing your soil pH and adding organic compost.",
        "Weather conditions suggest high humidity. Monitor your crops closely for signs of fungal diseases.",
        "I recommend scheduling regular scouting of your fields, especially during wet seasons.",
      ];

      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Layout>
      <motion.div
        className="p-6 max-w-4xl mx-auto h-[calc(100vh-200px)] flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Page Title */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-agro-text-primary">
            CropSage Assistant
          </h1>
          <p className="text-agro-text-muted mt-2">
            Get instant help and guidance on farming practices
          </p>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          className="flex-1 bg-white rounded-lg shadow-sm border border-agro-border flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  initial={{
                    opacity: 0,
                    x: message.sender === "user" ? 20 : -20,
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: message.sender === "user" ? 20 : -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <motion.div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-agro-primary text-white"
                        : "bg-gray-100 text-agro-text-primary"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    {message.sender === "bot" && (
                      <motion.div
                        className="flex items-center gap-2 mb-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <motion.span
                          className="text-lg"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          🤖
                        </motion.span>
                        <span className="text-xs font-semibold">CropSage</span>
                      </motion.div>
                    )}
                    <motion.p
                      className="text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {message.text}
                    </motion.p>
                    <motion.span
                      className={`text-xs mt-2 block ${
                        message.sender === "user"
                          ? "text-white/70"
                          : "text-gray-500"
                      }`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </motion.span>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            <AnimatePresence>{isTyping && <TypingIndicator />}</AnimatePresence>

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <motion.div
            className="border-t border-agro-border p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex gap-3 items-end">
              <motion.textarea
                className="flex-1 agro-input resize-none"
                placeholder="Ask about your crops, diseases, or farming practices..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                rows={2}
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              />
              <div className="flex flex-col gap-2">
                <motion.button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="agro-button-primary px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={
                    inputText.trim() && !isTyping ? { scale: 1.05 } : {}
                  }
                  whileTap={
                    inputText.trim() && !isTyping ? { scale: 0.95 } : {}
                  }
                  transition={{ duration: 0.2 }}
                >
                  <motion.span
                    animate={
                      inputText.trim() && !isTyping
                        ? { scale: [1, 1.2, 1] }
                        : {}
                    }
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    📤
                  </motion.span>
                </motion.button>
                <motion.button
                  className="agro-button-secondary px-3 py-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  title="Voice input (coming soon)"
                >
                  <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🎙️
                  </motion.span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Quick Suggestions */}
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-sm text-agro-text-muted mb-3">
            Quick suggestions:
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "How to identify leaf spot?",
              "Best fertilizer for tomatoes",
              "Weather effects on crops",
              "Organic pest control",
              "Soil pH testing",
            ].map((suggestion, index) => (
              <motion.button
                key={suggestion}
                onClick={() => setInputText(suggestion)}
                className="text-xs bg-agro-secondary text-agro-text-primary px-3 py-2 rounded-full hover:bg-agro-primary hover:text-white transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {suggestion}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  );
}
