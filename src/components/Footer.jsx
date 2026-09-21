import { PhoneCall, MapPin, Clock, Share2, Camera, PlayCircle } from 'lucide-react'
import { CLINIC, NAV_LINKS } from '../data/site'
import footerLogo from '../assets/images/footer-logo.png'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__col footer__brand">
          <a href="#home" className="footer__logo">
            <img src={footerLogo} alt={`${CLINIC.name} logo`} className="footer__logo-img" />
          </a>
          <p>
            Krishnagiri&apos;s trusted destination for advanced acne, pigmentation, laser
            and anti-ageing skin treatments.
          </p>
          <div className="footer__socials">
            <a href="#" aria-label="Facebook"><Share2 size={17} /></a>
            <a href="#" aria-label="Instagram"><Camera size={17} /></a>
            <a href="#" aria-label="YouTube"><PlayCircle size={17} /></a>
          </div>
        </div>

        <div className="footer__col">
          <h4>Quick Links</h4>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Contact</h4>
          <ul className="footer__contact">
            <li>
              <PhoneCall size={16} />
              <a href={CLINIC.phoneHref}>{CLINIC.phoneDisplay}</a>
            </li>
            <li>
              <MapPin size={16} />
              <span>{CLINIC.address}</span>
            </li>
            <li>
              <Clock size={16} />
              <span>Mon &ndash; Sun: 9:00 AM &ndash; 8:00 PM</span>
            </li>
          </ul>
        </div>

        <div className="footer__col footer__col--map">
          <h4>Find Us</h4>
          <p className="footer__map-address">
            <MapPin size={15} />
            <span>{CLINIC.address}</span>
          </p>
          <a
            className="footer__map"
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CLINIC.address)}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Open clinic location in Google Maps"
          >
            <iframe
              title="Advanced Gloskin Clinic location"
              src={CLINIC.mapEmbedSrc}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </a>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>&copy; {new Date().getFullYear()} {CLINIC.name}, {CLINIC.location}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
