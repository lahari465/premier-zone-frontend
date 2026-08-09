import React from "react";

export default function ConfirmDialog({ title, message, onConfirm, onCancel, busy }) {
  return (
    <div className="pz-modal-overlay" role="alertdialog" aria-modal="true">
      <div className="pz-modal pz-modal-small">
        <h2>{title}</h2>
        <p className="pz-confirm-message">{message}</p>
        <div className="pz-modal-actions">
          <button type="button" className="pz-btn pz-btn-ghost" onClick={onCancel} disabled={busy}>
            Cancel
          </button>
          <button type="button" className="pz-btn pz-btn-danger" onClick={onConfirm} disabled={busy}>
            {busy ? "Deleting…" : "Delete player"}
          </button>
        </div>
      </div>
    </div>
  );
}
