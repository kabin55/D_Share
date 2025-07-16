// routes/activityRoute.js
import express from "express";
import File from "../models/fileModel.js";

const router = express.Router();

router.get("/recent", async (req, res) => {
  try {
    const recentFiles = await File.find({})
      .sort({ createdAt: -1 })
      .limit(6)
      .select("filename username createdAt type");

    res.json(recentFiles);
  } catch (err) {
    console.error("Error fetching recent activity:", err);
    res.status(500).json({ error: "Failed to fetch recent activity" });
  }
});

export default router;
