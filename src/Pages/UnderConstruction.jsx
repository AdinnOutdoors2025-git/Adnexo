import React, { useEffect, useRef, useState } from "react";
import "./UnderConstruction.css";
import constructionImage from '../assets/constructionImage.png';

function UnderConstruction() {
  // FOOTER CURRENT YEAR 
  const [currentYear, setCurrentYear] = useState('');
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const cursorRef = useRef(null);
  const cursorFollowerRef = useRef(null);

  // Optimized cursor effect with requestAnimationFrame
  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = cursorFollowerRef.current;
    let rafId = null;
    let mouseX = 0, mouseY = 0;

    const updateCursor = () => {
      if (cursor && follower) {
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        follower.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
      rafId = requestAnimationFrame(updateCursor);
    };

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    document.addEventListener('mousemove', moveCursor);
    rafId = requestAnimationFrame(updateCursor);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.uc_navbar');
      if (!navbar) return;

      if (window.scrollY > 100) {
        navbar.classList.add('uc_navbar-scrolled');
      } else {
        navbar.classList.remove('uc_navbar-scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <>
      {/* Custom Cursor */}
      <div className="uc_cursor" ref={cursorRef}></div>
      <div className="uc_cursor-follower" ref={cursorFollowerRef}></div>

      {/* Main Section */}
      <section className="uc_construction-section">
        <div className="uc_section-content">
          {/* Reduced number of particles for better performance */}
          <div className="uc_particles-container">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="uc_particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 6 + 2}px`,
                  height: `${Math.random() * 6 + 2}px`,
                  background: `linear-gradient(135deg, ${i % 2 === 0 ? '#667eea' : '#764ba2'}, ${i % 2 === 0 ? '#764ba2' : '#667eea'})`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${Math.random() * 3 + 3}s`
                }}
              />
            ))}
          </div>

          {/* Background Gradient Animation */}
          <div className="uc_gradient-bg">
            <div className="uc_gradient-circle uc_circle-1"></div>
            <div className="uc_gradient-circle uc_circle-2"></div>
          </div>

          {/* Main Container - Centered Content */}
          <div className="uc_construction-container">
            <div className="uc_content-wrapper">
              <div className="uc_content-container">
                <h1 className="uc_oops-title">
                  <span className="uc_oops-span">Oops!</span>
                  <span className="uc_under-construction-text">Under construction</span>
                </h1>

                <p className="uc_description-text">
                  We're working hard to bring you an amazing new website.
                  Our team is putting the final touches on something special.
                  Please check back soon for an enhanced digital experience!
                </p>
              </div>
            </div>

            <div className="uc_construction-image-section">
              <img src={constructionImage} className="uc_construction-image" alt="Under Construction" />
            </div>
          </div>

          {/* Reduced number of animated elements */}
          <div className="uc_construction-elements">
            <div className="uc_construction-line uc_line-1"></div>
            <div className="uc_construction-line uc_line-2"></div>
            <div className="uc_construction-dot uc_dot-1"></div>
            <div className="uc_construction-dot uc_dot-2"></div>
          </div>
        </div>

        {/* Footer Text - Now properly positioned at bottom */}
        <div className="uc_footer-text"> &copy; {currentYear} Designed by Adinn Digital. All rights reserved. </div>
      </section>
    </>
  );

}

export default UnderConstruction;