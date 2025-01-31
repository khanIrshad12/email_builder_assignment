
import { auth, signOut } from "@/auth"

export default async function SignOut() {
  const session = await auth();
  console.log(session);

  return (
    <form
      action={async () => {
        "use server"
        await signOut({ redirectTo: "/" })

      }}
    >
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign out</button>
    </form>
  )
} 