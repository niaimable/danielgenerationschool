import { Link, useLocation } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';

function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > threshold);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
}

/* ─────────────────────────────────────────────
   NAV LINK DEFINITIONS
   type: 'hash'  → scrolls to section on homepage
   type: 'page'  → navigates to a dedicated route
───────────────────────────────────────────── */
const navLinks: { name: string; type: 'hash' | 'page'; id?: string; path?: string }[] = [
  { name: 'Home',         type: 'hash', id: 'home' },
  { name: 'About Us',     type: 'hash', id: 'about' },
  { name: 'Programs',     type: 'hash', id: 'programs' },
  { name: 'Events',       type: 'hash', id: 'events' },
  { name: 'Gallery',      type: 'hash', id: 'gallery' },
  { name: 'News',         type: 'hash', id: 'news' },
  { name: 'Core Values',  type: 'page', path: '/core-values' },
  { name: 'FAQ',          type: 'page', path: '/faq' },
];

export function Navigation({ scrolled: forceScrolled }: { scrolled?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const internalScrolled = useScrolled(20);
  const scrolled = forceScrolled ?? internalScrolled;
  const location = useLocation();
  const isScrolled = forceScrolled || scrolled;

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    setIsMenuOpen(false);
    if (location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group hover:opacity-90 transition-opacity">
          <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl overflow-hidden bg-white/10 shrink-0">
            <img
              src="/logo.jpg"
              alt="DGS Logo"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const img = e.currentTarget;
                if (img.src.includes('/logo.jpg')) {
                  img.src = 'https://danielgenerationschool.rw/wp-content/uploads/2023/06/DGS-Logo.png';
                } else {
                  img.style.display = 'none';
                  (img.nextElementSibling as HTMLElement)?.classList.remove('hidden');
                }
              }}
            />
            <div className="hidden w-full h-full bg-school-maroon flex items-center justify-center">
              <span className="text-white font-bold text-xs">DGS</span>
            </div>
          </div>
          {/* Redesigned text lockup */}
          <div className="flex flex-col leading-none gap-0.5">
            <span className={`font-serif text-sm md:text-base font-bold tracking-tight whitespace-nowrap transition-colors ${isScrolled ? 'text-school-maroon' : 'text-white'}`}>
              Daniel Generation <span className={`italic ${isScrolled ? 'text-school-tan' : 'text-school-tan'}`}>School</span>
            </span>
            <span className={`text-[7px] font-black uppercase tracking-[0.3em] transition-colors ${isScrolled ? 'text-stone-400' : 'text-white/40'}`}>
              Nursery · Primary · Kigali
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) =>
            link.type === 'page' ? (
              /* Page links — just navigate */
              <Link
                key={link.name}
                to={link.path!}
                className={`text-[10px] font-bold uppercase tracking-widest hover:text-school-tan transition-colors ${
                  isScrolled ? 'text-stone-600' : 'text-white'
                } ${location.pathname === link.path ? 'text-school-tan' : ''}`}
              >
                {link.name}
              </Link>
            ) : (
              /* Hash links — scroll on homepage, navigate via hash elsewhere */
              <Link
                key={link.name}
                to={location.pathname === '/' ? `#${link.id}` : `/#${link.id}`}
                onClick={(e) => handleHashClick(e, link.id!)}
                className={`text-[10px] font-bold uppercase tracking-widest hover:text-school-tan transition-colors ${
                  isScrolled ? 'text-stone-600' : 'text-white'
                }`}
              >
                {link.name}
              </Link>
            )
          )}

          {/* CTA */}
          <div className="border-l border-current/20 pl-6">
            <Link
              to="/#footer"
              onClick={(e) => handleHashClick(e, 'footer')}
              className="px-5 py-2.5 bg-school-tan text-school-maroon text-xs font-black rounded-lg hover:shadow-xl hover:-translate-y-0.5 transition-all uppercase tracking-widest"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen
            ? <X className={isScrolled ? 'text-school-maroon' : 'text-white'} />
            : <Menu className={isScrolled ? 'text-school-maroon' : 'text-white'} />
          }
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-white border-b shadow-xl lg:hidden overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              <div className="grid grid-cols-2 gap-4">
                {navLinks.map((link) =>
                  link.type === 'page' ? (
                    <Link
                      key={link.name}
                      to={link.path!}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-xs font-bold uppercase tracking-widest text-school-maroon hover:text-school-tan transition-colors ${
                        location.pathname === link.path ? 'text-school-tan' : ''
                      }`}
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <Link
                      key={link.name}
                      to={location.pathname === '/' ? `#${link.id}` : `/#${link.id}`}
                      onClick={(e) => handleHashClick(e, link.id!)}
                      className="text-xs font-bold uppercase tracking-widest text-school-maroon hover:text-school-tan transition-colors"
                    >
                      {link.name}
                    </Link>
                  )
                )}
              </div>
              <Link
                to="/#footer"
                onClick={(e) => handleHashClick(e, 'footer')}
                className="w-full py-4 bg-school-maroon text-white text-xs font-black uppercase tracking-widest rounded-xl text-center"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export function Footer() {
  return (
    <footer id="footer" className="bg-school-maroon text-white py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-20 mb-16 md:mb-24">
          <div>
            <div className="flex items-center gap-4 mb-8 md:mb-10">
              <div className="relative">
                <img
                  src="/logo.jpg"
                  alt="DGS Logo"
                  className="w-12 h-12 md:w-16 md:h-16 object-contain"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (img.src.includes('/logo.jpg')) {
                      img.src = 'https://danielgenerationschool.rw/wp-content/uploads/2023/06/DGS-Logo.png';
                    } else {
                      img.style.display = 'none';
                      (img.nextElementSibling as HTMLElement)?.classList.remove('hidden');
                    }
                  }}
                />
                <div className="hidden w-10 h-10 md:w-12 md:h-12 bg-school-tan flex items-center justify-center rounded-xl md:rounded-2xl">
                  <span className="text-school-maroon font-bold">DGS</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-serif font-bold tracking-tight">Daniel Generation School</span>
                <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase text-school-tan">DGS • Nursery & Primary</span>
              </div>
            </div>
            <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-md mb-8 md:mb-10">
              A community-focused institution dedicated to nurturing the next generation of global citizens right here in Rwanda.
            </p>
            <div className="flex gap-4">
              <a href="https://x.com/dgs_rw" target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl border border-white/10 flex items-center justify-center text-white hover:bg-school-tan hover:text-school-maroon hover:border-school-tan transition-all">
                <X className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/daniel_generation_school" target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl border border-white/10 flex items-center justify-center text-white hover:bg-school-tan hover:text-school-maroon hover:border-school-tan transition-all">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-school-tan mb-6 md:mb-8">Quick Links</h4>
            <ul className="space-y-3 mb-8">
              {navLinks.map((link) =>
                link.type === 'page' ? (
                  <li key={link.name}>
                    <Link to={link.path!} className="text-white/60 text-xs hover:text-school-tan transition-colors font-bold uppercase tracking-widest">
                      {link.name}
                    </Link>
                  </li>
                ) : (
                  <li key={link.name}>
                    <Link to={`/#${link.id}`} className="text-white/60 text-xs hover:text-school-tan transition-colors font-bold uppercase tracking-widest">
                      {link.name}
                    </Link>
                  </li>
                )
              )}
            </ul>
            <h4 className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-school-tan mb-4">Visit Us</h4>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-school-tan shrink-0 mt-0.5" />
                <span className="text-white/60 text-xs leading-relaxed">Rwanda, Kigali City, Gasabo District, Kagugu, KG 24 Av, No 38</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 text-school-tan shrink-0" />
                <span className="text-white/60 text-xs">+250796707019</span>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 text-school-tan shrink-0" />
                <span className="text-white/60 text-xs">info@danielgenerationschool.rw</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/10">
            <h4 className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-school-tan mb-4 md:mb-6">MESSAGE US</h4>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-[10px] text-white placeholder:text-white/30 focus:outline-none focus:border-school-tan transition-colors"
              />
              <textarea
                placeholder="Message"
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-[10px] text-white placeholder:text-white/30 focus:outline-none focus:border-school-tan transition-colors resize-none"
              />
              <button className="w-full py-3 bg-white text-school-maroon text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-school-tan transition-all active:scale-95 shadow-lg">
                SUBMIT
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left text-white/40 font-bold uppercase tracking-widest text-[9px] md:text-[10px]">
          <p>© 2026 Daniel Generation School (DGS). All Rights Reserved.</p>
          <div className="flex gap-6 md:gap-8">
            {['Privacy', 'Legal', 'Admissions'].map(item => (
              <a key={item} href="#" className="hover:text-school-tan transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}