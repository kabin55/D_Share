import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleScrollToHowItWorks = () => {
    const section = document.getElementById('how-it-works');
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  const handleLoginNavigate = () => {
    navigate('/login'); // 👈 This should match your route to LoginWithMetaMask
  };

  return (
    <section style={styles.hero}>
      <div style={styles.overlay}></div>

      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.badge}>
            <span>🔒</span>
            <span>Most Secure File Sharing</span>
          </div>
          <h1 style={styles.title}>
            Decentralized and <span style={styles.highlight}>Secure File Sharing</span>
          </h1>
          <p style={styles.subtitle}>
            Experience secure, decentralized sharing with blockchain-backed encryption and complete privacy control.
          </p>
          <div style={styles.buttons}>
            <button style={styles.primaryButton} onClick={handleLoginNavigate}>
              Get Started - It's Free
            </button>
            <button style={styles.secondaryButton} onClick={handleScrollToHowItWorks}>
              See How It Works
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const styles = {
  hero: {
    backgroundColor: '#0f172a',
    color: '#fff',
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    backgroundImage: 'url(https://i.gifer.com/origin/46/462c6f5f67c13830cd9fcdbfc7b55ded.gif)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    zIndex: 0,
  },
  container: {
    maxWidth: '1400px',
    width: '100%',
    margin: '0 auto',
    padding: '0 5%',
    position: 'relative',
    zIndex: 1,
  },
  content: {
    maxWidth: '700px',
    marginLeft: '0',
    paddingRight: '20%',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    color: '#3b82f6',
    padding: '8px 16px',
    borderRadius: '999px',
    marginBottom: '24px',
  },
  title: {
    fontSize: 'clamp(36px, 5vw, 60px)',
    fontWeight: 'bold',
    lineHeight: '1.2',
    marginBottom: '24px',
    textAlign: 'left',
  },
  highlight: {
    color: '#3b82f6',
    display: 'inline-block',
  },
  subtitle: {
    fontSize: 'clamp(16px, 2vw, 20px)',
    color: '#94a3b8',
    marginBottom: '40px',
    lineHeight: '1.6',
    textAlign: 'left',
    maxWidth: '600px',
  },
  buttons: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
    color: '#fff',
    padding: '16px 32px',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#3b82f6',
    padding: '16px 32px',
    border: '1px solid #3b82f6',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.3s',
  },
};

export default Hero;
