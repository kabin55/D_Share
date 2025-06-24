// src/pages/Home.js
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Team from '../components/Team';
import Services from '../components/Services';
import HowItWorks from '../components/HowItWorks';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ChatBubble from '../ChatBubble';

function Home() {
  return (
    <div className="home-page">
      <Navbar />
      <Hero />
      <About />
      <Team />
      <Services />
      <HowItWorks />
      <Contact />
      <Footer />
      <ChatBubble />
    </div>
  );
}

export default Home;