"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import SignOut from "./sign-out";
import SignIn from "./sign-in";
import { Mail } from "lucide-react";
import { useSession } from "next-auth/react"

export default function Header() {

  const {data:session} = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-8 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Mail className="h-6 w-6" />
          <span className="text-xl font-bold">EmailBuilder</span>
        </Link>
        {session ? (
          <div className="flex space-x-4">
            <Button className="py-5">
              <Link  href="/dashboard">Dashboard</Link>
            </Button>
            <SignOut />
          </div>
        ) : (
         
            <SignIn />
      
        )}
      </div>
    </header>
  );
}
