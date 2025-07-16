import { Request, Response, NextFunction } from "express";
import { adminAuth, adminDb } from "../config/firebaseAdmin";

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split("Bearer ")[1].trim();

    const decoded = await adminAuth.verifyIdToken(token);
    const uid = decoded.uid;

    const userDoc = await adminDb.collection("profiles").doc(uid).get();

    if (!userDoc.exists) {
      return res.status(401).json({ error: "User profile not found" });
    }

    req.user = {
      id: uid,
      email: decoded.email,
      name: userDoc.data()?.name || "Unknown",
      phone: userDoc.data()?.phone || null,
    };

    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
