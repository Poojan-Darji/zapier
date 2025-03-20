import sgMail from "@sendgrid/mail";
import { MAIL_HOST } from "../constants";

export const sendEmail = (to: string, body: string) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

    const msg = {
        to: to,
        from: MAIL_HOST,
        subject: "Turbo Zap",
        text: body,
    };

    sgMail
        .send(msg)
        .then((res) => {
            console.log(res[0].statusCode);
            console.log(res[0].headers);
        })
        .catch((error) => {
            console.error(error);
        });
};
