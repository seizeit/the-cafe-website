/**
 * THE.CAFE - Interactive Scripts
 * Smooth scroll animations, header effects, and interactions
 */

(function() {
  'use strict';

  // ═══════════════════════════════════════════════════════════════
  // SCROLL REVEAL ANIMATIONS
  // ═══════════════════════════════════════════════════════════════

  const initScrollReveal = () => {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if (!revealElements.length) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Optionally stop observing after animation
          // observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(element => {
      observer.observe(element);
    });
  };

  // ═══════════════════════════════════════════════════════════════
  // HEADER SCROLL EFFECT
  // ═══════════════════════════════════════════════════════════════

  const initHeaderScroll = () => {
    const header = document.getElementById('header');
    if (!header) return;

    let lastScroll = 0;
    let ticking = false;

    const handleScroll = () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Initial check
    handleScroll();
  };

  // ═══════════════════════════════════════════════════════════════
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ═══════════════════════════════════════════════════════════════

  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip empty or just # links
        if (href === '#' || href === '') {
          e.preventDefault();
          return;
        }

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerHeight = document.getElementById('header')?.offsetHeight || 90;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Update URL without triggering scroll
          if (history.pushState) {
            history.pushState(null, null, href);
          }
        }
      });
    });
  };

  // ═══════════════════════════════════════════════════════════════
  // PARALLAX EFFECT FOR HERO CIRCLES
  // ═══════════════════════════════════════════════════════════════

  const initParallax = () => {
    const heroCircles = document.querySelectorAll('.hero-circle');
    if (!heroCircles.length) return;

    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.3;

      heroCircles.forEach((circle, index) => {
        const speed = (index + 1) * 0.1;
        const yPos = -(rate * speed);
        circle.style.transform = `translateY(${yPos}px)`;
      });

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  };

  // ═══════════════════════════════════════════════════════════════
  // CURSOR EFFECT (OPTIONAL - CAN BE DISABLED)
  // ═══════════════════════════════════════════════════════════════

  const initCursorEffect = () => {
    // Only on desktop, not mobile
    if (window.matchMedia('(max-width: 768px)').matches) {
      return;
    }

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
      width: 20px;
      height: 20px;
      border: 2px solid rgba(220, 38, 38, 0.5);
      border-radius: 50%;
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.1s ease-out;
      display: none;
    `;
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.display = 'block';
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      cursor.style.display = 'none';
    });

    // Scale on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .service-card, .work-card, .philosophy-point');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.borderColor = 'rgba(220, 38, 38, 0.8)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = 'rgba(220, 38, 38, 0.5)';
      });
    });
  };

  // ═══════════════════════════════════════════════════════════════
  // PERFORMANCE OPTIMIZATION - REDUCE MOTION
  // ═══════════════════════════════════════════════════════════════

  const respectReducedMotion = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Disable animations
      const style = document.createElement('style');
      style.textContent = `
        *,
        *::before,
        *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      `;
      document.head.appendChild(style);
    }
  };

  // ═══════════════════════════════════════════════════════════════
  // MOBILE MENU TOGGLE
  // ═══════════════════════════════════════════════════════════════

  const initMobileMenu = () => {
    const header = document.getElementById('header');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!menuToggle || !header) return;

    menuToggle.addEventListener('click', () => {
      header.classList.toggle('menu-open');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        header.classList.remove('menu-open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && header.classList.contains('menu-open')) {
        header.classList.remove('menu-open');
      }
    });
  };

  // ═══════════════════════════════════════════════════════════════
  // INITIALIZE ALL FEATURES
  // ═══════════════════════════════════════════════════════════════

  const init = () => {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    // Initialize all features
    initScrollReveal();
    initHeaderScroll();
    initSmoothScroll();
    initParallax();
    respectReducedMotion();
    initMobileMenu();
    
    // Optional: Uncomment to enable custom cursor
    // initCursorEffect();

    console.log('The.Cafe - All features initialized');
  };

  // Start initialization
  init();

  // Re-initialize scroll reveal on dynamic content changes
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(() => {
      initScrollReveal();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

})();


