require("dotenv").config();

import { Kafka } from "kafkajs";
import { ACTIONS, GLOBAL_CONSTANTS } from "@repo/shared";
import db from "@repo/db/client";
import { JsonObject } from "@prisma/client/runtime/library";
import { parse } from "./utils";
import { sendEmail } from "./actions.ts/email";
import { sendMessage } from "./actions.ts/message";

const kafka = new Kafka({
    clientId: "outbox-processor",
    brokers: ["localhost:9092"],
});

const main = async () => {
    const consumer = kafka.consumer({ groupId: "main-worker" });
    await consumer.connect();
    const producer = kafka.producer();
    await producer.connect();

    await consumer.subscribe({
        topic: GLOBAL_CONSTANTS.TOPIC_NAME,
        fromBeginning: true,
    });

    await consumer.run({
        autoCommit: false,
        eachMessage: async ({ topic, partition, message }) => {
            if (!message.value) return;
            const parsedValue = JSON.parse(message.value.toString());
            const zapRunId = message.value?.toString();
            const stage = parsedValue.stage;

            const zapRunDetails = await db.zapRun.findFirst({
                where: {
                    id: zapRunId,
                },
                include: {
                    zap: {
                        include: {
                            actions: {
                                include: {
                                    type: true,
                                },
                            },
                        },
                    },
                },
            });

            const currentAction = zapRunDetails?.zap.actions.find(
                (x) => x.sortingOrder === stage
            );

            if (!currentAction) return;

            if (currentAction.type.name === ACTIONS.EMAIL) {
                const zapRunMetadata = zapRunDetails?.metadata;
                const body = parse(
                    (currentAction.metadata as JsonObject)?.body as string,
                    zapRunMetadata
                );
                const to = parse(
                    (currentAction.metadata as JsonObject)?.email as string,
                    zapRunMetadata
                );
                console.log(`sending email to ${to} with body ${body}`);
                sendEmail(to, body);
            }

            if (currentAction.type.name === ACTIONS.SMS) {
                const zapRunMetadata = zapRunDetails?.metadata;
                const body = parse(
                    (currentAction.metadata as JsonObject)?.body as string,
                    zapRunMetadata
                );
                const to = parse(
                    (currentAction.metadata as JsonObject)?.email as string,
                    zapRunMetadata
                );
                console.log(`sending sms to ${to} with body ${body}`);
                sendMessage(to, body);
            }

            await new Promise((resolve) => setTimeout(resolve, 500));

            const zapId = message.value?.toString();
            const lastStage = (zapRunDetails?.zap.actions.length || 1) - 1;
            if (lastStage !== stage) {
                await producer.send({
                    topic: GLOBAL_CONSTANTS.TOPIC_NAME,
                    messages: [
                        {
                            value: JSON.stringify({
                                value: zapRunId,
                                stage: stage + 1,
                            }),
                        },
                    ],
                });
            }

            await consumer.commitOffsets([
                {
                    topic: GLOBAL_CONSTANTS.TOPIC_NAME,
                    partition: partition,
                    offset: (parseInt(message.offset) + 1).toString(),
                },
            ]);
        },
    });
};

main();
