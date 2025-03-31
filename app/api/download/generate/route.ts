import { NextResponse } from "next/server"
import { generateDownloadToken } from "@/lib/auth"
import { getDownloadUrlForPlatform } from "@/lib/file-handling"
import { logDownloadEvent } from "@/lib/analytics"
import { sendDownloadEmail } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const { platform, email } = await request.json()

    // Validate email and platform
    if (!email || !platform) {
      return NextResponse.json({ success: false, message: "Email and platform are required" }, { status: 400 })
    }

    // Generate secure download token that expires in 24 hours
    const downloadToken = generateDownloadToken(email, platform)

    // Get user agent for platform-specific downloads
    const userAgent = request.headers.get("user-agent") || ""

    // Get the appropriate download URL
    const downloadUrl = getDownloadUrlForPlatform(platform, userAgent)

    // Add token to URL if not an external URL (like App Store)
    const finalDownloadUrl =
      downloadUrl.includes("http") && !downloadUrl.includes(process.env.NEXT_PUBLIC_APP_URL || "")
        ? downloadUrl
        : `${downloadUrl}?token=${downloadToken}`

    // Map platform to file name
    const platformMap: Record<string, { fileName: string }> = {
      android: { fileName: "narcoguard-latest.apk" },
      windows: { fileName: "narcoguard-setup.exe" },
      mac: { fileName: "narcoguard.dmg" },
      linux: { fileName: "narcoguard.AppImage" },
      ios: { fileName: "" },
      web: { fileName: "" },
    }

    // Get platform-specific info
    const platformInfo = platformMap[platform] || { fileName: "narcoguard.zip" }

    // Track download event in analytics
    await logDownloadEvent(platform, 0, "email", email, userAgent)

    // Send email with download link
    try {
      await sendDownloadEmail(email, finalDownloadUrl, platform)
      console.log(`Download email sent to ${email} for ${platform}`)
    } catch (error) {
      console.error("Failed to send download email:", error)
      // Continue even if email fails
    }

    return NextResponse.json({
      success: true,
      message: `Download link generated for ${platform}`,
      downloadUrl: finalDownloadUrl,
      fileName: platformInfo.fileName,
    })
  } catch (error) {
    console.error("Download request error:", error)
    return NextResponse.json({ success: false, message: "Failed to process download request" }, { status: 500 })
  }
}
