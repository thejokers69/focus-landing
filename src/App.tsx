import { ThemeProvider } from "@/components/theme-provider"
import { Nav } from "./components/Nav"
import { Hero } from "./components/Hero"
import { SocialProof } from "./components/SocialProof"
import { Features } from "./components/Features"
import { HowItWorks } from "./components/HowItWorks"
import { Pricing } from "./components/Pricing"
import { FinalCta } from "./components/FinalCta"
import { Footer } from "./components/Footer"

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <div className="min-h-screen bg-surface text-ink">
        <Nav />
        <main>
          <Hero />
          <SocialProof />
          <Features />
          <HowItWorks />
          <Pricing />
          <FinalCta />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
