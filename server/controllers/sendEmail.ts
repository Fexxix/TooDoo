import { createTransport } from "nodemailer"
import { render } from "@react-email/render"
import { Email } from "./email"

const transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.SMTP_USER,
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    accessToken: process.env.OAUTH_ACCESS_TOKEN,
    expires: Number(process.env.OAUTH_TOKEN_EXPIRES),
  },
})

export async function sendVerificationEmail({
  email,
  token,
}: {
  email: string
  token: string
}) {
  const emailHTML = render(Email({ token }))

  const message = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Verify your email",
    html: emailHTML,
  }

  try {
    await transporter.sendMail(message)
    console.log("Email sent")
  } catch (error) {
    console.error("Error sending email:", error)
    throw error
  }
}
