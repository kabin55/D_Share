import React from 'react';

const HowDShareWorks = () => {
  const steps = [
    {
      icon: '🔐',
      title: "1. MetaMask Login",
      description: "Secure Web3 authentication"
    },
    {
      icon: '📂',
      title: "2. File Upload",
      description: "Scanned & stored on IPFS"
    },
    {
      icon: '🖧',
      title: "3. Blockchain Storage",
      description: "CID stored via smart contract"
    },
    {
      icon: '📥',
      title: "4. File Download",
      description: "Retrieved using blockchain CID"
    },
    {
      icon: '💬',
      title: "5. Secure Chat",
      description: "With content moderation"
    },
    {
      icon: '👮‍♂️',
      title: "6. Admin Panel",
      description: "Monitoring & reporting"
    }
  ];

  return (
    <section id="how-it-works" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.subtitleContainer}>
            <span style={styles.subtitle}>HOW IT WORKS</span>
          </div>
          <h2 style={styles.title}>D-Share <span style={styles.highlight}>Workflow</span></h2>
        </div>
        
        <div style={styles.stepsContainer}>
          {steps.map((step, index) => (
            <div key={index} style={styles.step}>
              <div style={styles.stepIconContainer}>
                <span style={styles.stepIcon}>{step.icon}</span>
              </div>
              <h3 style={styles.stepTitle}>{step.title}</h3>
              <p style={styles.stepDescription}>{step.description}</p>
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
    padding: '60px 0',
    color: '#fff',
  },
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '0 20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  subtitleContainer: {
    marginBottom: '12px',
  },
  subtitle: {
    color: '#3b82f6',
    fontSize: '14px',
    fontWeight: '600',
    letterSpacing: '2px',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: '32px',
    marginBottom: '16px',
    fontWeight: '700',
    background: 'linear-gradient(90deg, #ffffff, #e2e8f0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  highlight: {
    background: 'linear-gradient(90deg, #3b82f6, #93c5fd)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  stepsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  },
  step: {
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    padding: '25px 20px',
    borderRadius: '12px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-3px)',
      borderColor: 'rgba(59, 130, 246, 0.3)',
    }
  },
  stepIconContainer: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    margin: '0 auto 15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(59, 130, 246, 0.3)',
  },
  stepIcon: {
    fontSize: '28px',
  },
  stepTitle: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '12px',
    color: '#f8fafc',
  },
  stepDescription: {
    color: '#cbd5e1',
    fontSize: '14px',
    lineHeight: '1.5',
  },
};

export default HowDShareWorks;