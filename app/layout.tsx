import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GeistPixelSquare } from "geist/font/pixel";
import { ThemeProvider } from "@/components/ThemeProvider";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const geistPixel = GeistPixelSquare;

// Auto-detect production URL, Vercel preview URL, or local domain
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://ayushxpundir.vercel.app");

const ogImageUrl = `${siteUrl}/og-image.png?v=3`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ayush Pundir | Portfolio",
    template: "%s | Ayush Pundir",
  },
  description:
    "Personal portfolio and project showcase of Ayush Pundir — Developer specializing in web applications and machine learning integration.",
  keywords: [
    "Ayush Pundir",
    "Developer",
    "Machine Learning Engineer",
    "Next.js Developer",
    "Python Developer",
    "Software Portfolio",
  ],
  authors: [{ name: "Ayush Pundir", url: siteUrl }],
  creator: "Ayush Pundir",
  publisher: "Ayush Pundir",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Ayush Pundir | Developer",
    description:
      "Explore projects, web applications, and development experience by Ayush Pundir.",
    siteName: "Ayush Pundir Portfolio",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Ayush Pundir - Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayush Pundir | Developer",
    description:
      "Explore projects, web applications, and development experience by Ayush Pundir.",
    images: [ogImageUrl],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Ayush Pundir",
        jobTitle: "Developer",
        url: siteUrl,
        sameAs: [
          "https://github.com/ayushpundir",
          "https://linkedin.com/in/ayushpundir",
        ],
        knowsAbout: [
          "Artificial Intelligence",
          "Machine Learning",
          "Python",
          "Next.js",
          "Development",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Ayush Pundir Portfolio",
        description:
          "Personal portfolio and showcase of and web development projects by Ayush Pundir.",
        publisher: {
          "@id": `${siteUrl}/#person`,
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${geistPixel.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        (function() {
          try {
            var stored = localStorage.getItem('theme');
            var theme = stored || 'system';
            var isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
            document.documentElement.classList.toggle('dark', isDark);
          } catch (e) {}
        })();
      `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="bg-zinc-50 dark:bg-neutral-900 min-h-full">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}