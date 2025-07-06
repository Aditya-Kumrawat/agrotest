import Layout from "@/components/Layout";
import { motion } from "framer-motion";

const mockWeatherData = {
  current: {
    condition: "Sunny with a chance of showers",
    high: "25°C",
    low: "18°C",
  },
  diseaseRisk: {
    level: "Medium",
    change: "+5%",
    timeline: "Next 7 Days",
  },
  weeklyForecast: [
    { day: "Mon", risk: 20 },
    { day: "Tue", risk: 35 },
    { day: "Wed", risk: 45 },
    { day: "Thu", risk: 60 },
    { day: "Fri", risk: 75 },
    { day: "Sat", risk: 40 },
    { day: "Sun", risk: 25 },
  ],
};

export default function Forecast() {
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
            7-Day Forecast
          </h1>
        </motion.div>

        {/* Weather Forecast */}
        <motion.div
          className="agro-card mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-lg font-bold text-agro-text-primary mb-4">
            Weather Forecast
          </h2>
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h3 className="text-base font-semibold text-agro-text-primary mb-2">
                {mockWeatherData.current.condition}
              </h3>
              <p className="text-sm text-agro-text-muted">
                High: {mockWeatherData.current.high}, Low:{" "}
                {mockWeatherData.current.low}
              </p>
            </motion.div>
            <motion.div
              className="text-4xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              ☀️
            </motion.div>
          </div>
        </motion.div>

        {/* Disease Risk Timeline */}
        <motion.div
          className="agro-card mb-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-lg font-bold text-agro-text-primary mb-6">
            Disease Risk Timeline
          </h2>

          {/* Chart Container */}
          <div className="h-64 mb-6">
            <div className="flex items-end justify-between h-full px-4">
              {mockWeatherData.weeklyForecast.map((data, index) => (
                <motion.div
                  key={data.day}
                  className="flex flex-col items-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <motion.div
                    className="w-8 bg-gradient-to-t from-red-500 to-yellow-500 rounded-t"
                    initial={{ height: 0 }}
                    animate={{ height: `${data.risk * 2}px` }}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  />
                  <span className="text-sm text-agro-text-muted">
                    {data.day}
                  </span>
                  <motion.span
                    className="text-xs text-agro-text-primary font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                  >
                    {data.risk}%
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Risk Summary */}
          <motion.div
            className="bg-orange-50 border border-orange-200 rounded-lg p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-orange-800">
                  Current Risk Level: {mockWeatherData.diseaseRisk.level}
                </p>
                <p className="text-xs text-orange-600">
                  {mockWeatherData.diseaseRisk.timeline}
                </p>
              </div>
              <motion.span
                className="text-sm font-bold text-orange-800"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {mockWeatherData.diseaseRisk.change}
              </motion.span>
            </div>
          </motion.div>
        </motion.div>

        {/* Preventive Actions */}
        <motion.div
          className="agro-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-lg font-bold text-agro-text-primary mb-6">
            Recommended Preventive Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Increase Ventilation",
                description: "Improve air circulation around plants",
                icon: "💨",
                priority: "High",
              },
              {
                title: "Reduce Watering",
                description: "Limit water to prevent fungal growth",
                icon: "💧",
                priority: "Medium",
              },
              {
                title: "Apply Fungicide",
                description: "Preventive fungicide application recommended",
                icon: "🧴",
                priority: "High",
              },
              {
                title: "Monitor Daily",
                description: "Check plants for early signs of disease",
                icon: "👀",
                priority: "Low",
              },
              {
                title: "Remove Debris",
                description: "Clear fallen leaves and plant matter",
                icon: "🧹",
                priority: "Medium",
              },
              {
                title: "Check Soil Drainage",
                description: "Ensure proper water drainage in soil",
                icon: "🌱",
                priority: "Low",
              },
            ].map((action, index) => (
              <motion.div
                key={index}
                className="bg-white border border-agro-border rounded-lg p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="flex items-start gap-3">
                  <motion.span
                    className="text-2xl"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                      duration: 2,
                      delay: index * 0.2,
                      repeat: Infinity,
                    }}
                  >
                    {action.icon}
                  </motion.span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-agro-text-primary mb-1">
                      {action.title}
                    </h3>
                    <p className="text-sm text-agro-text-muted mb-2">
                      {action.description}
                    </p>
                    <motion.span
                      className={`text-xs px-2 py-1 rounded-full ${
                        action.priority === "High"
                          ? "bg-red-100 text-red-800"
                          : action.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {action.priority} Priority
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  );
}
