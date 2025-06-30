// Mock data for charts and analytics

export const chartColors = {
  primary: "#52946B",
  secondary: "#E8F2ED",
  accent: "#38E078",
  muted: "#6B8273",
};

export const generateMockChartData = (
  points: number,
  min: number = 0,
  max: number = 100,
) => {
  return Array.from({ length: points }, (_, i) => ({
    x: i,
    y: Math.floor(Math.random() * (max - min + 1)) + min,
  }));
};

export const weeklyLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const monthlyLabels = Array.from({ length: 30 }, (_, i) => `${i + 1}`);

export const diseaseRiskData = [
  { day: "Mon", risk: 20 },
  { day: "Tue", risk: 35 },
  { day: "Wed", risk: 45 },
  { day: "Thu", risk: 60 },
  { day: "Fri", risk: 75 },
  { day: "Sat", risk: 40 },
  { day: "Sun", risk: 25 },
];

export const cropHealthData = {
  healthy: 75,
  infected: 25,
};

export const topDiseases = [
  { name: "Disease A", count: 85, severity: "high" },
  { name: "Disease B", count: 65, severity: "medium" },
  { name: "Disease C", count: 90, severity: "high" },
  { name: "Disease D", count: 45, severity: "low" },
  { name: "Disease E", count: 95, severity: "high" },
];

export const scanHistoryData = [
  {
    id: 1,
    date: "2024-07-26",
    time: "10:30 AM",
    crop: "Tomato",
    disease: "Healthy",
    confidence: "95%",
    location: "Field A",
    action: "None",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/bfda33333079e3dd6d964f0c82311a69b7557afa?width=300",
  },
  {
    id: 2,
    date: "2024-07-25",
    time: "02:15 PM",
    crop: "Potato",
    disease: "Late Blight",
    confidence: "88%",
    location: "Field B",
    action: "Fungicide Application",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/bfda33333079e3dd6d964f0c82311a69b7557afa?width=300",
  },
  {
    id: 3,
    date: "2024-07-24",
    time: "09:45 AM",
    crop: "Corn",
    disease: "Healthy",
    confidence: "92%",
    location: "Field C",
    action: "None",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/bfda33333079e3dd6d964f0c82311a69b7557afa?width=300",
  },
];

export const weatherForecast = {
  current: {
    condition: "Sunny with a chance of showers",
    high: "25°C",
    low: "18°C",
    icon: "sunny-cloudy",
  },
  weekly: [
    { day: "Mon", high: 25, low: 18, condition: "sunny" },
    { day: "Tue", high: 27, low: 20, condition: "cloudy" },
    { day: "Wed", high: 24, low: 16, condition: "rainy" },
    { day: "Thu", high: 26, low: 19, condition: "sunny" },
    { day: "Fri", high: 23, low: 15, condition: "stormy" },
    { day: "Sat", high: 28, low: 21, condition: "sunny" },
    { day: "Sun", high: 25, low: 18, condition: "cloudy" },
  ],
};

export const locationInsights = [
  {
    region: "Region A",
    crops: "Tomatoes, Potatoes",
    severity: "High",
    affectedCount: 45,
  },
  {
    region: "Region B",
    crops: "Apples, Corn",
    severity: "Medium",
    affectedCount: 28,
  },
  {
    region: "Region C",
    crops: "Wheat, Rice",
    severity: "Low",
    affectedCount: 12,
  },
];
