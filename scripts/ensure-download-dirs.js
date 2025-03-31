const fs = require("fs")
const path = require("path")

// Create necessary directories
const downloadDir = path.join(process.cwd(), "public", "downloads")

if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir, { recursive: true })
  console.log(`Created directory: ${downloadDir}`)
} else {
  console.log(`Directory already exists: ${downloadDir}`)
}

// Create sample files for testing
const sampleFiles = [
  { path: path.join(downloadDir, "narcoguard-latest.apk"), content: "Sample Android APK file" },
  { path: path.join(downloadDir, "narcoguard-setup.exe"), content: "Sample Windows installer file" },
  { path: path.join(downloadDir, "narcoguard.dmg"), content: "Sample macOS DMG file" },
  { path: path.join(downloadDir, "narcoguard.AppImage"), content: "Sample Linux AppImage file" },
  { path: path.join(downloadDir, "narcoguard.zip"), content: "Sample ZIP file containing all platforms" },
]

sampleFiles.forEach((file) => {
  if (!fs.existsSync(file.path)) {
    fs.writeFileSync(file.path, file.content)
    console.log(`Created sample file: ${file.path}`)
  } else {
    console.log(`Sample file already exists: ${file.path}`)
  }
})

console.log("Download directory and sample files setup complete!")
