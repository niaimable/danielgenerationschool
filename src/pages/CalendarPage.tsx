import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { EVENTS } from '../constants';
import { Navigation, Footer } from '../components/Layout';

// Helper to get days in month
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3)); // April 2026
  
  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const padding = Array.from({ length: firstDay }, (_, i) => null);

  // Filter events for current month
  const filteredEvents = EVENTS.filter(event => {
    // Example date format: "Thursday, 30th April 2026"
    return event.date.toLowerCase().includes(monthName.toLowerCase()) && event.date.includes(year.toString());
  });

  return (
    <div className="min-h-screen bg-stone-50 selection:bg-school-tan/30">
      <Navigation scrolled={true} />

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-32 lg:py-48">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
          
          {/* Calendar View */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-stone-100 p-8 md:p-12">
              <div className="flex items-center justify-between mb-12">
                <h1 className="text-3xl md:text-5xl font-serif text-school-maroon">
                  {monthName} <span className="text-school-tan italic">{year}</span>
                </h1>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                    className="p-3 bg-stone-50 rounded-xl hover:bg-school-maroon hover:text-white transition-all text-school-maroon"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                    className="p-3 bg-stone-50 rounded-xl hover:bg-school-maroon hover:text-white transition-all text-school-maroon"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 md:gap-4 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-[10px] md:text-xs font-black uppercase tracking-widest text-stone-300 pb-4">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2 md:gap-4">
                {padding.map((_, i) => (
                  <div key={`pad-${i}`} className="aspect-square bg-transparent" />
                ))}
                {days.map(day => {
                  const hasEvent = filteredEvents.some(e => e.date.includes(`${day}th`) || e.date.includes(`${day}st`) || e.date.includes(`${day}nd`) || e.date.includes(`${day}rd`) || e.date.includes(` ${day} `));
                  return (
                    <motion.div 
                      key={day}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: day * 0.01 }}
                      className={`aspect-square rounded-xl md:rounded-2xl flex flex-col items-center justify-center relative group cursor-pointer transition-all duration-300 ${
                        hasEvent 
                        ? 'bg-school-maroon text-white shadow-lg' 
                        : 'bg-stone-50 text-stone-500 hover:bg-stone-100 hover:scale-105'
                      }`}
                    >
                      <span className={`text-base md:text-xl font-bold ${hasEvent ? 'font-serif' : ''}`}>{day}</span>
                      {hasEvent && <div className="absolute bottom-2 w-1 h-1 bg-school-tan rounded-full" />}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Events List */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-school-tan/10 rounded-xl flex items-center justify-center text-school-tan">
                  <CalendarIcon className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-serif text-school-maroon">Month's <span className="italic text-school-tan">Agenda</span></h2>
              </div>

              <div className="space-y-6">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-6 md:p-8 bg-white border border-stone-100 rounded-[2rem] shadow-sm hover:shadow-xl transition-all group"
                    >
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-school-tan mb-3">{event.type}</div>
                      <h3 className="text-xl font-serif text-school-maroon mb-4 group-hover:text-school-tan transition-colors">{event.name}</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-stone-400 font-bold text-[10px] uppercase tracking-widest">
                          <CalendarIcon className="w-3.5 h-3.5 text-school-tan" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-3 text-stone-400 font-bold text-[10px] uppercase tracking-widest">
                          <Clock className="w-3.5 h-3.5 text-school-tan" />
                          8:00 AM - 4:00 PM
                        </div>
                        <div className="flex items-center gap-3 text-stone-400 font-bold text-[10px] uppercase tracking-widest">
                          <MapPin className="w-3.5 h-3.5 text-school-tan" />
                          Main Campus
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-12 text-center bg-white rounded-[2rem] border border-stone-100 text-stone-400 font-light italic">
                    No major events scheduled for this month.
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
