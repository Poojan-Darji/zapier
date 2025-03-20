import db from "@repo/db/client";
import { Kafka } from "kafkajs";
import { GLOBAL_CONSTANTS } from "@repo/shared";

const kafka = new Kafka({
    clientId: "outbox-processor",
    brokers: ["localhost:9092"],
});

const main = async () => {
    const producer = kafka.producer();
    await producer.connect();

    while (1) {
        const pendingRows = await db.zapRunOutbox.findMany({
            where: {},
            take: 10,
        });

        producer.send({
            topic: GLOBAL_CONSTANTS.TOPIC_NAME,
            messages: pendingRows.map((row) => {
                return {
                    value: JSON.stringify({ value: row.zapRunId, stage: 0 }),
                };
            }),
        });

        await db.zapRunOutbox.deleteMany({
            where: {
                id: {
                    in: pendingRows.map((row) => row.id),
                },
            },
        });
    }
};

main();
