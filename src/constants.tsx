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
    description: 'The nursery program at Daniel Generation School start from kindergarten 1 to kindergarten 3 where students spent they time learning to hold a pen .',
    milestones: ['Active Sensory Play', 'Social Integration', 'Early Literacy']
  },
  {
    title: 'Primary Program',
    icon: <School className="w-10 h-10" />,
    color: 'bg-indigo-600',
    description: 'The primary program at Daniel Generation School start from Grade 1 to Grade 3 where students learn maths, music and science.',
    milestones: ['STEAM Curriculum', 'Leadership Skills', 'Cognitive Growth']
  }
];

export const EVENTS = [
  { date: 'STARTING AT 6TH JULY 2026', type: 'Field Trip', name: 'SUMMER WITH JESUS', icon: <MapPin className="w-4 h-4" /> },
  { date: 'THURSDAY, 30th July 2026', type: 'Field Trip', name: 'SUMMER WITH JESUS END', icon: <MapPin className="w-4 h-4" /> }
  // { date: 'Friday, 22nd May 2026', type: 'Internal Event', name: 'Sports Day', icon: <Users className="w-4 h-4" /> },
  // { date: 'Friday, 26th June 2026', type: 'On-Campus Event', name: 'End of Year Presentations', icon: <CheckCircle2 className="w-4 h-4" /> }
];

export const GALLERY_IMAGES = [
  { 
    id: 'classroom-dynamic',
    src: '/assets/Image/2.jpeg', 
    alt: 'Classroom Dynamic',
    description: 'Our classrooms are designed to be vibrant hubs of collaborative learning. Here, students engage in interactive lessons that balance group discussions with focused individual projects, fostering a curiosity-driven atmosphere.'
  },
  { 
    id: 'creative-arts',
    src: '/assets/Image/10.jpeg', 
    alt: 'Creative Arts',
    description: 'Expression is central to a holistic education. In our arts program, students explore various mediums—from traditional painting to digital design—helping them develop their unique voice and creative thinking skills.'
  },
  { 
    id: 'science-lab',
    src: '/assets/Image/16.png', 
    alt: 'Science Lab',
    description: 'Our modern science laboratories allow students to move beyond theory into hands-on discovery. From elementary chemistry to advanced biology, we provide the tools for students to experiment safely and think like future scientists.'
  },
  { 
    id: 'outdoor-play',
    src: '/assets/Image/9.jpeg', 
    alt: 'Outdoor Play',
    description: 'Physical activity and peer interaction are vital for development. Our spacious outdoor areas are safe environments where students can play, socialise, and participate in organized sports, building resilience and teamwork.'
  },
  { 
    id: 'library-time',
    src: '/assets/Image/6.jpeg', 
    alt: 'Library Time',
    description: 'The school library is a sanctuary for research and literature. We encourage a love for reading from a young age, providing an extensive collection of both international and local works to broaden our students’ horizons.'
  },
  { 
    id: 'student-projects',
    src: '/assets/Image/14.jpeg', 
    alt: 'Student Projects',
    description: 'Project-based learning at DGS helps students apply theoretical knowledge to real-world problems. Whether it is an environmental initiative or a community service plan, these projects are the cornerstone of our leadership training.'
  }
];

export const NEWS_STORIES = [
  { 
    id: 'summer-with-jesus',
    date: 'July 6th, 2026', 
    title: 'SUMMER WITH JESUS', 
    excerpt: 'Join us for “Summer with Jesus” from 6th July to 30th July for a joyful campus experience of faith, fun, and unforgettable memories.',
    content: 'Join us this July for a memorable campus visit filled with faith, fun, learning, and meaningful experiences. From 6th July to 30th July, Daniel Generation School warmly welcomes children and families to a special “Summer with Jesus” program designed to inspire spiritual growth, friendship, and joyful discovery in a nurturing environment. Through engaging activities, guided sessions, and exciting campus experiences, participants will enjoy a season of connection, purpose, and unforgettable memories. Book your place today: +250796707019 Email: info@danielgenerationschool.rw',
    image: '/assets/Image/17.png'
  }
  // { 
  //   id: 'nursery-play-day',
  //   date: 'April 5, 2026', 
  //   title: 'Nursery Play Day Success', 
  //   excerpt: 'Our tiny explorers had a wonderful day learning social skills through interactive outdoor play activities.',
  //   content: 'The annual Nursery Play Day transformed our campus into a vibrant festival of early childhood development. From sensory bins filled with textured sands to collaborative mural painting on giant canvases, our kindergarten students practiced fine motor control and social negotiation. These events are crucial for building the emotional resilience and community bonds that define the DGS experience.',
  //   image: 'https://images.unsplash.com/photo-1516627145497-ae69688df174?auto=format&fit=crop&q=80&w=1200'
  // },
  // { 
  //   id: 'global-citizenship',
  //   date: 'March 28, 2026', 
  //   title: 'Global Citizenship Program', 
  //   excerpt: 'Primary students explored international cultures through our new interactive learning module.',
  //   content: 'In our quest to foster empathy and cultural intelligence, the Primary Program launched the first phase of our Global Citizenship module. Students "traveled" to different continents through virtual reality and guest speaker sessions, learning about geography, tradition, and global responsibility. This initiative ensures our graduates are as culturally fluent as they are academically proficient.',
  //   image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200'
  // }
];

export const FAQS = [
  { question: "How can I book a campus visit?", answer: "We recommend booking at least 48 hours in advance via phone by calling our admin office '+250796707019' or email us at info@danielgenerationschool.rw" },
  { question: "What are the school hours?", answer: "Nursery classes run from 8:00 AM to  3:30 PM." },
  { question: "Are meals provided for students?", answer: "Yes, we provide balanced, nutritious lunches and morning snacks for all students in our clean and supervised school dining hall." }
];
