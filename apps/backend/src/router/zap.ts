import { Router } from "express";
import { authMiddleware } from "../middleware";
import { zapCreateSchema } from "../types";
import db from "@repo/db/client";

const router = Router();

router.post("/", authMiddleware, async (req, res) => {
    const id = req.id;
    const body = req.body;
    const parsedBody = zapCreateSchema.safeParse(body);
    if (!parsedBody.success) {
        res.status(411).json({ message: "incorrect input" });
        return;
    }

    await db.$transaction(async (tx) => {
        const zap = await tx.zap.create({
            data: {
                userId: id,
                triggerId: "",
                actions: {
                    create: parsedBody.data.actions.map((x, idx) => ({
                        actionId: x.availableActionId,
                        sortingOrder: idx,
                    })),
                },
            },
        });

        const trigger = await tx.trigger.create({
            data: {
                zapId: zap.id,
                triggerId: parsedBody.data.availableTriggerId,
            },
        });

        await tx.zap.update({
            where: {
                id: zap.id,
            },
            data: {
                triggerId: trigger.triggerId,
            },
        });
    });
});

router.get("/", authMiddleware, async (req, res) => {
    const id = req.id;
    const zaps = await db.zap.findMany({
        where: {
            userId: id,
        },
        include: {
            actions: {
                include: {
                    type: true,
                },
            },
            trigger: {
                include: {
                    type: true,
                },
            },
        },
    });

    res.status(200).json({ message: "ok", zaps });
    return;
});

router.get("/:zapId", authMiddleware, async (req, res) => {
    const id = req.id;
    const zapId = req.params.zapId;

    const zap = await db.zap.findFirst({
        where: {
            id: zapId,
            userId: id,
        },
        include: {
            actions: {
                include: {
                    type: true,
                },
            },
            trigger: {
                include: {
                    type: true,
                },
            },
        },
    });

    res.status(200).json({
        message: "ok",
        zap,
    });
    return;
});

export const zapRouter = router;
