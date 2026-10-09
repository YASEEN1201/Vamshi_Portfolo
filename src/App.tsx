import React from 'react';
import { Navbar } from './components/Navbar';
import { BackgroundAura } from './components/BackgroundAura';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Internships } from './components/Internships';
import { Education } from './components/Education';
import { Certifications } from './components/Certifications';
import { Languages } from './components/Languages';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#0b0d10] text-[#f3f4f6] selection:bg-blue-600/30 selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Ambient background lighting */}
      <BackgroundAura />

      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Internships />
        <Education />
        <Certifications />
        <Languages />
        <Contact />
      </main>

      {/* Absolute Bottom Footer */}
      <Footer />
    </div>
  );
}
