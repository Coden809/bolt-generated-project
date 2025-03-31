import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Apple, SmartphoneIcon as Android, Laptop, FileDown, Globe } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Download Narcoguard",
  description: "Download Narcoguard for iOS, Android, desktop, or use the web app.",
}

export default function DownloadsPage() {
  const platforms = [
    {
      id: "ios",
      name: "iOS",
      icon: Apple,
      color: "text-gray-800",
      description: "For iPhone and iPad devices running iOS 14.0 or later.",
      size: "45 MB",
    },
    {
      id: "android",
      name: "Android",
      icon: Android,
      color: "text-green-500",
      description: "For Android devices running Android 8.0 or later.",
      size: "38 MB",
    },
    {
      id: "windows",
      name: "Windows",
      icon: Laptop,
      color: "text-blue-500",
      description: "For Windows 10 or later (64-bit).",
      size: "64 MB",
    },
    {
      id: "mac",
      name: "macOS",
      icon: Apple,
      color: "text-gray-800",
      description: "For macOS 11.0 or later.",
      size: "68 MB",
    },
    {
      id: "linux",
      name: "Linux",
      icon: FileDown,
      color: "text-orange-500",
      description: "For Ubuntu 20.04, Debian 10, Fedora 34, or later.",
      size: "58 MB",
    },
    {
      id: "web",
      name: "Web App",
      icon: Globe,
      color: "text-purple-500",
      description: "Access directly from your browser, no installation required.",
      size: "N/A",
    },
  ]

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Download Narcoguard</h1>
          <p className="text-muted-foreground mb-8">
            Choose your platform and download Narcoguard to join our mission to prevent overdose deaths.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platforms.map((platform) => (
              <Card key={platform.id} className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <platform.icon className={`mr-2 h-6 w-6 ${platform.color}`} />
                    {platform.name}
                  </CardTitle>
                  <CardDescription>{platform.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Size: {platform.size}</p>
                  <p className="text-sm mt-2">Version: 1.2.0</p>
                  <p className="text-sm mt-2">Released: {new Date().toLocaleDateString()}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/download/${platform.id}`}>
                      {platform.id === "web" ? "Launch Web App" : `Download for ${platform.name}`}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-muted p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Need Help?</h2>
            <p className="mb-4">
              If you're having trouble downloading or installing Narcoguard, our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="outline">
                <Link href="/support">Visit Support Center</Link>
              </Button>
              <Button asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
