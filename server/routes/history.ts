import express from "express";
import pool from "../config/mysql"; 

const router = express.Router();

router.post("/history", async (req, res) => {
  try {
    const {
      crop_type,
      is_healthy,
      confidence_score,
      disease_detected,
      image_url
    } = req.body;

    if (!crop_type || confidence_score === undefined || !disease_detected || !image_url) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const [result] = await pool.query(
      "INSERT INTO diagnosis_history (crop_type, is_healthy, confidence_score, disease_detected, image_url, upload_date) VALUES (?, ?, ?, ?, ?, NOW())",
      [crop_type, is_healthy, confidence_score, disease_detected, image_url]
    );

    res.status(200).json({ message: "Saved to history", insertId: (result as any).insertId });
  } catch (error) {
    console.error("Failed to save diagnosis:", error);
    res.status(500).json({ error: "Failed to save diagnosis" });
  }
});

// GET /api/history
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM scan_history ORDER BY upload_date DESC");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching history:", err);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

export default router;