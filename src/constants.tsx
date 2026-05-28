import React from 'react';
import { Baby, School, MapPin, Users, CheckCircle2 } from 'lucide-react';

export const LANGUAGES = [
  { code: 'EN', name: 'English' },
  { code: 'KN', name: 'Kinyarwanda' },
  { code: 'FR', name: 'Français' }
];

export const PROGRAMS = [
  {
    title: 'Nursery Program',
    icon: <Baby className="w-10 h-10" />,
    color: 'bg-emerald-500',
    description: 'The nursery program at Daniel Generation School starts from Kindergarten 1 to Kindergarten 3, where students spend their time developing foundational skills through play, creativity, and guided learning.',
    milestones: ['Active Sensory Play', 'Social Integration', 'Early Literacy']
  },
  {
    title: 'Primary Program',
    icon: <School className="w-10 h-10" />,
    color: 'bg-indigo-600',
    description: 'The primary program at Daniel Generation School runs from Grade 1 to Grade 3, where students build strong academic foundations in mathematics, languages, science, and the arts.',
    milestones: ['STEAM Curriculum', 'Leadership Skills', 'Cognitive Growth']
  }
];

export const EVENTS = [
  {
    date: 'STARTING AT 6TH JULY 2026',
    type: 'Field Trip',
    name: 'SUMMER WITH JESUS',
    icon: <MapPin className="w-4 h-4" />,
    description: 'Join us this July for a memorable campus program filled with faith, fun, learning, and meaningful experiences. Daniel Generation School warmly welcomes children and families to "Summer with Jesus" — a special program designed to inspire spiritual growth, friendship, and joyful discovery in a nurturing environment. Through engaging activities, guided sessions, and exciting campus experiences, participants will enjoy a season of connection, purpose, and unforgettable memories.',
  },
  {
    date: 'THURSDAY, 30th July 2026',
    type: 'Field Trip',
    name: 'SUMMER WITH JESUS END',
    icon: <MapPin className="w-4 h-4" />,
    description: 'The closing day of our "Summer with Jesus" program — a celebration of everything our learners have experienced, grown through, and discovered over the month. Families are warmly invited to join us for this special farewell gathering filled with testimonies, performances, and joyful celebration of faith and community.',
  },
  // { date: 'Friday, 22nd May 2026', type: 'Internal Event', name: 'Sports Day', icon: <Users className="w-4 h-4" />, description: 'Annual sports day celebration.' },
  // { date: 'Friday, 26th June 2026', type: 'On-Campus Event', name: 'End of Year Presentations', icon: <CheckCircle2 className="w-4 h-4" />, description: 'End of year showcase.' }
];

export const GALLERY_IMAGES = [
  {
    id: 'students-writing',
    src: '/assets/Image/photo1.jpg',
    alt: 'Students Writing',
    description: 'Our learners focused and engaged during a writing activity in the nursery classroom — building early literacy skills one letter at a time.'
  },
  {
    id: 'teacher-helping',
    src: '/assets/Image/photo2.jpg',
    alt: 'Teacher and Students',
    description: 'Our dedicated teachers work closely with every learner, offering patient, hands-on guidance that meets each child exactly where they are.'
  },
  {
    id: 'playground',
    src: '/assets/Image/photo3.jpg',
    alt: 'Outdoor Playtime',
    description: 'Joyful outdoor play is an essential part of every day at DGS — children laugh, move, and discover the world around them under careful supervision.'
  },
  {
    id: 'classroom-activity',
    src: '/assets/Image/photo4.jpg',
    alt: 'Classroom Activity',
    description: 'Hands-on learning activities spark curiosity and creativity, helping our learners develop problem-solving skills in a warm, engaging environment.'
  },
  {
    id: 'floor-play',
    src: '/assets/Image/photo5.jpg',
    alt: 'Creative Play',
    description: 'Children learn best through play — exploring shapes, colours and patterns together builds early mathematical thinking and teamwork.'
  },
  {
    id: 'classroom-overview',
    src: '/assets/Image/photo6.jpg',
    alt: 'Our Classroom',
    description: 'Our bright, welcoming nursery classrooms are thoughtfully designed with learning corners for reading, creating, and discovering.'
  },
  {
    id: 'group-activity',
    src: '/assets/Image/photo7.jpg',
    alt: 'Group Learning',
    description: 'Collaborative floor activities build teamwork, communication, and social skills from the very earliest years of learning.'
  },
  {
    id: 'art-class',
    src: '/assets/Image/photo8.jpg',
    alt: 'Art and Expression',
    description: 'Creative arts help our learners express themselves with confidence and joy — from drawings to paintings, every child has a voice.'
  },
];

export const NEWS_STORIES = [
  {
    id: 'summer-with-jesus',
    date: 'July 6th, 2026',
    title: 'SUMMER WITH JESUS',
    excerpt: 'Join us for "Summer with Jesus" from 6th July to 30th July for a joyful campus experience of faith, fun, and unforgettable memories.',
    content: 'Join us this July for a memorable campus visit filled with faith, fun, learning, and meaningful experiences. From 6th July to 30th July, Daniel Generation School warmly welcomes children and families to a special "Summer with Jesus" program designed to inspire spiritual growth, friendship, and joyful discovery in a nurturing environment. Through engaging activities, guided sessions, and exciting campus experiences, participants will enjoy a season of connection, purpose, and unforgettable memories. Book your place today: +250796707019 Email: info@danielgenerationschool.rw',
    image: '/assets/Image/17.png'
  }
];

export const FAQS = [
  { question: "How can I book a campus visit?", answer: "We recommend booking at least 48 hours in advance via phone by calling our admin office '+250796707019' or email us at info@danielgenerationschool.rw" },
  { question: "What are the school hours?", answer: "Nursery classes run from 8:00 AM to 3:30 PM." },
  { question: "Are meals provided for students?", answer: "Yes, we provide balanced, nutritious lunches and morning snacks for all students in our clean and supervised school dining hall." }
];