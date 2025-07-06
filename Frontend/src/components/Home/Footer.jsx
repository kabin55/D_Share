import React from 'react';

const Footer = () => {
  const footerLinks = [
    {
      title: 'Product',
      links: ['Features', 'Pricing', 'API', 'Status', 'Changelog']
    },
    {
      title: 'Resources',
      links: ['Documentation', 'Guides', 'Blog', 'Community', 'Help Center']
    },
    {
      title: 'Company',
      links: ['About', 'Careers', 'Privacy', 'Terms', 'Contact']
    }
  ];

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.footerGrid}>
          <div style={styles.logoColumn}>
            <h2 style={styles.logo}>D-Share</h2>
            <p style={styles.description}>
              The most secure decentralized file sharing platform powered by blockchain and AI.
            </p>
            <button style={styles.walletButton}>Connect Wallet</button>
          </div>
          
          {footerLinks.map((column, index) => (
            <div key={index} style={styles.column}>
              <h3 style={styles.columnTitle}>{column.title}</h3>
              <ul style={styles.columnLinks}>
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex} style={styles.linkItem}>
                    <a href="#" style={styles.link}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div style={styles.bottomFooter}>
          <p style={styles.copyright}>© {new Date().getFullYear()} D-Share. All rights reserved.</p>
          <div style={styles.legalLinks}>
            <a href="#" style={styles.legalLink}>Privacy Policy</a>
            <a href="#" style={styles.legalLink}>Terms of Service</a>
            <a href="#" style={styles.legalLink}>Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#1e293b',
    color: '#fff',
    padding: '60px 0 30px',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
  },
  footerGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '40px',
    marginBottom: '40px',
  },
  logoColumn: {
    maxWidth: '300px',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: '16px',
  },
  description: {
    color: '#94a3b8',
    marginBottom: '20px',
  },
  walletButton: {
    backgroundColor: '#3b82f6',
    color: '#fff',
    padding: '10px 16px',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  column: {},
  columnTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  columnLinks: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  linkItem: {},
  link: {
    color: '#94a3b8',
    textDecoration: 'none',
  },
  bottomFooter: {
    borderTop: '1px solid #334155',
    paddingTop: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  copyright: {
    color: '#94a3b8',
  },
  legalLinks: {
    display: 'flex',
    gap: '20px',
  },
  legalLink: {
    color: '#94a3b8',
    textDecoration: 'none',
  },
};

export default Footer;