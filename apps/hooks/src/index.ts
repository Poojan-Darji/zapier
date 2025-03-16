import express from "express";
import db from "@repo/db/client";

const app = express();

app.use(express.json());

app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
    const { userId, zapId } = req.params;
    const { body } = req;
    await db.$transaction(async (tx) => {
        const run = await tx.zapRun.create({
            data: {
                zapId,
                metadata: body,
            },
        });
        await tx.zapRunOutbox.create({
            data: {
                zapRunId: run.id,
            },
        });
    });
    res.status(200).json({ message: "ok" });
});

app.listen(3000, () => {
    console.log("hooks listening on port 3000");
});
