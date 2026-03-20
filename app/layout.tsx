import type { Metadata } from 'next'
import '@/styles/globals.css'
import { LangProvider } from '@/lib/lang'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import CookieBanner from '@/components/ui/CookieBanner'

export const metadata: Metadata = {
  title: 'Clario – AI-driven automatisering för moderna företag',
  description:
    'Clario hjälper svenska kliniker och företag att automatisera reception, bokning och kundkommunikation med AI. Boka en gratis demo idag.',
  keywords: 'AI automatisering, AI receptionist, bokningsautomation, CRM integration, Sverige',
  authors: [{ name: 'Clario' }],
  openGraph: {
    title: 'Clario – AI-driven automatisering',
    description: 'Automatisera din reception, bokning och kundkommunikation med Clario.',
    type: 'website',
    locale: 'sv_SE',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body>
        <LangProvider>
          <Navbar />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <CookieBanner />
        </LangProvider>
      </body>
    </html>
  )
}
