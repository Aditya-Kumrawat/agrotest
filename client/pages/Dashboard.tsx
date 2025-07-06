import Layout from "@/components/Layout";
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
      <div className="p-6 space-y-6">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-agro-text-primary">
            Dashboard
          </h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="agro-card">
            <h3 className="text-sm text-agro-text-muted mb-2">Tracked Crops</h3>
            <p className="text-3xl font-bold text-agro-text-primary">
              {mockData.trackedCrops}
            </p>
          </div>
          <div className="agro-card">
            <h3 className="text-sm text-agro-text-muted mb-2">
              Current Disease Risk
            </h3>
            <p className="text-2xl font-bold text-agro-text-primary mb-1">
              {mockData.diseaseRisk}
            </p>
          </div>
          <div className="agro-card">
            <h3 className="text-sm text-agro-text-muted mb-2">Quick Scan</h3>
            <button className="agro-button-primary w-full">Scan Now</button>
          </div>
          <div className="agro-card">
            <h3 className="text-sm text-agro-text-muted mb-2">
              Disease Trends
            </h3>
            <p className="text-lg font-semibold text-agro-text-primary">
              Mini Graph
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Intelligence Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="agro-card">
              <h2 className="text-xl font-bold text-agro-text-primary mb-6">
                AI Intelligence
              </h2>

              <div className="space-y-6">
                {/* Last Scan Result */}
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-agro-text-primary mb-2">
                      Last Scan Result
                    </h3>
                    <p className="text-sm text-agro-text-muted mb-1">
                      Crop: {mockData.lastScanResult.crop}
                    </p>
                    <p className="text-sm text-agro-text-muted mb-1">
                      Condition: {mockData.lastScanResult.condition}
                    </p>
                    <p className="text-sm text-agro-text-muted mb-1">
                      Confidence Score: {mockData.lastScanResult.confidence}
                    </p>
                    <p className="text-sm text-agro-text-muted mb-3">
                      Treatment: {mockData.lastScanResult.treatment}
                    </p>
                    <button className="text-sm text-agro-primary hover:underline">
                      View Details
                    </button>
                  </div>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/bfda33333079e3dd6d964f0c82311a69b7557afa?width=606"
                    alt="Plant scan"
                    className="w-32 h-20 object-cover rounded-lg"
                  />
                </div>

                {/* Upcoming Threat Predictions */}
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-agro-text-primary mb-2">
                      Upcoming Threat Predictions
                    </h3>
                    <p className="text-sm text-agro-text-muted mb-1">
                      {mockData.upcomingThreat.prediction}
                    </p>
                    <p className="text-sm text-agro-text-muted mb-1">
                      Risk Level: {mockData.upcomingThreat.risk}
                    </p>
                    <p className="text-sm text-agro-text-muted mb-3">
                      {mockData.upcomingThreat.timeline}
                    </p>
                    <button className="text-sm text-agro-primary hover:underline">
                      View Details
                    </button>
                  </div>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/bfda33333079e3dd6d964f0c82311a69b7557afa?width=606"
                    alt="Threat prediction"
                    className="w-32 h-20 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Recent Diagnosis History */}
            <div className="agro-card">
              <h2 className="text-xl font-bold text-agro-text-primary mb-6">
                Recent Diagnosis History
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-agro-border">
                      <th className="text-left py-3 text-agro-text-muted">
                        Date
                      </th>
                      <th className="text-left py-3 text-agro-text-muted">
                        Time
                      </th>
                      <th className="text-left py-3 text-agro-text-muted">
                        Disease Detected
                      </th>
                      <th className="text-left py-3 text-agro-text-muted">
                        Action Taken
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockData.recentHistory.map((item, index) => (
                      <tr key={index} className="border-b border-agro-border">
                        <td className="py-3 text-agro-text-primary">
                          {item.date}
                        </td>
                        <td className="py-3 text-agro-text-primary">
                          {item.time}
                        </td>
                        <td className="py-3 text-agro-text-primary">
                          {item.disease}
                        </td>
                        <td className="py-3 text-agro-text-primary">
                          {item.action}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className="text-sm text-agro-primary hover:underline mt-4">
                  View Full History
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="space-y-6">
            {/* Crop Calendar */}
            <div className="agro-card">
              <h3 className="font-semibold text-agro-text-primary mb-4">
                Crop Calendar
              </h3>
              <div className="space-y-4">
                {mockData.cropCalendar.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        item.status === "active"
                          ? "bg-agro-primary"
                          : item.status === "upcoming"
                            ? "bg-yellow-400"
                            : "bg-gray-300"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-medium text-agro-text-primary">
                        {item.stage}
                      </p>
                      <p className="text-xs text-agro-text-muted">
                        {item.crop}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Local Disease Map */}
            <div className="agro-card">
              <h3 className="font-semibold text-agro-text-primary mb-4">
                Local Disease Map
              </h3>
              <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-agro-text-muted">Map View</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="agro-card">
              <h3 className="font-semibold text-agro-text-primary mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full agro-button-primary text-sm">
                  Upload New Scan
                </button>
                <div className="flex gap-2">
                  <button className="flex-1 agro-button-secondary text-xs">
                    View Remedies
                  </button>
                  <button className="flex-1 agro-button-secondary text-xs">
                    Add New Crop
                  </button>
                </div>
                <button className="w-full agro-button-secondary text-sm">
                  Join Community
                </button>
              </div>
            </div>

            {/* Health Graph Timeline */}
            <div className="agro-card">
              <h3 className="font-semibold text-agro-text-primary mb-4">
                Health Graph / Timeline View
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-agro-text-primary">
                    {mockData.healthStats.diseasesDetected}
                  </p>
                  <p className="text-xs text-agro-text-muted">
                    Diseases Detected per Week
                  </p>
                  <p className="text-xs text-green-600">
                    This Week: {mockData.healthStats.weeklyChange}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-agro-text-primary">
                    {mockData.healthStats.fieldHealthScore}%
                  </p>
                  <p className="text-xs text-agro-text-muted">
                    Field Health Score
                  </p>
                  <p className="text-xs text-red-600">
                    This Month: {mockData.healthStats.monthlyChange}
                  </p>
                </div>
              </div>
              <div className="h-24 w-full bg-gray-100 rounded flex items-center justify-center">
                <p className="text-xs text-agro-text-muted">Graph Timeline</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
