import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

// Disease outbreak data
interface DiseaseOutbreak {
  id: string;
  lat: number;
  lng: number;
  cropName: string;
  diseaseName: string;
  dateDetected: string;
  severity: "Low" | "Medium" | "High";
  affectedArea: string;
}

const mockDiseaseData: DiseaseOutbreak[] = [
  {
    id: "1",
    lat: 40.7589,
    lng: -73.9851,
    cropName: "Tomato",
    diseaseName: "Late Blight",
    dateDetected: "2024-01-15",
    severity: "High",
    affectedArea: "North Field",
  },
  {
    id: "2",
    lat: 40.7614,
    lng: -73.9776,
    cropName: "Corn",
    diseaseName: "Rust",
    dateDetected: "2024-01-12",
    severity: "Medium",
    affectedArea: "East Section",
  },
  {
    id: "3",
    lat: 40.7505,
    lng: -73.9934,
    cropName: "Wheat",
    diseaseName: "Leaf Spot",
    dateDetected: "2024-01-10",
    severity: "Low",
    affectedArea: "South Field",
  },
  {
    id: "4",
    lat: 40.7648,
    lng: -73.9808,
    cropName: "Potato",
    diseaseName: "Early Blight",
    dateDetected: "2024-01-14",
    severity: "Medium",
    affectedArea: "West Plot",
  },
  {
    id: "5",
    lat: 40.758,
    lng: -73.9855,
    cropName: "Soybean",
    diseaseName: "Healthy",
    dateDetected: "2024-01-16",
    severity: "Low",
    affectedArea: "Central Area",
  },
];

// Dynamic Map Component (Client-side only)
const MapComponent = dynamic(
  () => import("./MapRenderer").then((mod) => mod.MapRenderer),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 rounded-lg bg-gray-100 flex items-center justify-center border border-agro-border">
        <div className="text-center">
          <motion.div
            className="w-8 h-8 border-2 border-agro-primary border-t-transparent rounded-full mx-auto mb-2"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-sm text-agro-text-muted">Loading map...</p>
        </div>
      </div>
    ),
  },
);

interface LocalDiseaseMapProps {
  onViewFullMap?: () => void;
}

export default function LocalDiseaseMap({
  onViewFullMap,
}: LocalDiseaseMapProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "text-red-600 bg-red-100";
      case "Medium":
        return "text-yellow-600 bg-yellow-100";
      case "Low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleFullScreen = () => {
    setIsFullScreen(true);
    onViewFullMap?.();
  };

  const stats = useMemo(() => {
    return {
      total: mockDiseaseData.length,
      highRisk: mockDiseaseData.filter((d) => d.severity === "High").length,
      healthy: mockDiseaseData.filter((d) => d.diseaseName === "Healthy")
        .length,
      moderate: mockDiseaseData.filter((d) => d.severity === "Medium").length,
      low: mockDiseaseData.filter((d) => d.severity === "Low").length,
    };
  }, []);

  if (!isMounted) {
    return (
      <motion.div
        className="agro-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="h-64 rounded-lg bg-gray-100 flex items-center justify-center border border-agro-border animate-pulse">
          <p className="text-sm text-agro-text-muted">Initializing map...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        className="agro-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.01 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-8 h-8 bg-agro-primary-light rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-agro-primary text-sm">🗺️</span>
            </motion.div>
            <div>
              <h3 className="text-lg font-bold text-agro-text-primary">
                Local Disease Map
              </h3>
              <p className="text-sm text-agro-text-muted">
                Disease outbreaks in your area
              </p>
            </div>
          </div>
          <motion.button
            onClick={handleFullScreen}
            className="text-xs bg-agro-secondary text-agro-primary px-3 py-2 rounded-full hover:bg-agro-primary hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Full Map
          </motion.button>
        </div>

        {/* Map Container */}
        <motion.div
          className="relative mb-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <MapComponent diseaseData={mockDiseaseData} />
        </motion.div>

        {/* Legend */}
        <motion.div
          className="p-3 bg-agro-secondary rounded-lg mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <h4 className="text-sm font-semibold text-agro-text-primary mb-3">
            Risk Levels
          </h4>
          <div className="flex items-center justify-between">
            {[
              { emoji: "🟢", label: "No Risk", count: stats.low },
              { emoji: "🟡", label: "Moderate Risk", count: stats.moderate },
              { emoji: "🔴", label: "High Risk", count: stats.highRisk },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-sm">{item.emoji}</span>
                <div className="text-xs text-agro-text-muted">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-agro-text-muted">
                    {item.count} area{item.count !== 1 ? "s" : ""}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="grid grid-cols-3 gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          {[
            {
              label: "Total Areas",
              value: stats.total,
              color: "bg-blue-100 text-blue-800",
            },
            {
              label: "High Risk",
              value: stats.highRisk,
              color: "bg-red-100 text-red-800",
            },
            {
              label: "Healthy",
              value: stats.healthy,
              color: "bg-green-100 text-green-800",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-3 bg-white rounded-lg border border-agro-border"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div
                className={`text-lg font-bold ${stat.color} rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-1`}
              >
                {stat.value}
              </div>
              <div className="text-xs text-agro-text-muted">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {isFullScreen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFullScreen(false)}
          >
            <motion.div
              className="bg-white rounded-lg w-full max-w-6xl h-[90vh] p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-agro-text-primary">
                  Disease Map - Full View
                </h2>
                <motion.button
                  onClick={() => setIsFullScreen(false)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>
              </div>
              <div className="h-[calc(100%-80px)]">
                <MapComponent diseaseData={mockDiseaseData} isFullScreen />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
