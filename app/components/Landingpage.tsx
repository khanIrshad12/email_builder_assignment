'use client'
import Link from "next/link"
import Image from "next/image"
import SignIn from "./sign-in"
import { Palette, Zap, Layout } from "lucide-react"


export default function Landingpage() {
  return (
    <div className="flex min-h-screen flex-col">
     
      <main className="flex-1">
        <section className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Create Beautiful Emails with Ease
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Design and send professional emails in minutes. No coding required. Drag-and-drop builder with stunning
              templates.
            </p>
            <div className="flex flex-col gap-4 min-[400px]:flex-row">

              <SignIn className="h-[2.8rem]"/>

              <Link
                href="#"
                className="inline-flex h-11 items-center justify-center rounded-md border border-input px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                View Demo
              </Link>
            </div>
          </div>
        </section>
        <section className="container py-8 md:py-12 lg:py-24">
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Palette className="h-12 w-12 text-primary" />
                <div className="space-y-2">
                  <h3 className="font-bold">Beautiful Templates</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose from hundreds of professionally designed templates
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Layout className="h-12 w-12 text-primary" />
                <div className="space-y-2">
                  <h3 className="font-bold">Drag & Drop</h3>
                  <p className="text-sm text-muted-foreground">
                    Easy-to-use interface with drag and drop functionality
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Zap className="h-12 w-12 text-primary" />
                <div className="space-y-2">
                  <h3 className="font-bold">Instant Preview</h3>
                  <p className="text-sm text-muted-foreground">See how your email looks across different devices</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container py-8 md:py-12 lg:py-24">
          <div className="mx-auto max-w-[64rem] grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Design Like a Pro</h2>
              <p className="text-muted-foreground">
                Our intuitive email builder makes it easy to create professional-looking emails. No design experience
                needed. Just drag, drop, and customize.
              </p>
            </div>
            <div className="aspect-video overflow-hidden rounded-xl">
              <Image
                src="/emailtemplate.webp"
                width={800}
                height={400}
                alt="Email builder interface preview"
                className="object-cover"
              />
            </div>
          </div>
        </section>
      </main>
     
    </div>
  )
}

