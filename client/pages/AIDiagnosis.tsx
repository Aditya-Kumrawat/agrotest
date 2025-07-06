import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";

const cropOptions = [
  "Tomato",
  "Potato",
  "Corn",
  "Wheat",
  "Rice",
  "Apple",
  "Citrus",
  "Soybean",
  "Cotton",
  "Pepper",
];

const mockDiagnosisResult = {
  disease: "Leaf Spot",
  description:
    "Leaf Spot is a common fungal disease affecting various plants, characterized by dark, circular lesions on leaves. It can lead to reduced photosynthesis and plant vigor.",
  treatments: {
    organic:
      "Apply neem oil or a baking soda solution to affected leaves. Ensure good air circulation and avoid overhead watering.",
    chemical:
      "Use copper-based fungicides or chlorothalonil according to label instructions.",
  },
  visualMatches: [
    "https://cdn.builder.io/api/v1/image/assets/TEMP/bfda33333079e3dd6d964f0c82311a69b7557afa?width=300",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/bfda33333079e3dd6d964f0c82311a69b7557afa?width=300",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/bfda33333079e3dd6d964f0c82311a69b7557afa?width=300",
  ],
};

export default function AIDiagnosis() {
  const [selectedCrop, setSelectedCrop] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [treatmentType, setTreatmentType] = useState<"organic" | "chemical">(
    "organic",
  );

  const handleCropSelect = (crop: string) => {
    setSelectedCrop(crop);
    setIsDropdownOpen(false);
  };

  const handleImageUpload = () => {
    // Mock image upload
    const mockImages = [
      "https://cdn.builder.io/api/v1/image/assets/TEMP/bfda33333079e3dd6d964f0c82311a69b7557afa?width=300",
    ];
    setUploadedImages(mockImages);
    setShowResults(true);
  };

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-agro-text-primary">
            AI Diagnosis
          </h1>
        </div>

        {/* Crop Selection */}
        <motion.div
          className="agro-card mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-lg font-semibold text-agro-text-primary mb-4">
            Select Crop
          </h2>
          <div className="relative">
            <motion.button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full max-w-md agro-input flex items-center justify-between"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <span className={selectedCrop ? "text-agro-text-primary" : ""}>
                {selectedCrop || "Select a crop..."}
              </span>
              <motion.svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </motion.button>
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  className="absolute top-full left-0 right-0 max-w-md bg-white border border-agro-border rounded-lg shadow-lg z-10 mt-1"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  {cropOptions.map((crop, index) => (
                    <motion.button
                      key={crop}
                      onClick={() => handleCropSelect(crop)}
                      className="w-full text-left px-4 py-3 hover:bg-agro-secondary transition-colors text-agro-text-primary"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      whileHover={{ x: 5, backgroundColor: "#f0f9ff" }}
                    >
                      {crop}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Image Upload */}
        <motion.div
          className="agro-card mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold text-agro-text-primary mb-4">
            Upload Leaf Images (1-5)
          </h2>
          <motion.div
            className="border-2 border-dashed border-agro-border rounded-lg p-12 text-center transition-all duration-300"
            whileHover={{
              borderColor: selectedCrop ? "#38E078" : "#e5e7eb",
              backgroundColor: selectedCrop ? "#f0fdf4" : "#f9fafb",
              scale: 1.01,
            }}
            whileTap={{ scale: 0.99 }}
          >
            <motion.p
              className="text-agro-text-muted mb-4"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Drag and drop or click to upload
            </motion.p>
            <motion.button
              onClick={handleImageUpload}
              className="agro-button-primary"
              disabled={!selectedCrop}
              whileHover={selectedCrop ? { scale: 1.05 } : {}}
              whileTap={selectedCrop ? { scale: 0.95 } : {}}
              animate={
                selectedCrop
                  ? { boxShadow: ["0 0 0 0 rgba(56, 224, 120, 0.7)", "0 0 0 10px rgba(56, 224, 120, 0)", "0 0 0 0 rgba(56, 224, 120, 0)"] }
                  : {}
              }
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.span
                animate={selectedCrop ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                📷
              </motion.span>{" "}
              Upload Images
            </motion.button>
          </motion.div>
          {uploadedImages.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
              {uploadedImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Uploaded leaf ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ))}
            </div>
          )}
        </div>

        {/* Diagnosis Results */}
        {showResults && (
          <>
            <div className="agro-card mb-6">
              <h2 className="text-lg font-semibold text-agro-text-primary mb-4">
                Diagnosis Results
              </h2>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-agro-text-primary mb-2">
                  Predicted Disease: {mockDiagnosisResult.disease}
                </h3>
                <p className="text-agro-text-muted">
                  {mockDiagnosisResult.description}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-agro-text-primary mb-4">
                  Treatment Suggestions
                </h3>
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setTreatmentType("organic")}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      treatmentType === "organic"
                        ? "bg-agro-primary text-agro-text-primary"
                        : "bg-agro-secondary text-agro-text-muted"
                    }`}
                  >
                    Organic
                  </button>
                  <button
                    onClick={() => setTreatmentType("chemical")}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      treatmentType === "chemical"
                        ? "bg-agro-primary text-agro-text-primary"
                        : "bg-agro-secondary text-agro-text-muted"
                    }`}
                  >
                    Chemical
                  </button>
                </div>
                <p className="text-agro-text-primary">
                  {mockDiagnosisResult.treatments[treatmentType]}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-agro-text-primary mb-4">
                  Visual Match
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mockDiagnosisResult.visualMatches.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Visual match ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button className="agro-button-primary">
                  Save Diagnosis to History
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}