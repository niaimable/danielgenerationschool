import { Link, Routes, Route, useLocation, useParams, Navigate } from 'react-router-dom';
import {
  ChevronRight, ChevronLeft, BookOpen, Atom, Users, CheckCircle2,
  Calendar, Camera, ChevronDown, ChevronUp, GraduationCap, MapPin,
  ArrowUpRight, Quote, Wifi, Utensils, TreePine, Heart, Star, Mail, Phone
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { PROGRAMS, EVENTS, GALLERY_IMAGES, FAQS, NEWS_STORIES } from './constants';
import { Navigation, Footer } from './components/Layout';

const CalendarPage = lazy(() => import('./pages/CalendarPage'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const NewsDetailPage = lazy(() => import('./pages/NewsDetailPage'));

/* ────────────────────────────────────────────────
   CONSTANTS
──────────────────────────────────────────────── */
const BOOK_VISIT_URL = 'https://calendly.com/benkda21/30min?utm_source=ig&utm_medium=social&utm_content=link_in_bio&month=2026-05';

const INSTAGRAM_STORIES = [
  {
    id: 'nursery-day',
    title: 'A Typical Day in Our Nursery Class',
    titleFr: 'Une journée typique dans notre classe de maternelle',
    date: 'May 2025',
    excerpt: 'A fresh breakfast prepared the same day, outdoor play, art, stories, and movement — discover what a full, joyful day looks like for our youngest learners at DGS.',
    excerptFr: 'Un petit-déjeuner frais préparé le jour même, jeux en plein air, art, histoires et mouvement — découvrez à quoi ressemble une journée joyeuse et complète pour nos plus jeunes apprenants à DGS.',
    image: '/assets/Image/1.jpeg',
    link: 'https://www.instagram.com/p/DU7uHhNjV0i/?img_index=6&igsh=ank1Nmg3YW45dWY0',
  },
  {
    id: 'discipleship',
    title: 'Discipleship in Our School Community',
    titleFr: 'Le disciplat dans notre communauté scolaire',
    date: 'February 2025',
    excerpt: 'From KG1 to G3, we guide our learners in growing their faith, building strong values, and developing a personal relationship with God — this month, through the story of Daniel.',
    excerptFr: 'De KG1 à G3, nous guidons nos apprenants dans la croissance de leur foi, la construction de valeurs solides et le développement d\'une relation personnelle avec Dieu — ce mois-ci, à travers l\'histoire de Daniel.',
    image: '/assets/Image/2.jpeg',
    link: 'https://www.instagram.com/p/DUaNwYzjQ2t/?img_index=1&igsh=dDB2bDhucW5sbHho',
  },
];

const EXPANDED_FAQS = [
  {
    category: 'Admissions & Enrollment',
    categoryFr: 'Admissions et inscriptions',
    items: [
      { q: 'At what age can my child join DGS?', qFr: 'À quel âge mon enfant peut-il rejoindre DGS ?', a: 'Children may join Nursery 1 from the age of 3 years old, in accordance with national education regulations in Rwanda.', aFr: 'Les enfants peuvent rejoindre la Maternelle 1 à partir de 3 ans, conformément aux réglementations nationales en matière d\'éducation au Rwanda.' },
      { q: 'Is admission open throughout the year?', qFr: 'Les admissions sont-elles ouvertes toute l\'année ?', a: 'Yes. Admissions remain open throughout the year. Learners joining the Primary section complete a pre-admission evaluation.', aFr: 'Oui. Les admissions restent ouvertes tout au long de l\'année. Les apprenants rejoignant la section Primaire effectuent une évaluation préalable.' },
      { q: 'What documents are required for enrollment?', qFr: 'Quels documents sont requis pour l\'inscription ?', a: 'Please visit our registration page to find the list of required enrollment documents.', aFr: 'Veuillez consulter notre page d\'inscription pour trouver la liste des documents requis.' },
      { q: 'Can parents visit the campus before enrolling?', qFr: 'Les parents peuvent-ils visiter le campus avant l\'inscription ?', a: 'Absolutely. We highly encourage campus visits so families can experience the DGS environment firsthand.', aFr: 'Absolument. Nous encourageons vivement les visites du campus afin que les familles puissent découvrir l\'environnement DGS de première main.' },
      { q: 'Is there an entrance assessment or placement test?', qFr: 'Y a-t-il un test d\'entrée ou de placement ?', a: 'Yes, for Primary learners. These assessments are not used to judge the child, but to better understand how we can support their learning journey.', aFr: 'Oui, pour les apprenants du Primaire. Ces évaluations ne servent pas à juger l\'enfant, mais à mieux comprendre comment soutenir son parcours d\'apprentissage.' },
    ],
  },
  {
    category: 'Curriculum & Academics',
    categoryFr: 'Curriculum et académique',
    items: [
      { q: 'What curriculum does DGS follow?', qFr: 'Quel programme DGS suit-il ?', a: 'DGS follows the Cambridge Assessment International Education curriculum.', aFr: 'DGS suit le programme Cambridge Assessment International Education.' },
      { q: 'What languages are used in class?', qFr: 'Quelles langues sont utilisées en classe ?', a: 'English and French are the main languages used during school hours.', aFr: 'L\'anglais et le français sont les principales langues utilisées pendant les heures scolaires.' },
      { q: 'How do you support children with different learning paces?', qFr: 'Comment soutenez-vous les enfants ayant des rythmes d\'apprentissage différents ?', a: 'Our teachers actively implement differentiated teaching practices to meet learners where they are.', aFr: 'Nos enseignants mettent activement en œuvre des pratiques d\'enseignement différenciées pour répondre aux besoins de chaque apprenant.' },
      { q: 'What makes your teaching approach unique?', qFr: 'Qu\'est-ce qui rend votre approche pédagogique unique ?', a: 'Our teaching combines qualified educators, strong pedagogy, well-equipped learning spaces, and a child-centered approach.', aFr: 'Notre enseignement combine des éducateurs qualifiés, une pédagogie solide, des espaces d\'apprentissage bien équipés et une approche centrée sur l\'enfant.' },
      { q: 'Is learning play-based in nursery?', qFr: 'L\'apprentissage est-il basé sur le jeu en maternelle ?', a: 'Yes. In Early Childhood Education, play is not simply an activity — it is a fundamental part of how children learn.', aFr: 'Oui. Dans l\'éducation de la petite enfance, le jeu n\'est pas simplement une activité — c\'est une partie fondamentale de la façon dont les enfants apprennent.' },
    ],
  },
  {
    category: 'Faith & Values',
    categoryFr: 'Foi et valeurs',
    items: [
      { q: 'How are Christian values integrated into daily learning?', qFr: 'Comment les valeurs chrétiennes sont-elles intégrées dans l\'apprentissage quotidien ?', a: 'Our discipleship program includes daily class devotions, weekly school devotions, and biblical learning.', aFr: 'Notre programme de disciplat comprend des dévotions quotidiennes en classe, des dévotions hebdomadaires à l\'école et un apprentissage biblique.' },
      { q: 'Do children have prayer or devotion time?', qFr: 'Les enfants ont-ils un temps de prière ou de dévotion ?', a: 'Yes. Prayer and devotion are part of our daily school life.', aFr: 'Oui. La prière et la dévotion font partie de notre vie scolaire quotidienne.' },
      { q: 'Is DGS open to families from different backgrounds?', qFr: 'DGS est-il ouvert aux familles de différentes origines ?', a: 'Yes. We warmly welcome families from all backgrounds while remaining rooted in Christian values.', aFr: 'Oui. Nous accueillons chaleureusement les familles de toutes origines tout en restant ancrés dans les valeurs chrétiennes.' },
    ],
  },
  {
    category: 'Safety & Wellbeing',
    categoryFr: 'Sécurité et bien-être',
    items: [
      { q: 'How do you ensure learner safety on campus?', qFr: 'Comment assurez-vous la sécurité des apprenants sur le campus ?', a: 'Children are closely supervised and all learning spaces are regularly maintained to remain clean, safe, and age-appropriate.', aFr: 'Les enfants sont étroitement supervisés et tous les espaces d\'apprentissage sont régulièrement entretenus pour rester propres, sûrs et adaptés à l\'âge.' },
      { q: 'How do you handle emergencies or illness at school?', qFr: 'Comment gérez-vous les urgences ou les maladies à l\'école ?', a: 'A fully equipped emergency kit is always available on campus, and our staff follows clear safety procedures.', aFr: 'Une trousse d\'urgence entièrement équipée est toujours disponible sur le campus et notre personnel suit des procédures de sécurité claires.' },
    ],
  },
  {
    category: 'Daily Life & Enrichment',
    categoryFr: 'Vie quotidienne et enrichissement',
    items: [
      { q: 'Are meals provided at school?', qFr: 'Les repas sont-ils fournis à l\'école ?', a: 'Yes. Breakfast is provided to all learners. Lunch and afternoon snacks are available for full-day learners.', aFr: 'Oui. Le petit-déjeuner est fourni à tous les apprenants. Le déjeuner et les collations de l\'après-midi sont disponibles pour les apprenants en journée complète.' },
      { q: 'Can the school accommodate food allergies or dietary restrictions?', qFr: 'L\'école peut-elle accommoder les allergies alimentaires ?', a: 'Yes. Any allergies or specific dietary requirements should be communicated during the enrollment process.', aFr: 'Oui. Toute allergie ou exigence alimentaire spécifique doit être communiquée lors du processus d\'inscription.' },
      { q: 'What should children bring to school each day?', qFr: 'Que doivent apporter les enfants à l\'école chaque jour ?', a: 'Learners should come with a water bottle, a school bag, and all required school materials.', aFr: 'Les apprenants doivent venir avec une bouteille d\'eau, un sac scolaire et tout le matériel scolaire requis.' },
      { q: 'Does the school offer sports and arts programs?', qFr: 'L\'école propose-t-elle des programmes sportifs et artistiques ?', a: 'Yes. Sports, creative arts, music, movement, and hands-on learning experiences are an important part of daily life at DGS.', aFr: 'Oui. Les sports, les arts créatifs, la musique, le mouvement et les expériences d\'apprentissage pratiques font partie de la vie quotidienne à DGS.' },
    ],
  },
  {
    category: 'Practical Information',
    categoryFr: 'Informations pratiques',
    items: [
      { q: 'Does DGS provide transport services?', qFr: 'DGS fournit-il des services de transport ?', a: 'At this time, transport services are not available. Parents arrange daily drop-off and pick-up.', aFr: 'Pour le moment, les services de transport ne sont pas disponibles. Les parents organisent le dépôt et la récupération quotidiens.' },
      { q: 'What are the school fees and payment options?', qFr: 'Quels sont les frais de scolarité et les options de paiement ?', a: 'School fees may be paid via cash, MTN Mobile Money, or bank deposit.', aFr: 'Les frais de scolarité peuvent être payés en espèces, par MTN Mobile Money ou par dépôt bancaire.' },
      { q: 'Are uniforms required?', qFr: 'Les uniformes sont-ils obligatoires ?', a: 'Yes. Uniform requirements and materials are listed in the registration information provided during enrollment.', aFr: 'Oui. Les exigences en matière d\'uniforme et les matériaux sont répertoriés dans les informations d\'inscription fournies lors de l\'inscription.' },
      { q: 'What are school hours?', qFr: 'Quelles sont les heures de scolarité ?', a: 'School runs Monday to Friday. Gates open at 7:00am. Half-day pick-up begins at 12:30pm, full-day at 4:00pm.', aFr: 'L\'école fonctionne du lundi au vendredi. Les portes ouvrent à 7h00. La récupération demi-journée commence à 12h30, journée complète à 16h00.' },
    ],
  },
];

const FACILITIES = [
  { id: 'early-years', title: 'Early Years', titleFr: 'Petite enfance', subtitle: 'Nursery Classrooms', subtitleFr: 'Salles de maternelle', icon: <Heart className="w-7 h-7" />, color: 'bg-rose-500', image: '/assets/Image/1.jpeg', description: 'Our nursery classrooms are thoughtfully designed to meet the needs of our youngest learners. Spacious and inviting, they allow for different learning corners — from reading spaces to group gathering areas and hands-on activity centers.', descriptionFr: 'Nos salles de maternelle sont conçues avec soin pour répondre aux besoins de nos plus jeunes apprenants. Spacieuses et accueillantes, elles permettent différents coins d\'apprentissage — des espaces de lecture aux zones de rassemblement et aux centres d\'activités pratiques.', detail: 'Our Early Years program is built around play, language development, creativity, and artistic expression.', detailFr: 'Notre programme de petite enfance est construit autour du jeu, du développement du langage, de la créativité et de l\'expression artistique.' },
  { id: 'primary', title: 'Primary School', titleFr: 'École primaire', subtitle: 'Cambridge Curriculum', subtitleFr: 'Programme Cambridge', icon: <GraduationCap className="w-7 h-7" />, color: 'bg-school-maroon', image: '/assets/Image/2.jpeg', description: 'Our primary classrooms are designed to reflect the values of our Cambridge curriculum while nurturing the holistic development of every learner.', descriptionFr: 'Nos salles de classe primaires sont conçues pour refléter les valeurs de notre programme Cambridge tout en favorisant le développement holistique de chaque apprenant.', detail: 'At DGS, we aim to raise the next generation of leaders through critical thinking, problem-solving, and global awareness.', detailFr: 'À DGS, nous visons à former la prochaine génération de leaders grâce à la pensée critique, à la résolution de problèmes et à la conscience mondiale.' },
  { id: 'library', title: 'The Library', titleFr: 'La bibliothèque', subtitle: 'A World of Words', subtitleFr: 'Un monde de mots', icon: <BookOpen className="w-7 h-7" />, color: 'bg-amber-600', image: '/assets/Image/3.jpeg', description: 'Our well-equipped library is home to a wide variety of books for every age and interest.', descriptionFr: 'Notre bibliothèque bien équipée abrite une grande variété de livres pour tous les âges et tous les intérêts.', detail: 'Here, reading becomes a journey — one page at a time, opening doors to imagination, knowledge, and endless discovery.', detailFr: 'Ici, la lecture devient un voyage — une page à la fois, ouvrant des portes à l\'imagination, à la connaissance et à la découverte sans fin.' },
  { id: 'kitchen', title: 'The Kitchen', titleFr: 'La cuisine', subtitle: 'Nourishing Bright Minds', subtitleFr: 'Nourrir les esprits brillants', icon: <Utensils className="w-7 h-7" />, color: 'bg-emerald-600', image: '/assets/Image/4.jpeg', description: 'At DGS, holistic development also includes healthy nutrition. Our kitchen provides fresh, balanced, and delicious meals prepared and served the very same day.', descriptionFr: 'À DGS, le développement holistique inclut également une nutrition saine. Notre cuisine fournit des repas frais, équilibrés et délicieux préparés et servis le jour même.', detail: 'Just beside it, our school garden contributes to some of the ingredients on our menu.', detailFr: 'Juste à côté, notre jardin scolaire contribue à certains des ingrédients de notre menu.' },
  { id: 'ict', title: 'ICT Room', titleFr: 'Salle informatique', subtitle: 'Building Digital Futures', subtitleFr: 'Construire des avenirs numériques', icon: <Wifi className="w-7 h-7" />, color: 'bg-blue-600', image: '/assets/Image/5.jpeg', description: 'Our ICT room provides a dynamic environment where children develop digital literacy, creativity, and problem-solving skills.', descriptionFr: 'Notre salle informatique offre un environnement dynamique où les enfants développent des compétences en littératie numérique, créativité et résolution de problèmes.', detail: 'Through guided exploration of technology, learners build confidence, adaptability, and the innovative mindset needed for tomorrow\'s world.', detailFr: 'À travers l\'exploration guidée de la technologie, les apprenants développent la confiance, l\'adaptabilité et l\'esprit innovant nécessaires pour le monde de demain.' },
  { id: 'playground', title: 'Playground', titleFr: 'Aire de jeux', subtitle: 'Where Joy Runs Free', subtitleFr: 'Où la joie est libre', icon: <TreePine className="w-7 h-7" />, color: 'bg-teal-600', image: '/assets/Image/6.jpeg', description: 'Because play is an essential part of childhood, we created outdoor spaces where movement, laughter, and learning come together.', descriptionFr: 'Parce que le jeu est une partie essentielle de l\'enfance, nous avons créé des espaces extérieurs où le mouvement, le rire et l\'apprentissage se rejoignent.', detail: 'Our sports field allows learners to explore teamwork, discipline, and healthy competition, while our play area encourages imagination and joyful exploration.', detailFr: 'Notre terrain de sport permet aux apprenants d\'explorer le travail d\'équipe, la discipline et la compétition saine, tandis que notre aire de jeux encourage l\'imagination et l\'exploration joyeuse.' },
];

/* ────────────────────────────────────────────────
   WHATSAPP FLOATING BUTTON
──────────────────────────────────────────────── */
function WhatsAppButton() {
  const { t, i18n } = useTranslation();
  const isFr = i18n.language?.startsWith('fr');
  const [hovered, setHovered] = useState(false);

  const message = isFr
    ? 'Bonjour, je suis intéressé par l\'École Daniel Generation. Pouvez-vous m\'aider ?'
    : 'Hello, I am interested in Daniel Generation School. Can you help me?';

  const url = `https://wa.me/250796707019?text=${encodeURIComponent(message)}`;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-[998] flex items-center gap-3"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white text-stone-700 text-xs font-bold px-4 py-2.5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] whitespace-nowrap border border-stone-100"
          >
            {isFr ? 'Chattez avec nous sur WhatsApp' : 'Chat with us on WhatsApp'} 💬
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.6)] transition-shadow"
        style={{ backgroundColor: '#25D366' }}
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: '#25D366' }} />
        {/* WhatsApp SVG icon */}
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.a>
    </motion.div>
  );
}
function GrainOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[999] opacity-[0.032] mix-blend-overlay"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '128px 128px' }}
    />
  );
}

