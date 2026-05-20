import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  MapPin,
  Clock,
} from 'lucide-react';
import { EVENTS } from '../constants';
import { Navigation, Footer } from '../components/Layout';

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

function getInitialDate(): Date {
  const today = new Date();

  // Find the earliest upcoming event date
  for (const event of EVENTS) {
    const monthMatch = event.date.match(/(January|February|March|April|May|June|July|August|September|October|November|December)/i);
    const yearMatch  = event.date.match(/\d{4}/);
    const dayMatch   = event.date.match(/(\d{1,2})(?:st|nd|rd|th)?/i);

    if (monthMatch && yearMatch && dayMatch) {
      const eventDate = new Date(
        parseInt(yearMatch[0]),
        new Date(`${monthMatch[0]} 1`).getMonth(),
        parseInt(dayMatch[0])
      );
      if (eventDate >= today) {
        // Start the calendar at this event's month
        return new Date(eventDate.getFullYear(), eventDate.getMonth(), 1);
      }
    }
  }

  // No upcoming events — just use today's month
  return new Date(today.getFullYear(), today.getMonth(), 1);
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(getInitialDate);

  const daysInMonth  = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay     = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
  const monthName    = currentDate.toLocaleString('default', { month: 'long' });
  const year         = currentDate.getFullYear();
  const today        = new Date();
  const isThisMonth  =
    today.getFullYear() === currentDate.getFullYear() &&
    today.getMonth()    === currentDate.getMonth();

  const days    = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const padding = Array.from({ length: firstDay }, () => null);

  const filteredEvents = EVENTS.filter(event =>
    event.date.toLowerCase().includes(monthName.toLowerCase()) &&
    event.date.includes(year.toString())
  );

  return (
    <div className="min-h-screen bg-stone-50 selection:bg-school-tan/30">
      <Navigation scrolled={true} />

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-32 lg:py-48">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">

          {/* ── Calendar ── */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-stone-100 p-8 md:p-12">

              {/* Header */}
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h1 className="text-3xl md:text-5xl font-serif text-school-maroon">
                    {monthName} <span className="text-school-tan italic">{year}</span>
                  </h1>
                  {isThisMonth && (
                    <p className="text-[10px] font-black uppercase tracking-widest text-school-tan mt-1">
                      Current Month
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {/* Jump to today */}
                  <button
                    onClick={() => setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1))}
                    className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-school-maroon bg-stone-50 rounded-xl hover:bg-school-tan/15 transition-all border border-stone-200"
                  >
                    Today
                  </button>
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

              {/* Day labels */}
              <div className="grid grid-cols-7 gap-2 md:gap-4 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-[10px] md:text-xs font-black uppercase tracking-widest text-stone-300 pb-4">
                    {day}
                  </div>
                ))}
              </div>

              {/* Day grid */}
              <div className="grid grid-cols-7 gap-2 md:gap-4">
                {padding.map((_, i) => (
                  <div key={`pad-${i}`} className="aspect-square" />
                ))}
                {days.map(day => {
                  const hasEvent = filteredEvents.some(e =>
                    e.date.includes(`${day}th`) ||
                    e.date.includes(`${day}st`) ||
                    e.date.includes(`${day}nd`) ||
                    e.date.includes(`${day}rd`) ||
                    e.date.includes(` ${day} `)
                  );
                  const isToday = isThisMonth && day === today.getDate();

                  return (
                    <motion.div
                      key={day}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: day * 0.008 }}
                      className={`aspect-square rounded-xl md:rounded-2xl flex flex-col items-center justify-center relative transition-all duration-300 cursor-default
                        ${hasEvent
                          ? 'bg-school-maroon text-white shadow-lg'
                          : isToday
                          ? 'bg-school-tan/20 text-school-maroon ring-2 ring-school-tan'
                          : 'bg-stone-50 text-stone-500 hover:bg-stone-100'
                        }`}
                    >
                      <span className={`text-base md:text-xl font-bold ${hasEvent ? 'font-serif' : ''}`}>{day}</span>
                      {hasEvent && <div className="absolute bottom-2 w-1 h-1 bg-school-tan rounded-full" />}
                      {isToday && !hasEvent && (
                        <div className="absolute bottom-2 w-1 h-1 bg-school-maroon rounded-full" />
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-6 mt-8 pt-6 border-t border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-md bg-school-maroon" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Event Day</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-md bg-school-tan/20 ring-2 ring-school-tan" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Today</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Agenda ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-school-tan/10 rounded-xl flex items-center justify-center text-school-tan">
                  <CalendarIcon className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-serif text-school-maroon">
                  Month's <span className="italic text-school-tan">Agenda</span>
                </h2>
              </div>

              <div className="space-y-6">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-6 md:p-8 bg-white border border-stone-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-school-tan/20 transition-all group"
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
                          8:00 AM – 4:00 PM
                        </div>
                        <div className="flex items-center gap-3 text-stone-400 font-bold text-[10px] uppercase tracking-widest">
                          <MapPin className="w-3.5 h-3.5 text-school-tan" />
                          Main Campus
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-10 text-center bg-white rounded-[2rem] border border-stone-100">
                    <CalendarIcon className="w-8 h-8 text-stone-200 mx-auto mb-3" />
                    <p className="text-stone-400 text-sm font-light italic">No events this month.</p>
                    <p className="text-stone-300 text-xs mt-1">Use the arrows to browse other months.</p>
                  </div>
                )}
              </div>

              {/* All upcoming events summary */}
              {EVENTS.length > 0 && (
                <div className="mt-8 p-6 bg-school-maroon/5 rounded-[1.5rem] border border-school-maroon/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-school-tan mb-3">All Upcoming</p>
                  {EVENTS.map((event, idx) => (
                    <div key={idx} className="flex items-center gap-3 py-2 border-b border-school-maroon/5 last:border-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-school-tan shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-school-maroon">{event.name}</p>
                        <p className="text-[10px] text-stone-400">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}