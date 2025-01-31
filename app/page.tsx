
import Header from "@/app/components/Header"
import Landingpage from "./components/Landingpage"
export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <Landingpage />
      </main>
    </>
  )
}

