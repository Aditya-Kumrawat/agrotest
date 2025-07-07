import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const sidebarItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: "🏠",
  },
  {
    name: "AI Diagnosis",
    path: "/ai-diagnosis",
    icon: "🔬",
  },
  {
    name: "Forecast",
    path: "/forecast",
    icon: "🌤️",
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: "📊",
  },
  {
    name: "History",
    path: "/history",
    icon: "📋",
  },
  {
    name: "Chatbot",
    path: "/chatbot",
    icon: "🤖",
  },
  {
    name: "Community",
    path: "/community",
    icon: "👥",
  },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <motion.div
      className="bg-white border-r border-agro-border h-full flex flex-col"
      initial={{ width: 256 }}
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ duration: 0.3 }}
    >
      {/* Logo and Toggle */}
      <div className="p-6 border-b border-agro-border">
        <motion.div
          className="flex items-center"
          initial={false}
          animate={{ justifyContent: isCollapsed ? "center" : "flex-start" }}
        >
          <motion.div
            className="flex"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 12 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.6087 8.1912C3.57343 7.96087 4.74147 7.8261 6 7.8261C7.25853 7.8261 8.42657 7.96087 9.3913 8.1912C10.3048 8.40927 11.3322 8.9223 11.7854 9.2784L6.28287 0.45363C6.15237 0.244343 5.84763 0.244343 5.71713 0.45363L0.21458 9.2784C0.66777 8.9223 1.6952 8.40927 2.6087 8.1912Z"
                fill="#121714"
              />
            </svg>
            <svg
              width="24"
              height="24"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.4809 0.33333 10.913C0.33333 10.6242 0.43088 10.3641 0.497737 10.2131C0.534583 10.1299 0.57116 10.0601 0.598957 10.0104C0.612993 9.9852 0.625157 9.9645 0.6345 9.94903C0.63918 9.94127 0.64318 9.93477 0.646387 9.92963L0.648873 9.92567L0.650593 9.92293ZM10.9956 8.668L7 2.25999L3.00437 8.668C3.15537 8.6203 3.30597 8.57807 3.4539 8.54273C4.47603 8.2987 5.6967 8.15943 7 8.15943C8.3033 8.15943 9.52397 8.2987 10.5461 8.54273C10.694 8.57807 10.8446 8.6203 10.9956 8.668Z"
                fill="#0D1A12"
              />
            </svg>
          </motion.div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.h1
                className="text-lg font-bold text-agro-text-primary ml-4"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
              >
                AgroSaarthi
              </motion.h1>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="mt-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 12h18m-9-9l9 9-9 9" />
          </svg>
        </motion.button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.li
                key={item.path}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-agro-primary text-white"
                      : "text-agro-text-primary hover:bg-gray-100"
                  }`}
                >
                  <motion.span
                    className="text-lg"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.icon}
                  </motion.span>
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        className="ml-3 font-medium"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-agro-border">
        <motion.button
          className="w-full flex items-center justify-center p-3 text-agro-text-muted hover:text-agro-primary transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-lg">⚙️</span>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                className="ml-3"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
              >
                Settings
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
}