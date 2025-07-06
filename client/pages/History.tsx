import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";

const filterOptions = {
  status: ["All", "Healthy", "Diseased"],
  crop: ["All", "Tomato", "Potato", "Corn", "Wheat"],
  date: ["All", "Latest", "This Week", "This Month"],
};

const mockScanHistory = [
  {
    id: 1,
    title: "Leaf Scan - Healthy",
    date: "2024-07-26 10:30 AM",
    crop: "Tomato",
    disease: "Healthy",
    confidence: "95%",
    location: "Field A",
    action: "None",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/bfda33333079e3dd6d964f0c82311a69b7557afa?width=300",
  },
  {
    id: 2,
    title: "Leaf Scan - Diseased",
    date: "2024-07-25 02:15 PM",
    crop: "Potato",
    disease: "Late Blight",
    confidence: "88%",
    location: "Field B",
    action: "Fungicide Application",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/bfda33333079e3dd6d964f0c82311a69b7557afa?width=300",
  },
  {
    id: 3,
    title: "Leaf Scan - Healthy",
    date: "2024-07-24 09:45 AM",
    crop: "Corn",
    disease: "Healthy",
    confidence: "92%",
    location: "Field C",
    action: "None",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/bfda33333079e3dd6d964f0c82311a69b7557afa?width=300",
  },
  {
    id: 4,
    title: "Leaf Scan - Diseased",
    date: "2024-07-23 03:20 PM",
    crop: "Wheat",
    disease: "Rust",
    confidence: "87%",
    location: "Field D",
    action: "Treatment Applied",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/bfda33333079e3dd6d964f0c82311a69b7557afa?width=300",
  },
];

export default function History() {
  const [filters, setFilters] = useState({
    status: "All",
    crop: "All",
    date: "All",
  });

  // Filter history based on selected filters
  const filteredHistory = mockScanHistory.filter((scan) => {
    if (filters.status !== "All" && scan.disease !== filters.status) {
      return false;
    }
    if (filters.crop !== "All" && scan.crop !== filters.crop) {
      return false;
    }
    return true;
  });

  const getStatusColor = (disease: string) => {
    return disease === "Healthy" ? "text-green-600" : "text-red-600";
  };

  const getStatusBg = (disease: string) => {
    return disease === "Healthy" ? "bg-green-100" : "bg-red-100";
  };

  return (
    <Layout>
      <motion.div
        className="p-6 max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Page Title */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-agro-text-primary">
            Scan History
          </h1>
        </motion.div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Scans", value: mockScanHistory.length, icon: "📊" },
            {
              label: "Healthy",
              value: mockScanHistory.filter((s) => s.disease === "Healthy")
                .length,
              icon: "✅",
            },
            {
              label: "Diseased",
              value: mockScanHistory.filter((s) => s.disease !== "Healthy")
                .length,
              icon: "⚠️",
            },
            { label: "Fields Monitored", value: 4, icon: "🌾" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="agro-card text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="text-2xl mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 2,
                  delay: index * 0.2,
                  repeat: Infinity,
                }}
              >
                {stat.icon}
              </motion.div>
              <div className="text-2xl font-bold text-agro-text-primary">
                {stat.value}
              </div>
              <div className="text-sm text-agro-text-muted">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <motion.div
          className="agro-card mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold text-agro-text-primary mb-4">
            Filter Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(filterOptions).map(([key, options], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              >
                <label className="block text-sm font-medium text-agro-text-primary mb-2 capitalize">
                  {key}
                </label>
                <motion.select
                  className="agro-input w-full appearance-none bg-white border border-agro-border rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-agro-primary/20 focus:border-agro-primary transition-all duration-200 text-agro-text-primary cursor-pointer hover:border-agro-primary/50"
                  value={filters[key as keyof typeof filters]}
                  onChange={(e) =>
                    setFilters({ ...filters, [key]: e.target.value })
                  }
                  whileFocus={{ scale: 1.01 }}
                  whileHover={{ scale: 1.005 }}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: "right 12px center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "16px",
                  }}
                >
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </motion.select>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scan History Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <AnimatePresence mode="popLayout">
            {filteredHistory.map((scan, index) => (
              <motion.div
                key={scan.id}
                className="agro-card"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                layout
              >
                <div className="flex gap-4">
                  <motion.img
                    src={scan.image}
                    alt={scan.title}
                    className="w-24 h-24 object-cover rounded-lg"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-agro-text-primary">
                        {scan.title}
                      </h3>
                      <motion.span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBg(scan.disease)} ${getStatusColor(scan.disease)}`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {scan.disease}
                      </motion.span>
                    </div>
                    <div className="space-y-1 text-sm text-agro-text-muted">
                      <p>
                        <strong>Date:</strong> {scan.date}
                      </p>
                      <p>
                        <strong>Crop:</strong> {scan.crop}
                      </p>
                      <p>
                        <strong>Location:</strong> {scan.location}
                      </p>
                      <p>
                        <strong>Confidence:</strong> {scan.confidence}
                      </p>
                      <p>
                        <strong>Action:</strong> {scan.action}
                      </p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <motion.button
                        className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Details
                      </motion.button>
                      <motion.button
                        className="text-xs bg-agro-primary-light text-agro-primary px-3 py-1 rounded-full hover:bg-agro-primary hover:text-white transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        🔄 Re-scan
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        <AnimatePresence>
          {filteredHistory.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🔍
              </motion.div>
              <h3 className="text-xl font-semibold text-agro-text-primary mb-2">
                No scans found
              </h3>
              <p className="text-agro-text-muted">
                Try adjusting your filters or perform a new scan.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Layout>
  );
}
