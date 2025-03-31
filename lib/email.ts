import nodemailer from "nodemailer"

// Email configuration
const emailConfig = {
  host: process.env.EMAIL_HOST || "smtp.example.com",
  port: Number.parseInt(process.env.EMAIL_PORT || "587"),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER || "user@example.com",
    pass: process.env.EMAIL_PASS || "password",
  },
}

// Create transporter
const transporter = nodemailer.createTransport(emailConfig)

/**
 * Send an email
 * @param to Recipient email address
 * @param subject Email subject
 * @param html Email HTML content
 * @param text Plain text version of the email
 * @returns Promise resolving to the send result
 */
export async function sendEmail(to: string, subject: string, html: string, text?: string) {
  try {
    const from = process.env.EMAIL_FROM || "Narcoguard <noreply@narcoguard.com>"

    const result = await transporter.sendMail({
      from,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ""), // Strip HTML tags for plain text version
    })

    console.log(`Email sent to ${to}: ${result.messageId}`)
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error("Error sending email:", error)
    throw error
  }
}

/**
 * Send a download email with platform-specific instructions
 * @param to Recipient email address
 * @param downloadUrl Download URL
 * @param platform Platform (ios, android, windows, mac, linux, web)
 * @returns Promise resolving to the send result
 */
export async function sendDownloadEmail(to: string, downloadUrl: string, platform: string) {
  // Platform-specific information
  const platformInfo: Record<string, { name: string; instructions: string }> = {
    ios: {
      name: "iOS",
      instructions: "Tap the App Store link below and follow the installation prompts.",
    },
    android: {
      name: "Android",
      instructions:
        "Tap the download link below. You may need to allow installation from unknown sources in your device settings.",
    },
    windows: {
      name: "Windows",
      instructions: "Click the download link below. Open the installer and follow the installation wizard.",
    },
    mac: {
      name: "macOS",
      instructions:
        "Click the download link below. Open the DMG file and drag the Narcoguard icon to your Applications folder.",
    },
    linux: {
      name: "Linux",
      instructions: 'Click the download link below. Make the file executable with "chmod +x" and run it.',
    },
    web: {
      name: "Web App",
      instructions:
        "Click the link below to access the Narcoguard web app. For the best experience, we recommend using Chrome and installing it as a Progressive Web App.",
    },
  }

  const info = platformInfo[platform] || {
    name: "All Platforms",
    instructions: "Click the download link below to download Narcoguard.",
  }

  const subject = `Your Narcoguard Download for ${info.name}`

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Narcoguard Download</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #4f46e5;
          padding: 20px;
          text-align: center;
          color: white;
          border-radius: 5px 5px 0 0;
        }
        .content {
          background-color: #f9fafb;
          padding: 20px;
          border-radius: 0 0 5px 5px;
          border: 1px solid #e5e7eb;
          border-top: none;
        }
        .button {
          display: inline-block;
          background-color: #4f46e5;
          color: white;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 5px;
          margin: 20px 0;
          font-weight: bold;
        }
        .footer {
          margin-top: 20px;
          text-align: center;
          font-size: 12px;
          color: #6b7280;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Your Narcoguard Download</h1>
        </div>
        <div class="content">
          <p>Hello,</p>
          <p>Thank you for downloading Narcoguard for ${info.name}. Your download link is ready.</p>
          
          <p><strong>Instructions:</strong> ${info.instructions}</p>
          
          <div style="text-align: center;">
            <a href="${downloadUrl}" class="button">Download Narcoguard</a>
          </div>
          
          <p>If the button above doesn't work, copy and paste this URL into your browser:</p>
          <p style="word-break: break-all; background-color: #e5e7eb; padding: 10px; border-radius: 5px;">${downloadUrl}</p>
          
          <p>This download link will expire in 24 hours for security reasons.</p>
          
          <p>If you need any assistance with installation or have any questions, please visit our <a href="https://narcoguard.com/support">support page</a> or contact our support team at <a href="mailto:support@narcoguard.com">support@narcoguard.com</a>.</p>
          
          <p>Thank you for joining our mission to prevent overdose deaths.</p>
          
          <p>Best regards,<br>The Narcoguard Team</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Narcoguard. All rights reserved.</p>
          <p>If you didn't request this download, please ignore this email.</p>
        </div>
      </div>
    </body>
    </html>
  `

  return sendEmail(to, subject, html)
}

/**
 * Send an emergency alert email
 * @param to Recipient email address
 * @param userName Name of the user in emergency
 * @param location Location information
 * @param emergencyType Type of emergency
 * @returns Promise resolving to the send result
 */
export async function sendEmergencyEmail(to: string, userName: string, location: string, emergencyType: string) {
  const subject = `URGENT: Emergency Alert from Narcoguard`

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>URGENT: Emergency Alert</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #dc2626;
          padding: 20px;
          text-align: center;
          color: white;
          border-radius: 5px 5px 0 0;
        }
        .content {
          background-color: #f9fafb;
          padding: 20px;
          border-radius: 0 0 5px 5px;
          border: 1px solid #e5e7eb;
          border-top: none;
        }
        .emergency-info {
          background-color: #fee2e2;
          border: 1px solid #ef4444;
          padding: 15px;
          border-radius: 5px;
          margin: 20px 0;
        }
        .button {
          display: inline-block;
          background-color: #dc2626;
          color: white;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 5px;
          margin: 20px 0;
          font-weight: bold;
        }
        .footer {
          margin-top: 20px;
          text-align: center;
          font-size: 12px;
          color: #6b7280;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>EMERGENCY ALERT</h1>
        </div>
        <div class="content">
          <p><strong>This is an automated emergency alert from Narcoguard.</strong></p>
          
          <div class="emergency-info">
            <p><strong>${userName}</strong> may be experiencing a ${emergencyType}.</p>
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <p>Please take immediate action:</p>
          <ol>
            <li>Try to contact ${userName} immediately</li>
            <li>If unable to reach them, go to their location if possible</li>
            <li>Call emergency services (911) if you cannot confirm their safety</li>
          </ol>
          
          <div style="text-align: center;">
            <a href="https://maps.google.com/?q=${encodeURIComponent(location)}" class="button">View Location on Map</a>
          </div>
          
          <p>If you have any questions or need assistance, please contact Narcoguard emergency support at <a href="tel:+18005551234">1-800-555-1234</a>.</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Narcoguard. All rights reserved.</p>
          <p>This is an automated emergency alert. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `

  return sendEmail(to, subject, html)
}
