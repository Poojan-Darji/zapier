import { Kafka } from "kafkajs";
import { GLOBAL_CONSTANTS } from "@repo/shared";

const kafka = new Kafka({
    clientId: "outbox-processor",
    brokers: ["localhost:9092"],
});

const main = async () => {
    const consumer = kafka.consumer({ groupId: "main-worker" });
    await consumer.connect();

    await consumer.subscribe({
        topic: GLOBAL_CONSTANTS.TOPIC_NAME,
        fromBeginning: true,
    });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await consumer.commitOffsets([
                {
                    topic: GLOBAL_CONSTANTS.TOPIC_NAME,
                    partition,
                    offset: (parseInt(message.offset) + 1).toString(),
                },
            ]);
        },
    });
};

main();
