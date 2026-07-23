import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProofSection from "@/components/ProofSection";
import PivotStatement from "@/components/PivotStatement";
import SystemSection from "@/components/SystemSection";
import Testimonials from "@/components/Testimonials";
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
        <Testimonials />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
