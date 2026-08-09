import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Users, Flag, Shirt, Search } from "lucide-react";

const LINKS = [
  { to: "/", icon: Home, label: "Home", end: true },
  { to: "/players", icon: Users, label: "Players" },
  { to: "/players?focus=nation", icon: Flag, label: "Nations" },
  { to: "/players?focus=position", icon: Shirt, label: "Positions" },
  { to: "/players?focus=search", icon: Search, label: "Search" },
];

function Crest() {
  return (
    <svg className="pz-crest" viewBox="0 0 64 72" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M32 2 L60 10 V34 C60 52 48 64 32 70 C16 64 4 52 4 34 V10 Z"
        fill="var(--pz-navy)"
        stroke="var(--pz-gold)"
        strokeWidth="2.5"
      />
      <circle cx="32" cy="32" r="13" fill="none" stroke="var(--pz-ink)" strokeWidth="2" />
      <path
        d="M32 21 L38 26 L36 33 L28 33 L26 26 Z M32 21 V27 M28 33 L24 40 M36 33 L40 40"
        stroke="var(--pz-ink)"
        strokeWidth="1.4"
        fill="none"
      />
      <text
        x="32"
        y="58"
        textAnchor="middle"
        fontFamily="Oswald, sans-serif"
        fontWeight="700"
        fontSize="11"
        fill="var(--pz-gold)"
        letterSpacing="1"
      >
        PZ
      </text>
    </svg>
  );
}

export default function NavBar() {
  return (
    <nav className="pz-nav">
      <NavLink to="/" className="pz-nav-brand" end>
        <Crest />
        <span className="pz-nav-brand-text">
          Premier<span>Zone</span>
        </span>
      </NavLink>
      <div className="pz-nav-links">
        {LINKS.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={label}
            to={to}
            end={end}
            className={({ isActive }) => `pz-nav-link${isActive ? " pz-nav-link-active" : ""}`}
            title={label}
          >
            <Icon size={20} strokeWidth={1.8} />
            <span className="pz-nav-link-label">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
