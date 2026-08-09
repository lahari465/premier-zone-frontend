# PremierZone — Player Hub (React frontend)

A React (Create React App) frontend for your Spring Boot `PlayerController`
(`@RequestMapping(path = "api/lah/player")`). Browse, filter, add, edit, and
delete players in `player_statistic`.

## 1. Run the backend (IntelliJ)

Start your Spring Boot app as usual (e.g. `mvn spring-boot:run` or the
IntelliJ run button). By default this frontend expects it at:

```
http://localhost:8080/api/lah/player
```

Your `PlayerController` already has `@CrossOrigin(origins = "*")`, so the
browser will be allowed to call it from a different port (CRA runs on 3000).

## 2. Run the frontend (VS Code)

```bash
cd premierzone-frontend
npm install
npm start
```

This opens `http://localhost:3000`. It talks to the backend URL set in `.env`:

```
REACT_APP_API_URL=http://localhost:8080/api/lah/player
```

Change that value (then restart `npm start`) if your backend runs on a
different host/port.

## Project structure

```
src/
  api/playerApi.js        # all axios calls to the backend
  components/
    Header.js              # top banner + position legend
    PlayerFilters.js        # name / team / position / nation filters
    PlayerTable.js           # stats table with edit/delete actions
    PlayerFormModal.js        # add + edit form
    ConfirmDialog.js           # delete confirmation
  App.js                        # wires state + API together
  App.css / index.css            # styling
```

## Notes on matching your backend

- **Filtering** mirrors `PlayerController.getPlayers()`: it sends `team`,
  `name`, `position`, or `nation` query params using the same precedence your
  backend checks (team+position together, otherwise the first non-empty one).
- **Add / Update** send the full `Player` JSON body to `POST` / `PUT
  api/lah/player`, matching your `PlayerService` signatures.
- **Delete** calls `DELETE api/lah/player/{playerName}`, matching
  `@DeleteMapping("/{playerName}")`.
- `name` is the entity's `@Id`, so it's locked (not editable) once a player
  is created — editing it would try to create a second row rather than
  rename the existing one, since the backend doesn't offer a rename endpoint.

## If you add a Team API later

Everything team-related in the UI currently just reads the free-text `team`
field on `Player`. If you add a `TeamController`, the easiest next step is a
second file in `src/api/` (e.g. `teamApi.js`) following the same pattern as
`playerApi.js`, and a dropdown in `PlayerFilters.js` / `PlayerFormModal.js`
populated from it instead of a free-text input.
