"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Apple,
  SmartphoneIcon as Android,
  Monitor,
  Download,
  FileDown,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface DownloadPageProps {
  platform: string
}

export default function DownloadPage({ platform }: DownloadPageProps) {
  const router = useRouter()
  const [downloadState, setDownloadState] = useState<"idle" | "downloading" | "complete" | "error">("idle")
  const [progress, setProgress] = useState(0)
  const [email, setEmail] = useState("")
  const [isValidEmail, setIsValidEmail] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState("")
  const [downloadStartTime, setDownloadStartTime] = useState<number | null>(null)
  const [estimatedSize, setEstimatedSize] = useState<number>(0)

  // Platform-specific information
  const platformInfo = {
    ios: {
      name: "iOS",
      icon: Apple,
      color: "text-gray-800",
      size: "45 MB",
      requirements: "iOS 14.0 or later. Compatible with iPhone, iPad, and iPod touch.",
      installSteps: [
        'Tap "Download on the App Store"',
        "Sign in with your Apple ID if prompted",
        "Wait for the download to complete",
        "The app will install automatically",
      ],
      directDownload: false,
      storeUrl: "https://apps.apple.com/us/app/narcoguard/id1234567890",
      estimatedSizeMB: 45,
    },
    android: {
      name: "Android",
      icon: Android,
      color: "text-green-500",
      size: "38 MB",
      requirements: "Android 8.0 or later",
      installSteps: [
        'Tap "Download APK" or "Get it on Google Play"',
        "For APK: Allow installation from unknown sources if prompted",
        "Open the downloaded file",
        "Follow the installation prompts",
      ],
      directDownload: true,
      storeUrl: "https://play.google.com/store/apps/details?id=com.narcoguard",
      estimatedSizeMB: 38,
    },
    windows: {
      name: "Windows",
      icon: Monitor,
      color: "text-blue-500",
      size: "64 MB",
      requirements: "Windows 10 or later (64-bit)",
      installSteps: [
        'Click "Download for Windows"',
        "Open the downloaded installer",
        'If prompted by Windows Defender, click "More info" and "Run anyway"',
        "Follow the installation wizard",
      ],
      directDownload: true,
      storeUrl: null,
      estimatedSizeMB: 64,
    },
    mac: {
      name: "macOS",
      icon: Apple,
      color: "text-gray-800",
      size: "68 MB",
      requirements: "macOS 11.0 or later",
      installSteps: [
        'Click "Download for Mac"',
        "Open the downloaded DMG file",
        "Drag the Narcoguard icon to the Applications folder",
        'If prompted about security settings, open System Preferences > Security & Privacy and click "Open Anyway"',
      ],
      directDownload: true,
      storeUrl: null,
      estimatedSizeMB: 68,
    },
    linux: {
      name: "Linux",
      icon: FileDown,
      color: "text-orange-500",
      size: "58 MB",
      requirements: "Ubuntu 20.04, Debian 10, Fedora 34, or later",
      installSteps: [
        'Click "Download for Linux"',
        "Make the AppImage executable: chmod +x Narcoguard.AppImage",
        "Run the AppImage: ./Narcoguard.AppImage",
        "Alternatively, use the .deb or .rpm package for your distribution",
      ],
      directDownload: true,
      storeUrl: null,
      estimatedSizeMB: 58,
    },
    web: {
      name: "Web App",
      icon: ExternalLink,
      color: "text-purple-500",
      size: "N/A",
      requirements: "Modern web browser (Chrome, Firefox, Safari, Edge)",
      installSteps: [
        'Click "Launch Web App"',
        'For the best experience, use Chrome and click "Install" when prompted',
        "The app will open in a new window",
        "You can access it anytime from your browser",
      ],
      directDownload: false,
      storeUrl: "/app",
      estimatedSizeMB: 0,
    },
  }

  const info = platformInfo[platform as keyof typeof platformInfo] || platformInfo.web

  useEffect(() => {
    // Set estimated size based on platform
    if (info) {
      setEstimatedSize(info.estimatedSizeMB)
    }
  }, [platform, info])

  useEffect(() => {
    // Simulate download progress
    if (downloadState === "downloading") {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const increment = Math.random() * 10
          const newProgress = prevProgress + increment

          if (newProgress >= 100) {
            clearInterval(interval)
            setDownloadState("complete")
            return 100
          }

          return newProgress
        })
      }, 300)

      return () => clearInterval(interval)
    }
  }, [downloadState])

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value
    setEmail(newEmail)
    setIsValidEmail(validateEmail(newEmail))
  }

  const initiateDownload = async () => {
    if (!isValidEmail && info.directDownload) {
      toast({
        title: "Email required",
        description: "Please enter a valid email address to receive your download link.",
        variant: "destructive",
      })
      return
    }

    try {
      setDownloadState("downloading")
      setDownloadStartTime(Date.now())

      // For web app, just redirect
      if (platform === "web") {
        window.open(info.storeUrl, "_blank")
        setDownloadState("complete")
        return
      }

      // For iOS, redirect to App Store
      if (platform === "ios") {
        window.open(info.storeUrl, "_blank")
        setDownloadState("complete")
        return
      }

      // For Android, offer both Play Store and direct APK
      if (platform === "android" && !info.directDownload) {
        window.open(info.storeUrl, "_blank")
        setDownloadState("complete")
        return
      }

      // For direct downloads (Android APK, Windows, Mac, Linux)
      const response = await fetch("/api/download/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          platform,
          email,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate download link")
      }

      const data = await response.json()
      setDownloadUrl(data.downloadUrl)

      // Start the actual download
      if (info.directDownload) {
        // Create a hidden link and click it to start download
        const link = document.createElement("a")
        link.href = data.downloadUrl
        link.download = data.fileName || `narcoguard-${platform}.zip`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    } catch (error) {
      console.error("Download error:", error)
      setDownloadState("error")
      toast({
        title: "Download failed",
        description: "There was an error starting your download. Please try again.",
        variant: "destructive",
      })
    }
  }

  const retryDownload = () => {
    setDownloadState("idle")
    setProgress(0)
    setDownloadStartTime(null)
  }

  // Calculate estimated time remaining
  const getEstimatedTimeRemaining = () => {
    if (!downloadStartTime || progress === 0) return "Calculating..."

    const elapsedMs = Date.now() - downloadStartTime
    const percentComplete = progress / 100
    const totalEstimatedMs = elapsedMs / percentComplete
    const remainingMs = totalEstimatedMs - elapsedMs

    if (remainingMs < 1000) return "Almost done..."

    const remainingSec = Math.round(remainingMs / 1000)
    if (remainingSec < 60) return `About ${remainingSec} seconds remaining`

    const remainingMin = Math.floor(remainingSec / 60)
    const extraSec = remainingSec % 60
    return `About ${remainingMin}:${extraSec.toString().padStart(2, "0")} minutes remaining`
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <info.icon className={`mr-2 h-6 w-6 ${info.color}`} />
              Download Narcoguard for {info.name}
            </h1>
            <p className="text-muted-foreground mb-8">
              Get the latest version of Narcoguard and join our mission to prevent overdose deaths.
            </p>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Download Information</CardTitle>
                <CardDescription>Details about the {info.name} version of Narcoguard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2">Version Details</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <span className="font-medium mr-2">Version:</span> 1.2.0
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium mr-2">Size:</span> {info.size}
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium mr-2">Released:</span> {new Date().toLocaleDateString()}
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">System Requirements</h3>
                    <p>{info.requirements}</p>
                  </div>
                </div>

                {downloadState === "idle" && info.directDownload && (
                  <div className="mt-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email Address (to receive download link)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="your.email@example.com"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col items-stretch gap-4">
                {downloadState === "idle" && (
                  <div className="flex flex-col sm:flex-row gap-4 w-full">
                    {info.directDownload ? (
                      <Button
                        onClick={initiateDownload}
                        className="flex-1"
                        disabled={info.directDownload && !isValidEmail}
                      >
                        <Download className="mr-2 h-5 w-5" />
                        Download for {info.name}
                      </Button>
                    ) : null}

                    {info.storeUrl && (
                      <Button
                        onClick={() => {
                          if (platform === "web") {
                            router.push(info.storeUrl)
                          } else {
                            window.open(info.storeUrl!, "_blank")
                          }
                          setDownloadState("complete")
                        }}
                        variant={info.directDownload ? "outline" : "default"}
                        className="flex-1"
                      >
                        <ExternalLink className="mr-2 h-5 w-5" />
                        {platform === "ios"
                          ? "Download on the App Store"
                          : platform === "android"
                            ? "Get it on Google Play"
                            : platform === "web"
                              ? "Launch Web App"
                              : `Get from ${info.name} Store`}
                      </Button>
                    )}
                  </div>
                )}

                {downloadState === "downloading" && (
                  <div className="w-full space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Downloading...</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                    <p className="text-sm text-muted-foreground">{getEstimatedTimeRemaining()}</p>
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Download in progress</AlertTitle>
                      <AlertDescription>
                        Please don't close this window until the download is complete.
                        {email && (
                          <span>
                            {" "}
                            We've also sent a download link to <strong>{email}</strong> in case you need it later.
                          </span>
                        )}
                      </AlertDescription>
                    </Alert>
                  </div>
                )}

                {downloadState === "complete" && (
                  <div className="w-full space-y-4">
                    <Alert className="bg-green-50 dark:bg-green-900/20 border-green-500">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <AlertTitle className="text-green-700 dark:text-green-300">Download complete!</AlertTitle>
                      <AlertDescription>
                        {platform === "web" ? (
                          <span>The web app has been launched in a new tab.</span>
                        ) : platform === "ios" ? (
                          <span>You've been redirected to the App Store.</span>
                        ) : platform === "android" && !info.directDownload ? (
                          <span>You've been redirected to the Google Play Store.</span>
                        ) : (
                          <span>
                            Your download has started. If it doesn't begin automatically,{" "}
                            <a href={downloadUrl} className="text-primary underline">
                              click here
                            </a>
                            .
                          </span>
                        )}
                        {email && (
                          <span>
                            {" "}
                            We've also sent a download link to <strong>{email}</strong> for future reference.
                          </span>
                        )}
                      </AlertDescription>
                    </Alert>

                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Installation Instructions</h3>
                      <ol className="list-decimal list-inside space-y-2">
                        {info.installSteps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ol>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button onClick={() => router.push("/dashboard")} className="flex-1">
                        Continue to Dashboard
                      </Button>
                      <Button variant="outline" onClick={() => router.push("/")} className="flex-1">
                        Return to Home
                      </Button>
                    </div>
                  </div>
                )}

                {downloadState === "error" && (
                  <div className="w-full space-y-4">
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Download failed</AlertTitle>
                      <AlertDescription>
                        There was an error processing your download. Please try again or contact support if the problem
                        persists.
                      </AlertDescription>
                    </Alert>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button onClick={retryDownload} className="flex-1">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Try Again
                      </Button>
                      <Button variant="outline" onClick={() => router.push("/contact")} className="flex-1">
                        Contact Support
                      </Button>
                    </div>
                  </div>
                )}
              </CardFooter>
            </Card>

            {/* Other download options */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Other Platforms</h2>
              <Tabs defaultValue={platform}>
                <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
                  {Object.entries(platformInfo).map(([key, value]) => (
                    <TabsTrigger
                      key={key}
                      value={key}
                      onClick={() => router.push(`/download/${key}`)}
                      disabled={key === platform}
                    >
                      <value.icon className="mr-2 h-4 w-4" />
                      <span className="hidden md:inline">{value.name}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* FAQ Section */}
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Is Narcoguard free to download?</h3>
                  <p className="text-muted-foreground">
                    Yes, Narcoguard is completely free to download and use. Our mission is to save lives, not make
                    profit.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">How do I update to the latest version?</h3>
                  <p className="text-muted-foreground">
                    The app will automatically check for updates. You can also manually check by going to Settings &gt;
                    About &gt; Check for Updates.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Is my data secure?</h3>
                  <p className="text-muted-foreground">
                    Yes, all your personal data is encrypted and stored securely. We comply with HIPAA regulations and
                    prioritize your privacy.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">What if I need help with installation?</h3>
                  <p className="text-muted-foreground">
                    Our support team is available 24/7. Contact us at support@narcoguard.com or visit our{" "}
                    <Link href="/support" className="text-primary underline">
                      support page
                    </Link>
                    .
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
