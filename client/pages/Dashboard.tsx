import Layout from "@/components/Layout";
import LocalDiseaseMap from "@/components/LocalDiseaseMap";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Count-up animation component
const CountUp = ({
  end,
  duration = 2,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min(
        (currentTime - startTime) / (duration * 1000),
        1,
      );
      const easeOutQuad = progress * (2 - progress);
      setCount(Math.floor(easeOutQuad * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

const mockData = {
  trackedCrops: 5,
  diseaseRisk: "Low",
  lastScanResult: {
    crop: "Tomato Plant",
    condition: "Healthy",
    confidence: "92%",
    treatment: "Apply fungicide and monitor closely",
  },
  upcomingThreat: {
    prediction: "Predicted Disease: Late Blight",
    risk: "High Level Alert",
    timeline: "Expected Date: 3 weeks from now",
  },
  cropCalendar: [
    { stage: "Planting", crop: "Current Season Stage", status: "active" },
    { stage: "Growth", crop: "Crop: Corn", status: "upcoming" },
    { stage: "Harvest", crop: "Crop: Wheat", status: "future" },
  ],
  recentHistory: [
    {
      date: "2024-07-20",
      time: "10:30 AM",
      disease: "Early Blight",
      action: "Fungicide Applied",
    },
    {
      date: "2024-07-18",
      time: "02:45 PM",
      disease: "Late Blight",
      action: "Monitoring",
    },
    {
      date: "2024-07-16",
      time: "11:15 AM",
      disease: "Healthy",
      action: "None",
    },
  ],
  healthStats: {
    diseasesDetected: 10,
    fieldHealthScore: 85,
    weeklyChange: "+5%",
    monthlyChange: "-2%",
  },
};

export default function Dashboard() {
  return (
    <Layout>
      <motion.div
        className="p-6 space-y-6"
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
            Dashboard
          </h1>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            className="agro-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <h3 className="text-sm text-agro-text-muted mb-2">Tracked Crops</h3>
            <p className="text-3xl font-bold text-agro-text-primary">
              <CountUp end={mockData.trackedCrops} duration={1.5} />
            </p>
          </motion.div>

          <motion.div
            className="agro-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <h3 className="text-sm text-agro-text-muted mb-2">
              Current Disease Risk
            </h3>
            <motion.p
              className="text-2xl font-bold text-agro-text-primary mb-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {mockData.diseaseRisk}
            </motion.p>
          </motion.div>

          <motion.div
            className="agro-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <h3 className="text-sm text-agro-text-muted mb-2">Quick Scan</h3>
            <motion.button
              className="agro-button-primary w-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🔍
              </motion.span>{" "}
              Scan Now
            </motion.button>
          </motion.div>

          <motion.div
            className="agro-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <h3 className="text-sm text-agro-text-muted mb-2">
              Disease Trends
            </h3>
            <p className="text-lg font-semibold text-agro-text-primary">
              <CountUp
                end={mockData.healthStats.diseasesDetected}
                duration={1.5}
              />{" "}
              diseases detected
            </p>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Intelligence Section */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.div
              className="agro-card"
              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            >
              <h2 className="text-xl font-bold text-agro-text-primary mb-6">
                AI Intelligence
              </h2>

              <div className="space-y-6">
                {/* Last Scan Result */}
                <motion.div
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-agro-text-primary mb-2">
                      Last Scan Result
                    </h3>
                    <p className="text-sm text-agro-text-muted mb-1">
                      {mockData.lastScanResult.crop}
                    </p>
                    <p className="text-lg font-semibold text-green-600">
                      {mockData.lastScanResult.condition}
                    </p>
                    <p className="text-sm text-agro-text-muted">
                      Confidence: {mockData.lastScanResult.confidence}
                    </p>
                  </div>
                  <motion.div
                    className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center"
                    whileHover={{ rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-green-600"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                </motion.div>

                {/* Upcoming Threat */}
                <motion.div
                  className="border-t border-agro-border pt-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                >
                  <h3 className="font-semibold text-agro-text-primary mb-2">
                    Upcoming Threat
                  </h3>
                  <p className="text-sm text-agro-text-muted">
                    {mockData.upcomingThreat.prediction}
                  </p>
                  <motion.p
                    className="text-sm font-semibold text-red-600"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {mockData.upcomingThreat.risk}
                  </motion.p>
                  <p className="text-sm text-agro-text-muted">
                    {mockData.upcomingThreat.timeline}
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Crop Calendar */}
            <motion.div
              className="agro-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            >
              <h2 className="text-xl font-bold text-agro-text-primary mb-6">
                Crop Calendar
              </h2>
              <div className="space-y-4">
                {mockData.cropCalendar.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                  >
                    <motion.div
                      className={`w-3 h-3 rounded-full ${
                        item.status === "active"
                          ? "bg-agro-primary"
                          : item.status === "upcoming"
                            ? "bg-yellow-500"
                            : "bg-gray-300"
                      }`}
                      animate={
                        item.status === "active" ? { scale: [1, 1.2, 1] } : {}
                      }
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-agro-text-primary">
                        {item.stage}
                      </p>
                      <p className="text-sm text-agro-text-muted">
                        {item.crop}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Sidebar Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* Quick Actions */}
            <motion.div
              className="agro-card"
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <h3 className="text-lg font-bold text-agro-text-primary mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <motion.button
                  className="agro-button-primary w-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  New Diagnosis
                </motion.button>
                <motion.button
                  className="agro-button-secondary w-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  View History
                </motion.button>
                <motion.button
                  className="agro-button-secondary w-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  Weather Forecast
                </motion.button>
              </div>
            </motion.div>

            {/* Recent History */}
            <motion.div
              className="agro-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            >
              <h3 className="text-lg font-bold text-agro-text-primary mb-4">
                Recent History
              </h3>
              <div className="space-y-4">
                {mockData.recentHistory.map((item, index) => (
                  <motion.div
                    key={index}
                    className="border-b border-agro-border pb-3 last:border-0 last:pb-0"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 1.1 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <p className="text-sm font-medium text-agro-text-primary">
                      {item.disease}
                    </p>
                    <p className="text-xs text-agro-text-muted">
                      {item.date} at {item.time}
                    </p>
                    <p className="text-xs text-agro-text-muted">
                      Action: {item.action}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Health Timeline */}
            <motion.div
              className="agro-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            >
              <h3 className="text-lg font-bold text-agro-text-primary mb-4">
                Health Timeline
              </h3>
              <div className="space-y-3">
                <motion.div
                  className="flex justify-between"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 1.3 }}
                >
                  <span className="text-sm text-agro-text-muted">
                    Field Health Score
                  </span>
                  <span className="text-sm font-semibold text-agro-text-primary">
                    <CountUp
                      end={mockData.healthStats.fieldHealthScore}
                      duration={2}
                      suffix="%"
                    />
                  </span>
                </motion.div>
                <motion.div
                  className="flex justify-between"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 1.4 }}
                >
                  <span className="text-sm text-agro-text-muted">
                    Weekly Change
                  </span>
                  <motion.span
                    className="text-sm font-semibold text-green-600"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {mockData.healthStats.weeklyChange}
                  </motion.span>
                </motion.div>
                <motion.div
                  className="flex justify-between"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 1.5 }}
                >
                  <span className="text-sm text-agro-text-muted">
                    Monthly Change
                  </span>
                  <span className="text-sm font-semibold text-red-600">
                    {mockData.healthStats.monthlyChange}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Local Disease Map */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            <LocalDiseaseMap />
          </motion.div>
        </div>
      </motion.div>
    </Layout>
  );
}
