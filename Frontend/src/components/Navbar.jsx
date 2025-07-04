// src/components/Navbar.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  // Inject styles only once
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #0f172a;
        padding: 16px 32px;
        color: #fff;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }

      .logo-container {
        display: flex;
        align-items: center;
      }

      .logo-image {
        height: 60px;
        width: auto;
      }

      .nav-links {
        display: flex;
        gap: 24px;
      }

      .nav-item {
        color: #fff;
        text-decoration: none;
        font-size: 16px;
        padding: 8px 12px;
        border-radius: 4px;
        transition: all 0.3s ease;
      }

      .nav-item:hover {
        background-color: rgba(59, 130, 246, 0.1);
        color: #3b82f6;
      }

      .login-btn {
        background-color: #3b82f6;
        color: #fff;
        padding: 10px 16px;
        border: none;
        border-radius: 8px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .login-btn:hover {
        background-color: #2563eb;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo-container">
        <img 
          src="src/assets/DSharelogoWhite.png" 
          // D_Share/Frontend/src/assets/DSharelogoWhite.png
          alt="D-Share Logo" 
          className="logo-image"
        />
      </div>

      {/* Navigation Links */}
      <div className="nav-links">
        {['home', 'about', 'team', 'services', 'how-it-works', 'contact'].map((link) => (
          <a 
            key={link}
            href={`#${link}`}
            className="nav-item"
            onClick={(e) => handleNavClick(e, link)}
          >
            {link.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </a>
        ))}
      </div>

      {/* Login Button */}
      <button className="login-btn" onClick={handleLoginClick}>
        🦊 Login with MetaMask
      </button>
    </nav>
  );
};

export default Navbar;
