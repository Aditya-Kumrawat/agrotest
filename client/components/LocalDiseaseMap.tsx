import React from "react";
import { motion } from "framer-motion";

const mockMapData = [
  { region: "North Field", cases: 12, severity: "High", color: "#ef4444" },
  { region: "South Field", cases: 8, severity: "Medium", color: "#f59e0b" },
  { region: "East Field", cases: 3, severity: "Low", color: "#10b981" },
  { region: "West Field", cases: 15, severity: "High", color: "#ef4444" },
];

export default function LocalDiseaseMap() {
  return (
    <motion.div
      className="agro-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.01 }}
    >
      <h2 className="text-xl font-bold text-agro-text-primary mb-6">
        Local Disease Map
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map Visualization */}
        <div className="bg-gray-50 rounded-lg p-6 min-h-[300px] flex items-center justify-center">
          <div className="text-center">
            <motion.div
              className="text-4xl mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🗺️
            </motion.div>
            <p className="text-agro-text-muted">
              Interactive map visualization coming soon
            </p>
          </div>
        </div>

        {/* Disease Data */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-agro-text-primary mb-4">
            Disease Distribution
          </h3>
          {mockMapData.map((region, index) => (
            <motion.div
              key={region.region}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-agro-border"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: region.color }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                />
                <div>
                  <p className="font-medium text-agro-text-primary">
                    {region.region}
                  </p>
                  <p className="text-sm text-agro-text-muted">
                    {region.cases} cases
                  </p>
                </div>
              </div>
              <motion.span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  region.severity === "High"
                    ? "bg-red-100 text-red-800"
                    : region.severity === "Medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {region.severity}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          className="text-center p-4 bg-red-50 rounded-lg"
          whileHover={{ scale: 1.02 }}
        >
          <p className="text-2xl font-bold text-red-600">
            {mockMapData.filter(r => r.severity === "High").length}
          </p>
          <p className="text-sm text-red-800">High Risk Areas</p>
        </motion.div>
        <motion.div
          className="text-center p-4 bg-yellow-50 rounded-lg"
          whileHover={{ scale: 1.02 }}
        >
          <p className="text-2xl font-bold text-yellow-600">
            {mockMapData.filter(r => r.severity === "Medium").length}
          </p>
          <p className="text-sm text-yellow-800">Medium Risk Areas</p>
        </motion.div>
        <motion.div
          className="text-center p-4 bg-green-50 rounded-lg"
          whileHover={{ scale: 1.02 }}
        >
          <p className="text-2xl font-bold text-green-600">
            {mockMapData.reduce((sum, r) => sum + r.cases, 0)}
          </p>
          <p className="text-sm text-green-800">Total Cases</p>
        </motion.div>
      </div>
    </motion.div>
  );
}