import { createTransport } from 'nodemailer'
import CONFIG from '../config/config.js'

const transporter = createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: CONFIG.EMAIL_USER,
    clientId: CONFIG.CLIENT_ID,
    clientSecret: CONFIG.CLIENT_SECRET,
    refreshToken: CONFIG.REFRESH_TOKEN
  }
})

export async function sendOtp (email, otp) {
  const response = await transporter.sendMail({
    from: CONFIG.EMAIL_USER,
    to: email,
    subject: 'Verify your Email',
    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 500px;
        margin: 40px auto;
        padding: 30px;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        background: #ffffff;
        color: #111827;
      ">
        <h2 style="margin-bottom: 10px;">Verify your email</h2>

        <p style="color: #6b7280; line-height: 1.6;">
          Thanks for signing up! Use the verification code below
          to verify your email address.
        </p>

        <div style="
          margin: 25px 0;
          padding: 18px;
          text-align: center;
          background: #f3f4f6;
          border-radius: 10px;
          font-size: 32px;
          font-weight: bold;
          letter-spacing: 8px;
          color: #111827;
        ">
          ${otp}
        </div>

        <p style="color: #6b7280; font-size: 14px;">
          This code will expire in <strong>10 minutes</strong>.
        </p>

        <p style="color: #9ca3af; font-size: 12px; margin-top: 30px;">
          If you didn't request this code, you can safely ignore this email.
        </p>
      </div>
    `
  })

  return response
}
