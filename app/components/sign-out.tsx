"use client";
import { signOut } from "next-auth/react";
import clsx from "clsx";
export default function SignOut({className=""}:{className?:string}) {
  return (
    <button
      onClick={() => signOut({ redirectTo: "/" })}
      className={clsx(
        "h-10 rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        className // Extra styles passed as props
      )}
    >
      Sign Out
    </button>
  );
}
