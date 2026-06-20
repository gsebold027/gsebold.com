import { Suspense, lazy } from 'react'

import HeroSection from '@/components/sections/HeroSection'

import SeoHead from './SeoHead'

const CareerSection = lazy(() => import('@/components/sections/CareerSection'))
const ContactSection = lazy(() => import('@/components/sections/ContactSection'))

const LandingPage = () => (
  <>
    <SeoHead />
    <HeroSection />
    <Suspense fallback={<div className="min-h-screen" />}>
      <CareerSection />
    </Suspense>
    <Suspense fallback={<div className="min-h-screen" />}>
      <ContactSection />
    </Suspense>
  </>
)

export default LandingPage
