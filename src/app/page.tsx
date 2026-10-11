import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProofSection from "@/components/ProofSection";
import ProblemSection from "@/components/ProblemSection";
import InTheBox from "@/components/InTheBox";
import ProcessSection from "@/components/ProcessSection";
import Testimonials from "@/components/Testimonials";
import OtherPaths from "@/components/OtherPaths";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

/*
  Conversion path:
  1. Hero        — what it is, who it's for, the one next step.
  2. Results     — evidence immediately, before any claims.
  3. Problem     — the visitor's own words (from the application form).
  4. In the box  — what's included + who you work with.
  5. Process     — what happens after clicking Apply, step by step.
  6. Students    — testimonials (quotes + video).
  7. Other paths — free toolkit / expert services for not-ready visitors.
  8. FAQ         — remaining objections.
  9. Final CTA.
*/
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProofSection />
        <ProblemSection />
        <InTheBox />
        <ProcessSection />
        <Testimonials />
        <OtherPaths />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
