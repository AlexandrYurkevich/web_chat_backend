import express from 'express';
import User from "../models/User.js";
import bcrypt from 'bcrypt'

const router = express.Router();

export const tryRegister = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            login: req.body.login,
            password: hashedPassword
        });
        const userAgain = await User.findOne({ login: req.body.login, password: hashedPassword });
        userAgain && res.status(400).json("user already exist"); 
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
};

export const tryLogin = async (req, res) => {
    try {
        const user = await User.findOne({ login: req.body.login, password: req.body.password });
        !user && res.status(404).json("user not found");  
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
};


export default router;
