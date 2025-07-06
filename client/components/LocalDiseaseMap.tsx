import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

// Simple Map Component using static image with overlaid markers
function SimpleMapView({
  diseaseData,
  isFullScreen = false,
}: {
  diseaseData: DiseaseOutbreak[];
  isFullScreen?: boolean;
}) {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "bg-red-500 border-red-600";
      case "Medium":
        return "bg-yellow-500 border-yellow-600";
      case "Low":
        return "bg-green-500 border-green-600";
      default:
        return "bg-gray-500 border-gray-600";
    }
  };

  const getSeverityBadgeColor = (severity: string) => {
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

  return (
    <div
      className={`relative ${isFullScreen ? "h-full" : "h-64"} rounded-lg overflow-hidden border border-agro-border bg-gradient-to-br from-green-50 to-blue-50`}
    >
      {/* Static Map Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 20 0 L 0 0 0 20' fill='none' stroke='%23e5e7eb' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='%23f8fafc'/%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3Cpath d='M50 50 Q 150 100 250 80 T 350 120' stroke='%2394a3b8' stroke-width='2' fill='none'/%3E%3Cpath d='M20 200 Q 120 180 220 200 T 380 210' stroke='%2394a3b8' stroke-width='2' fill='none'/%3E%3Cpath d='M80 300 Q 180 280 280 300 T 400 290' stroke='%2394a3b8' stroke-width='2' fill='none'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Field Areas */}
      <div className="absolute inset-0">
        <div className="absolute top-4 left-4 w-20 h-16 bg-green-200 opacity-50 rounded-lg border-2 border-green-300" />
        <div className="absolute top-4 right-4 w-24 h-20 bg-yellow-200 opacity-50 rounded-lg border-2 border-yellow-300" />
        <div className="absolute bottom-4 left-4 w-28 h-18 bg-blue-200 opacity-50 rounded-lg border-2 border-blue-300" />
        <div className="absolute bottom-4 right-4 w-22 h-16 bg-green-200 opacity-50 rounded-lg border-2 border-green-300" />
      </div>

      {/* Disease Markers */}
      {diseaseData.map((outbreak, index) => (
        <motion.div
          key={outbreak.id}
          className="absolute cursor-pointer z-10"
          style={{
            left: `${20 + index * 15}%`,
            top: `${30 + index * 10}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.2, duration: 0.3 }}
          whileHover={{ scale: 1.2 }}
          onClick={() =>
            setSelectedMarker(
              selectedMarker === outbreak.id ? null : outbreak.id,
            )
          }
        >
          {/* Marker */}
          <motion.div
            className={`w-6 h-6 rounded-full border-2 ${getSeverityColor(outbreak.severity)} shadow-lg`}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
          >
            <div className="w-2 h-2 bg-white rounded-full mx-auto mt-1" />
          </motion.div>

          {/* Popup */}
          <AnimatePresence>
            {selectedMarker === outbreak.id && (
              <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-lg shadow-lg border border-agro-border min-w-[200px] z-20"
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-agro-text-primary">
                    {outbreak.cropName}
                  </h4>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityBadgeColor(outbreak.severity)}`}
                  >
                    {outbreak.severity}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-agro-text-muted">
                  <p>
                    <strong>Disease:</strong> {outbreak.diseaseName}
                  </p>
                  <p>
                    <strong>Location:</strong> {outbreak.affectedArea}
                  </p>
                  <p>
                    <strong>Detected:</strong>{" "}
                    {formatDate(outbreak.dateDetected)}
                  </p>
                </div>
                <motion.button
                  className="mt-3 w-full text-xs bg-agro-primary text-white px-3 py-2 rounded-lg hover:bg-agro-primary-dark transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Details
                </motion.button>

                {/* Popup Arrow */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      {/* User Location */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg relative">
          <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75" />
        </div>
      </motion.div>

      {/* Location Label */}
      <div className="absolute bottom-3 left-3 bg-white shadow-md rounded-lg px-3 py-2 flex items-center gap-2">
        <motion.div
          className="w-2 h-2 bg-blue-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="text-xs text-gray-600">Your Location</span>
      </div>

      {/* Map Controls */}
      <div className="absolute top-3 right-3 flex flex-col gap-2">
        <motion.button
          className="w-8 h-8 bg-white shadow-md rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Zoom In"
        >
          <span className="text-sm font-bold text-gray-600">+</span>
        </motion.button>
        <motion.button
          className="w-8 h-8 bg-white shadow-md rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Zoom Out"
        >
          <span className="text-sm font-bold text-gray-600">−</span>
        </motion.button>
      </div>
    </div>
  );
}

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
          <SimpleMapView diseaseData={mockDiseaseData} />
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
                <SimpleMapView diseaseData={mockDiseaseData} isFullScreen />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
import { motion } from "framer-motion";

const mockDiseaseData = [
  { region: "North Field", disease: "Late Blight", severity: "High", lat: 40.7128, lng: -74.0060 },
  { region: "South Field", disease: "Early Blight", severity: "Medium", lat: 40.7589, lng: -73.9851 },
  { region: "East Field", disease: "Healthy", severity: "Low", lat: 40.7831, lng: -73.9712 },
  { region: "West Field", disease: "Powdery Mildew", severity: "Medium", lat: 40.7506, lng: -73.9938 },
];

export default function LocalDiseaseMap() {
  return (
    <motion.div
      className="agro-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold text-agro-text-primary mb-6">
        Local Disease Map
      </h2>
      
      {/* Map Container */}
      <div className="relative h-80 bg-gradient-to-br from-green-100 to-green-200 rounded-lg overflow-hidden">
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100">
          <svg className="w-full h-full opacity-20" viewBox="0 0 400 300">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#10b981" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Disease Points */}
        {mockDiseaseData.map((point, index) => (
          <motion.div
            key={index}
            className={`absolute w-6 h-6 rounded-full border-2 border-white shadow-lg cursor-pointer ${
              point.severity === "High" 
                ? "bg-red-500" 
                : point.severity === "Medium" 
                ? "bg-yellow-500" 
                : "bg-green-500"
            }`}
            style={{
              left: `${20 + (index * 20)}%`,
              top: `${30 + (index * 15)}%`,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.2 }}
          >
            <motion.div
              className={`absolute inset-0 rounded-full ${
                point.severity === "High" 
                  ? "bg-red-500" 
                  : point.severity === "Medium" 
                  ? "bg-yellow-500" 
                  : "bg-green-500"
              }`}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, opacity: 0.6 }}
            />
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {mockDiseaseData.map((point, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
          >
            <div
              className={`w-3 h-3 rounded-full ${
                point.severity === "High" 
                  ? "bg-red-500" 
                  : point.severity === "Medium" 
                  ? "bg-yellow-500" 
                  : "bg-green-500"
              }`}
            />
            <div>
              <p className="text-xs font-medium text-agro-text-primary">
                {point.region}
              </p>
              <p className="text-xs text-agro-text-muted">
                {point.disease}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
