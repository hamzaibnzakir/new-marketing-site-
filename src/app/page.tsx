import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProofSection from "@/components/ProofSection";
import PivotStatement from "@/components/PivotStatement";
import SystemSection from "@/components/SystemSection";
import BentoFeatures from "@/components/BentoFeatures";
import Testimonials from "@/components/Testimonials";
import AIToolsSection from "@/components/AIToolsSection";
import ExpertServicesSection from "@/components/ExpertServicesSection";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProofSection />
        <PivotStatement />
        <SystemSection />
        <BentoFeatures />
        <Testimonials />
        <AIToolsSection />
        <ExpertServicesSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
