import { useState } from "react";
import Layout from "@/components/Layout";

const filterOptions = {
  status: ["All", "Healthy", "Diseased"],
  crop: ["All", "Tomato", "Potato", "Corn", "Wheat"],
  date: ["All", "Latest", "This Week", "This Month"],
};

const mockScanHistory = [
  {
    id: 1,
    title: "Leaf Scan - Healthy",
    date: "2024-07-26 10:30 AM",
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
    title: "Leaf Scan - Diseased",
    date: "2024-07-25 02:15 PM",
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
    title: "Leaf Scan - Healthy",
    date: "2024-07-24 09:45 AM",
    crop: "Corn",
    disease: "Healthy",
    confidence: "92%",
    location: "Field C",
    action: "None",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/bfda33333079e3dd6d964f0c82311a69b7557afa?width=300",
  },
];

const summaryData = {
  totalScans: 3,
  diseasesDetected: 1,
  mostCommonDisease: "Late Blight",
  lastScanDate: "2024-07-26",
};

export default function History() {
  const [filters, setFilters] = useState({
    status: "All",
    crop: "All",
    date: "All",
  });
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const handleFilterChange = (
    filterType: keyof typeof filters,
    value: string,
  ) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
    setDropdownOpen(null);
  };

  const toggleDropdown = (filterType: string) => {
    setDropdownOpen(dropdownOpen === filterType ? null : filterType);
  };

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-agro-text-secondary">
            My Crop Scans
          </h1>
          <p className="text-agro-text-muted mt-2">
            View all your previous crop diagnoses and actions taken.
          </p>
        </div>

        {/* Filters */}
        <div className="agro-card mb-6">
          <h2 className="text-lg font-semibold text-agro-text-primary mb-4">
            Filters
          </h2>
          <div className="flex flex-wrap gap-4">
            {Object.entries(filterOptions).map(([filterType, options]) => (
              <div key={filterType} className="relative">
                <button
                  onClick={() => toggleDropdown(filterType)}
                  className="agro-input min-w-32 flex items-center justify-between gap-2"
                >
                  <span className="capitalize">
                    {filters[filterType as keyof typeof filters]}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      dropdownOpen === filterType ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {dropdownOpen === filterType && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-agro-border rounded-lg shadow-lg z-10 mt-1">
                    {options.map((option) => (
                      <button
                        key={option}
                        onClick={() =>
                          handleFilterChange(
                            filterType as keyof typeof filters,
                            option,
                          )
                        }
                        className="w-full text-left px-4 py-2 hover:bg-agro-secondary transition-colors text-agro-text-primary"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Scan History */}
        <div className="agro-card mb-6">
          <h2 className="text-lg font-semibold text-agro-text-primary mb-6">
            Scan History
          </h2>
          <div className="space-y-6">
            {mockScanHistory.map((scan) => (
              <div
                key={scan.id}
                className="flex items-start gap-6 p-4 border border-agro-border rounded-lg"
              >
                <img
                  src={scan.image}
                  alt={scan.title}
                  className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-agro-text-primary mb-2">
                    {scan.title}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-agro-text-muted">
                    <p>Date: {scan.date}</p>
                    <p>Crop: {scan.crop}</p>
                    <p>
                      Disease: {scan.disease} (Confidence: {scan.confidence})
                    </p>
                    <p>Location: {scan.location}</p>
                    <p>Action Taken: {scan.action}</p>
                  </div>
                  <button className="text-sm text-agro-primary hover:underline mt-3">
                    Re-Scan ↻
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="agro-card">
          <h2 className="text-lg font-semibold text-agro-text-primary mb-6">
            Summary
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-agro-text-primary">
                {summaryData.totalScans}
              </p>
              <p className="text-sm text-agro-text-muted">Total Scans</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-agro-text-primary">
                {summaryData.diseasesDetected}
              </p>
              <p className="text-sm text-agro-text-muted">Diseases Detected</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-agro-text-primary">
                {summaryData.mostCommonDisease}
              </p>
              <p className="text-sm text-agro-text-muted">
                Most Common Disease
              </p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-agro-text-primary">
                {summaryData.lastScanDate}
              </p>
              <p className="text-sm text-agro-text-muted">Last Scan Date</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
