import { Router } from "express";
import db from "@repo/db/client";

const router = Router();

router.get("/available", async (req, res) => {
    const availableTrigger = await db.availableTrigger.findMany({});
    res.status(200).json({ message: "ok", availableTrigger });
    return;
});

export const triggerRouter = router;
