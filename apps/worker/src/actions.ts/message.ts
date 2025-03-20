import { MESSAGE_HOST } from "../constants";

const twilio = require("twilio");

export async function sendMessage(to: string, body: string) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    await client.messages.create({
        body: body,
        from: MESSAGE_HOST,
        to: to,
    });
}
