import "./globals.css"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { SessionProvider } from "next-auth/react"
import { ConvexClientProvider } from "./provider/ConvexClientProvider"
import {HelperProvider} from "./provider/HelperProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Email Builder App",
  description: "Build beautiful emails with ease",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
} ) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <SessionProvider>
          <HelperProvider>
            <ConvexClientProvider>
              {children}
              <Toaster />
            </ConvexClientProvider>
          </HelperProvider>
        </SessionProvider>
      </body>
    </html>
  )
}

