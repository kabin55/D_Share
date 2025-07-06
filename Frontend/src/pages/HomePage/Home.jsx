// src/pages/Home.js
import React from 'react';
import Navbar from '../../components/Home/Navbar';
import Hero from '../../components/Home/Hero';
import About from '../../components/Home/About';
import Team from '../../components/Home/Team';
import Services from '../../components/Home/Services';
import HowItWorks from '../../components/Home/HowItWorks';
import Contact from '../../components/Home/Contact';
import Footer from '../../components/Home/Footer';
import ChatBubble from '../../ChatBubble';

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