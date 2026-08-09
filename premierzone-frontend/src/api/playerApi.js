import axios from "axios";

// Base URL points at the Spring Boot PlayerController:
// @RequestMapping(path = "api/lah/player")
// Change this in .env (REACT_APP_API_URL) if your backend runs elsewhere.
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api/lah/player";

const client = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

/**
 * GET /api/lah/player
 * Supports the same optional query params the backend accepts:
 * team, name, position, nation. The backend only honours one
 * combination at a time (team+position, or a single filter), so
 * we mirror that here rather than sending all four at once.
 */
export async function fetchPlayers(filters = {}) {
  const { team, name, position, nation } = filters;
  const params = {};

  if (team && position) {
    params.team = team;
    params.position = position;
  } else if (team) {
    params.team = team;
  } else if (name) {
    params.name = name;
  } else if (position) {
    params.position = position;
  } else if (nation) {
    params.nation = nation;
  }

  const res = await client.get("", { params });
  return res.data;
}

export async function createPlayer(player) {
  const res = await client.post("", player);
  return res.data;
}

export async function updatePlayer(player) {
  const res = await client.put("", player);
  return res.data;
}

export async function deletePlayer(playerName) {
  const res = await client.delete(`/${encodeURIComponent(playerName)}`);
  return res.data;
}

export default client;
