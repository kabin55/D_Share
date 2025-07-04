import React from 'react';

const Services = () => {
  const services = [
    {
      icon: '🦊',
      title: "MetaMask Login",
      description: "Secure blockchain authentication"
    },
    {
      icon: '📤',
      title: "File Uploads",
      description: "Encrypted and compressed"
    },
    {
      icon: '📥',
      title: "File Downloads",
      description: "Real-time scanning"
    },
    {
      icon: '💬',
      title: "Collaboration",
      description: "End-to-end encrypted"
    },
    {
      icon: '📊',
      title: "Activity Logs",
      description: "Tamper-proof history"
    },
    {
      icon: '🤖',
      title: "AI Assistant",
      description: "Smart organization"
    }
  ];

  return (
    <section id="services" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Our Services</h2>
          <p style={styles.subtitle}>
            Comprehensive secure file sharing solutions
          </p>
        </div>
        
        <div style={styles.servicesContainer}>
          {services.map((service, index) => (
            <div key={index} style={styles.serviceCard}>
              <div style={styles.serviceIcon}>{service.icon}</div>
              <h3 style={styles.serviceTitle}>{service.title}</h3>
              <p style={styles.serviceDescription}>{service.description}</p>
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
    padding: '80px 0',
    color: '#fff',
    overflow: 'hidden',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    fontSize: '36px',
    marginBottom: '16px',
    fontWeight: '700',
    background: 'linear-gradient(90deg, #3b82f6, #6366f1)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: '18px',
    color: '#94a3b8',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6',
  },
  servicesContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '20px',
  },
  serviceCard: {
    width: '160px',
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    padding: '25px 20px',
    borderRadius: '12px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    ':hover': {
      transform: 'translateY(-5px)',
      backgroundColor: 'rgba(30, 41, 59, 0.9)',
      borderColor: 'rgba(59, 130, 246, 0.3)',
    }
  },
  serviceIcon: {
    fontSize: '36px',
    marginBottom: '16px',
  },
  serviceTitle: {
    fontSize: '16px',
    marginBottom: '12px',
    fontWeight: '600',
    color: '#f8fafc',
  },
  serviceDescription: {
    color: '#94a3b8',
    lineHeight: '1.4',
    fontSize: '13px',
  },
};

export default Services;