import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const PORT = 8003;

app.use(
  cors({
    origin: "*", // Allow any origin
  })
);

const io = new Server(server, {
  cors: {
    origin: "*", // Allow any origin for Socket.IO
  },
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("message", (message) => {
    //From frontend socket.emit is coming here on socket.on
    io.emit("message", message); // Broadcast the message to everyone
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(8003, () => {
  console.log("Server is running on port", PORT);
});
