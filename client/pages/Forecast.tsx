import Layout from "@/components/Layout";

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
      <div className="p-6 max-w-6xl mx-auto">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-agro-text-primary">
            7-Day Forecast
          </h1>
        </div>

        {/* Weather Forecast */}
        <div className="agro-card mb-6">
          <h2 className="text-lg font-bold text-agro-text-primary mb-4">
            Weather Forecast
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-agro-text-primary mb-2">
                {mockWeatherData.current.condition}
              </h3>
              <p className="text-sm text-agro-text-muted">
                High: {mockWeatherData.current.high}, Low:{" "}
                {mockWeatherData.current.low}
              </p>
            </div>
            <div className="w-48 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center relative overflow-hidden">
              {/* Sun */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-yellow-300 rounded-full"></div>
              {/* Clouds */}
              <div className="absolute bottom-6 left-4 w-16 h-8 bg-white rounded-full opacity-80"></div>
              <div className="absolute bottom-8 left-8 w-12 h-6 bg-white rounded-full opacity-90"></div>
            </div>
          </div>
        </div>

        {/* Disease Risk Timeline */}
        <div className="agro-card mb-6">
          <h2 className="text-lg font-bold text-agro-text-primary mb-4">
            Disease Risk Timeline
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm text-agro-text-muted mb-2">
                Disease Risk
              </h3>
              <p className="text-3xl font-bold text-agro-text-primary mb-1">
                {mockWeatherData.diseaseRisk.level}
              </p>
              <p className="text-sm text-agro-text-muted mb-1">
                {mockWeatherData.diseaseRisk.timeline}
              </p>
              <p className="text-sm text-green-600">
                {mockWeatherData.diseaseRisk.change}
              </p>
            </div>
            <div className="lg:col-span-2">
              <div className="h-40 flex items-end justify-between gap-2 mb-4">
                {mockWeatherData.weeklyForecast.map((day, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div
                      className="w-8 bg-agro-primary-dark rounded-t"
                      style={{ height: `${(day.risk / 100) * 120}px` }}
                    ></div>
                    <span className="text-xs font-bold text-agro-text-muted">
                      {day.day}
                    </span>
                  </div>
                ))}
              </div>
              {/* Mock chart line */}
              <div className="relative h-24 bg-gradient-to-b from-agro-secondary to-transparent rounded">
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 280 96"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,80 Q70,20 140,40 T280,30"
                    fill="none"
                    stroke="#52946B"
                    strokeWidth="3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Preventive Actions */}
        <div className="agro-card">
          <h2 className="text-lg font-bold text-agro-text-primary mb-4">
            Preventive Actions
          </h2>
          <p className="text-agro-text-primary leading-relaxed">
            Based on the forecast and risk assessment, consider applying a
            fungicide to protect your plants from potential diseases. Ensure
            proper watering and ventilation to minimize disease development.
          </p>
        </div>
      </div>
    </Layout>
  );
}
