import type { Metadata } from "next";
import { Syne, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import ScrollRefresh from "@/components/ScrollRefresh";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "BrainBox Ecom Lab — 1-on-1 Dropshipping Mentorship",
    template: "%s | BrainBox Ecom Lab",
  },
  description:
    "Build a Shopify store that actually sells. BrainBox Ecom Lab builds your store with you, runs AI-assisted Meta ads alongside you, and mentors you 1-on-1 on your actual store.",
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
    title: "BrainBox Ecom Lab — Build a store that actually sells",
    description:
      "1-on-1 dropshipping mentorship. We build your store with you, run the ads alongside you, and mentor you on your actual store.",
    url: "https://brainboxecomlab.com",
    siteName: "BrainBox Ecom Lab",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "BrainBox Ecom Lab — Build a store that actually sells",
    description:
      "1-on-1 dropshipping mentorship. We build your store with you, run the ads alongside you, and mentor you on your actual store.",
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
      className={`${syne.variable} ${dmSans.variable} ${plexMono.variable} h-full antialiased`}
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
            function loadMetaPixel(){if(localStorage.getItem('bb_analytics_consent')!=='granted'||window.fbq)return;!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1326208752933292');fbq('track', 'PageView');}
            loadMetaPixel();window.addEventListener('bb:consent-granted',loadMetaPixel);
          `}
        </Script>
        <Script src="/brainbox.js" strategy="afterInteractive" data-site-id="main_marketing" data-endpoint="https://analytics-api.brainboxecomlab.com/api/v1/events" />
        <Script id="brainbox-analytics-init" strategy="afterInteractive">
          {`window.addEventListener('load',function(){if(window.brainbox)window.brainbox.init({siteId:'main_marketing',endpoint:'https://analytics-api.brainboxecomlab.com/api/v1/events',consentRequired:true});});`}
        </Script>
        <ScrollRefresh />
        {children}
      </body>
    </html>
  );
}
