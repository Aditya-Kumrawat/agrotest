import React, { useEffect, useRef, useState } from 'react';

interface MapPoint {
  lat: number;
  lng: number;
  name: string;
  crop: string;
  disease: string;
  severity: 'High' | 'Medium' | 'Low';
  color: string;
}

const InteractiveMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);

  const points: MapPoint[] = [
    {
      lat: 31.1471,
      lng: 75.3412,
      name: "Punjab Wheat Belt",
      crop: "Wheat",
      disease: "Rust",
      severity: "High",
      color: "#ef4444"
    },
    {
      lat: 19.7515,
      lng: 75.7139,
      name: "Maharashtra Cotton Zone",
      crop: "Cotton",
      disease: "Bollworm",
      severity: "Medium",
      color: "#f59e0b"
    },
    {
      lat: 12.9716,
      lng: 77.5946,
      name: "Karnataka Coffee Estates",
      crop: "Coffee",
      disease: "Leaf Rust",
      severity: "Low",
      color: "#10b981"
    },
    {
      lat: 11.0168,
      lng: 76.9558,
      name: "Tamil Nadu Rice Fields",
      crop: "Rice",
      disease: "Bacterial Blight",
      severity: "High",
      color: "#ef4444"
    },
    {
      lat: 22.2587,
      lng: 71.1924,
      name: "Gujarat Groundnut Farms",
      crop: "Groundnut",
      disease: "Leaf Spot",
      severity: "Medium",
      color: "#f59e0b"
    },
    {
      lat: 23.2599,
      lng: 77.4126,
      name: "Madhya Pradesh Soybean",
      crop: "Soybean",
      disease: "Pod Blight",
      severity: "High",
      color: "#ef4444"
    }
  ];

  useEffect(() => {
    // Load Leaflet CSS dynamically
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    // Load Leaflet JS dynamically
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      if (mapRef.current && !map) {
        // @ts-ignore
        const L = (window as any).L;
        
        const newMap = L.map(mapRef.current).setView([23.5937, 78.9629], 6);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(newMap);

        const newMarkers: any[] = [];
        
        points.forEach((point) => {
          const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `
              <div style="
                width: 24px;
                height: 24px;
                background-color: ${point.color};
                border: 3px solid white;
                border-radius: 50%;
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
              ">
                <div style="
                  width: 8px;
                  height: 8px;
                  background-color: white;
                  border-radius: 50%;
                "></div>
              </div>
            `,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          });

          const marker = L.marker([point.lat, point.lng], { icon: customIcon }).addTo(newMap);
          
          const popupContent = `
            <div style="padding: 12px; min-width: 200px;">
              <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold; color: #1f2937;">
                ${point.name}
              </h3>
              <div style="margin-bottom: 8px;">
                <strong>Crop:</strong> ${point.crop}
              </div>
              <div style="margin-bottom: 8px;">
                <strong>Disease:</strong> ${point.disease}
              </div>
              <div style="margin-bottom: 8px;">
                <strong>Severity:</strong> 
                <span style="
                  padding: 2px 8px;
                  border-radius: 12px;
                  font-size: 12px;
                  font-weight: bold;
                  margin-left: 8px;
                  background-color: ${point.severity === 'High' ? '#fee2e2' : 
                                   point.severity === 'Medium' ? '#fef3c7' : '#d1fae5'};
                  color: ${point.severity === 'High' ? '#dc2626' : 
                          point.severity === 'Medium' ? '#d97706' : '#059669'};
                ">
                  ${point.severity}
                </span>
              </div>
            </div>
          `;
          
          marker.bindPopup(popupContent);
          newMarkers.push(marker);
        });

        setMap(newMap);
        setMarkers(newMarkers);
      }
    };
    document.head.appendChild(script);

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [map, points]);

  return (
    <div className="h-[500px] w-full rounded-lg overflow-hidden border border-gray-200">
      <div ref={mapRef} className="h-full w-full"></div>
    </div>
  );
};

export default InteractiveMap; 