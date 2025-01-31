
import { auth, signIn } from "@/auth";

export default async function SignIn() {
    const session = await auth();
    const handleSignIn = async () => {
        "use server";
        await signIn("google",{redirectTo:"/dashboard"},); // Trigger the sign-in process
    };

    return (
        <form
            action={handleSignIn}
        >
            <button
                type="submit"
                disabled={session?.user ? true : false}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Get Started
            </button>
        </form>
    );
}
