import express from "express";
import File from "../models/fileModel.js";

const router = express.Router();

/**
 * @route GET /api/popularity/all-types
 * @desc Get all file types with their upload counts (real-time)
 */
router.get("/all-types", async (req, res) => {
  try {
    const results = await File.aggregate([
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $project: {
          _id: 0,
          type: "$_id",
          count: 1,
        },
      },
    ]);

    res.json(results);
  } catch (err) {
    console.error("Error fetching file type stats:", err);
    res.status(500).json({ error: "Failed to fetch file type statistics" });
  }
});

export default router;
