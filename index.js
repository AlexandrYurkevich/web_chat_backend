import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import mesRoutes from './routes/mesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(bodyParser.json({ limit: "10mb", extended:true}))
app.use(bodyParser.urlencoded({ limit: "10mb", extended:true}))
app.use(cors({origin: 'http://localhost:3000'}))
app.use('/messages', mesRoutes);
app.use('/auth', authRoutes);
app.use("/users", userRoutes);

const connection = process.env.mongoUri
const serverPort = process.env.serverPort || 3001
const socketPort = process.env.socketPort || 3002
mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(serverPort, () => console.log(`Server Running on Port: http://localhost:${serverPort}`))
  })
  .catch((error) => console.log(`${error} did not connect`));


// import { createServer } from "http";
// const httpServer = createServer();
// import { Server } from "socket.io"
// const io = new Server(httpServer, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"]
//   }
// });

import { Server } from "socket.io"
const io = new Server(socketPort, {
  cors: {
    origin: "http://localhost:3000"
  }
});
//httpServer.listen(3002, () => console.log(`Socket Running on Port: http://localhost:${3002}`))
io.on("connection", (socket) => {
  console.log(`Socket Running on Port: http://localhost:${socketPort} ${socket.id}`);

  socket.on("sendMessage", (data) => {
    io.emit("getMessage", data);
  });
});