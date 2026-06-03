import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { StepsSection } from "@/components/steps-section";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <StepsSection />
      
      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border bg-background">
        <div className="container mx-auto text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Amra. Todos los derechos reservados.</p>
          <p className="mt-2">
            Esta aplicación es un proyecto educativo y no representa un servicio financiero real.
          </p>
        </div>
      </footer>
    </main>
  );
}
