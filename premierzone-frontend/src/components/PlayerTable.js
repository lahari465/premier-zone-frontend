import React from "react";

const POSITION_CLASS = {
  GK: "badge-gk",
  DF: "badge-df",
  MF: "badge-mf",
  FW: "badge-fw",
};

function PositionBadge({ pos }) {
  const cls = POSITION_CLASS[pos] || "badge-default";
  return <span className={`pz-badge ${cls}`}>{pos || "—"}</span>;
}

function StatCell({ value }) {
  return <span className="pz-stat">{value ?? "—"}</span>;
}

export default function PlayerTable({ players, loading, error, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="pz-table-state">
        <div className="pz-spinner" />
        <p>Loading players from the API…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pz-table-state pz-table-error">
        <p>Couldn't reach the backend.</p>
        <p className="pz-table-error-detail">{error}</p>
        <p className="pz-table-error-hint">
          Check that your Spring Boot app is running on the URL set in <code>.env</code> and that{" "}
          <code>@CrossOrigin</code> is enabled on the controller.
        </p>
      </div>
    );
  }

  if (!players.length) {
    return (
      <div className="pz-table-state">
        <p>No players match these filters yet.</p>
        <p className="pz-table-error-hint">Try clearing filters, or add your first player.</p>
      </div>
    );
  }

  return (
    <div className="pz-table-wrap">
      <table className="pz-table">
        <thead>
          <tr>
            <th className="pz-sticky-col">Name</th>
            <th>Team</th>
            <th>Pos</th>
            <th>Nation</th>
            <th>Age</th>
            <th>MP</th>
            <th>Starts</th>
            <th>Min</th>
            <th>Gls</th>
            <th>Ast</th>
            <th>PK</th>
            <th>xG</th>
            <th>xAG</th>
            <th>CrdY</th>
            <th>CrdR</th>
            <th aria-label="actions" />
          </tr>
        </thead>
        <tbody>
          {players.map((p) => (
            <tr key={p.name}>
              <td className="pz-sticky-col pz-name-cell">{p.name}</td>
              <td>{p.team}</td>
              <td>
                <PositionBadge pos={p.pos} />
              </td>
              <td>{p.nation}</td>
              <td><StatCell value={p.age} /></td>
              <td><StatCell value={p.mp} /></td>
              <td><StatCell value={p.starts} /></td>
              <td><StatCell value={p.min} /></td>
              <td><StatCell value={p.gls} /></td>
              <td><StatCell value={p.ast} /></td>
              <td><StatCell value={p.pk} /></td>
              <td><StatCell value={p.xg} /></td>
              <td><StatCell value={p.xag} /></td>
              <td><StatCell value={p.crdy} /></td>
              <td><StatCell value={p.crdr} /></td>
              <td className="pz-actions-cell">
                <button type="button" className="pz-icon-btn" onClick={() => onEdit(p)} aria-label={`Edit ${p.name}`}>
                  Edit
                </button>
                <button
                  type="button"
                  className="pz-icon-btn pz-icon-btn-danger"
                  onClick={() => onDelete(p)}
                  aria-label={`Delete ${p.name}`}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
