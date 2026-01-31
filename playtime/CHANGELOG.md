# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [0.5.0] - Persistence

### Added

- **Environment Configuration (S-047–S-050):**
  - dotenv: `dotenv` package; `src/load-env.js` loads `.env` before server; `process.env` values come from `.env` when present
  - Cookie settings from environment: `cookie_name` and `cookie_password` read from `process.env` (with dev fallbacks)
  - `.env_example`: template with `PORT`, `cookie_name`, `cookie_password` placeholders for setup
  - `.env` listed in `.gitignore` so secrets are not committed

- **JSON File Storage (S-051–S-055):**
  - lowdb: `lowdb` package; `src/models/json/store-utils.js` configures `JSONFilePreset('db.json', defaultData)` with `users`, `playlists`, `tracks` arrays
  - `src/models/json/db.json`: initial file; store-utils creates/reads it via lowdb
  - `user-json-store.js`: UserStore interface (getAllUsers, addUser, getUserById, getUserByEmail, deleteUserById, deleteAll) with db.read/write via lowdb
  - `playlist-json-store.js`: PlaylistStore interface (getAllPlaylists, addPlaylist, getPlaylistById, getUserPlaylists, deletePlaylistById, deleteAllPlaylists)
  - `track-json-store.js`: TrackStore interface (getAllTracks, addTrack, getTrackById, getTracksByPlaylistId, deleteTrack, deleteAllTracks)
  - `db.js`: `init()` is async; calls `await initJsonStore()` then assigns `userStore`, `playlistStore`, `trackStore` to JSON stores; server calls `await dbInit()` so data persists across restarts
  - Unit tests still use in-memory stores (they do not call `db.init()`)

## [0.4.0] - Tracks

### Added

- Track model: trackMemStore with addTrack(playlistId, track), getAllTracks, getTrackById, getTracksByPlaylistId, deleteTrack, deleteAllTracks
- Track has playlistid, title, artist, duration (optional)
- db.js exports trackStore; init() configures trackStore
- Playlist detail: getPlaylistById + getTracksByPlaylistId merged in controller; playlist-view shows tracks
- Partials: list-tracks.hbs (table: title, artist, duration, delete), add-track.hbs (title, artist, duration)
- POST /playlist/{id}/addtrack, GET /playlist/{id}/deletetrack/{trackid}
- GET /dashboard/deleteplaylist/{id}; delete playlist removes its tracks then playlist
- Delete button on playlist cards (list-playlists.hbs) and on track rows (list-tracks.hbs)
- E2E tracks.spec.js: add track, see in list; delete track; delete playlist with tracks; dashboard → detail → back
- track-model-test.js: addTrack, getTrackById, getTracksByPlaylistId, deleteTrack, deleteAllTracks

## [0.3.0] - Playlists

### Added

- Playlist model: playlistMemStore with addPlaylist, getAllPlaylists, getPlaylistById, getUserPlaylists, deletePlaylistById, deleteAllPlaylists
- db.js exports playlistStore; init() configures playlistStore
- Playlist has userid; addPlaylist handler sets userid from request.auth.credentials
- Dashboard: getUserPlaylists(logged-in user); list playlists in cards with link to detail
- Partials: list-playlists.hbs, add-playlist.hbs
- POST /dashboard/addplaylist, GET /playlist/{id}
- Playlist controller: playlist detail view (empty tracks for 0.3.0)
- playlist-view.hbs: playlist title, back to dashboard, placeholder for tracks
- E2E playlists.spec.js: create playlist, see in list; open (empty); second user sees only own playlists
- playlist-model-test.js: addPlaylist, getPlaylistById, getUserPlaylists, deletePlaylistById, deleteAllPlaylists

## [0.2.0] - Sessions

### Added

- @hapi/cookie: session strategy with cookie name/password (env or dev defaults)
- Session validation: validate() checks user exists via userStore.getUserById, returns isValid and credentials
- Login sets session cookie (cookieAuth.set({ id: user._id }))
- Logout clears session (cookieAuth.clear())
- Default auth strategy; public routes (/, /signup, /login, POST /register, POST /authenticate) set auth: false
- Dashboard and menu show user name (firstName + lastName) from session
- E2E session tests: login then reload dashboard still authenticated; logout then reload redirected to /; dashboard shows user name

## [0.1.0] - Foundation

### Added

- User model: in-memory user store with addUser, getAllUsers, getUserById, getUserByEmail, deleteUserById, deleteAll
- db.js store abstraction with init()
- UUID v4 for user _id on create
- Accounts controller: home, signup, login, logout
- Dashboard controller: dashboard view
- Routes: GET /, /signup, POST /register, /login, POST /authenticate, GET /logout, GET /dashboard
- Views: welcome-view, signup-view, login-view, dashboard-view
- Partials: welcome-menu (Login, Sign up), menu (Dashboard, Log out)
- E2E auth tests: register, login, dashboard, logout; invalid login
- Unit test framework: Mocha, Chai; npm test
- test/fixtures.js with test user(s)
- users-model-test.js: create user, getById, getByEmail, deleteAll, deleteById

## [0.0.0] - Skeleton

### Added

- Minimal Node + Hapi server, Handlebars views with layout and partials
- Welcome page at /
- ESLint (Airbnb), Prettier, .gitignore
- Playwright E2E smoke test
