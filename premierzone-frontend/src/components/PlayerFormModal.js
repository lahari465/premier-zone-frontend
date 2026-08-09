import React, { useEffect, useState } from "react";

const EMPTY_PLAYER = {
  name: "",
  team: "",
  pos: "MF",
  nation: "",
  age: "",
  mp: "",
  starts: "",
  min: "",
  gls: "",
  ast: "",
  pk: "",
  crdy: "",
  crdr: "",
  xg: "",
  xag: "",
};

const INT_FIELDS = ["age", "mp", "starts", "gls", "ast", "pk", "crdy", "crdr"];
const FLOAT_FIELDS = ["min", "xg", "xag"];

export default function PlayerFormModal({ mode, initialPlayer, onCancel, onSubmit, submitting, submitError }) {
  const [form, setForm] = useState(EMPTY_PLAYER);
  const isEdit = mode === "edit";

  useEffect(() => {
    if (initialPlayer) {
      const filled = { ...EMPTY_PLAYER };
      Object.keys(filled).forEach((key) => {
        filled[key] = initialPlayer[key] ?? "";
      });
      setForm(filled);
    } else {
      setForm(EMPTY_PLAYER);
    }
  }, [initialPlayer]);

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form };
    INT_FIELDS.forEach((f) => {
      payload[f] = payload[f] === "" ? null : parseInt(payload[f], 10);
    });
    FLOAT_FIELDS.forEach((f) => {
      payload[f] = payload[f] === "" ? null : parseFloat(payload[f]);
    });
    onSubmit(payload);
  };

  return (
    <div className="pz-modal-overlay" role="dialog" aria-modal="true">
      <div className="pz-modal">
        <div className="pz-modal-header">
          <h2>{isEdit ? `Edit ${initialPlayer?.name}` : "Add a player"}</h2>
          <button type="button" className="pz-icon-btn" onClick={onCancel} aria-label="Close">
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="pz-form">
          <div className="pz-form-grid">
            <div className="pz-field">
              <label htmlFor="p-name">Name</label>
              <input
                id="p-name"
                required
                disabled={isEdit}
                value={form.name}
                onChange={handleChange("name")}
                placeholder="Player name"
              />
              {isEdit && <span className="pz-field-hint">Name is the record key and can't be changed here.</span>}
            </div>
            <div className="pz-field">
              <label htmlFor="p-team">Team</label>
              <input id="p-team" required value={form.team} onChange={handleChange("team")} placeholder="Club" />
            </div>
            <div className="pz-field">
              <label htmlFor="p-pos">Position</label>
              <select id="p-pos" value={form.pos} onChange={handleChange("pos")}>
                <option value="GK">GK</option>
                <option value="DF">DF</option>
                <option value="MF">MF</option>
                <option value="FW">FW</option>
              </select>
            </div>
            <div className="pz-field">
              <label htmlFor="p-nation">Nation</label>
              <input id="p-nation" value={form.nation} onChange={handleChange("nation")} placeholder="Nationality" />
            </div>
            <div className="pz-field">
              <label htmlFor="p-age">Age</label>
              <input id="p-age" type="number" min="14" max="50" value={form.age} onChange={handleChange("age")} />
            </div>
            <div className="pz-field">
              <label htmlFor="p-mp">Matches played</label>
              <input id="p-mp" type="number" min="0" value={form.mp} onChange={handleChange("mp")} />
            </div>
            <div className="pz-field">
              <label htmlFor="p-starts">Starts</label>
              <input id="p-starts" type="number" min="0" value={form.starts} onChange={handleChange("starts")} />
            </div>
            <div className="pz-field">
              <label htmlFor="p-min">Minutes</label>
              <input id="p-min" type="number" min="0" step="0.1" value={form.min} onChange={handleChange("min")} />
            </div>
            <div className="pz-field">
              <label htmlFor="p-gls">Goals</label>
              <input id="p-gls" type="number" min="0" value={form.gls} onChange={handleChange("gls")} />
            </div>
            <div className="pz-field">
              <label htmlFor="p-ast">Assists</label>
              <input id="p-ast" type="number" min="0" value={form.ast} onChange={handleChange("ast")} />
            </div>
            <div className="pz-field">
              <label htmlFor="p-pk">Penalty kicks</label>
              <input id="p-pk" type="number" min="0" value={form.pk} onChange={handleChange("pk")} />
            </div>
            <div className="pz-field">
              <label htmlFor="p-crdy">Yellow cards</label>
              <input id="p-crdy" type="number" min="0" value={form.crdy} onChange={handleChange("crdy")} />
            </div>
            <div className="pz-field">
              <label htmlFor="p-crdr">Red cards</label>
              <input id="p-crdr" type="number" min="0" value={form.crdr} onChange={handleChange("crdr")} />
            </div>
            <div className="pz-field">
              <label htmlFor="p-xg">xG</label>
              <input id="p-xg" type="number" min="0" step="0.01" value={form.xg} onChange={handleChange("xg")} />
            </div>
            <div className="pz-field">
              <label htmlFor="p-xag">xAG</label>
              <input id="p-xag" type="number" min="0" step="0.01" value={form.xag} onChange={handleChange("xag")} />
            </div>
          </div>

          {submitError && <p className="pz-form-error">{submitError}</p>}

          <div className="pz-modal-actions">
            <button type="button" className="pz-btn pz-btn-ghost" onClick={onCancel} disabled={submitting}>
              Cancel
            </button>
            <button type="submit" className="pz-btn pz-btn-primary" disabled={submitting}>
              {submitting ? "Saving…" : isEdit ? "Save changes" : "Add player"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
