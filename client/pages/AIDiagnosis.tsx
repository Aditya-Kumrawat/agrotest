import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";

const cropOptions = [
  "Tomato", "Potato", "Corn", "Wheat", "Rice", "Apple",
  "Citrus", "Soybean", "Cotton", "Pepper",
];

type DiagnosisResult = {
  predicted_disease: string;
  confidence_score: number;
  is_healthy: boolean;
  risk_level: "Low" | "Medium" | "High";
  recommendations: string[];
  image_url: string; // ✅ real URL from backend
};

export default function AIDiagnosis() {
  const [selectedCrop, setSelectedCrop] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCropSelect = (crop: string) => {
    setSelectedCrop(crop);
    setIsDropdownOpen(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setUploadedImages([selectedFile]);
      setPreviewImages([URL.createObjectURL(selectedFile)]);
      setDiagnosisResult(null);
      setError(null);
    }
  };

  const handleUploadAndDiagnose = async () => {
    if (!uploadedImages.length) return;
    const formData = new FormData();
    formData.append("file", uploadedImages[0]);

    try {
      const response = await fetch("http://localhost:5050/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "An error occurred");
        setDiagnosisResult(null);
        return;
      }

      setDiagnosisResult(data); // ✅ includes correct image_url
      setError(null);
    } catch (err) {
      setError("Failed to connect to ML API.");
      setDiagnosisResult(null);
    }
  };

  const handleSaveToHistory = async () => {
    if (!diagnosisResult || !selectedCrop) return;

    try {
      const saveResponse = await fetch("http://localhost:3000/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          crop_type: selectedCrop,
          is_healthy: diagnosisResult.is_healthy,
          confidence_score: diagnosisResult.confidence_score,
          disease_detected: diagnosisResult.predicted_disease,
          image_url: diagnosisResult.image_url, // ✅ Correct image URL from backend
        }),
      });

      if (!saveResponse.ok) {
        throw new Error("Failed to save to history");
      }

      alert("Diagnosis saved to history!");
    } catch (error) {
      console.error("Error saving to history:", error);
      alert("Failed to save diagnosis.");
    }
  };

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-agro-text-primary mb-8">AI Diagnosis</h1>

        {/* Crop Selection */}
        <div className="agro-card mb-6">
          <h2 className="text-lg font-semibold mb-4">Select Crop</h2>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="agro-input w-full flex justify-between items-center"
            >
              {selectedCrop || "Select a crop..."}
              <span>{isDropdownOpen ? "▲" : "▼"}</span>
            </button>
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  className="absolute z-10 bg-white border rounded w-full mt-2 shadow"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {cropOptions.map((crop) => (
                    <div
                      key={crop}
                      onClick={() => handleCropSelect(crop)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {crop}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Image Upload */}
        <div className="agro-card mb-6">
          <h2 className="text-lg font-semibold mb-4">Upload Leaf Image</h2>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button
            className="agro-button-primary mt-4"
            onClick={handleUploadAndDiagnose}
            disabled={!selectedCrop || !uploadedImages.length}
          >
            Analyze
          </button>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {previewImages.map((src, index) => (
              <img key={index} src={src} alt={`Uploaded ${index}`} className="rounded-lg" />
            ))}
          </div>
        </div>

        {/* Diagnosis Result */}
        {diagnosisResult && (
          <div className="agro-card mb-6">
            <h2 className="text-lg font-semibold mb-4">Diagnosis Results</h2>
            <p className="text-xl font-bold">
              Predicted Disease: {diagnosisResult.predicted_disease}
            </p>
            <p className="mt-2">Confidence Score: {diagnosisResult.confidence_score}%</p>
            <p>Risk Level: {diagnosisResult.risk_level}</p>
            <p>Status: {diagnosisResult.is_healthy ? "Healthy" : "Diseased"}</p>

            <h3 className="text-lg font-semibold mt-6">Recommendations</h3>
            <ul className="list-disc ml-5">
              {diagnosisResult.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>

            <div className="flex justify-end mt-6">
              <button className="agro-button-primary" onClick={handleSaveToHistory}>
                Save Diagnosis to History
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="agro-card text-red-600 bg-red-100 p-4">
            <p>{error}</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
