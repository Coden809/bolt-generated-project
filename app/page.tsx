import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Heart, Users, Download, Clock } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"
import FeatureSection from "@/components/feature-section"
import TestimonialSection from "@/components/testimonial-section"
import StatisticsSection from "@/components/statistics-section"
import DownloadSection from "@/components/download-section"
import DonationSection from "@/components/donation-section"

export const metadata: Metadata = {
  title: "Narcoguard - Overdose Prevention Technology",
  description:
    "Narcoguard uses advanced technology to detect and prevent overdose deaths through real-time monitoring and emergency response.",
  keywords: "overdose prevention, narcan, naloxone, opioid crisis, harm reduction, health technology",
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <FeatureSection />

        {/* How It Works Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How Narcoguard Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our comprehensive system provides real-time monitoring and emergency response to prevent overdose
                deaths.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <div className="mb-4 bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Real-time Monitoring</h3>
                <p className="text-muted-foreground">
                  Narcoguard continuously monitors vital signs through wearable devices and detects signs of overdose.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 shadow-sm">
                <div className="mb-4 bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Automatic Alerts</h3>
                <p className="text-muted-foreground">
                  When an overdose is detected, Narcoguard automatically alerts emergency contacts and nearby help.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 shadow-sm">
                <div className="mb-4 bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Community Response</h3>
                <p className="text-muted-foreground">
                  Our Hero Network connects volunteers with naloxone to nearby emergencies, providing critical response
                  time.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link href="/how-it-works">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <StatisticsSection />

        {/* Testimonials Section */}
        <TestimonialSection />

        {/* Download Section */}
        <DownloadSection />

        {/* Donation Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">We Need Your Support</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Help us develop the Narcoguard 2 auto-injecting smartwatch and expand our life-saving mission.
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <DonationSection compact />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Mission to Save Lives</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Every day, over 130 people die from opioid overdoses in the United States. Together, we can change that.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/download">
                  <Download className="mr-2 h-5 w-5" />
                  Download Now
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link href="/join-hero-network">
                  <Heart className="mr-2 h-5 w-5" />
                  Join Hero Network
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
