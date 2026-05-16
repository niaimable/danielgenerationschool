import { Link, Routes, Route, useLocation, useParams, Navigate } from 'react-router-dom';
import {
  ChevronRight, ChevronLeft, BookOpen, Atom, Users, CheckCircle2,
  Calendar, Camera, ChevronDown, ChevronUp, GraduationCap, MapPin,
  ArrowUpRight, Quote, Wifi, Utensils, TreePine, Heart, Star, Mail
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { PROGRAMS, EVENTS, GALLERY_IMAGES, FAQS } from './constants';

// ── Real DGS news stories from Instagram ──────────────────────────────────────
const NEWS_STORIES = [
  {
    id: 'nursery-day',
    title: 'A Typical Day in Our Nursery Class',
    date: 'May 2025',
    excerpt: 'A fresh breakfast prepared the same day, outdoor play, art, stories, and movement — discover what a full, joyful day looks like for our youngest learners at DGS.',
    image: '/assets/Image/1.jpeg',
    content: `
      At Daniel Generation School, every day in our nursery is thoughtfully crafted to nourish the whole child.

      The morning begins with a fresh breakfast, prepared the very same day, fueling growing bodies for a day of discovery. Outdoor play follows — children run, explore, and laugh under caring supervision, building confidence and coordination with every step.

      After break, the classroom comes alive with art, singing, storytelling, and movement. These are not simply activities — they are the building blocks of language, creativity, and emotional intelligence.

      The day ends peacefully, hearts full of discoveries, ready to return tomorrow.
    `,
    link: 'https://www.instagram.com/p/DU7uHhNjV0i/?img_index=6&igsh=ank1Nmg3YW45dWY0',
  },
  {
    id: 'discipleship',
    title: 'Discipleship in Our School Community',
    date: 'February 2025',
    excerpt: 'From KG1 to G3, we guide our learners in growing their faith, building strong values, and developing a personal relationship with God — this month, through the story of Daniel.',
    image: '/assets/Image/2.jpeg',
    content: `
      Discipleship is an essential part of our Christian education at Daniel Generation School.

      From KG1 to G3, we guide our learners in growing their faith, building strong values, and developing a personal relationship with God. We also extend this time of growth to our staff, strengthening our entire school community.

      This February, our discipleship classes explored the story of Daniel — his faithfulness, courage, and obedience to God, even in the most challenging of situations. His story encouraged learners to stand firm in their beliefs and to make wise, value-based choices.

      Through discipleship, learners grow in faith, responsibility, and moral courage — lessons that guide them both in and beyond the classroom.
    `,
    link: 'https://www.instagram.com/p/DUaNwYzjQ2t/?img_index=1&igsh=dDB2bDhucW5sbHho',
  },
];
import { Navigation, Footer } from './components/Layout';

const CalendarPage = lazy(() => import('./pages/CalendarPage'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const NewsDetailPage = lazy(() => import('./pages/NewsDetailPage'));

/* ────────────────────────────────────────────────
   CONSTANTS
──────────────────────────────────────────────── */
const BOOK_VISIT_URL =
  'https://calendly.com/benkda21/30min?utm_source=ig&utm_medium=social&utm_content=link_in_bio&month=2026-05';

const TESTIMONIALS = [
  {
    name: 'Parent of N1 learner',
    quote:
      'DGS has transformed my child. In just a few months, we noticed incredible growth — not just academically, but in confidence and character. The teachers truly care.',
    stars: 5,
  },
  {
    name: 'Parent of Primary learner',
    quote:
      'What I love most about DGS is how faith is woven into every part of the day. My child comes home singing devotion songs and quoting scripture. That is priceless.',
    stars: 5,
  },
  {
    name: 'Parent of N2 learner',
    quote:
      'The environment is warm, safe, and joyful. My daughter looks forward to school every single morning. As a parent, that is everything.',
    stars: 5,
  },
  {
    name: 'Parent of Primary learner',
    quote:
      'The Cambridge curriculum combined with Christian values is exactly what we were looking for. DGS delivers both with genuine passion and professionalism.',
    stars: 5,
  },
];

const EXPANDED_FAQS = [
  {
    category: 'Admissions & Enrollment',
    items: [
      { q: 'At what age can my child join DGS?', a: 'Children may join Nursery 1 from the age of 3 years old, in accordance with national education regulations in Rwanda.' },
      { q: 'Is admission open throughout the year?', a: 'Yes. Admissions remain open throughout the year. Learners joining the Primary section complete a pre-admission evaluation.' },
      { q: 'What documents are required for enrollment?', a: 'Please visit our registration page to find the list of required enrollment documents.' },
      { q: 'Can parents visit the campus before enrolling?', a: 'Absolutely. We highly encourage campus visits so families can experience the DGS environment firsthand. Visits can be booked through our admissions link.' },
      { q: 'Is there an entrance assessment or placement test?', a: 'Yes, for Primary learners. These assessments are not used to judge the child, but to better understand how we can support their learning journey.' },
    ],
  },
  {
    category: 'Curriculum & Academics',
    items: [
      { q: 'What curriculum does DGS follow?', a: 'DGS follows the Cambridge Assessment International Education curriculum, designed to develop confident, responsible, and independent learners.' },
      { q: 'What languages are used in class?', a: 'English and French are the main languages used during school hours.' },
      { q: 'How do you support children with different learning paces?', a: 'We believe every child deserves the time and space they need to grow. Our teachers actively implement differentiated teaching practices to meet learners where they are.' },
      { q: 'What makes your teaching approach unique?', a: 'Our teaching combines qualified educators, strong pedagogy, well-equipped learning spaces, and a child-centered approach that nurtures both academic excellence and character development.' },
      { q: 'Is learning play-based in nursery?', a: 'Yes. In Early Childhood Education, play is not simply an activity — it is a fundamental part of how children learn, explore, and make sense of the world.' },
    ],
  },
  {
    category: 'Faith & Values',
    items: [
      { q: 'How are Christian values integrated into daily learning?', a: 'Our discipleship program includes daily class devotions, weekly school devotions, biblical learning, and continuous encouragement to help children practice Christian values in everyday life.' },
      { q: 'Do children have prayer or devotion time?', a: 'Yes. Prayer and devotion are part of our daily school life.' },
      { q: 'Is DGS open to families from different backgrounds?', a: 'Yes. We warmly welcome families from all backgrounds while remaining rooted in the Christian values that shape our school community.' },
    ],
  },
  {
    category: 'Safety & Wellbeing',
    items: [
      { q: 'How do you ensure learner safety on campus?', a: 'Learner safety is a priority at DGS. Children are closely supervised, especially our youngest learners, and all learning spaces are regularly maintained to remain clean, safe, and age-appropriate.' },
      { q: 'How do you handle emergencies or illness at school?', a: 'A fully equipped emergency kit is always available on campus, and our staff follows clear safety procedures whenever immediate care is needed.' },
    ],
  },
  {
    category: 'Daily Life & Enrichment',
    items: [
      { q: 'Are meals provided at school?', a: 'Yes. Breakfast is provided to all learners. Lunch and afternoon snacks are available for children enrolled in the full-day program.' },
      { q: 'Can the school accommodate food allergies or dietary restrictions?', a: 'Yes. Any allergies or specific dietary requirements should be communicated by parents or guardians during the enrollment process.' },
      { q: 'What should children bring to school each day?', a: 'Learners should come with a water bottle, a school bag, and all required school materials as listed during enrollment.' },
      { q: 'Does the school offer sports and arts programs?', a: 'Yes. Sports, creative arts, music, movement, and hands-on learning experiences are an important part of daily life at DGS.' },
    ],
  },
  {
    category: 'Practical Information',
    items: [
      { q: 'Does DGS provide transport services?', a: 'At this time, transport services are not available. Parents and guardians arrange daily drop-off and pick-up.' },
      { q: 'What are the school fees and payment options?', a: 'School fees may be paid via cash, MTN Mobile Money, or bank deposit.' },
      { q: 'Are uniforms required?', a: 'Yes. Uniform requirements and materials are listed in the registration information provided during enrollment.' },
      { q: 'What are school hours?', a: 'School runs Monday to Friday. Gates open at 7:00am. Half-day learner pick-up begins at 12:30pm, while full-day pick-up begins at 4:00pm.' },
    ],
  },
];

const FACILITIES = [
  {
    id: 'early-years',
    title: 'Early Years',
    subtitle: 'Nursery Classrooms',
    icon: <Heart className="w-7 h-7" />,
    color: 'bg-rose-500',
    image: '/assets/Image/1.jpeg',
    description:
      'Our nursery classrooms are thoughtfully designed to meet the needs of our youngest learners. Spacious and inviting, they allow for different learning corners — from reading spaces to group gathering areas and hands-on activity centers.',
    detail:
      'Our Early Years program is built around play, language development, creativity, and artistic expression. We believe learning cannot be limited to one method — every activity, every interaction, and every discovery helps shape growing minds.',
  },
  {
    id: 'primary',
    title: 'Primary School',
    subtitle: 'Cambridge Curriculum',
    icon: <GraduationCap className="w-7 h-7" />,
    color: 'bg-school-maroon',
    image: '/assets/Image/2.jpeg',
    description:
      'Our primary classrooms are designed to reflect the values of our Cambridge curriculum while nurturing the holistic development of every learner. These spaces encourage curiosity, confidence, and meaningful engagement with the world.',
    detail:
      'At DGS, we aim to raise the next generation of leaders. Through critical thinking, problem-solving, collaboration, and global awareness, learners are equipped to think boldly and dream beyond boundaries.',
  },
  {
    id: 'library',
    title: 'The Library',
    subtitle: 'A World of Words',
    icon: <BookOpen className="w-7 h-7" />,
    color: 'bg-amber-600',
    image: '/assets/Image/3.jpeg',
    description:
      'Our well-equipped library is home to a wide variety of books for every age and interest. From storybooks and literature to academic resources and workbooks, every learner can find a book that speaks to them.',
    detail:
      'Here, reading becomes a journey — one page at a time, opening doors to imagination, knowledge, and endless discovery.',
  },
  {
    id: 'kitchen',
    title: 'The Kitchen',
    subtitle: 'Nourishing Bright Minds',
    icon: <Utensils className="w-7 h-7" />,
    color: 'bg-emerald-600',
    image: '/assets/Image/4.jpeg',
    description:
      'At DGS, holistic development also includes healthy nutrition. Our kitchen is carefully maintained to provide fresh, balanced, and delicious meals prepared and served the very same day.',
    detail:
      'Just beside it, our school garden contributes to some of the ingredients on our menu. We take pride in knowing that homegrown vegetables help nourish the bright minds of our learners.',
  },
  {
    id: 'ict',
    title: 'ICT Room',
    subtitle: 'Building Digital Futures',
    icon: <Wifi className="w-7 h-7" />,
    color: 'bg-blue-600',
    image: '/assets/Image/5.jpeg',
    description:
      'Preparing learners for the future also means equipping them with the tools of today. Our ICT room provides a dynamic environment where children develop digital literacy, creativity, and problem-solving skills.',
    detail:
      "Through guided exploration of technology, learners build confidence, adaptability, and the innovative mindset needed for tomorrow's world.",
  },
  {
    id: 'playground',
    title: 'Playground',
    subtitle: 'Where Joy Runs Free',
    icon: <TreePine className="w-7 h-7" />,
    color: 'bg-teal-600',
    image: '/assets/Image/6.jpeg',
    description:
      'Because play is an essential part of childhood, we created outdoor spaces where movement, laughter, and learning come together.',
    detail:
      'Our sports field allows learners to explore teamwork, discipline, and healthy competition, while our play area — with sandpits, trampolines, swings, and more — encourages imagination, confidence, and joyful exploration.',
  },
];

/* ────────────────────────────────────────────────
   SHARED UI PRIMITIVES
──────────────────────────────────────────────── */
function GrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[999] opacity-[0.032] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '128px 128px',
      }}
    />
  );
}

