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

const serverPort = process.env.serverPort || 3001
const socketPort = process.env.socketPort || 3002

mongoose.connect(process.env.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(serverPort, () => console.log(`MongoAtlas - Server Running on Port: http://localhost:${serverPort}`))
  })
  .catch((error) => {
    console.log(`${error} did not connect`)
    mongoose.connect(process.env.homeUri, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        app.listen(serverPort, () => console.log(`Home MongoServer - Server Running on Port: http://localhost:${serverPort}`))
      })
      .catch((error) => console.log(`${error} did not connect`));
  });



import { Server } from "socket.io"
const io = new Server(socketPort, {
  cors: {
    origin: "http://localhost:3000"
  }
});

io.on("connection", (socket) => {
  console.log(`Socket Running on Port: http://localhost:${socketPort} ${socket.id}`);

  socket.on("sendMessage", (data) => {
    io.emit("getMessage", data);
  });

  socket.on("deleteMessage", (data) => {
    io.emit("getDeletedMessage", data);
  });
  socket.on("updateMessage", (data) => {
    io.emit("getUpdateMessage", data);
  });
});