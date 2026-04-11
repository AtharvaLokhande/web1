/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef, ReactNode } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Moon, 
  Sun, 
  ArrowDown, 
  Linkedin, 
  Mail, 
  Github, 
  FileText,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

// --- Components ---

const Reveal = ({ children, className = "" }: { children: ReactNode; className?: string; key?: any }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? 'visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

const Typewriter = () => {
  const phrases = ["Strategy.", "Operations.", "Product.", "Leadership."];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === phrases[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 100 : 200);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <div className="text-primary text-2xl md:text-4xl font-serif italic typewriter min-h-[1.5em]">
      {phrases[index].substring(0, subIndex)}
    </div>
  );
};

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-dark-background/80 backdrop-blur-xl transition-all border-b border-on-background/5">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-6 md:px-12 py-4 md:py-6 gap-4">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12 lg:gap-16 w-full md:w-auto">
          <div className="text-2xl font-serif font-semibold italic text-primary shrink-0">Atharva Lokhande</div>
          <div className="flex flex-wrap justify-center md:flex-nowrap gap-4 md:gap-6 items-center">
            <a className="text-slate-600 dark:text-slate-400 font-sans text-[10px] md:text-xs uppercase tracking-widest hover:text-primary transition-colors whitespace-nowrap" href="#philosophy">Motivation</a>
            <a className="text-slate-600 dark:text-slate-400 font-sans text-[10px] md:text-xs uppercase tracking-widest hover:text-primary transition-colors whitespace-nowrap" href="#journey">Journey</a>
            <a className="text-slate-600 dark:text-slate-400 font-sans text-[10px] md:text-xs uppercase tracking-widest hover:text-primary transition-colors whitespace-nowrap" href="#leadership">Leadership</a>
            <a className="text-slate-600 dark:text-slate-400 font-sans text-[10px] md:text-xs uppercase tracking-widest hover:text-primary transition-colors whitespace-nowrap" href="#expertise">Expertise</a>
            <a className="text-slate-600 dark:text-slate-400 font-sans text-[10px] md:text-xs uppercase tracking-widest hover:text-primary transition-colors whitespace-nowrap" href="#portfolio">Projects</a>
            <a className="text-slate-600 dark:text-slate-400 font-sans text-[10px] md:text-xs uppercase tracking-widest hover:text-primary transition-colors whitespace-nowrap" href="#interests">Interests</a>
          </div>
        </div>
        <div className="flex items-center gap-4 md:gap-6 shrink-0">
          <button 
            className="p-2 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" 
            onClick={() => setIsDark(!isDark)}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <a className="bg-primary text-white px-4 md:px-6 py-2 text-[10px] md:text-xs uppercase tracking-widest font-medium hover:bg-opacity-90 transition-all whitespace-nowrap" href="mailto:atharva.lokhande24@iimb.ac.in">Connect</a>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center pt-24">
    <Reveal className="max-w-4xl space-y-8 flex flex-col items-center">
      <div className="relative mb-8">
        <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary/20 ring-4 ring-primary ring-offset-4 dark:ring-offset-dark-background bg-surface">
          <img 
            alt="Atharva Lokhande" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida/ADBb0uhbF1ZEQi5UA0Xr7gWoHAQjhOeiR_UBshBLN6wDNFd__pRcEiaIVsUtCZOSfRzB3MkN3xfgWP1CU10SvmqnlITsVtPdavgWsyyIhXPP0Qur02nj3T5BnqOrQG3Ltx2u7FEMsSY--AHhS1KWlnnJyWgevPuwDAO3c1XxbtV1jdBvqQ9JznzdaV7V6g4VscAZor2YmHO4Zqlr4DDHGUsDGV240stJx6zxG2FHHVGgn0OxHZDHoaATKKAz_1cTw2XHI04EmXQE-red"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
      <h1 className="text-6xl md:text-9xl font-serif tracking-tighter italic">Atharva Lokhande</h1>
      <p className="text-xl md:text-2xl font-serif text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
        Naturally curious strategist at the intersection of business, technology, and operations.
      </p>
      <Typewriter />
      <div className="pt-12 animate-bounce">
        <ArrowDown className="text-slate-400 mx-auto" />
      </div>
    </Reveal>
  </section>
);

