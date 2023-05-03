import express from 'express';
import User from "../models/User.js";
import bcrypt from 'bcrypt'

const router = express.Router();

export const tryRegister = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            login: req.body.login,
            password: hashedPassword
        });
        // const userAgain = await User.findOne({ login: req.body.login, password: hashedPassword });
        // userAgain && res.status(400).json("user already exist"); 
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
};

export const tryLogin = async (req, res) => {
    try {
        console.log(req.body.login + ", " + req.body.password);
        const user = await User.findOne({ login: req.body.login });
        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        const match = await bcrypt.compare(req.body.password, user.password)
        if(!match){
            return res.status(400).json({message: "Invalid password"})
        }
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
};


export default router;
