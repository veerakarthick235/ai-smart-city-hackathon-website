import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://ai-smart-city-hackathon-website.vercel.app"
  ),

  title: {
    default: "Innovation Hacks — Building the Future Through Hackathons",
    template: "%s | Innovation Hacks",
  },

  description:
    "Innovation Hacks is a global hackathon platform bringing together innovators, developers, AI enthusiasts, and future builders to solve real-world challenges.",

  keywords: [
    "Innovation Hacks",
    "Hackathon",
    "AI Hackathon",
    "Smart City",
    "Artificial Intelligence",
    "Machine Learning",
    "IoT",
    "Technology",
    "Innovation",
    "Coding Competition",
    "Student Hackathon",
    "Global Hackathon",
  ],

  authors: [
    {
      name: "Innovation Hacks",
    },
  ],

  creator: "Innovation Hacks",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ai-smart-city-hackathon-website.vercel.app",
    siteName: "Innovation Hacks",
    title: "Innovation Hacks — Building the Future Through Hackathons",
    description:
      "Join global hackathons and build AI-powered solutions for real-world challenges.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Innovation Hacks",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Innovation Hacks",
    description:
      "Join global hackathons and build AI-powered solutions for real-world challenges.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  manifest: "/manifest.json",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <meta
          name="theme-color"
          content="#0A0A1A"
        />
      </head>

      <body>
        <ThemeScript />
        {children}
      </body>
    </html>
  );
}

function ThemeScript() {
  const script = `
    (function () {
      try {
        const theme =
          localStorage.getItem("theme") || "dark";

        document.documentElement.setAttribute(
          "data-theme",
          theme
        );
      } catch (e) {
        console.error(e);
      }
    })();
  `;

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: script,
      }}
    />
  );
}