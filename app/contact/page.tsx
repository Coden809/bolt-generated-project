"use client"

import type React from "react"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, this would send the form data to a server
      // For demo purposes, we'll just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSubmitted(true)
      toast({
        title: "Message sent!",
        description: "We've received your message and will get back to you soon.",
      })

      // Reset form
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="mr-2 h-5 w-5" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <a href="mailto:info@narcoguard.com" className="text-primary hover:underline">
                    info@narcoguard.com
                  </a>
                </p>
                <p>
                  <a href="mailto:support@narcoguard.com" className="text-primary hover:underline">
                    support@narcoguard.com
                  </a>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="mr-2 h-5 w-5" />
                  Phone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <a href="tel:+18005551234" className="text-primary hover:underline">
                    1-800-555-1234
                  </a>{" "}
                  (General)
                </p>
                <p>
                  <a href="tel:+18005555678" className="text-primary hover:underline">
                    1-800-555-5678
                  </a>{" "}
                  (Support)
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>123 Innovation Way</p>
                <p>San Francisco, CA 94107</p>
                <p>United States</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-10">
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-center text-muted-foreground mb-4">
                    Thank you for reaching out. We've received your message and will respond shortly.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">How quickly can I expect a response?</h3>
                <p>We typically respond to inquiries within 24-48 hours during business days.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  I'm having technical issues with the app. What should I do?
                </h3>
                <p>
                  For technical support, please email support@narcoguard.com with details about your device, app
                  version, and the issue you're experiencing.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">How can I join the Hero Network?</h3>
                <p>
                  You can join the Hero Network by downloading the app and selecting the "Join Hero Network" option in
                  your profile settings.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Is Narcoguard available internationally?</h3>
                <p>
                  Currently, Narcoguard is only available in the United States and Canada, but we're working on
                  expanding to other countries soon.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}

// Helper component for form labels
function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium mb-1">
      {children}
    </label>
  )
}
