import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SITE_NAME, SITE_DESCRIPTION, SEO_KEYWORDS } from '@/lib/constants'; // Import constants

const geistSans = GeistSans;
const geistMono = GeistMono;

// Use constants for metadata
export const metadata: Metadata = {
  title: `${SITE_NAME} - Your Partner in AI Integration`, 
  description: SITE_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  // Consider adding openGraph and twitter metadata here for global defaults
  // openGraph: {
  //   type: 'website',
  //   locale: 'en_US',
  //   url: SITE_URL, // Make sure SITE_URL is defined in constants
  //   siteName: SITE_NAME,
  //   title: `${SITE_NAME} - Your Partner in AI Integration`,
  //   description: SITE_DESCRIPTION,
  //   // images: [
  //   //   {
  //   //     url: `${SITE_URL}/og-image.png`, // Provide a default OG image
  //   //     width: 1200,
  //   //     height: 630,
  //   //     alt: `${SITE_NAME} Logo`,
  //   //   },
  //   // ],
  // },
  // twitter: {
  //   card: 'summary_large_image',
  //   site: TWITTER_HANDLE, // Make sure TWITTER_HANDLE is defined in constants
  //   title: `${SITE_NAME} - Your Partner in AI Integration`,
  //   description: SITE_DESCRIPTION,
  //   // images: [`${SITE_URL}/twitter-image.png`], // Provide a default Twitter image
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark"> 
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
