import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

export const initSocket = () => {
  const socket = io(SOCKET_URL, {
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
  });

  return socket;
};
