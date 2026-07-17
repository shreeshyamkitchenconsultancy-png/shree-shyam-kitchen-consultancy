import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata, Viewport } from 'next'
import { Montserrat, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Header } from "@/components/sections/header";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { MotionProvider } from "@/components/ui/motion-provider";

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shreeshyamkitchenconsultancy.com"),

  alternates: {
    canonical: "/",
  },
  title: 'Shree Shyam Kitchen Consultancy | Restaurant & Kitchen Consulting Experts',
  description: 'End-to-end restaurant consultancy for cafes, restaurants, cloud kitchens, bakeries, resorts & hospitality ventures across India. 10+ years experience, 15+ projects delivered.',
  keywords: 'restaurant consultancy, restaurant consultant Jaipur, kitchen design consultancy, cloud kitchen setup, cafe consultancy, menu engineering, restaurant operations consultancy, hospitality consultancy India',
  authors: [{ name: 'Shree Shyam Kitchen Consultancy' }],
  creator: 'Shree Shyam Kitchen Consultancy',

  verification: {
    google: 'Y3EkA-NueLZX4l7i4UZRINQ_7LQKFIGWtaWgAFX54t0',
  },

  openGraph: {
    title: 'Shree Shyam Kitchen Consultancy | Transform Your Restaurant Ideas Into Profitable Businesses',
    description: 'End-to-end restaurant consultancy services including kitchen design, menu engineering, staff training, and operations management.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shree Shyam Kitchen Consultancy',
    description: 'Transform your restaurant ideas into profitable hospitality businesses.',
  },
  icons: {
  icon: '/favicon-32x32.png',
  apple: '/favicon-32x32.png',
},
}

export const viewport: Viewport = {
  themeColor: '#fc7f2b',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased">
  <MotionProvider>
  <Header />
  
  <WhatsAppButton />
  
  {children}
  </MotionProvider>

  <GoogleTagManager gtmId="GTM-PZB7TBNL" />
<Analytics />
<SpeedInsights />
  </body>
    </html>
  )
}
