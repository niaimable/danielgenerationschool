import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, Calendar, Share2, ArrowRight } from 'lucide-react';
import { NEWS_STORIES } from '../constants';
import { Navigation, Footer } from '../components/Layout';

export default function NewsDetailPage() {
  const { id } = useParams();
  const story = NEWS_STORIES.find(s => s.id === id);

  if (!story) return <Navigate to="/" />;

  return (
    <div className="min-h-screen bg-stone-50 selection:bg-school-tan/30">
      <Navigation scrolled={true} />

      <div className="w-full lg:max-w-none px-6 md:px-12 lg:px-24 py-32 md:py-48 lg:py-64">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="px-4 py-1.5 bg-school-tan/10 text-school-tan text-[10px] font-black uppercase tracking-widest rounded-full">News & Updates</span>
              <div className="flex items-center gap-2 text-stone-400 text-[10px] font-bold uppercase tracking-widest">
                <Calendar className="w-3.5 h-3.5" />
                {story.date}
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-school-maroon mb-10 leading-[0.9] tracking-tighter">
              {story.title.split(' ').map((word, i) => (
                <span key={i} className={i % 2 !== 0 ? 'text-school-tan italic' : ''}>
                  {word}{' '}
                </span>
              ))}
            </h1>
            
            <p className="text-stone-600 text-lg md:text-xl lg:text-2xl leading-relaxed mb-12 font-light">
              {story.content}
            </p>

            <div className="flex flex-col sm:flex-row gap-8">
              <Link 
                to="/#events" 
                className="inline-flex items-center gap-4 text-school-maroon font-black uppercase tracking-widest text-xs hover:text-school-tan transition-all group border-b-2 border-school-maroon/10 pb-2"
              >
                Upcoming Events
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative order-1 lg:order-2"
          >
            <div className="aspect-[1/1] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(107,20,29,0.2)] relative z-10 group">
              <img 
                src={story.image} 
                alt={story.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-school-maroon/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            
            {/* Decorative blurs */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-school-tan/20 rounded-full blur-[120px] -z-10" />
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-school-maroon/5 rounded-full blur-[100px] -z-10" />
            
            {/* Floating Card */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5 }}
               className="absolute -bottom-10 -left-10 md:-left-20 bg-white p-8 rounded-3xl shadow-2xl z-20 hidden md:block border border-stone-100 max-w-[280px]"
            >
              <div className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Editor's Summary</div>
              <p className="text-stone-600 text-sm italic leading-relaxed">{story.excerpt}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
