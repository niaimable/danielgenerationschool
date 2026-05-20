import { Link, useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => { setScrolled(window.scrollY > threshold); ticking = false; });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);
  return scrolled;
}

function LanguageToggle({ isScrolled }: { isScrolled: boolean }) {
  const { i18n } = useTranslation();
  const current = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const toggle = () => i18n.changeLanguage(current === 'en' ? 'fr' : 'en');

  return (
    <button
      onClick={toggle}
      title={current === 'en' ? 'Passer en français' : 'Switch to English'}
      className={`rounded overflow-hidden border transition-all hover:-translate-y-0.5 hover:scale-110 ${
        isScrolled ? 'border-stone-200 hover:border-school-maroon' : 'border-white/30 hover:border-white'
      }`}
    >
      <img
        src={current === 'en' ? 'https://flagcdn.com/w40/fr.png' : 'https://flagcdn.com/w40/gb.png'}
        alt={current === 'en' ? 'Français' : 'English'}
        className="w-6 h-4 object-cover block"
      />
    </button>
  );
}

const NAV_LINKS: { key: string; type: 'hash' | 'page'; id?: string; path?: string }[] = [
  { key: 'home',       type: 'hash', id: 'home' },
  { key: 'about',      type: 'hash', id: 'about' },
  { key: 'programs',   type: 'hash', id: 'programs' },
  { key: 'events',     type: 'hash', id: 'events' },
  { key: 'gallery',    type: 'hash', id: 'gallery' },
  { key: 'news',       type: 'hash', id: 'news' },
  { key: 'coreValues', type: 'page', path: '/core-values' },
  { key: 'faq',        type: 'page', path: '/faq' },
];

