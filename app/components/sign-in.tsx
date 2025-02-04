"use client";

import { signIn, useSession } from "next-auth/react";

import clsx from "clsx";

export default function SignIn({className=""}:{className?:string}) {
  const {data:session}=useSession();
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      disabled={session?true:false}
      className={clsx(
        "h-10 rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        className // Extra styles passed as props
      )}
    >
      Get Started
    </button>
  );
}
