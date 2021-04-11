import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UserModel from '../models/user.js';

const secret = 'test';

export const signin = async(req, res)=> {
    console.log("Signin route called", req.body);
    const { username, password} = req.body;
    try{
        const oldUser = await UserModel.findOne({ username });
        if(!oldUser) return res.status(400).json({ message: "User doesn't exist"});

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid password"});

        const token = jwt.sign({ username: oldUser.username, id: oldUser._id}, secret, {expiresIn: "1h"});

        res.status(200).json({result: oldUser, token});
    }catch (error){
        res.status(500).json({ message: "Something went wrong"});
    }
}


export const signup = async (req, res)=> {
    console.log("Signup route called");
    console.log(req.body);
    const { firstname, lastname, username, password, role} = req.body;

    try{
        const checkUser = await UserModel.findOne({username});
        if(checkUser) return res.status(400).json({message: "User already exists"});
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await UserModel.create({firstname, lastname, username, password : hashedPassword, role});
        const token = jwt.sign({ username: result.username, id: result._id}, secret, { expiresIn: "1h"});
        
        res.status(201).json({result, token});
    }catch (error){
        res.status(500).json({ message: "Something went wrong"});
        console.log(error);
    }
}