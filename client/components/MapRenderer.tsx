import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

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

interface MapRendererProps {
  diseaseData: DiseaseOutbreak[];
  isFullScreen?: boolean;
}

export function MapRenderer({
  diseaseData,
  isFullScreen = false,
}: MapRendererProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Dynamically import Leaflet only on client side
    const initMap = async () => {
      try {
        const L = await import("leaflet");
        await import("leaflet/dist/leaflet.css");

        // Fix Leaflet default markers
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
          iconUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        });

        // Initialize map
        const map = L.map(mapRef.current!, {
          center: [40.7589, -73.9851],
          zoom: isFullScreen ? 12 : 13,
          zoomControl: true,
          scrollWheelZoom: !isFullScreen,
        });

        // Add tile layer
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Create custom icons
        const createIcon = (severity: string) => {
          const color =
            severity === "High"
              ? "#ef4444"
              : severity === "Medium"
                ? "#f59e0b"
                : "#22c55e";

          return L.divIcon({
            html: `
              <div style="
                width: 20px; 
                height: 20px; 
                background-color: ${color}; 
                border: 2px solid white; 
                border-radius: 50%; 
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <div style="
                  width: 6px; 
                  height: 6px; 
                  background-color: white; 
                  border-radius: 50%;
                "></div>
              </div>
            `,
            className: "custom-div-icon",
            iconSize: [20, 20],
            iconAnchor: [10, 10],
          });
        };

        // Add markers for disease outbreaks
        diseaseData.forEach((outbreak) => {
          const marker = L.marker([outbreak.lat, outbreak.lng], {
            icon: createIcon(outbreak.severity),
          }).addTo(map);

          const getSeverityColor = (severity: string) => {
            switch (severity) {
              case "High":
                return "color: #dc2626; background-color: #fef2f2;";
              case "Medium":
                return "color: #d97706; background-color: #fffbeb;";
              case "Low":
                return "color: #16a34a; background-color: #f0fdf4;";
              default:
                return "color: #6b7280; background-color: #f9fafb;";
            }
          };

          const formatDate = (dateString: string) => {
            return new Date(dateString).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });
          };

          const popupContent = `
            <div style="padding: 12px; min-width: 200px; font-family: 'Lexend', sans-serif;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                <h4 style="margin: 0; font-weight: 600; color: #0f172a;">${outbreak.cropName}</h4>
                <span style="padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: 500; ${getSeverityColor(outbreak.severity)}">${outbreak.severity}</span>
              </div>
              <div style="font-size: 14px; color: #64748b; line-height: 1.4;">
                <p style="margin: 4px 0;"><strong>Disease:</strong> ${outbreak.diseaseName}</p>
                <p style="margin: 4px 0;"><strong>Location:</strong> ${outbreak.affectedArea}</p>
                <p style="margin: 4px 0;"><strong>Detected:</strong> ${formatDate(outbreak.dateDetected)}</p>
              </div>
              <button style="
                margin-top: 12px; 
                width: 100%; 
                padding: 6px 12px; 
                background-color: #38e078; 
                color: white; 
                border: none; 
                border-radius: 6px; 
                font-size: 12px; 
                cursor: pointer;
                transition: background-color 0.2s;
              " onmouseover="this.style.backgroundColor='#22c55e'" onmouseout="this.style.backgroundColor='#38e078'">
                View Details
              </button>
            </div>
          `;

          marker.bindPopup(popupContent, {
            maxWidth: 300,
            className: "custom-popup",
          });
        });

        // Add user location marker
        const userLocationIcon = L.divIcon({
          html: `
            <div style="
              width: 12px; 
              height: 12px; 
              background-color: #3b82f6; 
              border: 2px solid white; 
              border-radius: 50%; 
              box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
              animation: pulse 2s infinite;
            "></div>
            <style>
              @keyframes pulse {
                0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
                70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
                100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
              }
            </style>
          `,
          className: "user-location-icon",
          iconSize: [12, 12],
          iconAnchor: [6, 6],
        });

        L.marker([40.7589, -73.9851], { icon: userLocationIcon })
          .addTo(map)
          .bindPopup("Your Location");

        mapInstanceRef.current = map;
      } catch (error) {
        console.error("Failed to load map:", error);
      }
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [diseaseData, isFullScreen]);

  return (
    <motion.div
      ref={mapRef}
      className={`rounded-lg overflow-hidden border border-agro-border ${
        isFullScreen ? "h-full" : "h-64"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ minHeight: isFullScreen ? "500px" : "256px" }}
    />
  );
}
