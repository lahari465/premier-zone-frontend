import React from "react";

export default function PlayerFilters({ filters, onChange, onClear, onAddPlayer }) {
  const handleField = (field) => (e) => onChange({ ...filters, [field]: e.target.value });

  return (
    <div className="pz-filters">
      <div className="pz-filters-fields">
        <div className="pz-field">
          <label htmlFor="f-name">Name</label>
          <input
            id="f-name"
            type="text"
            placeholder="Search a player"
            value={filters.name}
            onChange={handleField("name")}
          />
        </div>
        <div className="pz-field">
          <label htmlFor="f-team">Team</label>
          <input
            id="f-team"
            type="text"
            placeholder="e.g. Arsenal"
            value={filters.team}
            onChange={handleField("team")}
          />
        </div>
        <div className="pz-field">
          <label htmlFor="f-position">Position</label>
          <select id="f-position" value={filters.position} onChange={handleField("position")}>
            <option value="">All positions</option>
            <option value="GK">Goalkeeper</option>
            <option value="DF">Defender</option>
            <option value="MF">Midfielder</option>
            <option value="FW">Forward</option>
          </select>
        </div>
        <div className="pz-field">
          <label htmlFor="f-nation">Nation</label>
          <input
            id="f-nation"
            type="text"
            placeholder="e.g. England"
            value={filters.nation}
            onChange={handleField("nation")}
          />
        </div>
      </div>
      <div className="pz-filters-actions">
        <button type="button" className="pz-btn pz-btn-ghost" onClick={onClear}>
          Clear filters
        </button>
        <button type="button" className="pz-btn pz-btn-primary" onClick={onAddPlayer}>
          + Add player
        </button>
      </div>
    </div>
  );
}