function MarqueeStrip({ inverted = false }: { inverted?: boolean }) {
  const { t, i18n } = useTranslation();
  const isFr = i18n.language?.startsWith('fr');
  const items = isFr
    ? ['Excellence', 'Foi', 'Intégrité', 'Leadership', 'Compassion', 'Rigueur académique', 'Valeurs chrétiennes', 'Épanouissement', 'Communauté',
       'Excellence', 'Foi', 'Intégrité', 'Leadership', 'Compassion', 'Rigueur académique', 'Valeurs chrétiennes', 'Épanouissement', 'Communauté']
    : ['Excellence', 'Faith', 'Integrity', 'Leadership', 'Compassion', 'Academic Rigor', 'Christ-like Values', 'Holistic Growth', 'Community',
       'Excellence', 'Faith', 'Integrity', 'Leadership', 'Compassion', 'Academic Rigor', 'Christ-like Values', 'Holistic Growth', 'Community'];
  return (
    <div className={`overflow-hidden py-5 md:py-6 border-y ${inverted ? 'bg-school-maroon border-school-maroon/30' : 'bg-school-tan/10 border-school-tan/20'}`}>
      <motion.div className="flex gap-0 whitespace-nowrap" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 28, ease: 'linear', repeat: Infinity }}>
        {items.map((item, i) => (
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
      <span className="font-black uppercase tracking-[0.4em] text-[10px] text-school-tan">{label}</span>
      <div className={`h-px w-8 ${light ? 'bg-school-tan/50' : 'bg-school-tan'}`} />
    </div>
  );
}

function BookVisitBanner() {
  const { t } = useTranslation();
  return (
    <div className="bg-school-tan/10 border border-school-tan/25 rounded-[2rem] p-8 md:p-12 text-center">
      <div className="text-3xl mb-3">✨</div>
      <p className="text-school-maroon font-serif text-xl md:text-2xl mb-2 italic">{t('bookVisit.welcome')}</p>
      <p className="text-stone-500 text-sm mb-8 font-light">{t('bookVisit.subtitle')}</p>
      <a href={BOOK_VISIT_URL} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-3 px-8 py-4 bg-school-maroon text-white font-black rounded-xl hover:bg-school-maroon/90 transition-all hover:-translate-y-0.5 shadow-[0_20px_40px_rgba(107,20,29,0.25)] text-sm uppercase tracking-widest">
        {t('bookVisit.btn')} <ArrowUpRight className="w-4 h-4" />
      </a>
    </div>
  );
}

/* ────────────────────────────────────────────────
   EVENT MODAL
──────────────────────────────────────────────── */
function EventModal({ event, onClose }: { event: typeof EVENTS[0] | null; onClose: () => void }) {
  const { t } = useTranslation();
  useEffect(() => {
    document.body.style.overflow = event ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [event]);

  const { month, day } = event ? getEventDateParts(event.date) : { month: '', day: '' };
  const calTitle = event ? encodeURIComponent(event.name) : '';
  const calDetails = event ? encodeURIComponent(`${event.type} — ${event.date}`) : '';
  const calLocation = encodeURIComponent('Daniel Generation School, KG 24 Ave, Kigali');
  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calTitle}&details=${calDetails}&location=${calLocation}`;

  return (
    <AnimatePresence>
      {event && (
        <>
          <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onClick={onClose} className="fixed inset-0 bg-school-maroon/60 backdrop-blur-sm z-[100]" />
          <motion.div key="modal" initial={{ opacity: 0, scale: 0.92, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94, y: 20 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8 pointer-events-none">
            <div className="bg-white rounded-[2.5rem] shadow-[0_60px_120px_-20px_rgba(107,20,29,0.35)] w-full max-w-lg pointer-events-auto overflow-hidden">
              <div className="bg-school-maroon relative overflow-hidden px-8 pt-8 pb-10">
                <AmbientBlob className="top-0 right-0 w-48 h-48 bg-school-tan/15 translate-x-1/3 -translate-y-1/3" />
                <button onClick={onClose} className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors z-20" aria-label="Close">
                  <span className="text-white text-lg font-bold leading-none">✕</span>
                </button>
                <div className="flex items-center gap-5 relative z-10">
                  <div className="w-20 h-20 bg-school-tan rounded-[1.5rem] flex flex-col items-center justify-center shadow-lg shrink-0">
                    <span className="text-[10px] font-black uppercase tracking-widest text-school-maroon/70 mb-0.5">{month}</span>
                    <span className="text-3xl font-serif font-bold text-school-maroon leading-none">{day}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.35em] text-school-tan/80 block mb-2">{event.type}</span>
                    <h3 className="text-2xl md:text-3xl font-serif text-white leading-tight">{event.name}</h3>
                  </div>
                </div>
              </div>
              <div className="px-8 py-7 space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center gap-4 p-4 bg-stone-50 rounded-2xl">
                    <div className="w-9 h-9 rounded-xl bg-school-tan/15 flex items-center justify-center shrink-0"><Calendar className="w-4 h-4 text-school-tan" /></div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-stone-400 mb-0.5">{t('events.modal.date')}</p>
                      <p className="text-sm font-bold text-school-maroon">{event.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-stone-50 rounded-2xl">
                    <div className="w-9 h-9 rounded-xl bg-school-tan/15 flex items-center justify-center shrink-0"><MapPin className="w-4 h-4 text-school-tan" /></div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-stone-400 mb-0.5">{t('events.modal.location')}</p>
                      <p className="text-sm font-bold text-school-maroon">{t('events.modal.school')}</p>
                      <p className="text-xs text-stone-400">{t('events.modal.address')}</p>
                    </div>
                  </div>
                  {event.description && (
                    <div className="p-4 bg-stone-50 rounded-2xl">
                      <p className="text-[9px] font-black uppercase tracking-widest text-stone-400 mb-2">{t('events.modal.about')}</p>
                      <p className="text-sm text-stone-500 leading-relaxed font-light">{event.description}</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a href={googleCalUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 bg-school-maroon text-white font-black rounded-xl text-xs uppercase tracking-widest hover:bg-school-maroon/90 transition-all hover:-translate-y-0.5 shadow-[0_8px_20px_rgba(107,20,29,0.2)]">
                    <Calendar className="w-4 h-4" /> {t('events.modal.addCal')}
                  </a>
                  <a href={BOOK_VISIT_URL} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 bg-school-tan/15 text-school-maroon font-black rounded-xl text-xs uppercase tracking-widest hover:bg-school-tan/25 transition-all border border-school-tan/20">
                    {t('events.modal.bookVisit')}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ────────────────────────────────────────────────
   FAQ ITEM
──────────────────────────────────────────────── */
function FAQItem({ faq }: { faq: { q: string; qFr?: string; a: string; aFr?: string } }) {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();
  const isFr = i18n.language?.startsWith('fr');
  const question = isFr && faq.qFr ? faq.qFr : faq.q;
  const answer   = isFr && faq.aFr ? faq.aFr : faq.a;
  return (
    <div className={`border rounded-xl md:rounded-2xl bg-white overflow-hidden transition-all duration-300 ${isOpen ? 'border-school-tan/40 shadow-[0_10px_40px_-10px_rgba(107,20,29,0.1)]' : 'border-stone-100 hover:border-school-tan/20'}`}>
      <button onClick={() => setIsOpen(!isOpen)} className="w-full px-5 md:px-7 py-4 md:py-5 flex items-center justify-between text-left gap-4 group">
        <span className="text-sm md:text-base font-bold text-school-maroon group-hover:text-school-tan transition-colors">{question}</span>
        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-school-tan text-white' : 'bg-stone-100 text-school-maroon'}`}>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}>
            <div className="px-5 md:px-7 pb-4 md:pb-5 text-stone-500 text-sm leading-relaxed border-t border-stone-50 pt-3">{answer}</div>
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
    } else { window.scrollTo(0, 0); }
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
  return { month: monthMatch ? monthMatch[0].toUpperCase().slice(0, 3) : 'JUL', day: dayMatch ? dayMatch[1] : '30' };
}

