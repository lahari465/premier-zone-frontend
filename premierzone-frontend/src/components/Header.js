import React from "react";

const LEGEND = [
  { code: "GK", label: "Goalkeeper", className: "badge-gk" },
  { code: "DF", label: "Defender", className: "badge-df" },
  { code: "MF", label: "Midfielder", className: "badge-mf" },
  { code: "FW", label: "Forward", className: "badge-fw" },
];

export default function Header({ total }) {
  return (
    <header className="pz-header">
      <div className="pz-header-top">
        <div className="pz-brand">
          <span className="pz-brand-mark">PZ</span>
          <div>
            <h1>Player Hub</h1>
            <p className="pz-subtitle">Season statistics, straight from your Spring Boot API</p>
          </div>
        </div>
        <div className="pz-count">
          <span className="pz-count-number">{total}</span>
          <span className="pz-count-label">players tracked</span>
        </div>
      </div>
      <div className="pz-legend">
        {LEGEND.map((item) => (
          <span key={item.code} className="pz-legend-item">
            <i className={`pz-dot ${item.className}`} />
            {item.code} — {item.label}
          </span>
        ))}
      </div>
    </header>
  );
}
