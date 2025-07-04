// import http from "http";
// import app from "./app.js";

// const port = process.env.BACKEND_PORT || 3000;
// const server = http.createServer(app);
// const host = process.env.BACKEND_HOST_PORT || "127.0.0.1";

// server.listen(port, host, () => {
//   console.log(`Server is running at ${host}:${port}`);
// });

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: "http://localhost:5173", // your React app
  methods: ["GET", "POST"],
}));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log("⚡ A user connected:", socket.id);

  // emit test data
  setInterval(() => {
    socket.emit("system_stats", {
      data: {
        cpu: { percent: Math.random() * 100, cores: 8, logical_cores: 16 },
        ram: { percent: Math.random() * 100, used: 4, total: 8 },
        network: { sent_speed_mbps: 5, recv_speed_mbps: 3, bytes_sent: 1000, bytes_recv: 2000 },
      }
    });
  }, 2000);

  socket.on("disconnect", () => {
    console.log("⚠️ A user disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("✅ Socket.IO server running at http://localhost:3000");
});
