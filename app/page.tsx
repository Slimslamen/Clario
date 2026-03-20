import Hero from '@/components/sections/Hero'
import Results from '@/components/sections/Results'
import Services from '@/components/sections/Services'
import Process from '@/components/sections/Process'
import SocialProof from '@/components/sections/SocialProof'
import CtaSection from '@/components/sections/CtaSection'
import Faq from '@/components/sections/Faq'
import Booking from '@/components/sections/Booking'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Results />
      <Services />
      <Process />
      <SocialProof />
      <CtaSection />
      <Faq />
      <Booking />
    </>
  )
}
