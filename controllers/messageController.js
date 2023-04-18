import Message from "../models/Message.js";
import express from 'express';

const router = express.Router();

export const getMessages = async (req,res)=>{
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    }
    catch (error) {
        console.log(error.message)
        res.status(404).json({ message: error.message })
    }
}

export const sendMessage = async (req,res)=>{
    const { sender, text, sended } = req.body;
    const newMessage = new Message({ sender, text, sended })
    try {
        await newMessage.save()
        res.status(201).json(newMessage);
    } catch (error) { console.log(error.message) }
}

export default router;
