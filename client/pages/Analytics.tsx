import Layout from "@/components/Layout";

const mockAnalyticsData = {
  diseaseTrend: [
    { day: "1", cases: 5 },
    { day: "5", cases: 12 },
    { day: "10", cases: 8 },
    { day: "15", cases: 15 },
    { day: "20", cases: 22 },
    { day: "25", cases: 18 },
    { day: "30", cases: 10 },
  ],
  cropHealth: {
    healthy: 75,
    infected: 25,
  },
  topDiseases: [
    { name: "Disease A", count: 85 },
    { name: "Disease B", count: 65 },
    { name: "Disease C", count: 90 },
    { name: "Disease D", count: 45 },
    { name: "Disease E", count: 95 },
  ],
  scansOverTime: [
    { week: "Week 1", scans: 15 },
    { week: "Week 2", scans: 22 },
    { week: "Week 3", scans: 18 },
    { week: "Week 4", scans: 28 },
  ],
  locationInsights: [
    {
      region: "Region A",
      crops: "Tomatoes, Potatoes",
      severity: "High",
    },
    {
      region: "Region B",
      crops: "Apples, Corn",
      severity: "Medium",
    },
    {
      region: "Region C",
      crops: "Wheat, Rice",
      severity: "Low",
    },
  ],
};

export default function Analytics() {
  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-agro-text-secondary">
            Analytics
          </h1>
        </div>

        {/* Disease Trend */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-agro-text-secondary mb-2">
            Disease Trend
          </h2>
          <p className="text-agro-text-secondary mb-6">
            Track the trend of disease cases detected over the last 30 days.
          </p>
          <div className="agro-card">
            <h3 className="text-base font-medium text-agro-text-secondary mb-6">
              Disease Cases Over Time
            </h3>
            <div className="h-40 flex items-end justify-between gap-4 mb-6">
              {mockAnalyticsData.diseaseTrend.map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div
                    className="w-8 bg-agro-text-light rounded-t"
                    style={{ height: `${(item.cases / 25) * 120}px` }}
                  ></div>
                  <span className="text-xs font-bold text-agro-text-light">
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
            {/* Mock line chart */}
            <div className="relative h-24 bg-gradient-to-b from-agro-secondary to-transparent rounded">
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 280 96"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,60 Q70,20 140,45 Q210,70 280,25"
                  fill="none"
                  stroke="#6B8273"
                  strokeWidth="3"
                />
              </svg>
            </div>
          </div>
        </section>

        {/* Crop Health Breakdown */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-agro-text-secondary mb-2">
            Crop Health Breakdown
          </h2>
          <p className="text-agro-text-secondary mb-6">
            View the percentage of healthy vs. infected scans, with a breakdown
            per crop.
          </p>
          <div className="agro-card">
            <h3 className="text-base font-medium text-agro-text-secondary mb-6">
              Crop Health Percentage
            </h3>
            <div className="flex gap-8">
              <div className="flex flex-col items-center">
                <div className="w-16 h-32 bg-agro-secondary border-t-2 border-gray-400 rounded-b"></div>
                <span className="text-xs font-bold text-agro-text-light mt-2">
                  Healthy
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-32 bg-agro-secondary border-t-2 border-gray-400 rounded-b"></div>
                <span className="text-xs font-bold text-agro-text-light mt-2">
                  Infected
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Most Frequent Diseases */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-agro-text-secondary mb-2">
            Most Frequent Diseases
          </h2>
          <p className="text-agro-text-secondary mb-6">
            Discover the top 5 detected diseases and their occurrence count,
            color-coded by severity.
          </p>
          <div className="agro-card">
            <h3 className="text-base font-medium text-agro-text-secondary mb-6">
              Top 5 Diseases
            </h3>
            <div className="space-y-4">
              {mockAnalyticsData.topDiseases.map((disease, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-20 text-xs font-bold text-agro-text-light">
                    {disease.name}
                  </div>
                  <div className="flex-1 flex items-center">
                    <div
                      className="h-4 bg-agro-secondary border-r-2 border-gray-400 rounded-l"
                      style={{ width: `${disease.count}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scans Over Time */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-agro-text-secondary mb-2">
            Scans Over Time
          </h2>
          <p className="text-agro-text-secondary mb-6">
            Analyze the number of scans performed per day or week.
          </p>
          <div className="agro-card">
            <h3 className="text-base font-medium text-agro-text-secondary mb-6">
              Scans Per Day/Week
            </h3>
            <div className="flex gap-8">
              {mockAnalyticsData.scansOverTime.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-16 h-32 bg-agro-secondary border-t-2 border-gray-400 rounded-b"></div>
                  <span className="text-xs font-bold text-agro-text-light mt-2">
                    {item.week}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location Insights */}
        <section>
          <h2 className="text-xl font-bold text-agro-text-secondary mb-2">
            Location Insights
          </h2>
          <p className="text-agro-text-secondary mb-6">
            Explore the most affected regions based on scan data.
          </p>
          <div className="agro-card">
            <table className="w-full">
              <thead>
                <tr className="border-b border-agro-border">
                  <th className="text-left py-4 px-4 text-agro-text-secondary font-medium">
                    Region
                  </th>
                  <th className="text-left py-4 px-4 text-agro-text-secondary font-medium">
                    Affected Crops
                  </th>
                  <th className="text-left py-4 px-4 text-agro-text-secondary font-medium">
                    Severity
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockAnalyticsData.locationInsights.map((location, index) => (
                  <tr key={index} className="border-b border-agro-border">
                    <td className="py-4 px-4 text-agro-text-secondary">
                      {location.region}
                    </td>
                    <td className="py-4 px-4 text-agro-text-light">
                      {location.crops}
                    </td>
                    <td className="py-4 px-4">
                      <span className="bg-agro-secondary text-agro-text-secondary px-3 py-1 rounded-full text-sm font-medium">
                        {location.severity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </Layout>
  );
}
