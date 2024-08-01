const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
// require('dotenv').config();

const ses_config = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.ACCESS_REGION,
};

const sesClient = new SESClient(ses_config);

export async function sendVerificationEmail(email, token) {
  const verificationLink = `${process.env.NEXTAUTH_URL}/api/verifyresetpass/?token=${token}`;
  const params = {
    Source: process.env.SES_EMAIL_SOURCE,
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Subject: {
        Data: "Change The Password",
      },
      Body: {
        Html: {
          Data: `
            <html>
              <head></head>
              <body>
                <p>Click the following link to verify your email address:</p>
                <p><a href="${verificationLink}">${verificationLink}</a></p>
              </body>
            </html>
          `,
        },
      },
    },
  };

  try {
    console.log("in send mail lib..........")
    const sendEmailCommand = new SendEmailCommand(params);
    const res = await sesClient.send(sendEmailCommand);
    console.log("Email sent:", res);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send verification email.");
  }
}
