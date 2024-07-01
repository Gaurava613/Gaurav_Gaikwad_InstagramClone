//protectedRoute.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userModel from '../models/userModel.js';

dotenv.config()

const protectedRouter = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: "Login Required" });
    }

    const tokenValue = authorization.replace("Bearer ", "");
    jwt.verify(tokenValue, process.env.JWT_SECRET, async (error, payload) => {
        if (error) {
            return res.status(401).json({ message: "Login Required" });
        }

        const { _id } = payload;
        try {
            const user = await userModel.findById(_id);
            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }
            req.userData = user;
            console.log("User authenticated:", req.userData);  // Log authenticated user data
            next();
        } catch (err) {
            res.status(401).json({ message: "User not found" });
        }
    });
}

export default protectedRouter;
