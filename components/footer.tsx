import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Narcoguard</h3>
            <p className="text-muted-foreground mb-4">
              Using technology to prevent overdose deaths and connect people with life-saving help.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <Youtube className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/hero-network" className="text-muted-foreground hover:text-primary transition-colors">
                  Hero Network
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-muted-foreground hover:text-primary transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Download</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/download/ios" className="text-muted-foreground hover:text-primary transition-colors">
                  iOS App
                </Link>
              </li>
              <li>
                <Link href="/download/android" className="text-muted-foreground hover:text-primary transition-colors">
                  Android App
                </Link>
              </li>
              <li>
                <Link href="/download/windows" className="text-muted-foreground hover:text-primary transition-colors">
                  Windows
                </Link>
              </li>
              <li>
                <Link href="/download/mac" className="text-muted-foreground hover:text-primary transition-colors">
                  macOS
                </Link>
              </li>
              <li>
                <Link href="/download/linux" className="text-muted-foreground hover:text-primary transition-colors">
                  Linux
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Support Us</h3>
            <p className="text-muted-foreground mb-4">
              Your donations help us develop life-saving technology and make it accessible to those who need it most.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/donate">
                <Heart className="mr-2 h-4 w-4 text-red-500" />
                Donate Now
              </Link>
            </Button>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <a
                  href="mailto:info@narcoguard.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  info@narcoguard.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <a href="tel:+18005551234" className="text-muted-foreground hover:text-primary transition-colors">
                  1-800-555-1234
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <Button asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Narcoguard. All rights reserved. Created by Stephen Blanford.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link
                href="/accessibility"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
