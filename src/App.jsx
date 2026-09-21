import { useCallback, useEffect, useRef, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import WhyChooseUs from './components/WhyChooseUs'
import Treatments from './components/Treatments'
import BeforeAfter from './components/BeforeAfter'
import Reviews from './components/Reviews'
import FAQ from './components/FAQ'
import FinalCTA from './components/FinalCTA'
import MobileStickyBar from './components/MobileStickyBar'
import Footer from './components/Footer'
import FormPopup from './components/FormPopup'
import OfferPopup from './components/OfferPopup'
import CallingPopup from './components/CallingPopup'
import ThankYouPage from './components/ThankYouPage'
import { NAV_LINKS } from './data/site'

const FORM_POPUP_DELAY_MS = 3000
const OFFER_POPUP_DELAY_MS = 600
const isThankYouPage = window.location.pathname.replace(/\/+$/, '').endsWith('/thank-you')

function App() {
  if (isThankYouPage) {
    return <ThankYouPage />
  }

  return <Landing />
}

function Landing() {
  const [formPopupOpen, setFormPopupOpen] = useState(false)
  const [offerPopupOpen, setOfferPopupOpen] = useState(false)
  const [callingPopupOpen, setCallingPopupOpen] = useState(false)
  const offerShownRef = useRef(false)

  useEffect(() => {
    const path = window.location.pathname
    const link = NAV_LINKS.find((l) => l.path === path)
    if (!link || link.href === '#home') return

    let attempts = 0
    const tryScroll = () => {
      const target = document.querySelector(link.href)
      if (target) {
        target.scrollIntoView({ behavior: 'auto', block: 'start' })
      } else if (attempts < 20) {
        attempts += 1
        requestAnimationFrame(tryScroll)
      }
    }
    requestAnimationFrame(tryScroll)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormPopupOpen(true)
    }, FORM_POPUP_DELAY_MS)

    return () => clearTimeout(timer)
  }, [])

  const closeFormPopup = useCallback(() => {
    setFormPopupOpen(false)
    if (!offerShownRef.current) {
      offerShownRef.current = true
      setTimeout(() => setOfferPopupOpen(true), OFFER_POPUP_DELAY_MS)
    }
  }, [])

  const closeOfferPopup = useCallback(() => setOfferPopupOpen(false), [])

  const openCallingPopup = useCallback(() => setCallingPopupOpen(true), [])
  const closeCallingPopup = useCallback(() => setCallingPopupOpen(false), [])

  const scrollToForm = useCallback(() => {
    document.querySelector('#booking-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <>
      <Header onBookClick={scrollToForm} onCallClick={openCallingPopup} />
      <main>
        <Hero onCallClick={openCallingPopup} />
        <WhyChooseUs />
        <Treatments onCtaClick={scrollToForm} />
        <BeforeAfter onCtaClick={scrollToForm} />
        <Reviews onCallClick={openCallingPopup} />
        <FAQ />
        <FinalCTA onBookClick={scrollToForm} />
      </main>
      <Footer />
      <MobileStickyBar onBookClick={scrollToForm} onCallClick={openCallingPopup} />
      <FormPopup open={formPopupOpen} onClose={closeFormPopup} onCallClick={openCallingPopup} />
      <OfferPopup open={offerPopupOpen} onClose={closeOfferPopup} />
      <CallingPopup open={callingPopupOpen} onClose={closeCallingPopup} />
    </>
  )
}

export default App
