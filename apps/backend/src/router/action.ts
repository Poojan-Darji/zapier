import { Router } from "express";
import db from "@repo/db/client";

const router = Router();

router.get("/available", async (req, res) => {
    const availableAction = await db.availableAction.findMany({});
    res.status(200).json({ message: "ok", availableAction });
    return;
});

export const actionRouter = router;
