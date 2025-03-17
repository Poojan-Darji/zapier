import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({ message: "unauthorized" });
        return;
    }

    try {
        const payload = jwt.verify(
            token,
            process.env.JWT_KEY as string
        ) as JwtPayload;

        req.id = payload.id;
        next();
    } catch (error) {
        res.status(403).json({ message: "unauthorized" });
        return;
    }
};
