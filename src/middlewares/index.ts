import express from "express";
import jwt, {Secret} from "jsonwebtoken";
import process from "process";

export const verifyToken = (req: express.Request, res: any, next: express.NextFunction) => {
    console.log('verify token');
    const token = req.headers.authorization;
    if (!token) return res.status(401).json('Invalid token')
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET as Secret);
        res.tokenData = data;
        next();
    } catch (error) {
        console.log('invalid token');
        return res.status(401).json('Invalid token')
    }
}