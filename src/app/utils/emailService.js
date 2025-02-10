import appConfig from "@/config";
const FormData = require("form-data");
const MailgunSDK = require("mailgun.js");

let mailClient = null;

const getMailgunClient = () => {
  if (!mailClient) {
    const mailService = new MailgunSDK(FormData);
    mailClient = mailService.client({
      username: "api",
      key: process.env.MAILGUN_API_KEY || "key-yourkeyhere",
    });

    console.log("🚀 Mailgun instance created & cached");
  }
  return mailClient;
};

if (!process.env.MAILGUN_API_KEY && process.env.NODE_ENV === "development") {
  console.log("⚠️ Missing MAILGUN_API_KEY in .env");
}

export const sendMail = async ({
  recipient,
  emailSubject,
  plainText,
  htmlContent,
  replyEmail,
}) => {
  try {
    const mg = getMailgunClient();

    const emailData = {
      from: appConfig.mailgun.senderEmail,
      to: [recipient],
      subject: emailSubject,
      text: plainText,
      html: htmlContent,
      ...(replyEmail && { "h:Reply-To": replyEmail }),
    };

    await mg.messages.create(
      (appConfig.mailgun.subdomain ? `${appConfig.mailgun.subdomain}.` : "") +
        appConfig.domainName,
      emailData
    );

    console.log(`📧 Email sent to ${recipient} successfully!`);
  } catch (error) {
    console.error("❌ Failed to send email:", error.message);
    throw new Error("Error while sending email. Please check your configuration.");
  }
};
