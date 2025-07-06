import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default icons
import L from "leaflet";
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

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

// Custom marker icons
const createIcon = (severity: string) => {
  const color =
    severity === "High"
      ? "#ef4444"
      : severity === "Medium"
        ? "#f59e0b"
        : "#22c55e";

  return new Icon({
    iconUrl: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12.5" cy="12.5" r="10" fill="${color}" stroke="white" stroke-width="2"/>
        <circle cx="12.5" cy="12.5" r="4" fill="white"/>
      </svg>
    `)}`,
    iconSize: [25, 25],
    iconAnchor: [12.5, 12.5],
    popupAnchor: [0, -12.5],
  });
};

interface LocalDiseaseMapProps {
  onViewFullMap?: () => void;
}

export default function LocalDiseaseMap({
  onViewFullMap,
}: LocalDiseaseMapProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  // Default location (rural farming area in New York)
  const defaultCenter: [number, number] = [40.7589, -73.9851];

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
          className="relative h-64 rounded-lg overflow-hidden border border-agro-border"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <MapContainer
            center={defaultCenter}
            zoom={13}
            className="h-full w-full"
            zoomControl={false}
            scrollWheelZoom={false}
            style={{ borderRadius: "8px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {mockDiseaseData.map((outbreak) => (
              <Marker
                key={outbreak.id}
                position={[outbreak.lat, outbreak.lng]}
                icon={createIcon(outbreak.severity)}
                eventHandlers={{
                  click: () => setSelectedMarker(outbreak.id),
                }}
              >
                <Popup className="custom-popup">
                  <motion.div
                    className="p-3 min-w-[200px]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-agro-text-primary">
                        {outbreak.cropName}
                      </h4>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(outbreak.severity)}`}
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
                  </motion.div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Map Controls Overlay */}
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

          {/* Location Indicator */}
          <motion.div
            className="absolute bottom-3 left-3 bg-white shadow-md rounded-lg px-3 py-2 flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.div
              className="w-2 h-2 bg-blue-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs text-gray-600">Your Location</span>
          </motion.div>
        </motion.div>

        {/* Legend */}
        <motion.div
          className="mt-4 p-3 bg-agro-secondary rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <h4 className="text-sm font-semibold text-agro-text-primary mb-3">
            Risk Levels
          </h4>
          <div className="flex items-center justify-between">
            {[
              { emoji: "🟢", label: "No Risk", count: 1 },
              { emoji: "🟡", label: "Moderate Risk", count: 2 },
              { emoji: "🔴", label: "High Risk", count: 1 },
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
          className="mt-4 grid grid-cols-3 gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          {[
            {
              label: "Total Areas",
              value: mockDiseaseData.length,
              color: "bg-blue-100 text-blue-800",
            },
            {
              label: "High Risk",
              value: mockDiseaseData.filter((d) => d.severity === "High")
                .length,
              color: "bg-red-100 text-red-800",
            },
            {
              label: "Healthy",
              value: mockDiseaseData.filter((d) => d.diseaseName === "Healthy")
                .length,
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
              <div className="h-[calc(100%-80px)] rounded-lg overflow-hidden">
                <MapContainer
                  center={defaultCenter}
                  zoom={12}
                  className="h-full w-full"
                  style={{ borderRadius: "8px" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />

                  {mockDiseaseData.map((outbreak) => (
                    <Marker
                      key={outbreak.id}
                      position={[outbreak.lat, outbreak.lng]}
                      icon={createIcon(outbreak.severity)}
                    >
                      <Popup>
                        <div className="p-3 min-w-[200px]">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-agro-text-primary">
                              {outbreak.cropName}
                            </h4>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(outbreak.severity)}`}
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
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
