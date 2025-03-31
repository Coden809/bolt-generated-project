import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About Narcoguard</h1>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg mb-4">
              Narcoguard was founded with a simple yet powerful mission: to prevent overdose deaths through technology
              and community response.
            </p>
            <p className="text-lg mb-4">
              Every day, over 130 people die from opioid overdoses in the United States alone. We believe that many of
              these deaths are preventable with the right tools and rapid response.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-lg mb-4">
              Narcoguard began in 2020 when our founder, after losing a close friend to an opioid overdose, realized
              that technology could play a crucial role in preventing similar tragedies.
            </p>
            <p className="text-lg mb-4">
              What started as a simple app to connect people with naloxone has evolved into a comprehensive platform
              that uses advanced monitoring, AI, and a network of volunteers to save lives.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Our Team</h2>
            <p className="text-lg mb-4">
              Our team consists of healthcare professionals, technology experts, and community advocates who are
              passionate about making a difference in the opioid crisis.
            </p>
            <p className="text-lg mb-4">
              We work closely with medical professionals, emergency services, and harm reduction organizations to ensure
              our approach is effective and evidence-based.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Our Technology</h2>
            <p className="text-lg mb-4">
              Narcoguard uses cutting-edge technology to detect signs of overdose through wearable devices and
              smartphone sensors. Our AI algorithms can identify potential overdoses and trigger immediate responses.
            </p>
            <p className="text-lg mb-4">
              The upcoming Narcoguard 2 smartwatch will feature revolutionary naloxone auto-injecting technology,
              providing immediate intervention when an overdose is detected.
            </p>
          </section>

          <div className="flex justify-center mt-8">
            <Button asChild size="lg">
              <Link href="/download">Download Narcoguard</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
