import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import PlayerFilters from "../components/PlayerFilters";
import PlayerTable from "../components/PlayerTable";
import PlayerFormModal from "../components/PlayerFormModal";
import ConfirmDialog from "../components/ConfirmDialog";
import { fetchPlayers, createPlayer, updatePlayer, deletePlayer } from "../api/playerApi";

const EMPTY_FILTERS = { name: "", team: "", position: "", nation: "" };

export default function PlayersPage() {
  const [searchParams] = useSearchParams();
  const focusField = searchParams.get("focus"); // nation | position | search, set by the nav links
  const [players, setPlayers] = useState([]);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modal, setModal] = useState(null); // { mode: 'add' | 'edit', player? }
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async (activeFilters) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPlayers(activeFilters);
      setPlayers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce filter-driven refetches so we don't hit the API on every keystroke.
  useEffect(() => {
    const handle = setTimeout(() => load(filters), 300);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  // Nav links can deep-link into a specific filter field (Nations, Positions, Search).
  useEffect(() => {
    if (!focusField) return;
    const idMap = { nation: "f-nation", position: "f-position", search: "f-name" };
    const el = document.getElementById(idMap[focusField]);
    if (el) el.focus();
  }, [focusField]);

  const handleClearFilters = () => setFilters(EMPTY_FILTERS);

  const openAddModal = () => {
    setSaveError(null);
    setModal({ mode: "add" });
  };

  const openEditModal = (player) => {
    setSaveError(null);
    setModal({ mode: "edit", player });
  };

  const closeModal = () => {
    if (saving) return;
    setModal(null);
  };

  const handleSubmit = async (payload) => {
    setSaving(true);
    setSaveError(null);
    try {
      if (modal.mode === "edit") {
        await updatePlayer(payload);
      } else {
        await createPlayer(payload);
      }
      setModal(null);
      await load(filters);
    } catch (err) {
      setSaveError(err?.response?.data?.message || err?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirmed = async () => {
    setDeleting(true);
    try {
      await deletePlayer(pendingDelete.name);
      setPendingDelete(null);
      await load(filters);
    } catch (err) {
      setError(err?.message || "Delete failed");
      setPendingDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="pz-page">
      <div className="pz-shell">
        <Header total={players.length} />

        <PlayerFilters
          filters={filters}
          onChange={setFilters}
          onClear={handleClearFilters}
          onAddPlayer={openAddModal}
        />

        <PlayerTable
          players={players}
          loading={loading}
          error={error}
          onEdit={openEditModal}
          onDelete={setPendingDelete}
        />
      </div>

      {modal && (
        <PlayerFormModal
          mode={modal.mode}
          initialPlayer={modal.player}
          onCancel={closeModal}
          onSubmit={handleSubmit}
          submitting={saving}
          submitError={saveError}
        />
      )}

      {pendingDelete && (
        <ConfirmDialog
          title="Delete this player?"
          message={`This removes ${pendingDelete.name} from the roster. This can't be undone.`}
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setPendingDelete(null)}
          busy={deleting}
        />
      )}
    </div>
  );
}
