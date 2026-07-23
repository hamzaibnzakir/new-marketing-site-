import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for BrainBox Ecom Lab's e-commerce mentorship program.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" updated="July 23, 2026">
      <h2>1. Acceptance of Terms</h2>
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your access to and
        use of the BrainBox Ecom Lab website, mentorship program, and any
        related services (collectively, the &quot;Services&quot;), provided
        by BrainBox Ecom Lab (&quot;BrainBox,&quot; &quot;we,&quot;
        &quot;us,&quot; or &quot;our&quot;). By accessing our website,
        submitting an application, or enrolling in the Services, you agree
        to be bound by these Terms. If you do not agree, do not use the
        Services.
      </p>

      <h2>2. Description of Services</h2>
      <p>
        BrainBox provides e-commerce mentorship, including but not limited
        to store build and optimization support, advertising strategy
        guidance, and related coaching intended to help clients launch,
        operate, and scale a dropshipping business. Specific deliverables,
        scope, and pricing are confirmed individually after you apply and
        are outlined in a separate agreement or invoice at that time.
      </p>

      <h2>3. Eligibility</h2>
      <p>
        You must be at least 18 years old, or the age of majority in your
        jurisdiction, to apply for or enroll in the Services. By applying,
        you represent that you meet this requirement and that all
        information you provide is accurate and complete.
      </p>

      <h2>4. Application &amp; Enrollment</h2>
      <p>
        Submitting an application does not guarantee acceptance into the
        program. BrainBox reserves the right to accept or decline any
        application at its sole discretion. Enrollment is confirmed only
        upon mutual agreement of scope and payment.
      </p>

      <h2>5. Payment Terms</h2>
      <p>
        Pricing is discussed and agreed upon individually after application,
        based on the scope of support requested. Payment terms, including
        any installment schedule, will be confirmed in writing before work
        begins. Failure to make payments as agreed may result in suspension
        or termination of the Services.
      </p>

      <h2>6. No Guarantee of Results</h2>
      <p>
        E-commerce and dropshipping involve inherent business risk.
        Individual results depend on factors outside our control, including
        market conditions, ad platform policies, supplier reliability, and
        your own time, capital, and execution. BrainBox does not guarantee
        any specific level of sales, profit, or return on investment.
        References to past student or store results are individual outcomes
        and are not a promise of similar results for you.
      </p>

      <h2>7. Client Responsibilities</h2>
      <p>You agree to:</p>
      <ul>
        <li>
          Provide accurate information necessary to deliver the Services
          (store access, ad account access, business details, etc.)
        </li>
        <li>
          Maintain your own accounts with third-party platforms (e.g.
          Shopify, Meta, payment processors) in good standing
        </li>
        <li>
          Comply with the terms of service of any third-party platform used
          in connection with your store or ad campaigns
        </li>
        <li>Participate actively in mentorship sessions and follow-ups</li>
      </ul>

      <h2>8. Intellectual Property</h2>
      <p>
        All training materials, frameworks, templates, and proprietary
        strategies provided through the Services remain the intellectual
        property of BrainBox. You may use them for your own business but
        may not resell, redistribute, or publicly republish them without
        written permission.
      </p>

      <h2>9. Third-Party Platforms</h2>
      <p>
        The Services involve the use of third-party platforms such as
        Shopify and Meta Ads. BrainBox is not affiliated with, and is not
        responsible for, the policies, uptime, fees, or account decisions of
        these third parties. Any suspension, ban, or policy change by a
        third-party platform is outside our control.
      </p>

      <h2>10. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, BrainBox and its
        affiliates, mentors, and staff shall not be liable for any indirect,
        incidental, special, or consequential damages, including lost
        profits, arising from your use of the Services, even if advised of
        the possibility of such damages. Our total liability for any claim
        arising from the Services is limited to the amount you paid to
        BrainBox in the twelve months preceding the claim.
      </p>

      <h2>11. Disclaimer of Warranties</h2>
      <p>
        The Services are provided &quot;as is&quot; without warranties of
        any kind, express or implied, including but not limited to
        warranties of merchantability, fitness for a particular purpose, or
        non-infringement.
      </p>

      <h2>12. Termination</h2>
      <p>
        Either party may terminate an active engagement in accordance with
        the terms confirmed at enrollment. BrainBox reserves the right to
        suspend or terminate access to the Services for violation of these
        Terms, abusive conduct toward staff, or non-payment.
      </p>

      <h2>13. Confidentiality</h2>
      <p>
        Both parties agree to keep confidential any non-public business
        information shared during the engagement, except where disclosure
        is required by law.
      </p>

      <h2>14. Governing Law</h2>
      <p>
        These Terms are governed by the laws of the jurisdiction in which
        BrainBox Ecom Lab operates, without regard to conflict-of-law
        principles. Any disputes shall first be addressed through good-faith
        negotiation before pursuing formal proceedings.
      </p>

      <h2>15. Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. Material changes will
        be reflected by an updated &quot;Last updated&quot; date on this
        page. Continued use of the Services after changes take effect
        constitutes acceptance of the revised Terms.
      </p>

      <h2>16. Contact</h2>
      <p>
        Questions about these Terms can be directed to us via the{" "}
        <a href="/contact">contact page</a>.
      </p>
    </LegalLayout>
  );
}
