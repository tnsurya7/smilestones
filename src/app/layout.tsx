import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smilestones - A Centre for Child Development and Learning",
  description: "Professional child development centre providing assessment, therapy, training, and counseling for children with developmental delays, learning difficulties, speech disorders, autism, ADHD, and emotional/behavioral challenges.",
  keywords: "child development, autism therapy, speech therapy, occupational therapy, ABA therapy, ADHD support, learning disabilities, Chennai, Anna Nagar, Trustpuram, Puducherry",
  authors: [{ name: "Dr. P. Sudhakar" }],
  openGraph: {
    title: "Smilestones - Helping Children Reach Their Full Potential",
    description: "Professional child development centre led by Dr. P. Sudhakar, the first developmental pediatrician in India licensed to practice Applied Behavior Analysis.",
    type: "website",
    locale: "en_US",
    url: "https://smilestones.com",
    siteName: "Smilestones",
    images: [
      {
        url: "https://smilestones.com/smilestones-logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Smilestones Child Development Centre",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smilestones - Child Development Centre",
    description: "Helping children reach their full potential through professional therapy and support.",
    images: ["https://smilestones.com/smilestones-logo.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FFD43B" />
        <StructuredData />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
