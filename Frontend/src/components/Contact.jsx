import React from 'react';

const Contact = () => {
  return (
    <section id="contact" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.subtitle}>CONTACT US</span>
          <h2 style={styles.title}>Get In Touch</h2>
        </div>
        
        <div style={styles.contactContainer}>
          <div style={styles.contactCard}>
            <form style={styles.form}>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <input type="text" placeholder="Name" style={styles.input} required />
                </div>
                <div style={styles.formGroup}>
                  <input type="email" placeholder="Email" style={styles.input} required />
                </div>
              </div>
              <div style={styles.formGroup}>
                <textarea placeholder="Message" rows="3" style={styles.textarea} required></textarea>
              </div>
              <button type="submit" style={styles.submitButton}>Send</button>
            </form>
          </div>
          
          <div style={styles.infoCard}>
            <div style={styles.infoItem}>
              <span style={styles.infoIcon}>📍</span>
              <p style={styles.infoText}>123 Blockchain Ave, SF</p>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoIcon}>📞</span>
              <p style={styles.infoText}>+1 (415) 555-0199</p>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoIcon}>✉️</span>
              <p style={styles.infoText}>hello@dshare.io</p>
            </div>
            <div style={styles.socialLinks}>
              <a href="#" style={styles.socialLink}>
                <svg style={styles.socialIcon} viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" style={styles.socialLink}>
                <svg style={styles.socialIcon} viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" style={styles.socialLink}>
                <svg style={styles.socialIcon} viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
              <a href="#" style={styles.socialLink}>
                <svg style={styles.socialIcon} viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
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
    padding: '0 24px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  subtitle: {
    color: '#3b82f6',
    fontSize: '14px',
    fontWeight: '600',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '8px'
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    background: 'linear-gradient(90deg, #ffffff, #e2e8f0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: '0'
  },
  contactContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '30px',
  },
  contactCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    padding: '30px',
    borderRadius: '12px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  infoCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    padding: '30px',
    borderRadius: '12px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formRow: {
    display: 'flex',
    gap: '20px',
  },
  formGroup: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #334155',
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    color: '#fff',
    fontSize: '14px',
  },
  textarea: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #334155',
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    color: '#fff',
    fontSize: '14px',
    resize: 'vertical',
    minHeight: '80px',
  },
  submitButton: {
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  infoIcon: {
    fontSize: '18px',
    color: '#3b82f6',
  },
  infoText: {
    color: '#94a3b8',
    fontSize: '14px',
    margin: 0,
  },
  socialLinks: {
    display: 'flex',
    gap: '16px',
    marginTop: '10px',
  },
  socialLink: {
    color: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
  },
  socialIcon: {
    width: '100%',
    height: '100%',
    fill: '#93c5fd',
    transition: 'fill 0.2s ease',
    ':hover': {
      fill: '#3b82f6',
    }
  },
};

export default Contact;