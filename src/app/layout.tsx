import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "BrainBox Ecom Lab — Scale Your Dropshipping Business",
    template: "%s | BrainBox Ecom Lab",
  },
  description:
    "BrainBox Ecom Lab is a hands-on e-commerce mentorship program. We build your store, run AI-driven ad strategy, and mentor you directly to launch, scale, and automate a profitable dropshipping business.",
  keywords: [
    "dropshipping mentorship",
    "ecommerce mentorship",
    "Shopify mentorship",
    "dropshipping coaching",
    "AI ad strategy",
    "BrainBox Ecom Lab",
  ],
  metadataBase: new URL("https://brainboxecomlab.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    title: "BrainBox Ecom Lab — Scale Your Dropshipping Business",
    description:
      "Real stores. Real revenue. We build, run the ads, and mentor you directly — no theory-only courses, no guesswork.",
    url: "https://brainboxecomlab.com",
    siteName: "BrainBox Ecom Lab",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "BrainBox Ecom Lab — Scale Your Dropshipping Business",
    description:
      "Real stores. Real revenue. We build, run the ads, and mentor you directly.",
  },
  icons: {
    icon: "/B.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        {/* Structured data — helps AI answer engines (GEO/AEO) and
            search engines understand who/what this site is without
            having to infer it from prose. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "BrainBox Ecom Lab",
              url: "https://brainboxecomlab.com",
              logo: "https://brainboxecomlab.com/B.png",
              description:
                "BrainBox Ecom Lab is a hands-on e-commerce mentorship program helping students launch, scale, and automate profitable dropshipping businesses through direct mentorship and AI-driven ad strategy.",
              sameAs: [],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "BrainBox Ecom Lab",
              url: "https://brainboxecomlab.com",
            }),
          }}
        />
        {/* Meta Pixel — carried over from legacy site */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1326208752933292');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1326208752933292&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
