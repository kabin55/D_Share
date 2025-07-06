import React from 'react';

const Team = () => {
  const teamMembers = [
    {
      name: "Jenish Shahi",
      role: "Smart Contract Developer",
      bio: "Leads and builds secure systems.",
      image: "👨‍💼",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#"
      }
    },
    {
      name: "Sushan Aryal",
      role: "Backend Developer",
      bio: "Develops backend systems.",
      image: "👨‍⚖️",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#"
      }
    },
    {
      name: "Kabin Shrestha",
      role: "Backend Developer",
      bio: "Builds backend solutions.",
      image: "🧑‍🔧",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#"
      }
    },
    {
      name: "Sumita Shapkota",
      role: "Data Analyst",
      bio: "Analyzes data and builds UI.",
      image: "👩‍🎨",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#"
      }
    },
    {
      name: "Aabesh Alam",
      role: "Frontend Developer",
      bio: "Designs & codes Developer.",
      image: "👨‍💻",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#"
      }
    }
  ];

  return (
    <section id="team" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.subtitleContainer}>
            <span style={styles.subtitle}>OUR TEAM</span>
          </div>
          <h2 style={styles.title}>The <span style={styles.highlight}>Team</span></h2>
        </div>
        
        <div style={styles.teamContainer}>
          {teamMembers.map((member, index) => (
            <div key={index} style={styles.memberCard}>
              <div style={styles.memberImage}>
                <span style={styles.emoji}>{member.image}</span>
              </div>
              <h3 style={styles.memberName}>{member.name}</h3>
              <p style={styles.memberRole}>{member.role}</p>
              <p style={styles.memberBio}>{member.bio}</p>
              <div style={styles.socialLinks}>
                <a href={member.social.twitter} style={styles.socialLink} aria-label="Twitter">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#93c5fd">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href={member.social.linkedin} style={styles.socialLink} aria-label="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#93c5fd">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href={member.social.github} style={styles.socialLink} aria-label="GitHub">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#93c5fd">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                </a>
              </div>
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
  subtitleContainer: {
    marginBottom: '16px',
  },
  subtitle: {
    color: '#3b82f6',
    fontSize: '16px',
    fontWeight: '600',
    letterSpacing: '2px',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: '36px',
    marginBottom: '24px',
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
  teamContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  memberCard: {
    width: '180px',
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    padding: '20px 15px',
    borderRadius: '12px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
    ':hover': {
      transform: 'translateY(-5px)',
    },
  },
  memberImage: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    backgroundColor: '#1e293b',
    margin: '0 auto 12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #3b82f6',
  },
  emoji: {
    fontSize: '36px',
  },
  memberName: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '6px',
    color: '#f8fafc',
  },
  memberRole: {
    color: '#3b82f6',
    fontSize: '13px',
    fontWeight: '500',
    marginBottom: '8px',
  },
  memberBio: {
    color: '#cbd5e1',
    fontSize: '12px',
    lineHeight: '1.4',
    marginBottom: '12px',
    minHeight: '36px',
  },
  socialLinks: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '16px',
    height: '16px',
    transition: 'transform 0.2s ease',
    ':hover': {
      transform: 'scale(1.2)',
    },
  },
};

export default Team;