const MARQUEE_ITEMS = [
  'Excellence','Faith','Integrity','Leadership','Compassion',
  'Academic Rigor','Christ-like Values','Holistic Growth','Community',
  'Excellence','Faith','Integrity','Leadership','Compassion',
  'Academic Rigor','Christ-like Values','Holistic Growth','Community',
];

function MarqueeStrip({ inverted = false }: { inverted?: boolean }) {
  return (
    <div className={`overflow-hidden py-5 md:py-6 border-y ${inverted ? 'bg-school-maroon border-school-maroon/30' : 'bg-school-tan/10 border-school-tan/20'}`}>
      <motion.div
        className="flex gap-0 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
      >
        {MARQUEE_ITEMS.map((item, i) => (
          <span key={i} className={`inline-flex items-center gap-4 md:gap-6 px-6 md:px-8 text-xs md:text-sm font-black uppercase tracking-[0.35em] shrink-0 ${inverted ? 'text-school-tan' : 'text-school-maroon/60'}`}>
            {item}
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${inverted ? 'bg-school-tan/40' : 'bg-school-maroon/20'}`} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function AmbientBlob({ className }: { className: string }) {
  return <div className={`absolute rounded-full pointer-events-none ${className}`} style={{ filter: 'blur(120px)' }} />;
}

function SectionEyebrow({ label, light = false }: { label: string; light?: boolean }) {
  return (
    <div className="flex items-center gap-4 mb-6 justify-center">
      <div className={`h-px w-8 ${light ? 'bg-school-tan/50' : 'bg-school-tan'}`} />
      <span className={`font-black uppercase tracking-[0.4em] text-[10px] ${light ? 'text-school-tan' : 'text-school-tan'}`}>{label}</span>
      <div className={`h-px w-8 ${light ? 'bg-school-tan/50' : 'bg-school-tan'}`} />
    </div>
  );
}

function BookVisitBanner() {
  return (
    <div className="bg-school-tan/10 border border-school-tan/25 rounded-[2rem] p-8 md:p-12 text-center">
      <div className="text-3xl mb-3">✨</div>
      <p className="text-school-maroon font-serif text-xl md:text-2xl mb-2 italic">We would love to welcome you.</p>
      <p className="text-stone-500 text-sm mb-8 font-light">Book a campus visit and discover what makes DGS special.</p>
      <a
        href={BOOK_VISIT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 px-8 py-4 bg-school-maroon text-white font-black rounded-xl hover:bg-school-maroon/90 transition-all hover:-translate-y-0.5 shadow-[0_20px_40px_rgba(107,20,29,0.25)] text-sm uppercase tracking-widest"
      >
        Book a Campus Visit
        <ArrowUpRight className="w-4 h-4" />
      </a>
    </div>
  );
}

/* ────────────────────────────────────────────────
   FAQ ITEM
──────────────────────────────────────────────── */
function FAQItem({ faq }: { faq: { q: string; a: string } }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`border rounded-xl md:rounded-2xl bg-white overflow-hidden transition-all duration-300 ${isOpen ? 'border-school-tan/40 shadow-[0_10px_40px_-10px_rgba(107,20,29,0.1)]' : 'border-stone-100 hover:border-school-tan/20'}`}>
      <button onClick={() => setIsOpen(!isOpen)} className="w-full px-5 md:px-7 py-4 md:py-5 flex items-center justify-between text-left gap-4 group">
        <span className="text-sm md:text-base font-bold text-school-maroon group-hover:text-school-tan transition-colors">{faq.q}</span>
        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-school-tan text-white' : 'bg-stone-100 text-school-maroon'}`}>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}>
            <div className="px-5 md:px-7 pb-4 md:pb-5 text-stone-500 text-sm leading-relaxed border-t border-stone-50 pt-3">{faq.a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ────────────────────────────────────────────────
   SCROLL UTILITIES
──────────────────────────────────────────────── */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let ticking = false;
    const handle = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => { setScrolled(window.scrollY > threshold); ticking = false; });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, [threshold]);
  return scrolled;
}

function getEventDateParts(date: string) {
  const monthMatch = date.match(/(January|February|March|April|May|June|July|August|September|October|November|December)/i);
  const dayMatch = date.match(/(\d{1,2})(?:st|nd|rd|th)?/i);
  return {
    month: monthMatch ? monthMatch[0].toUpperCase().slice(0, 3) : 'JUL',
    day: dayMatch ? dayMatch[1] : '30',
  };
}

function StatItem({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting && !started) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);
  useEffect(() => {
    if (!started) return;
    const duration = 1800;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, value]);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-serif text-school-maroon mb-2 tracking-tighter">{count}{suffix}</div>
      <div className="text-xs font-black uppercase tracking-[0.3em] text-stone-400">{label}</div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   PAGE: FOUNDER
════════════════════════════════════════════════ */
function FounderPage() {
  return (
    <div className="min-h-screen bg-stone-50 selection:bg-school-tan/30">
      <GrainOverlay />
      <Navigation scrolled={true} />

      <section className="pt-32 pb-0 bg-school-maroon relative overflow-hidden">
        <AmbientBlob className="top-0 right-0 w-[30rem] h-[30rem] bg-school-tan/10 translate-x-1/3 -translate-y-1/3" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-8 bg-school-tan" />
              <span className="text-school-tan font-black uppercase tracking-[0.4em] text-[10px]">Meet Our Founder</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[0.9] tracking-tighter mb-6">
              Liliose<br /><span className="text-school-tan italic">Kaligirwa Tayi</span>
            </h1>
            <p className="text-white/50 text-lg font-light">Founder & Visionary — Daniel Generation School</p>
          </motion.div>
        </div>
        <div className="h-16 bg-stone-50 rounded-t-[3rem]" />
      </section>

      <section className="pb-24 md:pb-40 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-start -mt-2">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.9 }} className="lg:col-span-2">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-school-tan/50 rounded-[2.5rem]" />
                <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(107,20,29,0.2)] relative z-10 bg-stone-200">
                  <img
                    src="/assets/Image/liliose.jpeg"
                    alt="Liliose Kaligirwa Tayi — Founder of Daniel Generation School"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-school-maroon/30 to-transparent" />
                </div>
                <div className="absolute -bottom-5 right-6 z-20 bg-white rounded-2xl px-6 py-4 shadow-xl border border-stone-100">
                  <div className="text-xs font-black uppercase tracking-widest text-school-tan mb-0.5">Founder</div>
                  <div className="text-sm font-bold text-school-maroon">Pastor Liliose Tayi</div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.9 }} className="lg:col-span-3 pt-6">
              <div className="relative mb-10 pl-6 border-l-4 border-school-tan">
                <Quote className="w-8 h-8 text-school-tan/30 mb-3" />
                <p className="text-2xl md:text-3xl font-serif text-school-maroon italic leading-snug">
                  "To raise children who are academically excellent, spiritually grounded, and socially responsible."
                </p>
                <p className="text-school-tan font-black uppercase tracking-widest text-xs mt-4">The Founding Vision</p>
              </div>

              <div className="space-y-5 text-stone-500 text-base md:text-lg leading-relaxed font-light">
                <p>Liliose Kaligirwa Tayi, founder of Daniel Generation School (DGS), established the school with a clear and purposeful vision: to raise children who are academically excellent, spiritually grounded, and socially responsible. She believes that this kind of education has the power to shape a better future for Rwanda and beyond.</p>
                <p>Pastor Tayi shared that the school's name was inspired by the biblical figure Daniel, known for his integrity, wisdom, faithfulness, humility, and courage. Guided by these values, DGS is committed to academic excellence, character formation, and leadership through service — with faith intentionally woven into every part of the learning journey.</p>
                <p>Through Daniel Generation School, Pastor Tayi is not simply building a school — she is building a generation. A generation that will lead with purpose, serve with compassion, and shine as light in their communities and in the world.</p>
              </div>

              <div className="flex flex-wrap gap-3 mt-10">
                {['Integrity', 'Wisdom', 'Faithfulness', 'Humility', 'Courage'].map((val) => (
                  <span key={val} className="px-5 py-2 bg-school-tan/10 text-school-maroon rounded-full text-xs font-black uppercase tracking-widest border border-school-tan/20">{val}</span>
                ))}
              </div>

              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <a href={BOOK_VISIT_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-school-maroon text-white font-black rounded-xl hover:bg-school-maroon/90 transition-all hover:-translate-y-0.5 shadow-[0_20px_40px_rgba(107,20,29,0.2)] text-sm uppercase tracking-widest">
                  ✨ Book a Visit <ArrowUpRight className="w-4 h-4" />
                </a>
                <Link to="/" className="inline-flex items-center gap-3 px-8 py-4 border border-stone-200 text-school-maroon font-black rounded-xl hover:border-school-maroon/30 transition-all text-sm uppercase tracking-widest">
                  <ChevronLeft className="w-4 h-4" /> Back to Home
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ════════════════════════════════════════════════
   PAGE: FACILITIES
════════════════════════════════════════════════ */
function FacilitiesPage() {
  return (
    <div className="min-h-screen bg-stone-50 selection:bg-school-tan/30">
      <GrainOverlay />
      <Navigation scrolled={true} />

      <section className="pt-32 pb-0 bg-school-maroon relative overflow-hidden">
        <AmbientBlob className="top-0 left-0 w-[25rem] h-[25rem] bg-school-tan/8 -translate-x-1/3 -translate-y-1/3" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-8 bg-school-tan" />
              <span className="text-school-tan font-black uppercase tracking-[0.4em] text-[10px]">Our Campus</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[0.9] tracking-tighter mb-6">
              Our <span className="text-school-tan italic">Facilities.</span>
            </h1>
            <p className="text-white/50 text-lg font-light max-w-2xl">Every space at DGS is thoughtfully designed to inspire, nurture, and empower the whole child — mind, body, and spirit.</p>
          </motion.div>
        </div>
        <div className="h-16 bg-stone-50 rounded-t-[3rem]" />
      </section>

      <section className="pb-24 md:pb-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-16 md:space-y-28">
            {FACILITIES.map((facility, idx) => (
              <motion.div
                key={facility.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`grid lg:grid-cols-2 gap-10 lg:gap-20 items-center ${idx % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}
              >
                <div className={`relative ${idx % 2 === 1 ? 'lg:[direction:ltr]' : ''}`}>
                  <div className={`absolute -top-4 ${idx % 2 === 1 ? '-right-4' : '-left-4'} w-full h-full border-2 border-school-tan/35 rounded-[2.5rem]`} />
                  <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(107,20,29,0.15)] relative z-10 bg-stone-200 group">
                    <img src={facility.image} alt={facility.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  <div className={`absolute -bottom-5 ${idx % 2 === 1 ? 'right-6' : 'left-6'} z-20`}>
                    <div className={`${facility.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl`}>{facility.icon}</div>
                  </div>
                </div>
                <div className={idx % 2 === 1 ? 'lg:[direction:ltr]' : ''}>
                  <span className="text-school-tan font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">{facility.subtitle}</span>
                  <h2 className="text-4xl md:text-5xl font-serif text-school-maroon mb-6 leading-tight">{facility.title}</h2>
                  <p className="text-stone-500 text-base md:text-lg leading-relaxed mb-5 font-light">{facility.description}</p>
                  <p className="text-stone-400 text-sm md:text-base leading-relaxed font-light italic border-l-2 border-school-tan/30 pl-4">{facility.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-24 md:mt-32">
            <BookVisitBanner />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ════════════════════════════════════════════════
   PAGE: GALLERY DETAIL
════════════════════════════════════════════════ */
function GalleryDetailPage() {
  const { id } = useParams();
  const image = GALLERY_IMAGES.find(img => img.id === id);
  if (!image) return <Navigate to="/" />;
  return (
    <div className="min-h-screen bg-stone-50 selection:bg-school-tan/30">
      <GrainOverlay />
      <Navigation scrolled={true} />
      <div className="w-full px-6 md:px-12 lg:px-24 py-24 md:py-40 lg:py-56">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="order-2 lg:order-1">
            <span className="text-school-tan font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">School Life Highlight</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-school-maroon mb-8 leading-[1.1] tracking-tighter">{image.alt}</h1>
            <p className="text-stone-600 text-lg md:text-xl leading-relaxed mb-12 font-light">{image.description}</p>
            <Link to="/" className="inline-flex items-center gap-3 text-school-maroon font-black uppercase tracking-widest text-xs hover:text-school-tan transition-all group border-b border-school-maroon/20 pb-2">
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Return to Homepage
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1 }} className="relative order-1 lg:order-2">
            <div className="aspect-[4/5] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-[0_60px_120px_-20px_rgba(107,20,29,0.25)] relative z-10 group">
              <img src={image.src} alt={image.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" referrerPolicy="no-referrer" />
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

/* ════════════════════════════════════════════════
   HOME PAGE
════════════════════════════════════════════════ */
function SchoolWebsite() {
  const scrolled = useScrolled(20);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  return (
    <div className="min-h-screen selection:bg-school-tan/30 scroll-smooth">
      <GrainOverlay />
      <Navigation scrolled={scrolled} />

      {/* ── HERO ── */}
      <section ref={heroRef} id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-school-maroon">
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <img
            src="/assets/Image/dgs.png"
            alt=""
            className="w-full h-[115%] object-cover opacity-50"
            onError={(e) => {
              const img = e.currentTarget;
              const fallbacks = [
                '/assets/Image/2.jpeg',
                '/assets/Image/3.jpeg',
                '/assets/Image/4.jpeg',
                '/assets/Image/5.jpeg',
                '/assets/Image/6.jpeg',
              ];
              const current = fallbacks.indexOf(img.src.split('/').slice(-2).join('/').replace('assets/Image/', '').replace('.jpeg',''));
              const next = fallbacks[current + 1];
              if (next) { img.src = next; } else { img.style.display = 'none'; }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-school-maroon via-school-maroon/60 to-school-maroon/20" />
        </motion.div>
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-school-tan/10 rounded-full pointer-events-none" style={{ filter: 'blur(140px)' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-12 md:pt-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-8 bg-school-tan/40" />
            <span className="text-school-tan/80 font-black uppercase tracking-[0.4em] text-[10px]">Est. 2025 · Kigali, Rwanda</span>
            <div className="h-px w-8 bg-school-tan/40" />
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-serif text-white mb-6 md:mb-8 leading-[0.9] tracking-tighter">
            Daniel<br />Generation<br /><span className="text-school-tan italic">School.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="max-w-xl mx-auto text-base sm:text-lg text-white/60 mb-12 leading-relaxed font-light tracking-wide">
            Shaping Godly Character and futures
          </motion.p>

          {/* ★ THREE CTAs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdAc7taG2e-tsPzxtu1YoOdktMux-fa_Iw3xbfZz2Caan5kpw/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto group px-8 py-4 bg-school-tan text-school-maroon font-black rounded-xl hover:bg-white transition-all flex items-center justify-center gap-3 shadow-[0_20px_60px_rgba(107,20,29,0.4)] hover:-translate-y-1 text-sm uppercase tracking-widest"
            >
              Register Now <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* ★ BOOK A VISIT — from review doc */}
            <a
              href={BOOK_VISIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 border border-white/25 text-white font-black rounded-xl hover:bg-white/18 hover:border-white/40 transition-all flex items-center justify-center gap-2 backdrop-blur-xl text-sm uppercase tracking-widest"
            >
              ✨ Book a Visit
            </a>

            <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto px-8 py-4 border border-white/10 text-white/50 font-bold rounded-xl hover:bg-white/5 transition-all text-sm">
              Discover More ↓
            </button>
          </motion.div>

        </div>
      </section>

      <MarqueeStrip />

      {/* ── STATS (commented out) ── */}
      {/* <div className="bg-white py-16 md:py-20 border-b border-stone-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-stone-100">
            <StatItem value={3} label="Programs" suffix="+" />
            <StatItem value={2025} label="Year Founded" />
            <StatItem value={100} label="Christian Values" suffix="%" />
            <StatItem value={5} label="Core Values" />
          </div>
        </div>
      </div> */}

      {/* ── ABOUT + MISSION & VISION (unified section) ── */}
      <section id="about" className="overflow-hidden">
        <div className="py-16 md:py-20 lg:py-28 bg-stone-50 relative overflow-hidden">
          <AmbientBlob className="top-0 right-0 w-[30rem] h-[30rem] bg-school-tan/8 translate-x-1/2 -translate-y-1/2" />
          <AmbientBlob className="bottom-0 left-0 w-80 h-80 bg-school-maroon/5 -translate-x-1/3 translate-y-1/3" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Two-column: left = heading + text + CTAs, right = Mission + Vision cards */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* LEFT — About text */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px w-8 bg-school-tan" />
                  <span className="text-school-tan font-black uppercase tracking-[0.4em] text-[10px]">Our Story</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-school-maroon mb-5 leading-tight tracking-tighter">
                  About <span className="text-school-tan italic">Our School.</span>
                </h2>
                <p className="text-sm md:text-base text-stone-400 max-w-xl leading-relaxed font-light mb-8">
                  Daniel Generation School (DGS) is a Christian school established by Omega Church in 2025. Guided by the exemplary life of Daniel in the Bible, we seek to cultivate in our students the character, competencies, and capacities necessary to excel in their future pursuits.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/founder" className="inline-flex items-center gap-3 px-6 py-3.5 bg-school-maroon text-white font-black rounded-xl hover:bg-school-maroon/90 transition-all hover:-translate-y-0.5 shadow-[0_16px_32px_rgba(107,20,29,0.18)] text-xs uppercase tracking-widest">
                    Meet Our Founder <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  <Link to="/facilities" className="inline-flex items-center gap-3 px-6 py-3.5 border border-school-maroon/20 text-school-maroon font-black rounded-xl hover:border-school-maroon hover:bg-school-maroon/5 transition-all text-xs uppercase tracking-widest">
                    Our Facilities <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>

              {/* RIGHT — Mission + Vision stacked */}
              <div className="flex flex-col gap-5">
                {/* Mission card */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="p-5 md:p-6 rounded-[1.5rem] bg-school-maroon text-white shadow-[0_20px_50px_-15px_rgba(107,20,29,0.35)] relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-school-tan/8 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" style={{ filter: 'blur(40px)' }} />
                  <div className="absolute top-0 right-0 p-4 opacity-5"><GraduationCap className="w-20 h-20" /></div>
                  <h3 className="text-lg font-serif mb-2 text-school-tan relative z-10">Our Mission</h3>
                  <p className="text-xs text-white/70 leading-relaxed mb-4 font-light relative z-10">
                    To provide a holistic education rooted in Christian values, empowering learners to become critical thinkers and problem-solvers who honor God in all they do.
                  </p>
                  <div className="flex items-center gap-2 text-school-tan font-bold uppercase tracking-[0.25em] text-[10px] relative z-10">
                    <div className="w-5 h-5 rounded-full border border-school-tan/30 flex items-center justify-center shrink-0"><CheckCircle2 className="w-3 h-3" /></div>
                    Shaping Godly Character
                  </div>
                </motion.div>

                {/* Vision card */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="p-5 md:p-6 rounded-[1.5rem] border border-school-maroon/8 bg-white hover:bg-stone-50 transition-colors duration-500"
                >
                  <div className="text-4xl font-serif text-school-tan/15 leading-none mb-1 select-none">&ldquo;</div>
                  <h3 className="text-lg font-serif mb-2 text-school-maroon">Our Vision</h3>
                  <p className="text-xs text-stone-500 leading-relaxed italic font-light">
                    To nurture students who are excellent leaders, embedded with Christ-like values, prepared to face life's challenges and contribute meaningfully to their communities and the world.
                  </p>
                </motion.div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          2. EDUCATIONAL PATHWAYS
      ═══════════════════════════════════════ */}
      <section id="programs" className="py-20 md:py-28 bg-stone-100 relative overflow-hidden">
        <AmbientBlob className="top-0 right-0 w-[30rem] h-[30rem] bg-school-maroon/5 translate-x-1/3 -translate-y-1/3" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-center mb-16">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="lg:w-1/3 text-center lg:text-left">
              <div className="flex items-center gap-4 mb-6 justify-center lg:justify-start">
                <div className="h-px w-8 bg-school-tan" />
                <span className="text-school-tan font-black uppercase tracking-[0.4em] text-[10px]">Academics</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-school-maroon mb-6 leading-[0.95] tracking-tighter font-serif">
                Educational<br /><span className="italic text-school-tan">Pathways.</span>
              </h2>
              <p className="text-stone-500 text-base leading-relaxed font-light mb-8">Our curriculum blends evidence-based learning with Christian values, creating a robust foundation for global citizens.</p>
              <Link to="/facilities" className="inline-flex items-center gap-3 px-7 py-3.5 border border-school-maroon/20 text-school-maroon font-black rounded-xl hover:bg-school-maroon hover:text-white hover:border-school-maroon transition-all text-xs uppercase tracking-widest">
                View All Facilities <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {PROGRAMS.map((prog, idx) => (
                <motion.div key={prog.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.15, duration: 0.8 }} whileHover={{ y: -4, transition: { duration: 0.2 } }} className="p-10 md:p-12 rounded-[3rem] bg-white border border-stone-200 hover:border-school-tan/30 hover:shadow-[0_30px_60px_-15px_rgba(107,20,29,0.1)] transition-all duration-500 group flex flex-col">
                  <div className={`${prog.color} w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>{prog.icon}</div>
                  <h3 className="text-2xl font-serif text-school-maroon mb-4">{prog.title}</h3>
                  <p className="text-stone-400 mb-8 leading-relaxed text-sm font-light flex-grow">{prog.description}</p>
                  <ul className="space-y-3">
                    {prog.milestones.map(m => (
                      <li key={m} className="flex items-center gap-3 text-xs font-bold text-stone-300 group-hover:text-stone-500 transition-colors">
                        <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0"><CheckCircle2 className="w-3 h-3" /></div>
                        {m}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          3. EVENTS
      ═══════════════════════════════════════ */}
      <section id="events" className="py-24 md:py-32 bg-stone-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-16 lg:gap-24 items-start">
            <div className="lg:col-span-1 text-center lg:text-left">
              <div className="flex items-center gap-4 mb-6 justify-center lg:justify-start">
                <div className="h-px w-8 bg-school-tan" />
                <span className="text-school-tan font-black uppercase tracking-[0.4em] text-[10px]">Our Calendar</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-serif text-school-maroon mb-8 leading-tight tracking-tighter">Upcoming<br /><span className="text-school-tan italic">Events.</span></h2>
              <p className="text-stone-400 text-base font-light mb-12">Stay updated with our community happenings — from educational field trips to on-campus celebrations.</p>
              <Link to="/calendar" className="inline-flex items-center gap-6 p-6 bg-white rounded-[2rem] border border-stone-100 group hover:shadow-xl hover:border-school-tan/20 transition-all duration-300">
                <div className="w-12 h-12 bg-stone-50 rounded-xl flex items-center justify-center text-school-tan shadow-sm group-hover:scale-110 transition-transform"><Calendar className="w-6 h-6" /></div>
                <div className="text-left">
                  <div className="text-sm font-black text-school-maroon uppercase tracking-widest mb-1">Parent Portal</div>
                  <div className="text-xs text-stone-400 font-bold group-hover:text-school-tan transition-colors">Open Calendar View</div>
                </div>
              </Link>
            </div>
            <div className="lg:col-span-2 space-y-4">
              {EVENTS.map((event, idx) => {
                const { month, day } = getEventDateParts(event.date);
                return (
                  <motion.div key={event.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.7 }} className="p-7 md:p-8 bg-white rounded-[2rem] border border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:shadow-[0_20px_50px_-15px_rgba(107,20,29,0.08)] hover:border-school-tan/20 transition-all duration-300 group">
                    <div className="flex items-center gap-6">
                      <div className="min-w-[4rem] aspect-square bg-stone-50 rounded-[1.5rem] border border-stone-100 flex flex-col items-center justify-center group-hover:bg-school-maroon group-hover:border-school-maroon transition-all duration-400">
                        <span className="text-[9px] font-black uppercase tracking-widest text-stone-300 group-hover:text-white/50 mb-0.5">{month}</span>
                        <span className="text-xl font-serif font-bold text-school-maroon group-hover:text-white transition-colors">{day}</span>
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.35em] text-school-tan mb-1">{event.type}</div>
                        <h4 className="text-lg md:text-xl font-serif text-school-maroon group-hover:text-school-tan transition-colors mb-1">{event.name}</h4>
                        <div className="flex items-center gap-2 text-stone-300 font-bold text-xs uppercase tracking-widest">
                          <MapPin className="w-3 h-3 text-school-tan" />{event.date}
                        </div>
                      </div>
                    </div>
                    <button className="w-full sm:w-auto px-6 py-3 bg-stone-50 border border-stone-200 text-school-maroon rounded-xl text-xs font-black uppercase tracking-widest hover:bg-school-maroon hover:text-white hover:border-school-maroon transition-all duration-300 whitespace-nowrap">View Details</button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          4. LIFE AT DGS
      ═══════════════════════════════════════ */}
      <section id="gallery" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 md:mb-24">
            <SectionEyebrow label="Our Moments" />
            <h2 className="text-4xl md:text-6xl lg:text-7xl text-school-maroon font-serif">School Life <span className="text-school-tan italic">Gallery.</span></h2>
            <div className="flex items-center justify-center gap-4 text-stone-300 mt-6">
              <Camera className="w-4 h-4 text-school-tan" />
              <span className="text-xs font-medium italic">Documenting the vibrant journey of our students.</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {GALLERY_IMAGES.map((img, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08, duration: 0.7 }}>
                <Link to={`/gallery/${img.id}`} className="relative block aspect-[4/5] rounded-[2.5rem] overflow-hidden group shadow-[0_20px_50px_-15px_rgba(107,20,29,0.08)] hover:shadow-[0_40px_80px_-15px_rgba(107,20,29,0.2)] transition-all duration-500">
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-school-maroon/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-8">
                    <div>
                      <span className="text-school-tan text-xs font-black uppercase tracking-widest block mb-1">View Story</span>
                      <span className="text-white text-xl font-serif italic">{img.alt}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          5. EDUCATIONAL PHILOSOPHY
      ═══════════════════════════════════════ */}
      <section id="philosophy" className="py-20 md:py-28 bg-stone-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-4 mb-6 justify-center lg:justify-start">
                <div className="h-px w-8 bg-school-tan" />
                <span className="text-school-tan font-black uppercase tracking-[0.4em] text-[10px]">Our Approach</span>
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl text-school-maroon font-serif mb-8 leading-tight text-center lg:text-left">Educational <span className="text-school-tan italic">Philosophy</span></h3>
              <div className="space-y-6 md:space-y-8">
                {[
                  { icon: <BookOpen className="w-5 h-5 text-school-tan" />, title: 'Academic Rigor', desc: 'We follow a curriculum that challenges students to think beyond the textbook, encouraging research-based learning and critical analysis.' },
                  { icon: <Atom className="w-5 h-5 text-school-tan" />, title: 'Holistic Growth', desc: 'Education is not just about grades. We prioritize emotional intelligence, physical health, and creative expression through our diverse extra-curricular programs.' },
                  { icon: <Users className="w-5 h-5 text-school-tan" />, title: 'Community First', desc: 'We believe it takes a village to raise a child. We maintain strong partnerships with parents and the local community to support our students.' },
                ].map((item, i) => (
                  <motion.div key={item.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-4 md:gap-6 group">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-school-tan/15 flex items-center justify-center shrink-0 group-hover:bg-school-tan/25 group-hover:scale-110 transition-all duration-300">{item.icon}</div>
                    <div>
                      <h4 className="text-base md:text-lg font-bold text-school-maroon mb-1">{item.title}</h4>
                      <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="relative">
                <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-full h-full border-2 border-school-tan/60 rounded-3xl md:rounded-[3rem]" />
                <img src="/assets/Image/1.jpeg" alt="Students Learning" className="relative rounded-3xl md:rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(107,20,29,0.2)] z-10 w-full h-[300px] md:h-[500px] object-cover" referrerPolicy="no-referrer" />
                <div className="absolute -bottom-4 right-6 z-20 bg-white rounded-2xl px-5 py-3 shadow-xl border border-stone-100 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-widest text-school-maroon">Currently Enrolling</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          6. BOOK A VISIT CTA
      ═══════════════════════════════════════ */}
      <section id="testimonials" className="py-20 bg-school-maroon relative overflow-hidden">
        <AmbientBlob className="top-0 right-0 w-[25rem] h-[25rem] bg-school-tan/10 translate-x-1/3 -translate-y-1/3" />
        <AmbientBlob className="bottom-0 left-0 w-[20rem] h-[20rem] bg-white/5 -translate-x-1/3 translate-y-1/3" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Parent Voices commented out */}
          {/*
          <div className="text-center mb-16 md:mb-20">
            <SectionEyebrow label="Parent Voices" light />
            <h2 className="text-4xl md:text-6xl text-white font-serif">What Parents <span className="text-school-tan italic">Say.</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.7 }} className="bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-10 hover:bg-white/8 transition-all duration-300 group">
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.stars }).map((_, i) => <Star key={i} className="w-4 h-4 text-school-tan fill-school-tan" />)}
                </div>
                <p className="text-white/80 text-base leading-relaxed font-light italic mb-7">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-4 pt-5 border-t border-white/10">
                  <div className="w-9 h-9 rounded-full bg-school-tan/20 flex items-center justify-center"><Users className="w-4 h-4 text-school-tan" /></div>
                  <span className="text-school-tan text-xs font-black uppercase tracking-widest">{t.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
          */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <p className="text-white/50 text-base font-light mb-8 italic">The best way to discover DGS is to experience it.</p>
            <a href={BOOK_VISIT_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-10 py-5 bg-school-tan text-school-maroon font-black rounded-xl hover:bg-white transition-all hover:-translate-y-1 shadow-[0_20px_60px_rgba(0,0,0,0.3)] text-sm uppercase tracking-widest">
              ✨ Book a Campus Visit <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          7. NEWS
      ═══════════════════════════════════════ */}
      <section id="news" className="py-24 md:py-32 bg-stone-50 relative overflow-hidden">
        <AmbientBlob className="bottom-0 right-0 w-[25rem] h-[25rem] bg-school-tan/8 translate-x-1/3 translate-y-1/3" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-8 text-center md:text-left">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-6 justify-center md:justify-start">
                <div className="h-px w-8 bg-school-tan" />
                <span className="text-school-tan font-black uppercase tracking-[0.4em] text-[10px]">Latest Updates</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-school-maroon mb-4 leading-tight tracking-tighter">School <span className="text-school-tan italic">Directives.</span></h2>
              <p className="text-stone-400 text-base font-light leading-relaxed">Stay informed about pedagogical milestones and campus innovations at DGS.</p>
            </div>
            <a href="https://www.instagram.com/daniel_generation_school" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-school-maroon font-black uppercase tracking-[0.3em] text-[10px] hover:text-school-tan transition-all border-b border-school-maroon/20 hover:border-school-tan pb-2 group whitespace-nowrap">
              All Stories <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            {NEWS_STORIES.slice(0, 3).map((news, idx) => (
              <motion.div key={news.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.7 }} className="group cursor-pointer">
                <a href={news.link} target="_blank" rel="noopener noreferrer">
                  <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-7 shadow-xl group-hover:shadow-2xl transition-shadow duration-500">
                    <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-school-maroon/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    <div className="absolute top-5 left-5 px-4 py-1.5 bg-white/95 backdrop-blur-sm text-[10px] font-black rounded-full text-school-maroon shadow-xl uppercase tracking-widest">{news.date}</div>
                    <div className="absolute top-5 right-5 px-3 py-1.5 bg-school-maroon/80 backdrop-blur-sm text-[9px] font-black rounded-full text-school-tan uppercase tracking-widest">Instagram</div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif text-school-maroon group-hover:text-school-tan transition-colors mb-3">{news.title}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed line-clamp-2 font-light">{news.excerpt}</p>
                  <div className="flex items-center gap-2 mt-4 text-school-tan text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    View on Instagram <ArrowUpRight className="w-3 h-3" />
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ════════════════════════════════════════════════
   PAGE: CORE VALUES
════════════════════════════════════════════════ */
function CoreValuesPage() {
  return (
    <div className="min-h-screen bg-stone-50 selection:bg-school-tan/30">
      <GrainOverlay />
      <Navigation scrolled={true} />

      {/* Hero */}
      <section className="pt-32 pb-0 bg-school-maroon relative overflow-hidden">
        <AmbientBlob className="top-0 right-0 w-[30rem] h-[30rem] bg-school-tan/10 translate-x-1/3 -translate-y-1/3" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-8 bg-school-tan" />
              <span className="text-school-tan font-black uppercase tracking-[0.4em] text-[10px]">Our DNA</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[0.9] tracking-tighter mb-6">
              Core <span className="text-school-tan italic">Values.</span>
            </h1>
            <p className="text-white/50 text-lg font-light max-w-2xl">Five pillars that define who we are, how we teach, and the kind of generation we are raising at DGS.</p>
          </motion.div>
        </div>
        <div className="h-16 bg-stone-50 rounded-t-[3rem]" />
      </section>

      {/* Values grid */}
      <section className="pb-24 md:pb-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {[
              { label: 'Excellence', icon: '✦', color: 'bg-school-maroon', desc: 'We hold ourselves to the highest standards — not for recognition, but because God deserves our very best. Excellence at DGS means giving your whole self to every task, every day.' },
              { label: 'Leadership', icon: '◈', color: 'bg-school-tan', desc: 'We believe every child is a leader in the making. At DGS, leadership is cultivated through service, responsibility, and a heart that seeks to lift others up.' },
              { label: 'Faith', icon: '✝', color: 'bg-school-maroon', desc: 'Faith is the foundation of everything we do. Rooted in the teachings of Christ, our learners are encouraged to grow in their relationship with God throughout each school day.' },
              { label: 'Integrity', icon: '◇', color: 'bg-school-tan', desc: 'We teach our students to be the same person in private as they are in public — honest, accountable, and trustworthy in every situation and every relationship.' },
              { label: 'Compassion', icon: '♡', color: 'bg-school-maroon', desc: 'We raise children who notice others, who extend kindness without being asked, and who serve their communities with a generous and open heart.' },
            ].map((v, idx) => (
              <motion.div
                key={v.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                className={`p-10 md:p-12 rounded-[2.5rem] ${idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''} bg-white border border-stone-100 hover:border-school-tan/30 hover:shadow-[0_30px_60px_-15px_rgba(107,20,29,0.1)] transition-all duration-300 group`}
              >
                <div className={`${v.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl mb-8 group-hover:scale-110 transition-transform duration-300 shadow-md font-serif`}>{v.icon}</div>
                <h3 className="text-3xl md:text-4xl font-serif text-school-maroon mb-4 italic">{v.label}</h3>
                <p className="text-stone-400 text-sm md:text-base leading-relaxed font-light">{v.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Daniel quote */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-school-maroon rounded-[2.5rem] p-10 md:p-14 text-center relative overflow-hidden">
            <AmbientBlob className="top-0 right-0 w-64 h-64 bg-school-tan/10" />
            <p className="text-school-tan font-black uppercase tracking-[0.4em] text-[10px] mb-6 relative z-10">Inspired By</p>
            <blockquote className="text-2xl md:text-3xl font-serif text-white italic leading-relaxed max-w-3xl mx-auto mb-6 relative z-10">
              "Daniel so distinguished himself among the administrators and the satraps by his exceptional qualities that the king planned to set him over the whole kingdom."
            </blockquote>
            <p className="text-white/40 text-sm font-bold uppercase tracking-widest relative z-10">Daniel 6:3</p>
          </motion.div>

          <div className="mt-12 text-center">
            <Link to="/" className="inline-flex items-center gap-3 px-8 py-4 border border-school-maroon/20 text-school-maroon font-black rounded-xl hover:bg-school-maroon hover:text-white transition-all text-sm uppercase tracking-widest">
              <ChevronLeft className="w-4 h-4" /> Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ════════════════════════════════════════════════
   PAGE: FAQ
════════════════════════════════════════════════ */
function FAQPage() {
  return (
    <div className="min-h-screen bg-stone-50 selection:bg-school-tan/30">
      <GrainOverlay />
      <Navigation scrolled={true} />

      {/* Hero */}
      <section className="pt-32 pb-0 bg-school-maroon relative overflow-hidden">
        <AmbientBlob className="top-0 left-0 w-[25rem] h-[25rem] bg-school-tan/8 -translate-x-1/3 -translate-y-1/3" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-8 bg-school-tan" />
              <span className="text-school-tan font-black uppercase tracking-[0.4em] text-[10px]">Common Queries</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[0.9] tracking-tighter mb-6">
              Frequently <span className="text-school-tan italic">Asked.</span>
            </h1>
            <p className="text-white/50 text-lg font-light max-w-2xl">Fast answers to help you navigate school life at Daniel Generation School.</p>
          </motion.div>
        </div>
        <div className="h-16 bg-stone-50 rounded-t-[3rem]" />
      </section>

      {/* FAQ content */}
      <section className="pb-24 md:pb-32 bg-stone-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-10">
            {EXPANDED_FAQS.map((group, gIdx) => (
              <motion.div key={group.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: gIdx * 0.05 }}>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-school-maroon font-black uppercase tracking-[0.3em] text-xs">{group.category}</span>
                  <div className="flex-1 h-px bg-stone-200" />
                </div>
                <div className="space-y-3">
                  {group.items.map((faq, fIdx) => (
                    <FAQItem key={fIdx} faq={faq} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Still have questions */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 p-8 md:p-12 rounded-[2rem] bg-school-maroon text-white text-center relative overflow-hidden">
            <AmbientBlob className="top-0 right-0 w-48 h-48 bg-school-tan/10" />
            <h3 className="text-2xl md:text-3xl font-serif mb-3 text-school-tan relative z-10">Still Have Questions?</h3>
            <p className="text-white/60 text-base font-light mb-8 relative z-10">We would be happy to assist you. Contact our admissions team or schedule a campus visit.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <a href={BOOK_VISIT_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-school-tan text-school-maroon font-black rounded-xl hover:bg-white transition-all text-sm uppercase tracking-widest">
                ✨ Book a Visit <ArrowUpRight className="w-4 h-4" />
              </a>
              <a href="mailto:info@danielgenerationschool.rw" className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-all text-sm">
                <Mail className="w-4 h-4" /> Contact Us
              </a>
            </div>
          </motion.div>

          <div className="mt-10 text-center">
            <Link to="/" className="inline-flex items-center gap-3 px-8 py-4 border border-school-maroon/20 text-school-maroon font-black rounded-xl hover:bg-school-maroon hover:text-white transition-all text-sm uppercase tracking-widest">
              <ChevronLeft className="w-4 h-4" /> Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ════════════════════════════════════════════════
   APP ROOT
════════════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={
        <div className="h-screen w-full bg-stone-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-[3px] border-school-maroon border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-black uppercase tracking-[0.4em] text-school-maroon/30">Loading</span>
          </div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<SchoolWebsite />} />
          <Route path="/founder" element={<FounderPage />} />
          <Route path="/facilities" element={<FacilitiesPage />} />
          <Route path="/core-values" element={<CoreValuesPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/gallery/:id" element={<GalleryDetailPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
        </Routes>
      </Suspense>
    </>
  );
}