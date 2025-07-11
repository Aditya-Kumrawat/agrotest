// routes/history.js or inside your main server.js/app.js file
const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust if you use another file for DB connection

router.get('/history', async (req, res) => {
  try {
    const query = `
      SELECT 
        crop_scans.id,
        crop_type,
        is_healthy,
        confidence_score,
        upload_date,
        disease_detected,
        field_location,
        action_taken,
        image_url
      FROM crop_scans
      ORDER BY upload_date DESC
      LIMIT 50;
    `;

    const [results] = await db.execute(query);

    const formattedResults = results.map(scan => ({
      id: scan.id,
      title: `Leaf Scan - ${scan.is_healthy ? "Healthy" : "Diseased"}`,
      date: new Date(scan.upload_date).toLocaleString(),
      crop: scan.crop_type,
      disease: scan.is_healthy ? "Healthy" : scan.disease_detected,
      confidence: `${scan.confidence_score}%`,
      location: scan.field_location || "Unknown Field",
      action: scan.action_taken || "None",
      image: scan.image_url,
    }));

    res.json({ success: true, data: formattedResults });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch history" });
  }
});

module.exports = router;