const Philosophy = () => (
  <section className="py-32 px-6 md:px-12 bg-white/50 dark:bg-dark-surface/50" id="philosophy">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-center">
      <Reveal className="space-y-8">
        <h2 className="text-4xl md:text-6xl font-serif italic leading-tight">
          "Excellence is the habit of pairing deep curiosity with disciplined consistent action"
        </h2>
        <div className="flex flex-wrap gap-3">
          {["Squash & TT", "F1", "Retro Music", "Geopolitics", "Philosophy"].map((tag) => (
            <span key={tag} className="px-4 py-1 border border-primary/30 rounded-full text-xs uppercase tracking-widest text-primary font-medium bg-primary/5">
              {tag}
            </span>
          ))}
        </div>
      </Reveal>
      <Reveal className="space-y-8 font-serif text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
        <p>Bridging the analytical rigor of an IIT Bombay engineer with the strategic foresight of an IIM Bangalore leader. My approach centers on decanting complex organizational friction into high-throughput operational engines.</p>
        <p>From architecting cost-reduction roadmaps for global MNCs to driving growth models at AMEX, I specialize in stripping away noise to reveal the critical levers of impact.</p>
      </Reveal>
    </div>
  </section>
);

const Education = () => (
  <section className="py-32 px-6 md:px-12" id="journey">
    <div className="max-w-7xl mx-auto">
      <h3 className="text-xs uppercase tracking-[0.3em] text-primary mb-16 font-semibold">Academic Pedigree</h3>
      <div className="grid md:grid-cols-2 gap-8 md:gap-16">
        {/* IIMB */}
        <div className="flex flex-col space-y-4">
          <div className="flex justify-start h-16 items-center">
            <img 
              alt="IIM Bangalore Logo" 
              className="max-h-full object-contain dark:brightness-0 dark:invert" 
              src="https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/IIM_Bangalore_Logo.svg/1200px-IIM_Bangalore_Logo.svg.png"
              referrerPolicy="no-referrer"
            />
          </div>
          <Reveal className="p-8 md:p-12 bg-surface dark:bg-dark-surface border border-on-background/5 relative group overflow-hidden hover:border-primary/30 transition-all flex flex-col min-h-[350px]">
            <img 
              alt="IIMB Campus" 
              className="bg-campus-overlay" 
              src="https://lh3.googleusercontent.com/aida/ADBb0uiU3pB5KLeoQgQ6Jcp7z39QdFOR-JrtQ-ZAV051KAt-O7payBYWiZBnRN_dDLeAnaRBoYlYFNXiA4f-xve1YdfAI6zWw3d2swoV5IissvNuHkLOVakwOL2sNQOXz5_7A9aAmU08Uwf9PVObuCH26rNjhBAA5zqfC97mINJlhzdQ6Y8CoAgxY73hyLOpU4Yyr-TDezKnMWT3qHe0_x6It5YctPSK7pHnxNoXawpIcia7we-rA5e_pWW6lIoOlR_9oaEHgMS_fCfMzw"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="text-5xl md:text-6xl font-serif italic text-primary">3.55 <span className="text-2xl text-slate-400 not-italic">/ 4.00</span></div>
              </div>
              <h4 className="text-2xl md:text-3xl font-serif mb-1">IIM Bangalore (2026)</h4>
              <p className="text-primary text-[10px] md:text-xs uppercase tracking-widest mb-4">MBA | Business Administration</p>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-sm md:text-base">
                <li>• Director’s Honor List (Top 10% of Batch)</li>
                <li>• Class Topper in 4 key subjects</li>
                <li>• Mannheim Business School Exchange (Germany)</li>
              </ul>
            </div>
          </Reveal>
        </div>
        {/* IITB */}
        <div className="flex flex-col space-y-4">
          <div className="flex justify-start h-16 items-center">
            <img 
              alt="IIT Bombay Logo" 
              className="max-h-full object-contain dark:brightness-0 dark:invert" 
              src="https://lh3.googleusercontent.com/aida/ADBb0ugPgXwdObtkcbC03npdAMrehA5eQIQOBUerwHaa_KVOhDXVdM5btSKCN46b5ekBmTTWp2PN_AWGt-Ribw0iHlCe9CSGvxJ7KehyGlJZw6G-Ql7TbuncIooZ5ICxKfcbEwjMQlZoLnRn0zrI7Fhbu51msd0x71e1QFRDGEwWnryz9F7WMkltf8O-KK9pEe6jynTa0M5ZtLzffs1-X6u9k15ixZV2NTyxS8y5Cgecn9YocTqDsida7UA7AkdtpYc7i5eYbbtWFvLJ-A"
              referrerPolicy="no-referrer"
            />
          </div>
          <Reveal className="p-8 md:p-12 bg-surface dark:bg-dark-surface border border-on-background/5 relative group overflow-hidden hover:border-primary/30 transition-all flex flex-col min-h-[350px]">
            <img 
              alt="IITB Campus" 
              className="bg-campus-overlay" 
              src="https://lh3.googleusercontent.com/aida/ADBb0uiU3pB5KLeoQgQ6Jcp7z39QdFOR-JrtQ-ZAV051KAt-O7payBYWiZBnRN_dDLeAnaRBoYlYFNXiA4f-xve1YdfAI6zWw3d2swoV5IissvNuHkLOVakwOL2sNQOXz5_7A9aAmU08Uwf9PVObuCH26rNjhBAA5zqfC97mINJlhzdQ6Y8CoAgxY73hyLOpU4Yyr-TDezKnMWT3qHe0_x6It5YctPSK7pHnxNoXawpIcia7we-rA5e_pWW6lIoOlR_9oaEHgMS_fCfMzw"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="text-5xl md:text-6xl font-serif italic text-primary">9.12 <span className="text-2xl text-slate-400 not-italic">/ 10.00</span></div>
              </div>
              <h4 className="text-2xl md:text-3xl font-serif mb-1">IIT Bombay (2022)</h4>
              <p className="text-primary text-[10px] md:text-xs uppercase tracking-widest mb-4">B.Tech | MEMS Engineering</p>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-sm md:text-base">
                <li>• Department Rank 2 (Out of 100+)</li>
                <li>• Pre-placement Offer from Vedantu Edtech</li>
                <li>• S.N.S Academic Excellence Awardee</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

const Experience = () => {
  const experiences = [
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/McKinsey_%26_Company_logo.svg/1200px-McKinsey_%26_Company_logo.svg.png",
      role: "Summer Associate",
      company: "McKinsey & Company",
      period: "2025",
      isWhite: true,
      points: [
        "Formulated cost reduction roadmap for $4B Auto MNC; owned $38M spend categories.",
        "Analyzed 650+ vendors to identify $50K/yr payment optimization opportunities."
      ]
    },
    {
      logo: "https://lh3.googleusercontent.com/aida/ADBb0ui60CgGN_VuNZPulQcM6zSBcviMqhBzSP3T5-yegkDuUGjKHOs5opf6NJN_44CrF9yPsdhwbEeAmvrkf6EejGXb1GhtCsFPG6vzSOHobef66CLjltE1r1UqjPzeoPBTgOCv2Ov0W3FaSHacIKxyzvdlBZDKdVVLpR_hwqmzC2AWzqIXk7PDWAWaLQOuZNtvgErVVF0-PLRr9wE0Cb-Br7nPIlWMnVGzuSKDzUjBnatlQpYdeJlrsg_y7Z3MnVjiNCbwKm2DgKkFnw",
      role: "Senior Analyst",
      company: "American Express",
      period: "2022 — 2024",
      points: [
        "Recipient of SVP Star Award (Top 1% of 3K+ employees).",
        "Architected 5+ marketing models driving $75M+ in annual spend increase.",
        "Developed acquisition framework onboarding 10K+ new digital users."
      ]
    },
    {
      logo: "https://lh3.googleusercontent.com/aida/ADBb0ug9c2lH0VyD5qEJDK14b42o9T4962-jr4x62ofIfHEo9cGUyhzT_0O6VOXnR6muW6YQEdRj-AMmT2Kdhth6IuajYbcNChxCeYMUD6PWrrdD0sOSWeTfAQgK5NX2HA9DcOGm0k-94nJvukNEFBT8EmrOD4WI-7Nm4ZyAQ9vWMsZU8fUtjYocyDN1mOPLtPfcLmBtKMyRkccR9jIV-Ze4dGfWUCA7q0y1C-VfggG63uTkHvgUEMjpN4SHo2mwNy5nq2OH2GlX4XAd",
      role: "Strategy Intern",
      company: "Vedantu (COO Office)",
      period: "2021",
      points: [
        "Engineered pilot BTL campaign structure for major Indian megacities.",
        "Uncovered insights resulting in a ~35% conversion boost for paid users."
      ]
    },
    {
      logo: "https://lh3.googleusercontent.com/aida/ADBb0uicpDwJykbP418hrM1U3fH3_qixNTZeNbyGJkxR6_2bewsyz3VizXDAKBTLkhPz_EH-7nkvlaHcHe8cQpoQ-nNbTXz7rcrq60Zc1YmxjUIJWhxB41Qq9x9iLR1RAowBtDx_Ewxk566kViL6k63tdLNW-a-Q159sZtqjy8GfoV_tI-IbvY1xDpZ8s9jorQ1cdhEVhu3rFrai-sIHAf0sgZaPj_ACRrB_ay2bssWx_eLsS9bXgK22Rq3RnI-phrp4t6dnUJ42b0Cq",
      role: "Operations Intern",
      company: "Thermax LTD.",
      period: "2021",
      points: [
        "Conducted failure analysis of high-pressure feedwater heaters across 5 KPIs.",
        "Devised prognosis algorithms for FD fans using 240+ flow data points."
      ]
    }
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-on-background text-background">
      <div className="max-w-5xl mx-auto space-y-24">
        <h3 className="text-xs uppercase tracking-[0.3em] text-primary mb-16 font-semibold">Professional Tenure</h3>
        {experiences.map((exp, i) => (
          <Reveal key={i} className="flex flex-col md:flex-row gap-12 items-start">
            <div className="w-32 shrink-0 pt-2">
              <img 
                alt={exp.company} 
                className={`max-h-[60px] hover:scale-105 transition-all duration-500 cursor-pointer object-contain ${(exp as any).isWhite ? 'brightness-0 invert' : ''}`} 
                src={exp.logo}
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-4 flex-1">
              <div className="flex justify-between items-baseline">
                <h4 className="text-3xl font-serif italic">{exp.role}</h4>
                <span className="text-sm font-sans tracking-widest text-slate-500 uppercase">{exp.period}</span>
              </div>
              <p className="text-primary font-serif">{exp.company}</p>
              <ul className="space-y-4 text-slate-400 text-lg">
                {exp.points.map((p, j) => <li key={j}>• {p}</li>)}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

const Leadership = () => {
  const milestones = [
    {
      org: "Alumini Committee, IIMB",
      role: "Senior Coordinator",
      location: "IIM Bangalore",
      desc: "Orchestrated 9+ large-scale events for a 600+ student body with a ₹5L+ budget and 1K+ footfall."
    },
    {
      org: "TEDx IIM Bangalore",
      role: "Coordinator, Sponsorships",
      location: "TEDxIIMB",
      desc: "Led an 18+ sponsor outreach program, securing ₹50K+ in funding with 100+ attendees."
    },
    {
      org: "Elected Member",
      role: "Institute Technical Secretary",
      location: "IIT Bombay",
      desc: "Led a team of 80+, managed ₹60L+ budget, and organized 20+ events across campus."
    },
    {
      org: "Podcast Series",
      role: "Podcast Host",
      location: "Sustainability Podcast",
      desc: "Directed thought-provoking podcasts featuring the UNDP head and various global CEOs."
    },
    {
      org: "Editorial Leadership",
      role: "Editor, Insight",
      location: "IIT Bombay",
      desc: "Led health sensitization articles reaching a readership of 0.4M+, driving institutional awareness."
    },
    {
      org: "Academic Support",
      role: "Academic Mentor & TA",
      location: "IIT Bombay",
      desc: "Mentored junior batches and assisted in course delivery for technical departments."
    }
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-surface dark:bg-dark-surface border-t border-on-background/5" id="leadership">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-xs uppercase tracking-[0.3em] text-primary mb-24 font-semibold text-center">Leadership & Milestones</h3>
        <div className="space-y-16 relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-primary/20 -translate-x-1/2 hidden md:block"></div>
          {milestones.map((m, i) => (
            <Reveal key={i} className={`relative flex flex-col md:flex-row gap-8 items-start md:items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-2 block">{m.org}</span>
                <h4 className="text-2xl font-serif italic mb-2">{m.role}</h4>
                <p className="text-primary text-sm font-sans uppercase tracking-widest mb-4">{m.location}</p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{m.desc}</p>
              </div>
              <div className="hidden md:flex items-center justify-center w-4 h-4 rounded-full bg-primary absolute left-1/2 -translate-x-1/2 z-10"></div>
              <div className="md:w-1/2"></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Expertise = () => {
  const areas = [
    {
      title: "Consulting & Product Strategy",
      desc: "Orchestrating growth through analytical rigor and market-centric strategic roadmaps.",
      tags: ["Market Entry", "P&L Optimization", "Unit Economics"]
    },
    {
      title: "Data Science & Analytics",
      desc: "Translating complex datasets into actionable operational intelligence and predictive models.",
      tags: ["Python / R", "Predictive ML", "Big Data Querying"]
    },
    {
      title: "Leadership & Public Speaking",
      desc: "Commanding rooms and managing large-scale organizational mandates with precision.",
      tags: ["Stakeholder Management", "Keynote Delivery", "Team Mentorship"]
    }
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-white dark:bg-dark-background" id="expertise">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-xs uppercase tracking-[0.3em] text-primary mb-24 font-semibold text-center">Expertise & Focus</h3>
        <div className="grid md:grid-cols-3 gap-16 md:gap-24">
          {areas.map((area, i) => (
            <Reveal key={i} className="flex flex-col space-y-6">
              <h4 className="text-4xl md:text-5xl font-serif italic leading-tight text-on-background dark:text-dark-on-background">{area.title}</h4>
              <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{area.desc}</p>
              <div className="flex flex-wrap gap-2">
                {area.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-[10px] uppercase tracking-wider font-semibold rounded-sm">{tag}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      category: "Industrial R&D",
      title: "UV Cure Adherent",
      desc: "Engineered a custom laser cutting solution for diamond shaping facilities in Surat, reducing process time by 15x."
    },
    {
      category: "Energy Strategy",
      title: "Chevron Emission Roadmap",
      desc: "Finalist at MIT Energy Hack for developing a 20-year methanol-based emission reduction strategy for oil fields."
    },
    {
      category: "Robotics",
      title: "Autonomous Chess Bot",
      desc: "Built a Raspberry-Pi powered robotic player for ITSP 2019, integrating real-time image processing and CNC mechanics."
    }
  ];

  return (
    <section className="py-32 px-6 md:px-12" id="portfolio">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-xs uppercase tracking-[0.3em] text-primary mb-16 font-semibold">Selected Projects</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <Reveal key={i} className="group p-8 border border-on-background/5 hover:bg-primary hover:text-white transition-all duration-500">
              <span className="text-[10px] uppercase tracking-[0.2em] opacity-50">{p.category}</span>
              <h4 className="text-2xl font-serif italic my-4">{p.title}</h4>
              <p className="text-sm opacity-80 leading-relaxed mb-6">{p.desc}</p>
              <div className="h-1 w-12 bg-primary group-hover:bg-white transition-colors"></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Interests = () => (
  <section className="py-32 px-6 md:px-12 bg-on-background/5" id="interests">
    <div className="max-w-4xl mx-auto">
      <h3 className="text-xs uppercase tracking-[0.3em] text-primary mb-16 text-center font-semibold">Beyond the CV</h3>
      <div className="grid gap-12 font-serif text-xl italic">
        <Reveal className="border-l-2 border-primary pl-8 py-4">"Finding focus in the storytelling of Billy Joel and Elton John alongside the energy of Coldplay."</Reveal>
        <Reveal className="border-l-2 border-primary pl-8 py-4">"Thriving on the strategic intensity of squash and the technical speed of table tennis."</Reveal>
        <Reveal className="border-l-2 border-primary pl-8 py-4">"Fascinated by the synergy between elite engineering and the precision of racing strategy."</Reveal>
      </div>
    </div>
  </section>
);

const VisualJournal = () => {
  const images = [
    "https://lh3.googleusercontent.com/aida/ADBb0uh8otxjQzaN-_ge5OEicoW1eTiLIFIzt81FNenYzr70aVx3VhmavCUFpWkci7bhi0oPQdTa7p9poPNFPEJpsuumtGY2dSOtwMVVgELDsqa28Ekyk6qZ9f_NJ00ia7BbV8NXJ-QdzjYWg1gduutw6A1JSKXDn0XTUWjYwgxS4nFxKJY-3COc7XZ98BMbcTKwJVlzsC_LUFyZKN5A62XQ9u7mpmSAFcbzW0VxgCCD-2ejjEJqYl71INA5YahU6-Pciq1FULOUCdlP",
    "https://lh3.googleusercontent.com/aida/ADBb0uik2KimdeHNTH4LYy5iRufOBTgMCItJEQBr52nAV8iK_vxiXzYZWcYRG81_prNKrhuRH1AA7LUEw1u-55D4fyX_uhAGhYAP7uiehYEQtz5MaQNoMlUePJpI6wZwmIhFp0FRXWztgs4JPxMAAD4P2-7Mqkm8YnuAV9vf0SVlRPS02fYNyVEEysxJZOErwfcqRZgN0fkcieGpyFY0KRIUTRFRF4aS9Rx-HdznRsQb6FkU29c2xsTV7rE0Qpas-iA3srHVhaANE5cAVg",
    "https://lh3.googleusercontent.com/aida/ADBb0ujcFBSX5f8nNnapYTLIKYWAWbe0ZN7l4wEcwzBRdkl-WUNtwbGJEj_pryNbqVUanM-w4gSZMPCYTm70cQNZN0F6ZVGh6KxdVWLsXczEFmIsz96tt5pNxmyrPunrm3xaCTanS5Np61uQODTK_o4-ROGePul2bG3A4ow7F81ARtNPDRqYQORDSKfrGJ5epAqp4AqwVe0_1h39ItJJgpSboe1Xas1V816TRxeNvmRZPV_f6bLqWGmwOqwY253gbk1NqbMiKyXgPNe-uQ",
    "https://lh3.googleusercontent.com/aida/ADBb0ugW-HFFMLtbT0bQ9RyFhsAiGH2ZUiHPejSt-9fcws7gP_v7Q7FlRcN3CTqdGeMmSptxzZeFG_O0yzD2lqgTuyjKakh02bxPX2uyeKgJq5vBdnDBbRkytxKybuytF3bbHQORfHjEEjleHXH5M-XSeB-537T0Nz_SOUntSlIUKOOL-i5Dltzm2jpcA1MtRx86M3InHUL49qxVvF1PBNrv-I3l2KvSMF1kNWNNGcyYl2KKJeoZYx5oQRvEia4GdT7Zh4lPGf3nI8sl",
    "https://lh3.googleusercontent.com/aida/ADBb0uhzJzOsqKhuST8dzZQn4vBDVbx5EIGqpkaZ8JIXU3kWkcShNFrOyTotyDqStcoNAR5Josqzd97w4iqgCQxwXIAMlHzA1kshm_K9kB8MZ-GNTxhjYj7y4p3j0Lqm3pPo76fPrQf9fVEuQ_lrD0CD69hpn6v_ShdgQ0gKPLw9i2t8V1McX0El8YsqOgRajNd_Uvo7OST1-O3grDGLCg3h2w2LXDeb8CAa0tef0qH_KNlJb30VAfOHKZMtCH71747-hzqwxNgQDdbrjA",
    "https://lh3.googleusercontent.com/aida/ADBb0uhvHX97SCkvHm0PSTiMo03JxagTQM2Mw4mwHn8lvj1SpMSrMHwf7wN4kVG7rfmNNntn6-WkRWTBZ5ggR5svemYnh1SmreBLbtArjALbWsHCx4dwz81LXHF8RoMhQyQCQ3HkfNda0Ig1qysWUdMeyijve8SwLsPmd7iyjbo34dW3o3sVBQbTnyZCdKh-ABkSBjxIBE0hq5rvTIQyDzLaueHn1-4M5bt-mzL0BFm0qlmp_eFhHfdNc6U8DLW09HY1APJuB-k-AT4cwA",
    "https://lh3.googleusercontent.com/aida/ADBb0uizjaK-W4cD7egiGrircyO_Abac_lPkqqbd7Qvaxp5K5tcFrcLQl4DP3vbTG2qaDNeK0g2_B61xR3rGtOzda-ozt7I1p1GejkMOquGdzsJtAkKDJYPsJe3qLLMl_q1xx1fIZr9Wd2PzVTaXxRpzBKToz0xl-Q3xN6eyWCdGDkAICKukAM5yFw529EtN4iFOfqUKb-R_Ah9-4aca4hnj-tcxbZo2gRIbJDxR3tdq1IF8S2W6cIiMPTkEiLE6__qYHIHqGVHAAgTS",
    "https://lh3.googleusercontent.com/aida/ADBb0ugG-okj8tfpUUoXjr9emRmfLyZSs33IouBcY90zXkqy5zegzKC1qpW8DEo7Yrs7L1CdbFMDoStuM9VYrBhzGKPM0UADTtkIbGr8-K1-8IC25PuPx15JEmezI9R5415pk5C6GJco65zUnOQz1WwaDbCZAveBx8wWsYuee8KlI64mNYVKWqVy9AYdnE8vXz4i9J2HDbgUy80BWaF6rN36_xVPtI7e9KeSPLaG-MNU09JsL6ED_LJp1EdmZfJi_okqSmNYjAAZhQGOeg"
  ];

  return (
    <section className="py-32 overflow-hidden" id="visual-journal">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <h3 className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Visual Journal: Perspectives & Journeys</h3>
      </div>
      <div className="flex overflow-x-auto gap-6 px-6 md:px-12 pb-8 hide-scrollbar scroll-smooth snap-x snap-mandatory">
        {images.map((img, i) => (
          <Reveal key={i} className="shrink-0 w-[80vw] md:w-[450px] aspect-[4/5] bg-slate-200 dark:bg-slate-800 overflow-hidden snap-center">
            <img 
              alt={`Journal visual ${i + 1}`} 
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" 
              src={img}
              referrerPolicy="no-referrer"
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="w-full py-24 bg-surface dark:bg-dark-background transition-colors border-t border-on-background/5">
    <div className="flex flex-col items-center space-y-8 text-center max-w-7xl mx-auto px-6">
      <div className="text-lg font-serif italic text-primary">Atharva Lokhande</div>
      <div className="flex flex-wrap justify-center gap-12">
        <a className="font-sans text-xs uppercase tracking-[0.1em] text-slate-500 hover:text-primary hover:underline underline-offset-4 transition-all" href="https://linkedin.com/in/atharva-lokhande-392307171" target="_blank" rel="noreferrer">LinkedIn</a>
        <a className="font-sans text-xs uppercase tracking-[0.1em] text-slate-500 hover:text-primary hover:underline underline-offset-4 transition-all" href="mailto:atharva.lokhande24@iimb.ac.in">Email</a>
        <a className="font-sans text-xs uppercase tracking-[0.1em] text-slate-500 hover:text-primary hover:underline underline-offset-4 transition-all" href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
        <a className="font-sans text-xs uppercase tracking-[0.1em] text-slate-500 hover:text-primary hover:underline underline-offset-4 transition-all font-bold" href="#philosophy">Download CV</a>
      </div>
      <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-slate-400">© 2024 Atharva Lokhande. Built with Radical Simplicity.</p>
    </div>
  </footer>
);

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-0.5 bg-primary z-[100] origin-left" 
        style={{ scaleX }} 
      />
      <Navbar />
      <main>
        <Hero />
        <Philosophy />
        <Education />
        <Experience />
        <Leadership />
        <Expertise />
        <Projects />
        <Interests />
        <VisualJournal />
      </main>
      <Footer />
    </div>
  );
}

