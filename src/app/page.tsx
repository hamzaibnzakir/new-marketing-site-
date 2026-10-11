import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import FlipStatement from "@/components/FlipStatement";
import ProblemSection from "@/components/ProblemSection";
import ProofSection from "@/components/ProofSection";
import InTheBox from "@/components/InTheBox";
import ProcessSection from "@/components/ProcessSection";
import Testimonials from "@/components/Testimonials";
import OtherPaths from "@/components/OtherPaths";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

/*
  Conversion path:
  1. Hero          — offer, audience and the one next step, with the 3D render.
  2. Flip sentence — what we do, with the proof flipping into view.
  3. Dark stage    — the visitor's own worries (from the application form).
  4. Results       — the receipts, in full.
  5. In the box    — what's included.
  6. Process       — what happens after clicking Apply.
  7. Students      — testimonials and videos.
  8. Other paths   — free toolkit / expert services for not-ready visitors.
  9. FAQ           — remaining objections.
  10. Footer CTA.
*/
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <FlipStatement />
        <ProblemSection />
        <ProofSection />
        <InTheBox />
        <ProcessSection />
        <Testimonials />
        <OtherPaths />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
