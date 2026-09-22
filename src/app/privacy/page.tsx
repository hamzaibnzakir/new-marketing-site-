export const metadata = {
  title: "Privacy & Analytics | BrainBox Ecom Lab",
  description: "How BrainBox Ecom Lab uses privacy-safe analytics and marketing measurement.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 text-white">
      <h1 className="text-4xl font-semibold">Privacy & Analytics</h1>
      <p className="mt-6 text-white/70">BrainBox Ecom Lab uses a first-party analytics service to understand aggregate visits, navigation, application funnel progress, and service-request outcomes across our sites.</p>
      <h2 className="mt-10 text-2xl font-semibold">What is collected</h2>
      <p className="mt-3 text-white/70">If you accept analytics, we collect a rotating visitor identifier, a short-lived session identifier, site and page identifiers, coarse device type and screen dimensions, referring site, and campaign labels such as UTM source and medium. We do not send names, email addresses, phone numbers, passwords, application answers, service descriptions, payment data, or form bodies to analytics.</p>
      <h2 className="mt-10 text-2xl font-semibold">Choices and retention</h2>
      <p className="mt-3 text-white/70">Analytics is off until you select “Accept analytics” in the privacy dialog. Selecting “Decline” prevents telemetry from being sent. You can revoke consent by clearing the site’s local storage and cookies, then selecting Decline when the dialog returns. Operational event data is retained only for measurement and service-improvement purposes and is not sold.</p>
      <h2 className="mt-10 text-2xl font-semibold">Other processors</h2>
      <p className="mt-3 text-white/70">Applications continue to be submitted to our existing review workflow, and expert requests continue to be submitted to Formspree. Those processors receive the form fields required to handle the request; those fields are not copied into analytics. The marketing site may also load Meta Pixel only after the same analytics consent is granted.</p>
      <p className="mt-10 text-sm text-white/50">Last updated: September 2026</p>
    </main>
  );
}
