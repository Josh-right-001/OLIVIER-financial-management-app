import type React from "react"
import type { Metadata } from "next"

import "./globals.css"

import { Poppins, Geist, Geist_Mono } from "next/font/google"

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

const geist = Geist({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-geist",
})

const geistMono = Geist_Mono({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Aksanti OLIVIER - Gestion Financière",
  description: "Application de gestion financière, logistique et RH pour PME et chantiers",
  icons: {
    icon: "/logo.jpg",
  },
  openGraph: {
    title: "Aksanti OLIVIER - Gestion Financière",
    description: "Application de gestion financière, logistique et RH pour PME et chantiers",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Aksanti OLIVIER Logo",
      },
    ],
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aksanti OLIVIER - Gestion Financière",
    description: "Application de gestion financière, logistique et RH pour PME et chantiers",
    images: ["/logo.jpg"],
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${poppins.variable} ${geist.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
