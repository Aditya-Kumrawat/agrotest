import express from "express";
import { collection, addDoc, query, orderBy, getDocs, where } from "firebase/firestore";
import { db } from '../config/firebase';
import { authenticateUser, AuthenticatedRequest } from '../middleware/auth';

const router = express.Router();

router.post("/history", authenticateUser, async (req: any, res) => {
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

    const docRef = await addDoc(collection(db, "diagnosis_history"), {
      userId: req.user.id,
      crop_type,
      is_healthy,
      confidence_score,
      disease_detected,
      image_url,
      upload_date: new Date()
    });

    res.status(200).json({ message: "Saved to history", insertId: docRef.id });
  } catch (error) {
    console.error("Failed to save diagnosis:", error);
    res.status(500).json({ error: "Failed to save diagnosis" });
  }
});

// GET /api/history
router.get("/", authenticateUser, async (req: any, res) => {
  try {
    const q = query(
      collection(db, "diagnosis_history"),
      where("userId", "==", req.user.id),
      orderBy("upload_date", "desc")
    );

    const querySnapshot = await getDocs(q);
    const history = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(history);
  } catch (err) {
    console.error("Error fetching history:", err);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

export default router;