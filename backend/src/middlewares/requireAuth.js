import jwt from "jsonwebtoken";
import userSchema from "../models/User.js";

export default async function (req, res, next) {
    console.log("Require Auth")
    const { authorization } = req.headers;

    if (!authorization)
        return res.status(401).json({ error: "you must be logged in" });

    const token = authorization.replace("Bearer ", "");

    jwt.verify(token, "MY_SECRET_KEY", async (err, payload) => {
        if (err) return res.status(401).json({ error: "you must be logged in" });

        const { userId } = payload;
        
        const user = await userSchema.findById(userId);
        

        req.user = user;

        next();
    });
}
