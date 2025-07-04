const express = require("express");
const cors = require("cors");
const path = require("path");
const { MongoClient } = require("mongodb");

require("dotenv").config();

const app = express();
app.use(cors());

// ✅ SERVE static files from public folder inside backend
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017";
const DB_NAME = process.env.DB_NAME || "dshare-db";
const COLLECTION_NAME = process.env.COLLECTION_NAME || "fileactivities";

const weights = { download: 2, search: 1, upload: 0 };

async function getPopularFiles() {
  const client = new MongoClient(MONGO_URL);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const activities = await collection
      .find({
        timestamp: { $gte: sevenDaysAgo.toISOString() },
      })
      .toArray();

    const scoresMap = {};
    activities.forEach(({ file_name, action }) => {
      const score = weights[action] || 0;
      scoresMap[file_name] = (scoresMap[file_name] || 0) + score;
    });

    return Object.entries(scoresMap)
      .map(([file_name, score]) => ({ file_name, score }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  } finally {
    await client.close();
  }
}

// Optional API (if frontend wants JSON, not HTML)
app.get("/api/popular_files", async (req, res) => {
  try {
    const data = await getPopularFiles();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load popular files" });
  }
});

// ✅ Route to serve the interactive Plotly HTML (OPTIONAL)
app.get("/popularity-graph", (req, res) => {
  const filePath = path.join(
    __dirname,
    "public",
    "popular_files_interactive.html"
  );
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending HTML file:", err);
      res.status(500).send("Error loading graph");
    }
  });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});

console.log("Serving static files from:", path.join(__dirname, "public"));
