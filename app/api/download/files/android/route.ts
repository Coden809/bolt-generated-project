import { NextResponse } from "next/server"
import path from "path"
import fs from "fs"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")

    if (!token) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 })
    }

    // For demo purposes, we'll skip token verification
    // In a real app, you would verify the token
    // const tokenData = await verifyDownloadToken(token)
    // if (!tokenData || tokenData.platform !== "android") {
    //   return NextResponse.json({ error: "Invalid or expired download token" }, { status: 401 })
    // }

    // Path to the APK file
    const filePath = path.join(process.cwd(), "public", "downloads", "narcoguard-latest.apk")

    // Create a sample file if it doesn't exist
    if (!fs.existsSync(filePath)) {
      const sampleContent = `This is a sample Android APK file for Narcoguard.
Created at: ${new Date().toISOString()}
This would be the actual application binary in production.`

      // Create directory if it doesn't exist
      const dir = path.dirname(filePath)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }

      // Write sample file
      fs.writeFileSync(filePath, sampleContent)
      console.log(`Created sample file at: ${filePath}`)
    }

    // Read the file
    const fileBuffer = fs.readFileSync(filePath)
    const stats = fs.statSync(filePath)
    const fileSize = stats.size

    // Return the file
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.android.package-archive",
        "Content-Disposition": `attachment; filename="narcoguard-latest.apk"`,
        "Content-Length": fileSize.toString(),
        "Cache-Control": "no-cache",
      },
    })
  } catch (error) {
    console.error("Android download error:", error)
    return NextResponse.json({ error: "Failed to process download" }, { status: 500 })
  }
}
