import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware";
import { signinSchema, signupSchema } from "../types";
import db from "@repo/db/client";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
    const body = req.body;
    const parsedBody = signupSchema.safeParse(body);
    if (!parsedBody.success) {
        res.status(411).json({ message: "incorrect input" });
        return;
    }

    const userExists = await db.user.findFirst({
        where: {
            email: parsedBody.data.username,
        },
    });
    if (userExists) {
        res.status(403).json({ message: "user already exists" });
        return;
    }

    const user = await db.user.create({
        data: {
            email: parsedBody.data.username,
            // TODO: hash the password
            password: parsedBody.data.password,
            name: parsedBody.data.name,
        },
    });
    res.status(200).json({ message: "ok", user });
    return;
});

router.post("/signin", async (req: Request, res: Response) => {
    const body = req.body;
    const parsedBody = signinSchema.safeParse(body);
    if (!parsedBody.success) {
        res.status(411).json({ message: "incorrect input" });
        return;
    }

    const user = await db.user.findFirst({
        where: {
            email: parsedBody.data.username,
            password: parsedBody.data.password,
        },
    });

    if (!user) {
        res.status(403).json({ message: "user not found" });
        return;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY as string);

    res.status(200).json({ message: "ok", token });
    return;
});

router.get("/user", authMiddleware, async (req: Request, res: Response) => {
    const id = req.id;

    const user = await db.user.findFirst({
        where: {
            id,
        },
        select: {
            name: true,
            email: true,
        },
    });

    res.status(200).json({ message: "ok", user });
    return;
});

export const userRouter = router;
