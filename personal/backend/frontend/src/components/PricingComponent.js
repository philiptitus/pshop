// PricingComponent.js

import React, { useEffect } from 'react';

const PricingComponent = () => {
  useEffect(() => {
    const cardsContainer = document.querySelector(".cards");
    const cardsContainerInner = document.querySelector(".cards__inner");
    const cards = Array.from(document.querySelectorAll(".card"));
    const overlay = document.querySelector(".overlay");

    const applyOverlayMask = (e) => {
      const overlayEl = e.currentTarget;
      const x = e.pageX - cardsContainer.offsetLeft;
      const y = e.pageY - cardsContainer.offsetTop;

      overlayEl.style = `--opacity: 1; --x: ${x}px; --y:${y}px;`;
    };

    const createOverlayCta = (overlayCard, ctaEl) => {
      const overlayCta = document.createElement("div");
      overlayCta.classList.add("cta");
      overlayCta.textContent = ctaEl.textContent;
      overlayCta.setAttribute("aria-hidden", true);
      overlayCard.append(overlayCta);
    };

    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const cardIndex = cards.indexOf(entry.target);
        let width = entry.borderBoxSize[0].inlineSize;
        let height = entry.borderBoxSize[0].blockSize;

        if (cardIndex >= 0) {
          overlay.children[cardIndex].style.width = `${width}px`;
          overlay.children[cardIndex].style.height = `${height}px`;
        }
      });
    });

    const initOverlayCard = (cardEl) => {
      const overlayCard = document.createElement("div");
      overlayCard.classList.add("card");
      createOverlayCta(overlayCard, cardEl.lastElementChild);
      overlay.append(overlayCard);
      observer.observe(cardEl);
    };

    cards.forEach(initOverlayCard);
    document.body.addEventListener("pointermove", applyOverlayMask);

    // Cleanup function
    return () => {
      document.body.removeEventListener("pointermove", applyOverlayMask);
      observer.disconnect();
    };
  }, []);

  const styles = {
    html: {
      height: '100%',
      minHeight: '100vh',
    },
    body: {
      display: 'grid',
      placeItems: 'center',
      fontFamily: '"League Spartan", system-ui, sans-serif',
      fontSize: '1.1rem',
      lineHeight: 1.2,
      backgroundColor: '#212121',
      color: '#ddd',
    },
    main: {
      maxWidth: '75rem',
      padding: '3em 1.5em',
    },
    mainHeading: {
      fontWeight: 600,
      fontSize: '2.25em',
      marginBottom: '0.75em',
      textAlign: 'center',
      color: '#eceff1',
    },
    cards: {
      position: 'relative',
    },
    cardsInner: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '2.5em',
    },
    card: {
      '--flow-space': '0.5em',
      '--hsl': 'var(--hue), var(--saturation), var(--lightness)',
      flex: '1 1 14rem',
      padding: '1.5em 2em',
      display: 'grid',
      gridTemplateRows: 'auto auto auto 1fr',
      alignItems: 'start',
      gap: '1.25em',
      color: '#eceff1',
      backgroundColor: '#2b2b2b',
      border: '1px solid #eceff133',
      borderRadius: '15px',
    },
    card1: {
      '--hue': '165',
      '--saturation': '82.26%',
      '--lightness': '51.37%',
    },
    card2: {
      '--hue': '291.34',
      '--saturation': '95.9%',
      '--lightness': '61.76%',
    },
    card3: {
      '--hue': '338.69',
      '--saturation': '100%',
      '--lightness': '48.04%',
    },
    cardBullets: {
      lineHeight: 1.4,
    },
    cardBulletsLi: {
      display: 'inline-block',
      content: "url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 512 512\' width=\'16\' title=\'check\' fill=\'%23dddddd\'%3E%3Cpath d=\'M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z' /%3E%3C/svg%3E')",
      transform: 'translatey(0.25ch)',
      marginRight: '1ch',
    },
    cardHeading: {
      fontSize: '1.05em',
      fontWeight: 600,
    },
    cardPrice: {
      fontSize: '1.75em',
      fontWeight: 700,
    },
    flow: {
      '> * + *': {
        marginTop: 'var(--flow-space, 1.25em)',
      },
    },
    cta: {
      display: 'block',
      alignSelf: 'end',
      margin: '1em 0 0.5em 0',
      textAlign: 'center',
      textDecoration: 'none',
      color: '#fff',
      backgroundColor: '#0d0d0d',
      padding: '0.7em',
      borderRadius: '10px',
      fontSize: '1rem',
      fontWeight: 600,
    },
    overlay: {
      position: 'absolute',
      inset: '0',
      pointerEvents: 'none',
      userSelect: 'none',
      opacity: 'var(--opacity, 0)',
      WebkitMask: 'radial-gradient(25rem 25rem at var(--x) var(--y), #000 1%, transparent 50%)',
      mask: 'radial-gradient(25rem 25rem at var(--x) var(--y), #000 1%, transparent 50%)',
      transition: '400ms mask ease',
      willChange: 'mask',
    },
    overlayCard: {
      backgroundColor: 'hsla(var(--hsl), 0.15)',
      borderColor: 'hsla(var(--hsl), 1)',
      boxShadow: '0 0 0 1px inset hsl(var(--hsl))',
    },
    overlayCta: {
      display: 'block',
      gridRow: '-1',
      width: '100%',
      backgroundColor: 'hsl(var(--hsl))',
      boxShadow: '0 0 0 1px hsl(var(--hsl))',
    },
    notOverlayCard: {
      transition: '400ms background ease',
      willChange: 'background',
    },
    notOverlayCardHover: {
      '--lightness': '95%',
      background: 'hsla(var(--hsl), 0.1)',
    },
  };

  return (
    <main style={styles.main}>
      <h1 style={styles.mainHeading}>Pricing</h1>
      <div style={styles.cards} className="cards">
        <div style={styles.cardsInner} className="cards__inner">
          <div style={{ ...styles.card, ...styles.card1 }}>
            <h2 style={styles.cardHeading}>Basic</h2>
            <p style={styles.cardPrice}>$9.99</p>
            <ul style={styles.cardBullets} role="list" className="card__bullets flow">
              <li style={styles.cardBulletsLi}>Access to standard workouts and nutrition plans</li>
              <li style={styles.cardBulletsLi}>Email support</li>
            </ul>
            <a href="#basic" style={styles.cta} className="card__cta cta">
              Get Started
            </a>
          </div>

          <div style={{ ...styles.card, ...styles.card2 }}>
            <h2 style={styles.cardHeading}>Pro</h2>
            <p style={styles.cardPrice}>$19.99</p>
            <ul style={styles.cardBullets} role="list" className="card__bullets flow">
              <li style={styles.cardBulletsLi}>Access to advanced workouts and nutrition plans</li>
              <li style={styles.cardBulletsLi}>Priority Email support</li>
              <li style={styles.cardBulletsLi}>Exclusive access to live Q&A sessions</li>
            </ul>
            <a href="#pro" style={styles.cta} className="card__cta cta">
              Upgrade to Pro
            </a>
          </div>

          <div style={{ ...styles.card, ...styles.card3 }}>
            <h2 style={styles.cardHeading}>Ultimate</h2>
            <p style={styles.cardPrice}>$29.99</p>
            <ul style={styles.cardBullets} role="list" className="card__bullets flow">
              <li style={styles.cardBulletsLi}>Access to all premium workouts and nutrition plans</li>
              <li style={styles.cardBulletsLi}>24/7 Priority support</li>
              <li style={styles.cardBulletsLi}>1-on-1 virtual coaching session every month</li>
              <li style={styles.cardBulletsLi}>Exclusive content and early access to new features</li>
            </ul>
            <a href="#ultimate" style={styles.cta} className="card__cta cta">
              Go Ultimate
            </a>
          </div>
        </div>

        <div style={styles.overlay} className="overlay cards__inner"></div>
      </div>
    </main>
  );
};

export default PricingComponent;
