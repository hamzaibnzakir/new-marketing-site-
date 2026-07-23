import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Refund Policy for BrainBox Ecom Lab's mentorship program.",
  alternates: { canonical: "/refund" },
};

export default function RefundPage() {
  return (
    <LegalLayout title="Refund Policy" updated="July 23, 2026">
      <h2>1. Overview</h2>
      <p>
        This Refund Policy applies to payments made for BrainBox Ecom Lab
        mentorship and related services. Because the scope of each
        engagement is confirmed individually after application, refund
        eligibility depends on the specific agreement made with you at
        enrollment — this page describes the general principles that apply
        across all engagements.
      </p>

      <h2>2. Nature of the Services</h2>
      <p>
        Mentorship, strategy guidance, and store-build work are
        time-and-labor-based services delivered directly to you. Because
        work typically begins shortly after enrollment and involves real
        time from mentors and staff, refunds are handled differently than a
        standard retail return.
      </p>

      <h2>3. Refund Eligibility</h2>
      <p>Refund requests are evaluated based on:</p>
      <ul>
        <li>
          <strong>Before work begins:</strong> If no mentorship sessions
          have taken place and no build work has started, a full refund
          request submitted within 7 days of payment will generally be
          honored.
        </li>
        <li>
          <strong>After work has started:</strong> Once mentorship sessions
          have been delivered or store-build work is underway, payments
          become non-refundable for the portion of work already completed
          or scheduled, reflecting time and resources already committed.
        </li>
        <li>
          <strong>Non-refundable costs:</strong> Any third-party costs paid
          on your behalf or by you directly — including ad spend, Shopify
          subscription fees, app fees, or domain/hosting costs — are never
          refundable through BrainBox, as these are paid to third parties
          outside our control.
        </li>
      </ul>

      <h2>4. How to Request a Refund</h2>
      <p>
        To request a refund, contact us through the{" "}
        <a href="/contact">contact page</a> with your name, the email used
        at enrollment, and the reason for your request. We aim to respond
        to all refund requests within 5 business days.
      </p>

      <h2>5. No Guarantee of Business Results</h2>
      <p>
        Refunds are not issued on the basis of business results (e.g. sales
        volume, ad performance, or profitability), as these depend on
        factors outside BrainBox&apos;s control, including your own
        execution, market conditions, and third-party platform behavior.
        This is addressed in full in our{" "}
        <a href="/terms">Terms of Service</a>.
      </p>

      <h2>6. Chargebacks</h2>
      <p>
        We ask that you contact us directly before filing a chargeback with
        your bank or payment provider — most concerns can be resolved
        faster this way. Filing a chargeback for services already delivered
        may result in suspension of ongoing support while the dispute is
        resolved.
      </p>

      <h2>7. Processing Time</h2>
      <p>
        Approved refunds are processed back to the original payment method
        within 10 business days of approval. Depending on your bank or
        card issuer, it may take additional time for the refund to appear
        on your statement.
      </p>

      <h2>8. Changes to This Policy</h2>
      <p>
        We may update this Refund Policy from time to time. Material
        changes will be reflected by an updated &quot;Last updated&quot;
        date on this page.
      </p>

      <h2>9. Contact</h2>
      <p>
        Questions about this policy can be directed to us via the{" "}
        <a href="/contact">contact page</a>.
      </p>
    </LegalLayout>
  );
}
