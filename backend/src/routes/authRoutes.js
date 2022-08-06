import express from "express";
import userSchema from "../models/User.js";
import jwt from 'jsonwebtoken'

const router = express.Router();

router.post("/signup", async (req, res) => {
    console.log("Triggerd")
    try {
        const { email, password } = req.body;
        const user = new userSchema({ email, password });
        await user.save();
        const token = jwt.sign({userId : user._id}, "MY_SECRET_KEY")
        res.status(200).json({token})
    } catch (err) {
        res.status(422).json({ status: 422, message: err.message });
    }
});

router.post("/signin", async (req,res)=>{
    const {email, password} = req.body
    if(!email ||!password) return res.status(422).json({message: "You Must Provide Email and Password"})

    const user = await userSchema.findOne({email})
    if(!user)return res.status(404).json({message: "Invalid password or email1"})

    try{
        await user.comparePassword(password)
        const token = jwt.sign({userId:user._id},"MY_SECRET_KEY" )
        res.status(200).json({token})
    }catch(err){
        return res.status(401).json({message: "Invalid password or email"})
    }
})

export default router;
