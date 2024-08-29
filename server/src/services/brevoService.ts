import dotenv from "dotenv";
import SibApiV3Sdk from "sib-api-v3-sdk";

dotenv.config();

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey: any = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();
const sender = {
  email: "dsadhwani1@gmail.com",
};

interface Receiver {
  email: string;
}

export const sendMail = async (receivers: Receiver[], date: Date) => {
  const response = await tranEmailApi.sendTransacEmail({
    sender,
    to: receivers,
    subject: "Password Reset Request",
    textContent: `
   Hello from sunshine salon,

    This email confirms your appointment at Sunshine Salon on ${date}.
    `,
  });
};
