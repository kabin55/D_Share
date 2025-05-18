import http from "http";
import app from "./app.js";

const port = process.env.BACKEND_PORT || 3000;
const server = http.createServer(app);
const host = process.env.BACKEND_HOST_PORT || "127.0.0.1";

server.listen(port, host, () => {
  console.log(`Server is running at ${host}:${port}`);
});
