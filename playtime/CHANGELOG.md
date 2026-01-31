# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [0.7.0] - MongoDB

### Added

- **MongoDB configuration (S-079–S-080):**
  - Mongoose: `mongoose` package; `src/models/mongo/connection.js` connects using `process.env.MONGO_URI`
  - `.env_example`: optional `MONGO_URI` for MongoDB; when set, app uses Mongo stores instead of JSON file storage

- **Mongoose models (S-081–S-083):**
  - `src/models/mongo/user-model.js`: User schema (firstName, lastName, email, password; string _id)
  - `src/models/mongo/playlist-model.js`: Playlist schema (title, userid; string _id)
  - `src/models/mongo/track-model.js`: Track schema (title, artist, duration, playlistid; string _id)

- **Mongo store implementation (S-084–S-086):**
  - `src/models/mongo/user-mongo-store.js`: UserStore API (addUser, getAllUsers, getUserById, getUserByEmail, deleteUserById, deleteAll)
  - `src/models/mongo/playlist-mongo-store.js`: PlaylistStore API; getPlaylistById includes tracks from Track collection
  - `src/models/mongo/track-mongo-store.js`: TrackStore API (addTrack, getTrackById, getTracksByPlaylistId, deleteTrack, deleteAllTracks)

- **Store selection (S-087):**
  - `db.js`: when `MONGO_URI` is set, `init()` connects to Mongo and assigns userStore, playlistStore, trackStore to Mongo stores; otherwise uses JSON stores as before

- **Mongo store unit tests (T-015):**
  - `test/mongo-stores-test.js`: User, Playlist, Track store CRUD tests; runs when `MONGO_URI` is set (e.g. `MONGO_URI=mongodb://localhost:27017/playtime_test npm test`)

- **E2E MongoDB (T-016):**
  - `test/e2e/mongodb.spec.js`: full flow (register, login, create playlist/track, logout, login, verify data); works with Mongo or JSON backend
  - Playwright `webServer.env`: passes `MONGO_URI` to server when set so E2E can run against Mongo (`MONGO_URI=mongodb://... npm run test:e2e`)

## [0.6.0] - Quality

### Added

- **Joi and signup validation (S-056–S-059):**
  - Joi: `joi` package; `server.validator(Joi)` in server.js
  - `src/models/joi-schemas.js`: UserSpec, UserCredentialsSpec, PlaylistSpec, TrackSpec
  - Signup: validate payload with UserSpec; failAction re-renders signup-view with errors and payload
  - `src/views/partials/error.hbs`: iterates errors array and shows messages (`data-testid="validation-errors"`)
  - Signup view: error partial, payload re-population (firstName, lastName, email)

- **Store robustness (S-070–S-072):**
  - user-json-store: getUserById and getUserByEmail return `?? null`; deleteUserById checks index !== -1 before splice

- **Complete validation (S-073–S-078):**
  - Login: UserCredentialsSpec, failAction re-renders login-view with errors and payload
  - Add playlist: PlaylistSpec (required title), failAction re-renders dashboard with errors and payload
  - Add track: TrackSpec (required title/artist, optional duration), failAction re-renders playlist-view with errors and payload
  - Views: login-view, dashboard-view, playlist-view include error partial; add-playlist and add-track re-populate from payload

- **E2E validation forms (T-014):**
  - `test/e2e/quality.spec.js`: invalid playlist title (empty) and invalid track input (empty title/artist) show validation errors

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

- **E2E Persistence and Validation (T-012, T-013):**
  - `test/e2e/persistence.spec.js`: create user, playlist, track via UI; assert data in `db.json`; log out, log in again; confirm playlist and track still visible (data survives)
  - Invalid login: redirect to `/login?error=invalid`; login view shows "Invalid email or password" (`data-testid="login-error"`)
  - Duplicate signup: redirect to `/signup?error=duplicate`; signup view shows "Email already registered" (`data-testid="signup-error"`)
  - `accounts-controller`: `showLogin`/`showSignup` pass `error` from query; `login` and `signup` handlers set redirect with `?error=...` on failure; signup checks existing email before add
  - Auth spec: "invalid login shows validation error" expects `/login` and error message; persistence spec: "Validation" describe with invalid login and duplicate signup tests

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