/* ════════════════════════════════════════════════
   PAGE: FOUNDER
════════════════════════════════════════════════ */
function FounderPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-stone-50 selection:bg-school-tan/30">
      <GrainOverlay />
      <Navigation scrolled={true} />
      <section className="pt-32 pb-0 bg-school-maroon relative overflow-hidden">
        <AmbientBlob className="top-0 right-0 w-[30rem] h-[30rem] bg-school-tan/10 translate-x-1/3 -translate-y-1/3" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <div className="flex items-center gap-4 mb-8"><div className="h-px w-8 bg-school-tan" /><span className="text-school-tan font-black uppercase tracking-[0.4em] text-[10px]">{t('founder.eyebrow')}</span></div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[0.9] tracking-tighter mb-6">Liliose<br /><span className="text-school-tan italic">Kaligirwa Tayi</span></h1>
            <p className="text-white/50 text-lg font-light">{t('founder.subtitle')}</p>
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
                  <img src="/assets/Image/liliose.jpg" alt="Liliose Kaligirwa Tayi" className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-school-maroon/30 to-transparent" />
                </div>
                <div className="absolute -bottom-5 right-6 z-20 bg-white rounded-2xl px-6 py-4 shadow-xl border border-stone-100">
                  <div className="text-xs font-black uppercase tracking-widest text-school-tan mb-0.5">{t('founder.badge')}</div>
                  <div className="text-sm font-bold text-school-maroon">{t('founder.badgeName')}</div>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.9 }} className="lg:col-span-3 pt-6">
              <div className="relative mb-10 pl-6 border-l-4 border-school-tan">
                <Quote className="w-8 h-8 text-school-tan/30 mb-3" />
                <p className="text-2xl md:text-3xl font-serif text-school-maroon italic leading-snug">{t('founder.quote')}</p>
                <p className="text-school-tan font-black uppercase tracking-widest text-xs mt-4">{t('founder.quoteTag')}</p>
              </div>
              <div className="space-y-5 text-stone-500 text-base md:text-lg leading-relaxed font-light">
                <p>{t('founder.p1')}</p>
                <p>{t('founder.p2')}</p>
                <p>{t('founder.p3')}</p>
              </div>
              <div className="flex flex-wrap gap-3 mt-10">
                {(t('founder.values', { returnObjects: true }) as string[]).map((val) => (
                  <span key={val} className="px-5 py-2 bg-school-tan/10 text-school-maroon rounded-full text-xs font-black uppercase tracking-widest border border-school-tan/20">{val}</span>
                ))}
              </div>
              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <a href={BOOK_VISIT_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-school-maroon text-white font-black rounded-xl hover:bg-school-maroon/90 transition-all hover:-translate-y-0.5 shadow-[0_20px_40px_rgba(107,20,29,0.2)] text-sm uppercase tracking-widest">
                  {t('founder.bookBtn')} <ArrowUpRight className="w-4 h-4" />
                </a>
                <Link to="/" className="inline-flex items-center gap-3 px-8 py-4 border border-stone-200 text-school-maroon font-black rounded-xl hover:border-school-maroon/30 transition-all text-sm uppercase tracking-widest">
                  <ChevronLeft className="w-4 h-4" /> {t('founder.backBtn')}
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
  const { t, i18n } = useTranslation();
  const isFr = i18n.language?.startsWith('fr');
  return (
    <div className="min-h-screen bg-stone-50 selection:bg-school-tan/30">
      <GrainOverlay />
      <Navigation scrolled={true} />
      <section className="pt-32 pb-0 bg-school-maroon relative overflow-hidden">
        <AmbientBlob className="top-0 left-0 w-[25rem] h-[25rem] bg-school-tan/8 -translate-x-1/3 -translate-y-1/3" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <div className="flex items-center gap-4 mb-8"><div className="h-px w-8 bg-school-tan" /><span className="text-school-tan font-black uppercase tracking-[0.4em] text-[10px]">{t('facilities.eyebrow')}</span></div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[0.9] tracking-tighter mb-6">{t('facilities.title')} <span className="text-school-tan italic">{t('facilities.titleItalic')}</span></h1>
            <p className="text-white/50 text-lg font-light max-w-2xl">{t('facilities.subtitle')}</p>
          </motion.div>
        </div>
        <div className="h-16 bg-stone-50 rounded-t-[3rem]" />
      </section>
      <section className="pb-24 md:pb-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-16 md:space-y-28">
            {FACILITIES.map((facility, idx) => (
              <motion.div key={facility.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className={`grid lg:grid-cols-2 gap-10 lg:gap-20 items-center ${idx % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}>
                <div className={`relative ${idx % 2 === 1 ? 'lg:[direction:ltr]' : ''}`}>
                  <div className={`absolute -top-4 ${idx % 2 === 1 ? '-right-4' : '-left-4'} w-full h-full border-2 border-school-tan/35 rounded-[2.5rem]`} />
                  <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(107,20,29,0.15)] relative z-10 bg-stone-200 group">
                    <img src={facility.image} alt={facility.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  <div className={`absolute -bottom-5 ${idx % 2 === 1 ? 'right-6' : 'left-6'} z-20`}>
                    <div className={`${facility.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl`}>{facility.icon}</div>
                  </div>
                </div>
                <div className={idx % 2 === 1 ? 'lg:[direction:ltr]' : ''}>
                  <span className="text-school-tan font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">{isFr ? facility.subtitleFr : facility.subtitle}</span>
                  <h2 className="text-4xl md:text-5xl font-serif text-school-maroon mb-6 leading-tight">{isFr ? facility.titleFr : facility.title}</h2>
                  <p className="text-stone-500 text-base md:text-lg leading-relaxed mb-5 font-light">{isFr ? facility.descriptionFr : facility.description}</p>
                  <p className="text-stone-400 text-sm md:text-base leading-relaxed font-light italic border-l-2 border-school-tan/30 pl-4">{isFr ? facility.detailFr : facility.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-24 md:mt-32"><BookVisitBanner /></div>
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
  const { t } = useTranslation();
  const image = GALLERY_IMAGES.find(img => img.id === id);
  if (!image) return <Navigate to="/" />;
  return (
    <div className="min-h-screen bg-stone-50 selection:bg-school-tan/30">
      <GrainOverlay />
      <Navigation scrolled={true} />
      <div className="w-full px-6 md:px-12 lg:px-24 py-24 md:py-40 lg:py-56">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="order-2 lg:order-1">
            <span className="text-school-tan font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">{t('galleryDetail.eyebrow')}</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-school-maroon mb-8 leading-[1.1] tracking-tighter">{image.alt}</h1>
            <p className="text-stone-600 text-lg md:text-xl leading-relaxed mb-12 font-light">{image.description}</p>
            <Link to="/" className="inline-flex items-center gap-3 text-school-maroon font-black uppercase tracking-widest text-xs hover:text-school-tan transition-all group border-b border-school-maroon/20 pb-2">
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> {t('galleryDetail.back')}
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1 }} className="relative order-1 lg:order-2">
            <div className="aspect-[4/5] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-[0_60px_120px_-20px_rgba(107,20,29,0.25)] relative z-10 group">
              <img src={image.src} alt={image.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
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
  const { t, i18n } = useTranslation();
  const isFr = i18n.language?.startsWith('fr');
  const scrolled = useScrolled(20);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const [selectedEvent, setSelectedEvent] = useState<typeof EVENTS[0] | null>(null);

  return (
    <div className="min-h-screen selection:bg-school-tan/30 scroll-smooth">
      <GrainOverlay />
      <Navigation scrolled={scrolled} />
      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />

      {/* ── HERO ── */}
      <section ref={heroRef} id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-school-maroon">
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <img src="/assets/Image/dgs.png" alt="" className="w-full h-[115%] object-cover opacity-50"
            onError={(e) => { const img = e.currentTarget; const f = ['/assets/Image/2.jpeg','/assets/Image/3.jpeg','/assets/Image/4.jpeg']; const n = f[0]; if (n) img.src = n; else img.style.display = 'none'; }} />
          <div className="absolute inset-0 bg-gradient-to-t from-school-maroon via-school-maroon/60 to-school-maroon/20" />
        </motion.div>
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-school-tan/10 rounded-full pointer-events-none" style={{ filter: 'blur(140px)' }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-12 md:pt-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-8 bg-school-tan/40" />
            <span className="text-school-tan/80 font-black uppercase tracking-[0.4em] text-[10px]">{t('hero.tagline')}</span>
            <div className="h-px w-8 bg-school-tan/40" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-serif text-white mb-6 md:mb-8 leading-[0.9] tracking-tighter">
            Daniel<br />Generation<br /><span className="text-school-tan italic">School.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="max-w-xl mx-auto text-base sm:text-lg text-white/60 mb-12 leading-relaxed font-light tracking-wide">
            {t('hero.subtitle')}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSdAc7taG2e-tsPzxtu1YoOdktMux-fa_Iw3xbfZz2Caan5kpw/viewform" target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto group px-8 py-4 bg-school-tan text-school-maroon font-black rounded-xl hover:bg-white transition-all flex items-center justify-center gap-3 shadow-[0_20px_60px_rgba(107,20,29,0.4)] hover:-translate-y-1 text-sm uppercase tracking-widest">
              {t('hero.register')} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href={BOOK_VISIT_URL} target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 border border-white/25 text-white font-black rounded-xl hover:bg-white/18 hover:border-white/40 transition-all flex items-center justify-center gap-2 backdrop-blur-xl text-sm uppercase tracking-widest">
              {t('hero.bookVisit')}
            </a>
            <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto px-8 py-4 border border-white/10 text-white/50 font-bold rounded-xl hover:bg-white/5 transition-all text-sm">
              {t('hero.discover')}
            </button>
          </motion.div>
        </div>
      </section>

      <MarqueeStrip />

      {/* ── ABOUT ── */}
      <section id="about" className="overflow-hidden">
        <div className="py-16 md:py-20 lg:py-28 bg-stone-50 relative overflow-hidden">
          <AmbientBlob className="top-0 right-0 w-[30rem] h-[30rem] bg-school-tan/8 translate-x-1/2 -translate-y-1/2" />
          <AmbientBlob className="bottom-0 left-0 w-80 h-80 bg-school-maroon/5 -translate-x-1/3 translate-y-1/3" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
                <div className="flex items-center gap-4 mb-6"><div className="h-px w-8 bg-school-tan" /><span className="text-school-tan font-black uppercase tracking-[0.4em] text-[10px]">{t('about.eyebrow')}</span></div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-school-maroon mb-5 leading-tight tracking-tighter">
                  {t('about.title')} <span className="text-school-tan italic">{t('about.titleItalic')}</span>
                </h2>
                <p className="text-sm md:text-base text-stone-400 max-w-xl leading-relaxed font-light mb-8">{t('about.body')}</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/founder" className="inline-flex items-center gap-3 px-6 py-3.5 bg-school-maroon text-white font-black rounded-xl hover:bg-school-maroon/90 transition-all hover:-translate-y-0.5 shadow-[0_16px_32px_rgba(107,20,29,0.18)] text-xs uppercase tracking-widest">
                    {t('about.founderBtn')} <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  <Link to="/facilities" className="inline-flex items-center gap-3 px-6 py-3.5 border border-school-maroon/20 text-school-maroon font-black rounded-xl hover:border-school-maroon hover:bg-school-maroon/5 transition-all text-xs uppercase tracking-widest">
                    {t('about.facilitiesBtn')} <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
              <div className="flex flex-col gap-5">
                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="p-5 md:p-6 rounded-[1.5rem] bg-school-maroon text-white shadow-[0_20px_50px_-15px_rgba(107,20,29,0.35)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-school-tan/8 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" style={{ filter: 'blur(40px)' }} />
                  <div className="absolute top-0 right-0 p-4 opacity-5"><GraduationCap className="w-20 h-20" /></div>
                  <h3 className="text-lg font-serif mb-2 text-school-tan relative z-10">{t('about.mission.title')}</h3>
                  <p className="text-xs text-white/70 leading-relaxed mb-4 font-light relative z-10">{t('about.mission.body')}</p>
                  <div className="flex items-center gap-2 text-school-tan font-bold uppercase tracking-[0.25em] text-[10px] relative z-10">
                    <div className="w-5 h-5 rounded-full border border-school-tan/30 flex items-center justify-center shrink-0"><CheckCircle2 className="w-3 h-3" /></div>
                    {t('about.mission.tag')}
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.12, duration: 0.8 }} className="p-5 md:p-6 rounded-[1.5rem] border border-school-maroon/8 bg-white hover:bg-stone-50 transition-colors duration-500">
                  <div className="text-4xl font-serif text-school-tan/15 leading-none mb-1 select-none">&ldquo;</div>
                  <h3 className="text-lg font-serif mb-2 text-school-maroon">{t('about.vision.title')}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed italic font-light">{t('about.vision.body')}</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROGRAMS ── */}
      <section id="programs" className="py-20 md:py-28 bg-stone-100 relative overflow-hidden">
        <AmbientBlob className="top-0 right-0 w-[30rem] h-[30rem] bg-school-maroon/5 translate-x-1/3 -translate-y-1/3" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-center mb-16">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="lg:w-1/3 text-center lg:text-left">
              <div className="flex items-center gap-4 mb-6 justify-center lg:justify-start"><div className="h-px w-8 bg-school-tan" /><span className="text-school-tan font-black uppercase tracking-[0.4em] text-[10px]">{t('programs.eyebrow')}</span></div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-school-maroon mb-6 leading-[0.95] tracking-tighter font-serif">
                {t('programs.title')}<br /><span className="italic text-school-tan">{t('programs.titleItalic')}</span>
              </h2>
              <p className="text-stone-500 text-base leading-relaxed font-light mb-8">{t('programs.body')}</p>
              <Link to="/facilities" className="inline-flex items-center gap-3 px-7 py-3.5 border border-school-maroon/20 text-school-maroon font-black rounded-xl hover:bg-school-maroon hover:text-white hover:border-school-maroon transition-all text-xs uppercase tracking-widest">
                {t('programs.facilitiesBtn')} <ArrowUpRight className="w-4 h-4" />
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

      {/* ── EVENTS ── */}
      <section id="events" className="py-24 md:py-32 bg-stone-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-16 lg:gap-24 items-start">
            <div className="lg:col-span-1 text-center lg:text-left">
              <div className="flex items-center gap-4 mb-6 justify-center lg:justify-start"><div className="h-px w-8 bg-school-tan" /><span className="text-school-tan font-black uppercase tracking-[0.4em] text-[10px]">{t('events.eyebrow')}</span></div>
              <h2 className="text-5xl md:text-6xl font-serif text-school-maroon mb-8 leading-tight tracking-tighter">{t('events.title')}<br /><span className="text-school-tan italic">{t('events.titleItalic')}</span></h2>
              <p className="text-stone-400 text-base font-light mb-12">{t('events.body')}</p>
              <Link to="/calendar" className="inline-flex items-center gap-6 p-6 bg-white rounded-[2rem] border border-stone-100 group hover:shadow-xl hover:border-school-tan/20 transition-all duration-300">
                <div className="w-12 h-12 bg-stone-50 rounded-xl flex items-center justify-center text-school-tan shadow-sm group-hover:scale-110 transition-transform"><Calendar className="w-6 h-6" /></div>
                <div className="text-left">
                  <div className="text-sm font-black text-school-maroon uppercase tracking-widest mb-1">{t('events.portal')}</div>
                  <div className="text-xs text-stone-400 font-bold group-hover:text-school-tan transition-colors">{t('events.portalSub')}</div>
                </div>
              </Link>
            </div>
            <div className="lg:col-span-2 space-y-4">
              {EVENTS.map((event, idx) => {
                const { month, day } = getEventDateParts(event.date);
                return (
                  <motion.div key={event.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.7 }} className="p-7 md:p-8 bg-white rounded-[2rem] border border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:shadow-[0_20px_50px_-15px_rgba(107,20,29,0.08)] hover:border-school-tan/20 transition-all duration-300 group">
                    <div className="flex items-center gap-6">
                      <div className="min-w-[4rem] aspect-square bg-stone-50 rounded-[1.5rem] border border-stone-100 flex flex-col items-center justify-center group-hover:bg-school-maroon group-hover:border-school-maroon transition-all">
                        <span className="text-[9px] font-black uppercase tracking-widest text-stone-300 group-hover:text-white/50 mb-0.5">{month}</span>
                        <span className="text-xl font-serif font-bold text-school-maroon group-hover:text-white transition-colors">{day}</span>
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.35em] text-school-tan mb-1">{event.type}</div>
                        <h4 className="text-lg md:text-xl font-serif text-school-maroon group-hover:text-school-tan transition-colors mb-1">{event.name}</h4>
                        <div className="flex items-center gap-2 text-stone-300 font-bold text-xs uppercase tracking-widest"><MapPin className="w-3 h-3 text-school-tan" />{event.date}</div>
                      </div>
                    </div>
                    <button onClick={() => setSelectedEvent(event)} className="w-full sm:w-auto px-6 py-3 bg-stone-50 border border-stone-200 text-school-maroon rounded-xl text-xs font-black uppercase tracking-widest hover:bg-school-maroon hover:text-white hover:border-school-maroon transition-all duration-300 whitespace-nowrap">
                      {t('events.viewDetails')}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 md:mb-24">
            <SectionEyebrow label={t('gallery.eyebrow')} />
            <h2 className="text-4xl md:text-6xl lg:text-7xl text-school-maroon font-serif">{t('gallery.title')} <span className="text-school-tan italic">{t('gallery.titleItalic')}</span></h2>
            <div className="flex items-center justify-center gap-4 text-stone-300 mt-6">
              <Camera className="w-4 h-4 text-school-tan" />
              <span className="text-xs font-medium italic">{t('gallery.subtitle')}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {GALLERY_IMAGES.map((img, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08, duration: 0.7 }}>
                <Link to={`/gallery/${img.id}`} className="relative block aspect-[4/5] rounded-[2.5rem] overflow-hidden group shadow-[0_20px_50px_-15px_rgba(107,20,29,0.08)] hover:shadow-[0_40px_80px_-15px_rgba(107,20,29,0.2)] transition-all duration-500">
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-school-maroon/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-8">
                    <div>
                      <span className="text-school-tan text-xs font-black uppercase tracking-widest block mb-1">{t('gallery.viewStory')}</span>
                      <span className="text-white text-xl font-serif italic">{img.alt}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section id="philosophy" className="py-20 md:py-28 bg-stone-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-4 mb-6 justify-center lg:justify-start"><div className="h-px w-8 bg-school-tan" /><span className="text-school-tan font-black uppercase tracking-[0.4em] text-[10px]">{t('philosophy.eyebrow')}</span></div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl text-school-maroon font-serif mb-8 leading-tight text-center lg:text-left">{t('philosophy.title')} <span className="text-school-tan italic">{t('philosophy.titleItalic')}</span></h3>
              <div className="space-y-6 md:space-y-8">
                {([
                  { icon: <BookOpen className="w-5 h-5 text-school-tan" />, key: 0 },
                  { icon: <Atom className="w-5 h-5 text-school-tan" />, key: 1 },
                  { icon: <Users className="w-5 h-5 text-school-tan" />, key: 2 },
                ] as { icon: React.ReactNode; key: number }[]).map((item, i) => {
                  const items = t('philosophy.items', { returnObjects: true }) as { title: string; desc: string }[];
                  return (
                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-4 md:gap-6 group">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-school-tan/15 flex items-center justify-center shrink-0 group-hover:bg-school-tan/25 group-hover:scale-110 transition-all duration-300">{item.icon}</div>
                      <div>
                        <h4 className="text-base md:text-lg font-bold text-school-maroon mb-1">{items[item.key].title}</h4>
                        <p className="text-stone-400 text-sm leading-relaxed">{items[item.key].desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="relative">
                <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-full h-full border-2 border-school-tan/60 rounded-3xl md:rounded-[3rem]" />
                <img src="/assets/Image/1.jpeg" alt="Students Learning" className="relative rounded-3xl md:rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(107,20,29,0.2)] z-10 w-full h-[300px] md:h-[500px] object-cover" />
                <div className="absolute -bottom-4 right-6 z-20 bg-white rounded-2xl px-5 py-3 shadow-xl border border-stone-100 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-widest text-school-maroon">{t('philosophy.badge')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOK A VISIT ── */}
      <section id="testimonials" className="py-20 bg-school-maroon relative overflow-hidden">
        <AmbientBlob className="top-0 right-0 w-[25rem] h-[25rem] bg-school-tan/10 translate-x-1/3 -translate-y-1/3" />
        <AmbientBlob className="bottom-0 left-0 w-[20rem] h-[20rem] bg-white/5 -translate-x-1/3 translate-y-1/3" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <p className="text-white/50 text-base font-light mb-8 italic">{t('bookVisit.italic')}</p>
            <a href={BOOK_VISIT_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-10 py-5 bg-school-tan text-school-maroon font-black rounded-xl hover:bg-white transition-all hover:-translate-y-1 shadow-[0_20px_60px_rgba(0,0,0,0.3)] text-sm uppercase tracking-widest">
              {t('bookVisit.cta')} <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── NEWS ── */}
      <section id="news" className="py-24 md:py-32 bg-stone-50 relative overflow-hidden">
        <AmbientBlob className="bottom-0 right-0 w-[25rem] h-[25rem] bg-school-tan/8 translate-x-1/3 translate-y-1/3" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-8 text-center md:text-left">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-6 justify-center md:justify-start"><div className="h-px w-8 bg-school-tan" /><span className="text-school-tan font-black uppercase tracking-[0.4em] text-[10px]">{t('news.eyebrow')}</span></div>
              <h2 className="text-4xl md:text-5xl font-serif text-school-maroon mb-4 leading-tight tracking-tighter">{t('news.title')} <span className="text-school-tan italic">{t('news.titleItalic')}</span></h2>
              <p className="text-stone-400 text-base font-light leading-relaxed">{t('news.body')}</p>
            </div>
            <a href="https://www.instagram.com/daniel_generation_school" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-school-maroon font-black uppercase tracking-[0.3em] text-[10px] hover:text-school-tan transition-all border-b border-school-maroon/20 hover:border-school-tan pb-2 group whitespace-nowrap">
              {t('news.allStories')} <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            {NEWS_STORIES.slice(0, 1).map((news, idx) => (
              <motion.div key={news.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.7 }} className="group cursor-pointer">
                <Link to={`/news/${news.id}`}>
                  <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-7 shadow-xl group-hover:shadow-2xl transition-shadow duration-500">
                    <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-school-maroon/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    <div className="absolute top-5 left-5 px-4 py-1.5 bg-white/95 backdrop-blur-sm text-[10px] font-black rounded-full text-school-maroon shadow-xl uppercase tracking-widest">{news.date}</div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif text-school-maroon group-hover:text-school-tan transition-colors mb-3">{news.title}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed line-clamp-2 font-light">{news.excerpt}</p>
                  <div className="flex items-center gap-2 mt-4 text-school-tan text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">{t('news.readStory')} <ArrowUpRight className="w-3 h-3" /></div>
                </Link>
              </motion.div>
            ))}
            {INSTAGRAM_STORIES.map((news, idx) => (
              <motion.div key={news.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (idx + 1) * 0.1, duration: 0.7 }} className="group cursor-pointer">
                <a href={news.link} target="_blank" rel="noopener noreferrer">
                  <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-7 shadow-xl group-hover:shadow-2xl transition-shadow duration-500">
                    <img src={news.image} alt={isFr ? news.titleFr : news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-school-maroon/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    <div className="absolute top-5 left-5 px-4 py-1.5 bg-white/95 backdrop-blur-sm text-[10px] font-black rounded-full text-school-maroon shadow-xl uppercase tracking-widest">{news.date}</div>
                    <div className="absolute top-5 right-5 px-3 py-1.5 bg-school-maroon/80 backdrop-blur-sm text-[9px] font-black rounded-full text-school-tan uppercase tracking-widest">Instagram</div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif text-school-maroon group-hover:text-school-tan transition-colors mb-3">{isFr ? news.titleFr : news.title}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed line-clamp-2 font-light">{isFr ? news.excerptFr : news.excerpt}</p>
                  <div className="flex items-center gap-2 mt-4 text-school-tan text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">{t('news.viewInstagram')} <ArrowUpRight className="w-3 h-3" /></div>
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
  const { t } = useTranslation();
  const values = t('coreValues.values', { returnObjects: true }) as { label: string; icon: string; desc: string }[];
  return (
    <div className="min-h-screen bg-stone-50 selection:bg-school-tan/30">
      <GrainOverlay />
      <Navigation scrolled={true} />
      <section className="pt-32 pb-0 bg-school-maroon relative overflow-hidden">
        <AmbientBlob className="top-0 right-0 w-[30rem] h-[30rem] bg-school-tan/10 translate-x-1/3 -translate-y-1/3" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <div className="flex items-center gap-4 mb-8"><div className="h-px w-8 bg-school-tan" /><span className="text-school-tan font-black uppercase tracking-[0.4em] text-[10px]">{t('coreValues.eyebrow')}</span></div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[0.9] tracking-tighter mb-6">{t('coreValues.title')} <span className="text-school-tan italic">{t('coreValues.titleItalic')}</span></h1>
            <p className="text-white/50 text-lg font-light max-w-2xl">{t('coreValues.subtitle')}</p>
          </motion.div>
        </div>
        <div className="h-16 bg-stone-50 rounded-t-[3rem]" />
      </section>
      <section className="pb-24 md:pb-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {values.map((v, idx) => (
              <motion.div key={v.label} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.8 }}
                className={`p-10 md:p-12 rounded-[2.5rem] ${idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''} bg-white border border-stone-100 hover:border-school-tan/30 hover:shadow-[0_30px_60px_-15px_rgba(107,20,29,0.1)] transition-all duration-300 group`}>
                <div className={`${idx % 2 === 0 ? 'bg-school-maroon' : 'bg-school-tan'} w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl mb-8 group-hover:scale-110 transition-transform duration-300 shadow-md font-serif`}>{v.icon}</div>
                <h3 className="text-3xl md:text-4xl font-serif text-school-maroon mb-4 italic">{v.label}</h3>
                <p className="text-stone-400 text-sm md:text-base leading-relaxed font-light">{v.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-school-maroon rounded-[2.5rem] p-10 md:p-14 text-center relative overflow-hidden">
            <AmbientBlob className="top-0 right-0 w-64 h-64 bg-school-tan/10" />
            <p className="text-school-tan font-black uppercase tracking-[0.4em] text-[10px] mb-6 relative z-10">{t('coreValues.inspiredBy')}</p>
            <blockquote className="text-2xl md:text-3xl font-serif text-white italic leading-relaxed max-w-3xl mx-auto mb-6 relative z-10">{t('coreValues.scripture')}</blockquote>
            <p className="text-white/40 text-sm font-bold uppercase tracking-widest relative z-10">{t('coreValues.reference')}</p>
          </motion.div>
          <div className="mt-12 text-center">
            <Link to="/" className="inline-flex items-center gap-3 px-8 py-4 border border-school-maroon/20 text-school-maroon font-black rounded-xl hover:bg-school-maroon hover:text-white transition-all text-sm uppercase tracking-widest">
              <ChevronLeft className="w-4 h-4" /> {t('coreValues.backBtn')}
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
  const { t, i18n } = useTranslation();
  const isFr = i18n.language?.startsWith('fr');
  return (
    <div className="min-h-screen bg-stone-50 selection:bg-school-tan/30">
      <GrainOverlay />
      <Navigation scrolled={true} />
      <section className="pt-32 pb-0 bg-school-maroon relative overflow-hidden">
        <AmbientBlob className="top-0 left-0 w-[25rem] h-[25rem] bg-school-tan/8 -translate-x-1/3 -translate-y-1/3" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <div className="flex items-center gap-4 mb-8"><div className="h-px w-8 bg-school-tan" /><span className="text-school-tan font-black uppercase tracking-[0.4em] text-[10px]">{t('faq.eyebrow')}</span></div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[0.9] tracking-tighter mb-6">{t('faq.title')} <span className="text-school-tan italic">{t('faq.titleItalic')}</span></h1>
            <p className="text-white/50 text-lg font-light max-w-2xl">{t('faq.subtitle')}</p>
          </motion.div>
        </div>
        <div className="h-16 bg-stone-50 rounded-t-[3rem]" />
      </section>
      <section className="pb-24 md:pb-32 bg-stone-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-10">
            {EXPANDED_FAQS.map((group, gIdx) => (
              <motion.div key={group.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: gIdx * 0.05 }}>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-school-maroon font-black uppercase tracking-[0.3em] text-xs">{isFr ? group.categoryFr : group.category}</span>
                  <div className="flex-1 h-px bg-stone-200" />
                </div>
                <div className="space-y-3">
                  {group.items.map((faq, fIdx) => <FAQItem key={fIdx} faq={faq} />)}
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 p-8 md:p-12 rounded-[2rem] bg-school-maroon text-white text-center relative overflow-hidden">
            <AmbientBlob className="top-0 right-0 w-48 h-48 bg-school-tan/10" />
            <h3 className="text-2xl md:text-3xl font-serif mb-3 text-school-tan relative z-10">{t('faq.stillTitle')}</h3>
            <p className="text-white/60 text-base font-light mb-8 relative z-10">{t('faq.stillBody')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <a href={BOOK_VISIT_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-school-tan text-school-maroon font-black rounded-xl hover:bg-white transition-all text-sm uppercase tracking-widest">
                {t('faq.bookBtn')} <ArrowUpRight className="w-4 h-4" />
              </a>
              <a href="mailto:info@danielgenerationschool.rw" className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-all text-sm">
                <Mail className="w-4 h-4" /> {t('faq.contactBtn')}
              </a>
            </div>
          </motion.div>
          <div className="mt-10 text-center">
            <Link to="/" className="inline-flex items-center gap-3 px-8 py-4 border border-school-maroon/20 text-school-maroon font-black rounded-xl hover:bg-school-maroon hover:text-white transition-all text-sm uppercase tracking-widest">
              <ChevronLeft className="w-4 h-4" /> {t('faq.backBtn')}
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

/* ════════════════════════════════════════════════
   PAGE: CONTACT
════════════════════════════════════════════════ */
function ContactPage() {
  const { t } = useTranslation();
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const SERVICE_ID  = 'service_nuz9vic';
      const TEMPLATE_ID = 'template_yk24b17';
      const PUBLIC_KEY  = 'F9QxZv6L4vSvcmCp-';
      const emailjs = await import('@emailjs/browser');
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        from_name: formState.name, from_email: formState.email,
        phone: formState.phone || 'Not provided', subject: formState.subject || 'General Enquiry',
        message: formState.message, to_email: 'info@danielgenerationschool.rw',
      }, PUBLIC_KEY);
      setSubmitted(true);
    } catch (err) {
      setError(t('contact.form.errorMsg'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 selection:bg-school-tan/30">
      <GrainOverlay />
      <Navigation scrolled={true} />
      <section className="pt-32 pb-0 bg-school-maroon relative overflow-hidden">
        <AmbientBlob className="top-0 right-0 w-[30rem] h-[30rem] bg-school-tan/10 translate-x-1/3 -translate-y-1/3" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <div className="flex items-center gap-4 mb-8"><div className="h-px w-8 bg-school-tan" /><span className="text-school-tan font-black uppercase tracking-[0.4em] text-[10px]">{t('contact.eyebrow')}</span></div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[0.9] tracking-tighter mb-6">{t('contact.title')} <span className="text-school-tan italic">{t('contact.titleItalic')}</span></h1>
            <p className="text-white/50 text-lg font-light max-w-2xl">{t('contact.subtitle')}</p>
          </motion.div>
        </div>
        <div className="h-16 bg-stone-50 rounded-t-[3rem]" />
      </section>
      <section className="pb-24 md:pb-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
            {([
              { icon: <MapPin className="w-5 h-5 text-school-tan" />, key: 'address', href: 'https://maps.google.com/?q=Omega+Church+KG+24+Ave+Kigali' },
              { icon: <Phone className="w-5 h-5 text-school-tan" />, key: 'phone', href: 'tel:+250796707019' },
              { icon: <Mail className="w-5 h-5 text-school-tan" />, key: 'email', href: 'mailto:info@danielgenerationschool.rw' },
            ] as { icon: React.ReactNode; key: 'address' | 'phone' | 'email'; href: string }[]).map((item, idx) => (
              <motion.a key={idx} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1, duration: 0.7 }}
                className="bg-white border border-stone-100 rounded-[2rem] p-7 flex gap-5 items-start hover:border-school-tan/30 hover:shadow-[0_20px_50px_-15px_rgba(107,20,29,0.1)] transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-school-tan/10 flex items-center justify-center shrink-0 group-hover:bg-school-tan/20 transition-colors">{item.icon}</div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-school-tan mb-1">{t(`contact.${item.key}.label`)}</p>
                  <p className="text-sm font-bold text-school-maroon mb-0.5">{t(`contact.${item.key}.value`)}</p>
                  <p className="text-xs text-stone-400 font-light">{t(`contact.${item.key}.sub`)}</p>
                </div>
              </motion.a>
            ))}
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.9 }} className="rounded-[2.5rem] overflow-hidden shadow-[0_30px_80px_-20px_rgba(107,20,29,0.15)] border border-stone-100 min-h-[420px] relative">
              <iframe title="Daniel Generation School — Map" src="https://www.openstreetmap.org/export/embed.html?bbox=30.0804%2C-1.9115%2C30.0865%2C-1.9035&layer=mapnik&marker=-1.9074563%2C30.0834471" width="100%" height="100%" style={{ border: 0, minHeight: '420px' }} allowFullScreen loading="lazy" />
              <div className="absolute bottom-5 left-5 bg-white rounded-xl px-4 py-3 shadow-xl border border-stone-100 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <div>
                  <p className="text-xs font-black text-school-maroon uppercase tracking-widest">{t('contact.mapBadge')}</p>
                  <p className="text-[10px] text-stone-400">{t('contact.mapAddress')}</p>
                </div>
              </div>
              <a href="https://www.google.com/maps/search/?api=1&query=Omega+Church+KG+24+Ave+Kigali+Rwanda" target="_blank" rel="noopener noreferrer"
                className="absolute top-5 right-5 bg-white rounded-xl px-4 py-2.5 shadow-xl border border-stone-100 flex items-center gap-2 text-[10px] font-black text-school-maroon uppercase tracking-widest hover:bg-school-tan transition-all">
                {t('contact.openMaps')} <ArrowUpRight className="w-3 h-3" />
              </a>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.9 }} className="bg-white border border-stone-100 rounded-[2.5rem] p-8 md:p-10 shadow-[0_30px_80px_-20px_rgba(107,20,29,0.08)]">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-6"><CheckCircle2 className="w-8 h-8 text-emerald-500" /></div>
                  <h3 className="text-2xl font-serif text-school-maroon mb-3">{t('contact.form.successTitle')}</h3>
                  <p className="text-stone-400 text-sm font-light mb-8 max-w-xs">{t('contact.form.successBody')}</p>
                  <button onClick={() => { setSubmitted(false); setFormState({ name: '', email: '', phone: '', subject: '', message: '' }); }} className="px-8 py-3.5 bg-school-maroon text-white font-black rounded-xl text-xs uppercase tracking-widest hover:bg-school-maroon/90 transition-all">
                    {t('contact.form.sendAnother')}
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl md:text-3xl font-serif text-school-maroon mb-2">{t('contact.form.title')}</h3>
                  <p className="text-stone-400 text-sm font-light mb-8">{t('contact.form.subtitle')}</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1.5 block">{t('contact.form.name')} *</label>
                        <input required type="text" value={formState.name} onChange={e => setFormState(s => ({ ...s, name: e.target.value }))} placeholder={t('contact.form.namePlaceholder')} className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-700 placeholder:text-stone-300 focus:outline-none focus:border-school-tan transition-colors" />
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1.5 block">{t('contact.form.phone')}</label>
                        <input type="tel" value={formState.phone} onChange={e => setFormState(s => ({ ...s, phone: e.target.value }))} placeholder={t('contact.form.phonePlaceholder')} className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-700 placeholder:text-stone-300 focus:outline-none focus:border-school-tan transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1.5 block">{t('contact.form.email')} *</label>
                      <input required type="email" value={formState.email} onChange={e => setFormState(s => ({ ...s, email: e.target.value }))} placeholder={t('contact.form.emailPlaceholder')} className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-700 placeholder:text-stone-300 focus:outline-none focus:border-school-tan transition-colors" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1.5 block">{t('contact.form.subject')}</label>
                      <select value={formState.subject} onChange={e => setFormState(s => ({ ...s, subject: e.target.value }))} className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-700 focus:outline-none focus:border-school-tan transition-colors bg-white">
                        <option value="">{t('contact.form.selectTopic')}</option>
                        <option value="admissions">{t('contact.form.topics.admissions')}</option>
                        <option value="visit">{t('contact.form.topics.visit')}</option>
                        <option value="fees">{t('contact.form.topics.fees')}</option>
                        <option value="programs">{t('contact.form.topics.programs')}</option>
                        <option value="other">{t('contact.form.topics.other')}</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1.5 block">{t('contact.form.message')} *</label>
                      <textarea required rows={4} value={formState.message} onChange={e => setFormState(s => ({ ...s, message: e.target.value }))} placeholder={t('contact.form.messagePlaceholder')} className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-700 placeholder:text-stone-300 focus:outline-none focus:border-school-tan transition-colors resize-none" />
                    </div>
                    {error && <p className="text-red-500 text-xs font-medium bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</p>}
                    <button type="submit" disabled={loading} className="w-full py-4 bg-school-maroon text-white font-black rounded-xl text-xs uppercase tracking-widest hover:bg-school-maroon/90 transition-all hover:-translate-y-0.5 shadow-[0_10px_30px_rgba(107,20,29,0.2)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3">
                      {loading ? (<><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{t('contact.form.sending')}</>) : t('contact.form.send')}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
          <div className="mt-12"><BookVisitBanner /></div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

/* ════════════════════════════════════════════════
   PAGE: 404 NOT FOUND
════════════════════════════════════════════════ */
function NotFoundPage() {
  const { t, i18n } = useTranslation();
  const isFr = i18n.language?.startsWith('fr');

  return (
    <div className="min-h-screen bg-school-maroon selection:bg-school-tan/30 flex flex-col">
      <GrainOverlay />
      <Navigation scrolled={false} />

      <div className="flex-1 flex items-center justify-center px-6 relative overflow-hidden">
        {/* Ambient blobs */}
        <AmbientBlob className="top-0 right-0 w-[40rem] h-[40rem] bg-school-tan/10 translate-x-1/3 -translate-y-1/3" />
        <AmbientBlob className="bottom-0 left-0 w-[30rem] h-[30rem] bg-white/5 -translate-x-1/3 translate-y-1/3" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center relative z-10 max-w-2xl mx-auto"
        >
          {/* 404 number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10rem] md:text-[16rem] font-serif text-white/10 leading-none select-none mb-0"
          >
            404
          </motion.div>

          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="flex justify-center -mt-8 mb-8"
          >
            <div className="w-20 h-20 rounded-[2rem] bg-school-tan/15 border border-school-tan/20 flex items-center justify-center">
              <span className="text-4xl">🔍</span>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-8 bg-school-tan/50" />
              <span className="text-school-tan font-black uppercase tracking-[0.4em] text-[10px]">
                {isFr ? 'Page introuvable' : 'Page not found'}
              </span>
              <div className="h-px w-8 bg-school-tan/50" />
            </div>

            <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
              {isFr ? 'Cette page n\'existe' : 'This page doesn\'t'}<br />
              <span className="text-school-tan italic">
                {isFr ? 'pas encore.' : 'exist yet.'}
              </span>
            </h1>

            <p className="text-white/50 text-base md:text-lg font-light mb-12 max-w-md mx-auto leading-relaxed">
              {isFr
                ? 'La page que vous cherchez a peut-être été déplacée, supprimée ou n\'a jamais existé.'
                : 'The page you\'re looking for may have been moved, deleted, or never existed.'}
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-school-tan text-school-maroon font-black rounded-xl hover:bg-white transition-all hover:-translate-y-1 shadow-[0_20px_60px_rgba(0,0,0,0.3)] text-sm uppercase tracking-widest"
            >
              <ChevronLeft className="w-4 h-4" />
              {isFr ? 'Retour à l\'accueil' : 'Back to Home'}
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/20 text-white font-black rounded-xl hover:bg-white/10 transition-all text-sm uppercase tracking-widest"
            >
              {isFr ? 'Nous contacter' : 'Contact Us'}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-16 pt-10 border-t border-white/10"
          >
            <p className="text-white/30 text-xs font-black uppercase tracking-widest mb-6">
              {isFr ? 'Pages populaires' : 'Popular pages'}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { to: '/founder',     label: isFr ? 'Notre fondatrice' : 'Our Founder' },
                { to: '/facilities',  label: isFr ? 'Nos installations' : 'Facilities' },
                { to: '/faq',         label: 'FAQ' },
                { to: '/core-values', label: isFr ? 'Valeurs' : 'Core Values' },
                { to: '/calendar',    label: isFr ? 'Calendrier' : 'Calendar' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-5 py-2 rounded-full border border-white/15 text-white/60 text-xs font-bold uppercase tracking-widest hover:border-school-tan hover:text-school-tan transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
export default function App() {
  return (
    <>
      <ScrollToTop />
      <WhatsAppButton />
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
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/core-values" element={<CoreValuesPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/gallery/:id" element={<GalleryDetailPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}