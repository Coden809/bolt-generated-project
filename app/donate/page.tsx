import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import DonationSection from "@/components/donation-section"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Shield, Users, Syringe } from "lucide-react"

export default function DonatePage() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Support Narcoguard</h1>

          <p className="text-lg mb-8">
            Narcoguard is a non-profit initiative dedicated to preventing overdose deaths through innovative technology.
            We rely on donations from supporters like you to continue our mission and develop life-saving solutions.
          </p>

          <DonationSection />

          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Why We Need Your Support</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <Shield className="h-8 w-8 text-primary mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Research & Development</h3>
                      <p className="text-muted-foreground">
                        We're developing the world's first naloxone auto-injecting smartwatch. Your donations directly
                        fund the engineering, testing, and regulatory approval process.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <Users className="h-8 w-8 text-primary mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Hero Network Expansion</h3>
                      <p className="text-muted-foreground">
                        We're building a nationwide network of volunteers equipped with naloxone. Your support helps us
                        train and equip more heroes in communities across the country.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <Syringe className="h-8 w-8 text-primary mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Naloxone Distribution</h3>
                      <p className="text-muted-foreground">
                        We provide free naloxone to those who can't afford it. Your donations help us purchase and
                        distribute this life-saving medication to vulnerable communities.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <Heart className="h-8 w-8 text-primary mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Community Outreach</h3>
                      <p className="text-muted-foreground">
                        We provide education and training on overdose prevention. Your support helps us reach more
                        people with life-saving information and resources.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Our Funding Needs</h3>
              <p className="mb-4">
                Narcoguard is currently seeking funding to complete the development of our revolutionary Narcoguard 2
                smartwatch. This innovative device will automatically inject naloxone when an overdose is detected,
                potentially saving thousands of lives.
              </p>
              <p className="mb-4">
                We're a small team of dedicated engineers, healthcare professionals, and community advocates working to
                make this technology a reality. Your donation, no matter the size, brings us one step closer to our
                goal.
              </p>
              <p className="font-medium">
                Thank you for supporting our mission to prevent overdose deaths and save lives.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
