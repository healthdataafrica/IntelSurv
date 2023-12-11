// components/HelpSection.js
import React from 'react';
import { useRef,useState,useEffect } from 'react'


function HelpSection () {

    const [isScreenSmall, setIsScreenSmall] = useState(null); 

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  };

  const headerStyle = {
    backgroundColor: '#5283A3',
    color: 'white',
    padding: '10px 20px',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    fontSize: '24px',
    textAlign: 'center',
  };

  const sectionStyle = {
    padding: '20px',
    borderBottom: '1px solid #ddd',
    backgroundColor: 'transparent',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
  };

  const headingStyle = {
    color: '#5283A3',
    marginBottom: '10px',
  };

  useEffect(() => {
    function handleResize() {
      // Check if screen size is less than a specific size
      setIsScreenSmall(window.innerWidth < 640);
    }

    // Add event listener on component mount
    window.addEventListener('resize', handleResize);

    // Set the initial value
    handleResize();

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <div style={containerStyle}>
         {isScreenSmall && (
    <a href="/" style={{ marginBottom: '30px', color: '#007bff', textDecoration: 'none', fontSize: '18px', display: 'block', textAlign: 'center', fontWeight: 'bold' }}>
      ← Go to Homepage
    </a>
  )}
      <div style={headerStyle}>Help & Support</div>
      <section style={sectionStyle}>
        <h2 style={headingStyle}>FAQs</h2>
        <p>Here you can put your frequently asked questions.</p>
      </section>
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Getting Started</h2>
        <p>Information for new users on how to get started.</p>
      </section>
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Troubleshooting</h2>
        <p>Common issues and their solutions.</p>
      </section>
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Contact</h2>
        <p>How to reach out for further assistance.</p>
      </section>
    </div>
  );
};

export default HelpSection;