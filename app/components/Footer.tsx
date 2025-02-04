import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t">
    <div className="container flex h-16 items-center justify-between px-8">
      <p className="text-sm text-muted-foreground">© 2024 EmailBuilder. All rights reserved.</p>
      <nav className="flex gap-4 text-sm text-muted-foreground">
        <Link href="#" className="hover:underline">
          Terms
        </Link>
        <Link href="#" className="hover:underline">
          Privacy
        </Link>
      </nav>
    </div>
  </footer>
  )
}

export default Footer