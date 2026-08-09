import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <section className="pz-hero">
      <div className="pz-hero-crest" aria-hidden="true">
        <svg viewBox="0 0 160 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M80 4 L150 24 V86 C150 128 120 158 80 176 C40 158 10 128 10 86 V24 Z"
            fill="#0e2c40"
            stroke="#f4c542"
            strokeWidth="5"
          />
          <circle cx="80" cy="80" r="34" fill="none" stroke="#f5f7f5" strokeWidth="3" />
          <path
            d="M80 52 L98 65 L91 86 L69 86 L62 65 Z M80 52 V68 M69 86 L56 108 M91 86 L104 108"
            stroke="#f5f7f5"
            strokeWidth="3"
            fill="none"
          />
          <text
            x="80"
            y="150"
            textAnchor="middle"
            fontFamily="Oswald, sans-serif"
            fontWeight="700"
            fontSize="26"
            fill="#f4c542"
            letterSpacing="2"
          >
            PZ
          </text>
        </svg>
      </div>

      <h1 className="pz-hero-title">
        Welcome to
        <br />
        PremierZone Fantasy!
      </h1>
      <p className="pz-hero-subtitle">Your home for everything Premier League related.</p>

      <button type="button" className="pz-hero-cta" onClick={() => navigate("/players")}>
        Get Started
      </button>
    </section>
  );
}
