import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { NEWS_STORIES } from '../constants';
import { Navigation, Footer } from '../components/Layout';

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-school-tan/30">
      <Navigation scrolled={true} />

      <main className="pt-32 pb-24 md:pt-48 md:pb-32">
        <div className="w-full lg:max-w-none px-6 md:px-12 lg:px-24">
          <header className="text-center mb-24 md:mb-32">
             <span className="text-school-tan font-black uppercase tracking-[0.4em] text-[10px] md:text-xs mb-6 block">Our Story in Motion</span>
             <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-school-maroon leading-[0.85] tracking-tighter mb-12">
               Pedagogical <br />
               <span className="text-school-tan italic">Milestones.</span>
             </h1>
             <p className="max-w-2xl mx-auto text-stone-500 text-lg md:text-xl font-light leading-relaxed">
               A curated record of our progress, innovations, and the everyday miracles 
               that happen within our classrooms.
             </p>
          </header>

          <div className="space-y-32 md:space-y-48 lg:space-y-64">
            {NEWS_STORIES.map((story, idx) => (
              <motion.div 
                key={story.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center group"
              >
                <div className={`${idx % 2 === 0 ? 'order-2 lg:order-1' : 'order-2'} flex flex-col items-start`}>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="px-4 py-1.5 bg-stone-100 text-stone-500 text-[9px] font-black uppercase tracking-widest rounded-full">{story.date}</span>
                    <div className="w-1 h-1 bg-school-tan rounded-full" />
                    <span className="text-school-tan text-[9px] font-black uppercase tracking-widest">Story #{NEWS_STORIES.length - idx}</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-school-maroon mb-8 leading-[1.1] tracking-tighter group-hover:text-school-tan transition-colors">
                    {story.title}
                  </h2>
                  
                  <p className="text-stone-500 text-lg md:text-xl leading-relaxed mb-12 font-light">
                    {story.excerpt}
                  </p>

                  <Link 
                    to={`/news/${story.id}`}
                    className="inline-flex items-center gap-4 text-school-maroon font-black uppercase tracking-widest text-xs hover:text-school-tan transition-all group border-b-2 border-school-maroon/10 pb-2"
                  >
                    Read Full Directive
                    <ArrowUpRight className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                <div className={`${idx % 2 === 0 ? 'order-1 lg:order-2' : 'order-1'} relative`}>
                  <Link to={`/news/${story.id}`} className="block">
                    <div className="aspect-[4/5] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(107,20,29,0.15)] relative z-10">
                      <img 
                        src={story.image} 
                        alt={story.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-school-maroon/10 group-hover:bg-transparent transition-colors duration-700" />
                    </div>
                  </Link>
                  {/* Decorative background blobs */}
                  <div className={`absolute -bottom-10 -right-10 w-64 h-64 bg-school-tan/10 rounded-full blur-[80px] -z-10 ${idx % 2 === 0 ? 'bg-school-tan/10' : 'bg-school-maroon/5'}`} />
                  <div className={`absolute -top-10 -left-10 w-48 h-48 bg-school-maroon/5 rounded-full blur-[60px] -z-10`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
