import React from 'react';

const About = () => {
  return (
    <section id="about" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.subtitleContainer}>
            <span style={styles.subtitle}>OUR MISSION</span>
          </div>
          <h2 style={styles.title}>Building Trust in <span style={styles.highlight}>File Sharing</span></h2>
          <p style={styles.description}>
            In an era of increasing cyber threats, we believe privacy shouldn't be compromised for convenience. 
            D-Share combines decentralized technology with cutting-edge security to give you complete control 
            over your data.
          </p>
        </div>
        
        <div style={styles.statsContainer}>
          {[
            { value: "10M+", label: "Files Protected", icon: "🛡️" },
            { value: "99.99%", label: "Uptime", icon: "⏱️" },
            { value: "Zero", label: "Security Breaches", icon: "🔒" },
            { value: "24/7", label: "AI Monitoring", icon: "🤖" }
          ].map((stat, index) => (
            <div key={index} style={styles.statItem}>
              <div style={styles.statIcon}>{stat.icon}</div>
              <h4 style={styles.statValue}>{stat.value}</h4>
              <p style={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    backgroundColor: '#0f172a',
    padding: '100px 0',
    color: '#fff',
    position: 'relative',
    overflow: 'hidden',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    position: 'relative',
    zIndex: 2,
  },
  header: {
    textAlign: 'center',
    marginBottom: '80px',
  },
  subtitleContainer: {
    marginBottom: '16px',
  },
  subtitle: {
    color: '#3b82f6',
    fontSize: '16px',
    fontWeight: '600',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    position: 'relative',
    display: 'inline-block',
    paddingBottom: '8px',
  },
  title: {
    fontSize: '48px',
    marginBottom: '24px',
    fontWeight: '700',
    lineHeight: '1.2',
    background: 'linear-gradient(90deg, #ffffff, #e2e8f0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  highlight: {
    background: 'linear-gradient(90deg, #3b82f6, #93c5fd)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  description: {
    fontSize: '20px',
    color: '#94a3b8',
    maxWidth: '800px',
    margin: '0 auto',
    lineHeight: '1.6',
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '30px',
    textAlign: 'center',
  },
  statItem: {
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    padding: '40px 30px',
    borderRadius: '16px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    },
  },
  statIcon: {
    fontSize: '32px',
    marginBottom: '16px',
  },
  statValue: {
    fontSize: '36px',
    marginBottom: '12px',
    fontWeight: '700',
    background: 'linear-gradient(90deg, #3b82f6, #93c5fd)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  statLabel: {
    color: '#cbd5e1',
    fontSize: '16px',
    fontWeight: '500',
  },
};

export default About;