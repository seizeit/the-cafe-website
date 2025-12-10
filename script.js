/**
 * THE.CAFE - Interactive Elements
 * Geometric Minimalism - Enhanced UX
 * Version: 3.0
 */

document.addEventListener('DOMContentLoaded', function() {

  // ═══════════════════════════════════════════════════════════════
  // THEME TOGGLE - Light / Dark / System
  // ═══════════════════════════════════════════════════════════════

  const themeToggleButtons = document.querySelectorAll('.theme-toggle-option');
  const html = document.documentElement;

  // Get stored theme or default to system
  function getStoredTheme() {
    return localStorage.getItem('theme') || 'dark';
  }

  // Apply theme to document
  function applyTheme(theme) {
    if (theme === 'system') {
      // Remove data-theme attribute to use system preference
      html.removeAttribute('data-theme');
    } else {
      html.setAttribute('data-theme', theme);
    }

    // Update active button
    themeToggleButtons.forEach(btn => {
      if (btn.dataset.theme === theme) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Store preference
    localStorage.setItem('theme', theme);
  }

  // Initialize theme
  const currentTheme = getStoredTheme();
  applyTheme(currentTheme);

  // Theme toggle button listeners
  themeToggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const theme = button.dataset.theme;
      applyTheme(theme);
    });
  });

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (getStoredTheme() === 'system') {
      // Re-apply system theme when system preference changes
      applyTheme('system');
    }
  });

  // ═══════════════════════════════════════════════════════════════
  // HEADER SCROLL EFFECT - Add shadow and red line on scroll
  // ═══════════════════════════════════════════════════════════════

  const header = document.querySelector('.header');
  let lastScrollTop = 0;

  function handleHeaderScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop;
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });

  // ═══════════════════════════════════════════════════════════════
  // INTERSECTION OBSERVER - Scroll Reveal Animations
  // ═══════════════════════════════════════════════════════════════

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
  };

  const scrollObserver = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay for multiple items
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, index * 50);

        // Unobserve after animation to improve performance
        scrollObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all scroll-reveal elements
  const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
  scrollRevealElements.forEach(el => {
    scrollObserver.observe(el);
  });

  // ═══════════════════════════════════════════════════════════════
  // SMOOTH SCROLL - Enhanced anchor link behavior
  // ═══════════════════════════════════════════════════════════════

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // Skip if it's just "#" or "#home"
      if (href === '#' || href === '#home') {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();

        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = targetPosition - headerHeight - 32; // 32px extra spacing

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Update URL without triggering scroll
        if (history.pushState) {
          history.pushState(null, null, href);
        }
      }
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // BUTTON HOVER - Magnetic effect (subtle)
  // ═══════════════════════════════════════════════════════════════

  const buttons = document.querySelectorAll('.btn, .nav-link-cta');

  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.willChange = 'transform';
    });

    button.addEventListener('mouseleave', function() {
      this.style.willChange = 'auto';
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CARD HOVER - Enhanced interaction feedback
  // ═══════════════════════════════════════════════════════════════

  const cards = document.querySelectorAll('.service-card, .work-card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.willChange = 'transform, box-shadow';
    });

    card.addEventListener('mouseleave', function() {
      this.style.willChange = 'auto';
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // PERFORMANCE - Debounced resize handler
  // ═══════════════════════════════════════════════════════════════

  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      // Re-calculate any layout-dependent values if needed
      handleHeaderScroll();
    }, 150);
  }, { passive: true });

  // ═══════════════════════════════════════════════════════════════
  // ACCESSIBILITY - Focus visible enhancement
  // ═══════════════════════════════════════════════════════════════

  // Track if user is using keyboard for navigation
  let isUsingKeyboard = false;

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      isUsingKeyboard = true;
      document.body.classList.add('using-keyboard');
    }
  });

  document.addEventListener('mousedown', function() {
    isUsingKeyboard = false;
    document.body.classList.remove('using-keyboard');
  });

  // ═══════════════════════════════════════════════════════════════
  // PAGE LOAD ANIMATION - Fade in on initial load
  // ═══════════════════════════════════════════════════════════════

  document.body.style.opacity = '0';

  window.addEventListener('load', function() {
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.5s ease-in-out';
      document.body.style.opacity = '1';
    }, 100);
  });

  // ═══════════════════════════════════════════════════════════════
  // GEOMETRIC BACKGROUND - Subtle parallax on hero circles
  // ═══════════════════════════════════════════════════════════════

  const hero = document.querySelector('.hero');
  let ticking = false;

  function updateParallax() {
    const scrolled = window.pageYOffset;
    const heroHeight = hero ? hero.offsetHeight : 0;

    if (hero && scrolled < heroHeight) {
      // Subtle parallax - only on hero section
      const parallaxValue = scrolled * 0.15;
      hero.style.transform = `translateY(${parallaxValue}px)`;
    }

    ticking = false;
  }

  function requestParallaxUpdate() {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  // Only enable parallax on larger screens for performance
  if (window.innerWidth > 768) {
    window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
  }

  // ═══════════════════════════════════════════════════════════════
  // EMAIL LINK - Copy to clipboard on click (optional enhancement)
  // ═══════════════════════════════════════════════════════════════

  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

  emailLinks.forEach(link => {
    // Add subtle indication that email can be copied
    link.setAttribute('title', 'Click to email or right-click to copy');

    link.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      const email = this.getAttribute('href').replace('mailto:', '');

      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          // Show temporary feedback
          const originalText = this.textContent;
          this.textContent = 'Email copied!';

          setTimeout(() => {
            this.textContent = originalText;
          }, 2000);
        });
      }
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CONSOLE MESSAGE - Developer easter egg
  // ═══════════════════════════════════════════════════════════════

  console.log(
    '%cThe.Cafe',
    'font-size: 24px; font-weight: bold; color: #dc2626;'
  );
  console.log(
    '%cHumans, agents, and systems gathering to create.',
    'font-size: 14px; color: #d9d9d9;'
  );
  console.log(
    '%cInterested in conversational AI? hello@the.cafe',
    'font-size: 12px; color: #b3b3b3; font-style: italic;'
  );

});

// ═══════════════════════════════════════════════════════════════
// REDUCED MOTION - Respect user preferences
// ═══════════════════════════════════════════════════════════════

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
  // Disable all animations if user prefers reduced motion
  document.documentElement.style.setProperty('--transition-fast', '0ms');
  document.documentElement.style.setProperty('--transition-base', '0ms');
  document.documentElement.style.setProperty('--transition-slow', '0ms');
}
