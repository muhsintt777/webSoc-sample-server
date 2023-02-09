import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: "*",
  methods: ["GET", "POST"],
});

io.on("connection", (socket) => {
  console.log(`user conn ${socket.id}`);

  socket.on("leave_room", (data) => {
    socket.leave(data.room);
  });

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

server.listen(3500, () => {
  console.log("Server is running on port 3500");
});