export function Navigation({ scrolled: forceScrolled }: { scrolled?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const internalScrolled = useScrolled(20);
  const scrolled = forceScrolled ?? internalScrolled;
  const location = useLocation();
  const isScrolled = forceScrolled || scrolled;
  const { t } = useTranslation();

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    setIsMenuOpen(false);
    if (location.pathname === '/') {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-8">

        {/* Logo — never shrinks */}
        <Link to="/" className="flex items-center gap-2.5 group hover:opacity-90 transition-opacity shrink-0">
          <div className="w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-xl overflow-hidden bg-white/10 shrink-0">
            <img src="/logo.jpg" alt="DGS Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer"
              onError={(e) => {
                const img = e.currentTarget;
                if (img.src.includes('/logo.jpg')) img.src = 'https://danielgenerationschool.rw/wp-content/uploads/2023/06/DGS-Logo.png';
                else { img.style.display = 'none'; (img.nextElementSibling as HTMLElement)?.classList.remove('hidden'); }
              }}
            />
            <div className="hidden w-full h-full bg-school-maroon flex items-center justify-center">
              <span className="text-white font-bold text-xs">DGS</span>
            </div>
          </div>
          <div className="flex flex-col leading-none gap-0.5">
            <span className={`font-serif text-sm md:text-base font-bold tracking-tight whitespace-nowrap transition-colors ${isScrolled ? 'text-school-maroon' : 'text-white'}`}>
              Daniel Generation <span className="italic text-school-tan">School</span>
            </span>
            <span className={`text-[7px] font-black uppercase tracking-[0.3em] transition-colors ${isScrolled ? 'text-stone-400' : 'text-white/40'}`}>
              Nursery · Primary · Kigali
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6 shrink-0">
          {NAV_LINKS.map((link) =>
            link.type === 'page' ? (
              <Link key={link.key} to={link.path!}
                className={`text-[10px] font-bold uppercase tracking-widest hover:text-school-tan transition-colors whitespace-nowrap ${isScrolled ? 'text-stone-600' : 'text-white'} ${location.pathname === link.path ? 'text-school-tan' : ''}`}>
                {t(`nav.${link.key}`)}
              </Link>
            ) : (
              <Link key={link.key} to={location.pathname === '/' ? `#${link.id}` : `/#${link.id}`}
                onClick={(e) => handleHashClick(e, link.id!)}
                className={`text-[10px] font-bold uppercase tracking-widest hover:text-school-tan transition-colors whitespace-nowrap ${isScrolled ? 'text-stone-600' : 'text-white'}`}>
                {t(`nav.${link.key}`)}
              </Link>
            )
          )}
          <div className="flex items-center gap-3 border-l border-current/20 pl-5 ml-1">
            <LanguageToggle isScrolled={isScrolled} />
            <Link to="/contact" className="px-5 py-2.5 bg-school-tan text-school-maroon text-xs font-black rounded-lg hover:shadow-xl hover:-translate-y-0.5 transition-all uppercase tracking-widest whitespace-nowrap">
              {t('nav.contact')}
            </Link>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3 lg:hidden shrink-0">
          <LanguageToggle isScrolled={isScrolled} />
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className={isScrolled ? 'text-school-maroon' : 'text-white'} /> : <Menu className={isScrolled ? 'text-school-maroon' : 'text-white'} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-white border-b shadow-xl lg:hidden overflow-hidden">
            <div className="flex flex-col p-6 gap-6">
              <div className="grid grid-cols-2 gap-4">
                {NAV_LINKS.map((link) =>
                  link.type === 'page' ? (
                    <Link key={link.key} to={link.path!} onClick={() => setIsMenuOpen(false)}
                      className={`text-xs font-bold uppercase tracking-widest text-school-maroon hover:text-school-tan transition-colors ${location.pathname === link.path ? 'text-school-tan' : ''}`}>
                      {t(`nav.${link.key}`)}
                    </Link>
                  ) : (
                    <Link key={link.key} to={location.pathname === '/' ? `#${link.id}` : `/#${link.id}`}
                      onClick={(e) => handleHashClick(e, link.id!)}
                      className="text-xs font-bold uppercase tracking-widest text-school-maroon hover:text-school-tan transition-colors">
                      {t(`nav.${link.key}`)}
                    </Link>
                  )
                )}
              </div>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}
                className="w-full py-4 bg-school-maroon text-white text-xs font-black uppercase tracking-widest rounded-xl text-center">
                {t('nav.contact')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer id="footer" className="bg-school-maroon text-white py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-20 mb-16 md:mb-24">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <img src="/logo.jpg" alt="DGS Logo" className="w-12 h-12 md:w-16 md:h-16 object-contain"
                onError={(e) => { const img = e.currentTarget; if (img.src.includes('/logo.jpg')) img.src = 'https://danielgenerationschool.rw/wp-content/uploads/2023/06/DGS-Logo.png'; else img.style.display = 'none'; }}
              />
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-serif font-bold">Daniel Generation School</span>
                <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-school-tan">DGS • Nursery & Primary</span>
              </div>
            </div>
            <p className="text-white/60 text-base leading-relaxed max-w-md mb-8">{t('footer.tagline')}</p>
            <div className="flex gap-4">
              <a href="https://x.com/dgs_rw" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white hover:bg-school-tan hover:text-school-maroon hover:border-school-tan transition-all"><X className="w-4 h-4" /></a>
              <a href="https://www.instagram.com/daniel_generation_school" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white hover:bg-school-tan hover:text-school-maroon hover:border-school-tan transition-all"><Instagram className="w-4 h-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-school-tan mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 mb-8">
              {NAV_LINKS.map((link) => (
                <li key={link.key}>
                  {link.type === 'page'
                    ? <Link to={link.path!} className="text-white/60 text-xs hover:text-school-tan transition-colors font-bold uppercase tracking-widest">{t(`nav.${link.key}`)}</Link>
                    : <Link to={`/#${link.id}`} className="text-white/60 text-xs hover:text-school-tan transition-colors font-bold uppercase tracking-widest">{t(`nav.${link.key}`)}</Link>
                  }
                </li>
              ))}
            </ul>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-school-tan mb-4">{t('footer.visitUs')}</h4>
            <ul className="space-y-3">
              <li className="flex gap-3"><MapPin className="w-4 h-4 text-school-tan shrink-0 mt-0.5" /><span className="text-white/60 text-xs leading-relaxed">Rwanda, Kigali City, Gasabo District, Kagugu, KG 24 Av, No 38</span></li>
              <li className="flex gap-3"><Phone className="w-4 h-4 text-school-tan shrink-0" /><span className="text-white/60 text-xs">+250796707019</span></li>
              <li className="flex gap-3"><Mail className="w-4 h-4 text-school-tan shrink-0" /><span className="text-white/60 text-xs">info@danielgenerationschool.rw</span></li>
            </ul>
          </div>

          <div className="bg-white/5 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-school-tan mb-4">{t('footer.message')}</h4>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder={t('footer.emailPlaceholder')} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-[10px] text-white placeholder:text-white/30 focus:outline-none focus:border-school-tan transition-colors" />
              <textarea placeholder={t('footer.messagePlaceholder')} rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-[10px] text-white placeholder:text-white/30 focus:outline-none focus:border-school-tan transition-colors resize-none" />
              <button className="w-full py-3 bg-white text-school-maroon text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-school-tan transition-all">{t('footer.submit')}</button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-white/40 font-bold uppercase tracking-widest text-[9px]">
          <p>{t('footer.rights')}</p>
          <div className="flex gap-6">
            {(['privacy', 'legal', 'admissions'] as const).map(item => (
              <a key={item} href="#" className="hover:text-school-tan transition-colors">{t(`footer.${item}`)}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}