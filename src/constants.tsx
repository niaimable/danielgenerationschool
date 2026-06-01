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
    date: '13th July – 7th August 2026',
    type: 'Summer Program',
    name: 'SUMMER WITH JESUS',
    icon: <MapPin className="w-4 h-4" />,
    description: 'A Christ-centered summer experience where children grow in faith, joy, love, and godly character. Open to ages 3–14 years.\n\n📍 Location: Kagugu, KG 24\n\n💰 Program Fees:\n• 4-week program: 150,000 RWF\n• Weekly option: 50,000 RWF per week\n\nAll meals, materials and activity supplies are provided by the school.',
    registerLink: 'https://docs.google.com/forms/d/e/1FAIpQLScB6p-7n1FvloGC6N2-A8oxVEILZoal4yZU7taaKym4vWZtJg/viewform',
  },
  {
    date: 'September 2026',
    type: 'Academic Year',
    name: 'NEW SCHOOL YEAR 2026/2027',
    icon: <CheckCircle2 className="w-4 h-4" />,
    description: 'We are excited to welcome our learners back for the new academic year 2026/2027! Admissions are open for Nursery (KG1–KG3) and Primary (Grade 1–Grade 3). Join the DGS family and be part of a generation shaped by faith, excellence, and Godly character.',
    registerLink: 'https://docs.google.com/forms/d/e/1FAIpQLSdAc7taG2e-tsPzxtu1YoOdktMux-fa_Iw3xbfZz2Caan5kpw/viewform',
  },
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