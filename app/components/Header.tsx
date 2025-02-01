
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { auth } from "@/auth"
import SignOut from "./sign-out";
import SignIn from "./sign-in";

export default async function Header() {
    
  const session = await auth()
  console.log(session);
  
  return (
    <header className="w-full py-6 px-4 flex justify-between items-center bg-white shadow-md">
      <Link href="/" className="text-2xl font-bold">
        EmailBuilder
      </Link>
      {session ? (
        <div className="flex space-x-4">
          <Button asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <SignOut/>
        </div>
      ) : (
        <Button asChild>
         <SignIn/>
        </Button>
      )}
    </header>
  )
}

