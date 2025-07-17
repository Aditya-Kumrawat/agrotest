import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import { auth } from "@/lib/firebaseClient";

const filterOptions = {
  status: ["All", "Healthy", "Diseased"],
  crop: ["All", "Tomato", "Potato", "Corn", "Wheat"],
  date: ["All", "Latest", "This Week", "This Month"],
};

export default function History() {
  const [filters, setFilters] = useState({
    status: "All",
    crop: "All",
    date: "All",
  });

  const [scanHistory, setScanHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getStatusColor = (disease: string) =>
    disease === "Healthy" ? "text-green-600" : "text-red-600";

  const getStatusBg = (disease: string) =>
    disease === "Healthy" ? "bg-green-100" : "bg-red-100";

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Get the current user's ID token
        const user = auth.currentUser;
        if (!user) {
          console.error("User not authenticated");
          setLoading(false);
          return;
        }
        
        const idToken = await user.getIdToken();
        
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/history`, {
          headers: {
            "Authorization": `Bearer ${idToken}`
          }
        });
        setScanHistory(res.data);
      } catch (err) {
        console.error("Failed to fetch scan history", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const filteredHistory = scanHistory.filter((scan) => {
    if (filters.status === "Healthy" && !scan.is_healthy) return false;
    if (filters.status === "Diseased" && scan.is_healthy) return false;
    if (filters.crop !== "All" && scan.crop_type !== filters.crop) return false;
    return true;
  });

  return (
    <Layout>
      <motion.div
        className="p-6 max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-agro-text-primary">Scan History</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Scans", value: scanHistory.length, icon: "📊" },
            {
              label: "Healthy",
              value: scanHistory.filter((s) => s.is_healthy).length,
              icon: "✅",
            },
            {
              label: "Diseased",
              value: scanHistory.filter((s) => !s.is_healthy).length,
              icon: "⚠️",
            },
            {
              label: "Fields Monitored",
              value: new Set(scanHistory.map((s) => s.field_location)).size,
              icon: "🌾",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="agro-card text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-agro-text-primary">
                {stat.value}
              </div>
              <div className="text-sm text-agro-text-muted">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div className="agro-card mb-6">
          <h2 className="text-lg font-semibold text-agro-text-primary mb-4">
            Filter Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(filterOptions).map(([key, options]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-agro-text-primary mb-2 capitalize">
                  {key}
                </label>
                <select
                  className="agro-input w-full"
                  value={filters[key as keyof typeof filters]}
                  onChange={(e) =>
                    setFilters({ ...filters, [key]: e.target.value })
                  }
                >
                  {options.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="popLayout">
            {filteredHistory.map((scan, index) => (
              <motion.div
                key={scan.id}
                className="agro-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex gap-4">
                  <img
                    src={scan.image_url}
                    alt={scan.crop_type}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-agro-text-primary">
                        {scan.crop_type}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBg(
                          scan.is_healthy ? "Healthy" : "Diseased"
                        )} ${getStatusColor(scan.is_healthy ? "Healthy" : "Diseased")}`}
                      >
                        {scan.is_healthy ? "Healthy" : scan.disease_detected}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-agro-text-muted">
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(scan.upload_date).toLocaleString()}
                      </p>
                      <p>
                        <strong>Location:</strong> {scan.field_location || "N/A"}
                      </p>
                      <p>
                        <strong>Confidence:</strong> {scan.confidence_score}%
                      </p>
                      <p>
                        <strong>Action:</strong>{" "}
                        {scan.action_taken || "Not recorded"}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {!loading && filteredHistory.length === 0 && (
          <motion.div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-agro-text-primary mb-2">
              No scans found
            </h3>
            <p className="text-agro-text-muted">
              Try adjusting your filters or perform a new scan.
            </p>
          </motion.div>
        )}
      </motion.div>
    </Layout>
  );
}
