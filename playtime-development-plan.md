# Playtime - Development Plan

**Document Type:** Phased Development Plan  
**Target Version:** 0.4.0

---

## 1. Overview

This document outlines the phased development approach for building the Playtime application. The plan is organized into five releases, each building incrementally on the previous version.

### 1.1 Release Summary

| Version | Theme       | Key Deliverables                                                                                 |
| ------- | ----------- | ------------------------------------------------------------------------------------------------ |
| 0.0.0   | Skeleton    | Minimal Node + Hapi server, Handlebars views with layout/partials, ESLint/Prettier, welcome page |
| 0.1.0   | Foundation  | Basic server, user models, sign up / log in and dashboard views                                  |
| 0.2.0   | Sessions    | User Sessions, show user name on dashboard                                                       |
| 0.3.0   | Playlists   | In memory playlists, user-playlist association                                                   |
| 0.4.0   | Tracks      | Tracks in playlists, support track and playlist delete                                           |
| 0.5.0   | Persistence | JSON storage, environment config                                                                 |
| 0.6.0   | Quality     | Joi & signup validation, testing framework, complete validation                                  |

### 1.2 Story Point Reference

| Points | Effort                 |
| ------ | ---------------------- |
| 1      | Trivial (< 1 hour)     |
| 2      | Small (1-2 hours)      |
| 3      | Medium (2-4 hours)     |
| 5      | Large (4-8 hours)      |
| 8      | Extra Large (1-2 days) |

---

## 2. Version 0.0.0 - Skeleton

**Theme:** Establish the application skeleton with a welcome page only; no authentication, models, or other features.

**Goals:**

- Set up minimal Node.js project with Hapi
- Configure Handlebars view engine with layout and partials
- Serve a single welcome page at / using views
- Establish code quality tooling (ESLint with Airbnb config, Prettier)
- Establish basic project hygiene

### 2.1 Stories

#### Epic: Project Skeleton

| ID     | Story                                                                                  | Points | Acceptance Criteria                                               |
| ------ | -------------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------- |
| S-000a | As a developer, I want a Node.js project so that I can run the application             | 2      | package.json exists with ES module support; npm start runs server |
| S-000b | As a developer, I want Hapi configured so that I can respond to HTTP requests          | 2      | Server starts on a configurable port; GET / returns a response    |
| S-000c | As a developer, I want ESLint and Prettier configured so that code quality is enforced | 2      | lint script runs without errors; Airbnb config applied            |
| S-000d | As a developer, I want .gitignore so that build artifacts are not committed            | 1      | node_modules and common artifacts excluded                        |

#### Epic: View Infrastructure

| ID     | Story                                                                            | Points | Acceptance Criteria                                                |
| ------ | -------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------ |
| S-000e | As a developer, I want Handlebars configured so that I can render HTML templates | 3      | Vision plugin registered; .hbs files render correctly              |
| S-000f | As a developer, I want a layout template so that pages share common structure    | 2      | Layout includes Bulma CSS, Font Awesome; content placeholder works |
| S-000g | As a developer, I want a brand partial so that the app identity is consistent    | 1      | Logo and "Playtime" name display on all pages                      |

#### Epic: Welcome Page

| ID     | Story                                                                     | Points | Acceptance Criteria                                                        |
| ------ | ------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------- |
| S-000h | As a visitor, I want a welcome page at / so that I see the app is running | 2      | Route / renders welcome-view.hbs using layout; shows clear welcome message |

#### Epic: E2E Smoke (Testing)

| ID   | Story                                                                               | Points | Acceptance Criteria                                                          |
| ---- | ----------------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------- |
| T-001 | As a developer, I want E2E tooling configured so that I can run browser tests       | 2      | Playwright or Cypress installed; test:e2e script; config uses test port      |
| T-002 | As a developer, I want a smoke E2E test so that the app is verified end-to-end      | 2      | test/e2e/smoke.spec.js: app starts, GET / returns 200 and welcome content    |

### 2.2 Version 0.0.0 Deliverables

```
playtime/
├── .eslintrc.json
├── .gitignore
├── .prettierrc.json
├── package.json
├── playwright.config.js (or cypress.config.js)
├── src/
│   ├── server.js
│   ├── web-routes.js
│   └── views/
│       ├── layouts/
│       │   └── layout.hbs
│       ├── partials/
│       │   └── playtime-brand.hbs
│       └── welcome-view.hbs
└── test/
    └── e2e/
        └── smoke.spec.js
```

### 2.3 Version 0.0.0 Total: ~19 Story Points

---

## 3. Version 0.1.0 - Foundation

**Theme:** Establish project foundation with basic server, models, and views.

**Goals:**

- Set up Node.js project with Hapi framework
- Implement basic MVC architecture
- Create user registration and login UI
- Establish code quality tooling

### 3.1 Stories

#### Epic: Project Setup

| ID    | Story                                                                                  | Points | Acceptance Criteria                                                  |
| ----- | -------------------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------- |
| S-001 | As a developer, I want a Node.js project structure so that I can build the application | 2      | package.json exists with ES module support; start script runs server |
| S-002 | As a developer, I want Hapi.js configured so that I can handle HTTP requests           | 3      | Server starts on configurable port; basic route returns response     |

_Note: ESLint/Prettier, .gitignore, and View Infrastructure (Handlebars, Layout, Brand partial) are now in v0.0.0._

#### Epic: User Interface - Public

| ID    | Story                                                                          | Points | Acceptance Criteria                                                                   |
| ----- | ------------------------------------------------------------------------------ | ------ | ------------------------------------------------------------------------------------- |
| S-008 | As a visitor, I want to see a home page so that I understand what the app does | 2      | Home page renders at /; shows welcome message (view infrastructure already in v0.0.0) |
| S-009 | As a visitor, I want a navigation menu so that I can access signup and login   | 2      | Welcome menu partial shows Login and Signup links                                     |
| S-010 | As a visitor, I want a signup page so that I can register an account           | 3      | Form displays with firstName, lastName, email, password fields                        |
| S-011 | As a visitor, I want a login page so that I can authenticate                   | 2      | Form displays with email and password fields                                          |

#### Epic: User Interface - Authenticated

| ID    | Story                                                                                | Points | Acceptance Criteria                                  |
| ----- | ------------------------------------------------------------------------------------ | ------ | ---------------------------------------------------- |
| S-012 | As a user, I want a dashboard page so that I can access authenticated features       | 2      | Dashboard renders at /dashboard                      |
| S-013 | As a user, I want an authenticated navigation menu so that I can navigate and logout | 2      | Menu shows Dashboard and Logout links                |

#### Epic: In-Memory Data Models

| ID    | Story                                                                                   | Points | Acceptance Criteria                                                                                         |
| ----- | --------------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------- |
| S-014 | As a developer, I want a User model so that I can store user data                       | 3      | userMemStore with addUser, getAllUsers, getUserById, getUserByEmail, deleteUserById, deleteAll              |
| S-015 | As a developer, I want a db abstraction so that I can swap store implementations        | 2      | db.js exports userStore; init() configures stores                                                           |
| S-016 | As a developer, I want UUID generation for IDs so that entities are uniquely identified | 1      | uuid package installed; \_id generated on create                                                            |

#### Epic: Controllers - Basic

| ID    | Story                                                                | Points | Acceptance Criteria                                                      |
| ----- | -------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------ |
| S-017 | As a visitor, I can submit signup form so that my account is created | 3      | POST /register creates user; redirects to home                           |
| S-018 | As a visitor, I can submit login form so that I am authenticated     | 3      | POST /authenticate validates credentials; redirects to dashboard or home |
| S-019 | As a user, I can logout so that my session ends                      | 1      | GET /logout redirects to home                                            |

#### Epic: E2E Auth (Testing)

| ID   | Story                                                                                    | Points | Acceptance Criteria                                                                 |
| ---- | ---------------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------- |
| T-003 | As a developer, I want E2E auth flow tests so that signup/login/dashboard are verified   | 3      | test/e2e/auth.spec.js: register user, login, see dashboard; logout; optional invalid login |

#### Epic: Unit Testing – Framework and User Store (Testing)

| ID   | Story                                                                                    | Points | Acceptance Criteria                                                                 |
| ---- | ---------------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------- |
| T-004 | As a developer, I want Mocha and Chai configured so that I can write unit tests         | 2      | mocha, chai installed; npm test script; test/ directory                             |
| T-005 | As a developer, I want test fixtures so that test data is reusable                      | 2      | test/fixtures.js exports test user(s) for unit and E2E                               |
| T-006 | As a developer, I want User store unit tests so that addUser/getUser/delete are verified | 3      | test/users-model-test.js: create user, getById, getByEmail, deleteAll, deleteById   |

### 3.2 Version 0.1.0 Deliverables

```
playtime/
├── .eslintrc.json (from v0.0.0)
├── .gitignore (from v0.0.0)
├── .prettierrc.json (from v0.0.0)
├── CHANGELOG.md
├── package.json (from v0.0.0)
├── src/
│   ├── server.js (from v0.0.0)
│   ├── web-routes.js (from v0.0.0)
│   ├── controllers/
│   │   ├── accounts-controller.js
│   │   └── dashboard-controller.js
│   ├── models/
│   │   ├── db.js
│   │   └── mem/
│   │       └── user-mem-store.js
│   └── views/
│       ├── layouts/
│       │   └── layout.hbs (from v0.0.0)
│       ├── partials/
│       │   ├── playtime-brand.hbs (from v0.0.0)
│       │   ├── welcome-menu.hbs
│       │   └── menu.hbs
│       ├── welcome-view.hbs (from v0.0.0)
│       ├── signup-view.hbs
│       ├── login-view.hbs
│       └── dashboard-view.hbs
└── test/
    ├── fixtures.js
    ├── users-model-test.js
    └── e2e/
        └── auth.spec.js
```

### 3.3 Version 0.1.0 Total: ~34 Story Points

---

## 4. Version 0.2.0 - Sessions

**Theme:** User Sessions, show user name on dashboard.

**Goals:**

- Implement cookie-based sessions
- Show user name on dashboard

### 4.1 Stories

#### Epic: Session Management

| ID    | Story                                                                                        | Points | Acceptance Criteria                                                    |
| ----- | -------------------------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------- |
| S-020 | As a developer, I want @hapi/cookie configured so that sessions are maintained               | 3      | Cookie plugin registered; session strategy defined                     |
| S-021 | As a developer, I want session validation so that invalid sessions are rejected              | 3      | validate function checks user exists; returns isValid and credentials  |
| S-022 | As a user, when I login, a session cookie is created so that I stay logged in                | 2      | cookieAuth.set() called on successful login with user ID               |
| S-023 | As a user, when I logout, my session is cleared so that I must login again                   | 1      | Cookie cleared on logout                                               |
| S-024 | As a developer, I want routes protected by default so that unauthenticated access is blocked | 2      | Default auth strategy applied; public routes explicitly set auth:false |

#### Epic: Show User Name on Dashboard

| ID    | Story                                                                              | Points | Acceptance Criteria                                          |
| ----- | ---------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------ |
| S-025 | As a user, I want to see my name on the dashboard so that I know I'm logged in     | 2      | Dashboard displays user's firstName or full name from session |

#### Epic: E2E Sessions (Testing)

| ID   | Story                                                                                          | Points | Acceptance Criteria                                                                 |
| ---- | ---------------------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------- |
| T-007 | As a developer, I want E2E session tests so that session persistence and user name are verified | 3      | test/e2e/auth.spec.js: login, reload dashboard still authenticated; logout, reload to /; dashboard shows user name |

### 4.2 Version 0.2.0 New Deliverables

```
Modified:
~ src/server.js (cookie auth)
~ src/controllers/accounts-controller.js (session handling)
~ src/controllers/dashboard-controller.js (show user name)
~ src/views/partials/menu.hbs (user name display)
~ src/views/dashboard-view.hbs (user name display)
~ src/web-routes.js (session routes)
~ test/e2e/auth.spec.js (session and user name assertions)
```

### 4.3 Version 0.2.0 Total: ~16 Story Points

---

## 5. Version 0.3.0 - Playlists

**Theme:** In memory playlists, user-playlist association.

**Goals:**

- Create in-memory playlist model
- Associate playlists with users
- Filter playlists by user
- Create playlist listing UI
- Enable playlist creation

### 5.1 Stories

#### Epic: Playlist Model

| ID    | Story                                                                                   | Points | Acceptance Criteria                                                                                         |
| ----- | --------------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------- |
| S-026 | As a developer, I want a Playlist model so that I can store playlist data               | 3      | playlistMemStore with addPlaylist, getAllPlaylists, getPlaylistById, deletePlaylistById, deleteAllPlaylists |
| S-027 | As a developer, I want a db abstraction so that I can swap store implementations        | 2      | db.js exports playlistStore; init() configures stores                                                        |

#### Epic: User-Playlist Association

| ID    | Story                                                                                | Points | Acceptance Criteria                                                         |
| ----- | ------------------------------------------------------------------------------------ | ------ | --------------------------------------------------------------------------- |
| S-028 | As a developer, I want playlists to have a userid field so that ownership is tracked | 2      | Playlist model includes userid; set on creation                             |
| S-029 | As a user, I want to see only my playlists so that my data is private                | 2      | getUserPlaylists(userid) filters by owner; dashboard uses logged-in user ID |
| S-030 | As a user, when I create a playlist, it is associated with my account                | 2      | addPlaylist handler sets userid from request.auth.credentials               |

#### Epic: Playlist UI

| ID    | Story                                                                                | Points | Acceptance Criteria                                  |
| ----- | ------------------------------------------------------------------------------------ | ------ | ---------------------------------------------------- |
| S-031 | As a user, I want a dashboard page so that I can see my playlists                    | 3      | Dashboard renders at /dashboard; shows playlist list |
| S-032 | As a user, I want to see a list of playlists so that I know what exists              | 2      | Playlist titles display in cards/boxes               |
| S-033 | As a user, I want a form to add playlists so that I can create new ones              | 2      | Form with title field and submit button              |
| S-034 | As a user, I can add a playlist so that it appears on my dashboard                   | 3      | POST /dashboard/addplaylist creates playlist; redirects to dashboard     |

#### Epic: E2E Playlists (Testing)

| ID   | Story                                                                                          | Points | Acceptance Criteria                                                                 |
| ---- | ---------------------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------- |
| T-008 | As a developer, I want E2E playlist tests so that CRUD and ownership are verified             | 3      | test/e2e/playlists.spec.js: create playlist, see in list; open (empty); delete; second user sees only own playlists |

#### Epic: Playlist Store Unit Tests (Testing)

| ID   | Story                                                                                    | Points | Acceptance Criteria                                                                 |
| ---- | ---------------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------- |
| T-009 | As a developer, I want Playlist store unit tests so that CRUD and getUserPlaylists are verified | 3      | test/playlist-model-test.js: addPlaylist, getPlaylistById, getUserPlaylists, deletePlaylistById, deleteAll |

### 5.2 Version 0.3.0 New Deliverables

```
+ src/models/mem/playlist-mem-store.js
+ src/views/partials/list-playlists.hbs
+ src/views/partials/add-playlist.hbs

Modified:
~ src/models/db.js (playlistStore)
~ src/controllers/dashboard-controller.js (playlist listing, user filtering, addPlaylist handler)
~ src/views/dashboard-view.hbs (playlist list)
~ src/web-routes.js (playlist routes)
+ test/e2e/playlists.spec.js
+ test/playlist-model-test.js
```

### 5.3 Version 0.3.0 Total: ~25 Story Points

---

## 6. Version 0.4.0 - Tracks

**Theme:** Tracks in playlists, support track and playlist delete.

**Goals:**

- Add track data model
- Create playlist detail view with tracks
- Enable track and playlist deletion

### 6.1 Stories

#### Epic: Track Model

| ID    | Story                                                                                        | Points | Acceptance Criteria                                                                                          |
| ----- | -------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------ |
| S-035 | As a developer, I want a Track model so that I can store track data                          | 3      | trackMemStore with addTrack, getAllTracks, getTrackById, getTracksByPlaylistId, deleteTrack, deleteAllTracks |
| S-036 | As a developer, I want tracks linked to playlists so that playlist content is organized      | 2      | Track has playlistid field; addTrack takes playlistId parameter                                              |
| S-037 | As a developer, I want getPlaylistById to include tracks so that playlist detail is complete | 2      | getPlaylistById populates tracks[] array from trackStore                                                     |

#### Epic: Playlist Detail View

| ID    | Story                                                                             | Points | Acceptance Criteria                                                    |
| ----- | --------------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------- |
| S-038 | As a user, I want to view a playlist's details so that I can see its tracks       | 3      | GET /playlist/{id} renders playlist-view with title and tracks         |
| S-039 | As a user, I want to see tracks in a table so that information is clear           | 2      | list-tracks partial renders table with title, artist, duration columns |
| S-040 | As a user, I want a form to add tracks so that I can build my playlist            | 2      | add-track partial with title, artist, duration fields                  |
| S-041 | As a user, I can add a track to a playlist so that it appears in the list         | 3      | POST /playlist/{id}/addtrack creates track; redirects to playlist view |
| S-042 | As a user, I want a link from playlist card to detail view so that I can navigate | 1      | Folder icon link on playlist card opens /playlist/{id}                 |

#### Epic: Delete Operations

| ID    | Story                                                                        | Points | Acceptance Criteria                                                           |
| ----- | ---------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------- |
| S-043 | As a user, I want to delete a playlist so that I can remove unwanted ones    | 3      | GET /dashboard/deleteplaylist/{id} removes playlist; redirects to dashboard   |
| S-044 | As a user, I want a delete button on playlist cards so that deletion is easy | 1      | Trash icon link on each playlist card                                         |
| S-045 | As a user, I want to delete a track so that I can remove unwanted ones       | 3      | GET /playlist/{id}/deletetrack/{trackid} removes track; redirects to playlist |
| S-046 | As a user, I want a delete button on track rows so that deletion is easy     | 1      | Trash icon link on each track row                                             |

#### Epic: E2E Tracks (Testing)

| ID   | Story                                                                                    | Points | Acceptance Criteria                                                                 |
| ---- | ---------------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------- |
| T-010 | As a developer, I want E2E track tests so that track CRUD and navigation are verified    | 3      | test/e2e/tracks.spec.js: add track to playlist, see in list; delete track; delete playlist with tracks; dashboard → detail → back |

#### Epic: Track Store Unit Tests (Testing)

| ID   | Story                                                                                    | Points | Acceptance Criteria                                                                 |
| ---- | ---------------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------- |
| T-011 | As a developer, I want Track store unit tests so that CRUD and getTracksByPlaylistId are verified | 3      | test/track-model-test.js: addTrack, getTrackById, getTracksByPlaylistId, deleteTrack, deleteAllTracks |

### 6.2 Version 0.4.0 New Deliverables

```
+ src/controllers/playlist-controller.js
+ src/models/mem/track-mem-store.js
+ src/views/playlist-view.hbs
+ src/views/partials/list-tracks.hbs
+ src/views/partials/add-track.hbs

Modified:
~ src/models/db.js (trackStore)
~ src/controllers/dashboard-controller.js (deletePlaylist handler)
~ src/controllers/playlist-controller.js (deleteTrack handler)
~ src/views/partials/list-playlists.hbs (detail link, delete button)
~ src/views/partials/list-tracks.hbs (delete button)
~ src/web-routes.js (playlist routes, delete routes)
+ test/e2e/tracks.spec.js
+ test/track-model-test.js
```

### 6.3 Version 0.4.0 Total: ~30 Story Points

---

## 7. Version 0.5.0 - Persistence

**Theme:** JSON storage, environment config.

**Goals:**

- Implement JSON file-based storage
- Externalize secrets to environment variables

### 7.1 Stories

#### Epic: Environment Configuration

| ID    | Story                                                                          | Points | Acceptance Criteria                                           |
| ----- | ------------------------------------------------------------------------------ | ------ | ------------------------------------------------------------- |
| S-047 | As a developer, I want dotenv configured so that secrets are externalized      | 2      | dotenv package installed; process.env values loaded from .env |
| S-048 | As a developer, I want cookie settings in .env so that secrets are not in code | 2      | cookie_name and cookie_password read from environment         |
| S-049 | As a developer, I want a .env_example file so that setup is documented         | 1      | Template file with placeholder values committed               |
| S-050 | As a developer, I want .env in .gitignore so that secrets are not committed    | 1      | .env excluded from git                                        |

#### Epic: JSON File Storage

| ID    | Story                                                                            | Points | Acceptance Criteria                                                      |
| ----- | -------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------ |
| S-051 | As a developer, I want LowDB configured so that data persists to JSON            | 3      | lowdb package installed; store-utils.js configures JSONFilePreset        |
| S-052 | As a developer, I want a user JSON store so that users persist across restarts   | 3      | user-json-store.js implements UserStore interface with db.read()/write() |
| S-053 | As a developer, I want a playlist JSON store so that playlists persist           | 3      | playlist-json-store.js implements PlaylistStore interface                |
| S-054 | As a developer, I want a track JSON store so that tracks persist                 | 3      | track-json-store.js implements TrackStore interface                      |
| S-055 | As a developer, I want db.js to use JSON stores by default so that data persists | 1      | db.init() assigns JSON stores to userStore, playlistStore, trackStore    |

#### Epic: E2E Persistence and Validation (Testing)

| ID   | Story                                                                                          | Points | Acceptance Criteria                                                                 |
| ---- | ---------------------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------- |
| T-012 | As a developer, I want E2E persistence tests so that data survives server restart            | 2      | test/e2e/persistence.spec.js: create user/playlist/track, restart server, login and confirm data present |
| T-013 | As a developer, I want E2E validation tests for signup/login so that error messages are shown | 2      | test/e2e/persistence.spec.js (or auth): invalid signup and invalid login show validation errors |

### 7.2 Version 0.5.0 New Deliverables

```
+ .env_example
+ src/models/json/
    + db.json
    + store-utils.js
    + user-json-store.js
    + playlist-json-store.js
    + track-json-store.js

Modified:
~ .gitignore (.env added)
~ package.json (dotenv, lowdb)
~ src/server.js (dotenv, env-based cookie config)
~ src/models/db.js (JSON store imports)
+ test/e2e/persistence.spec.js
```

### 7.3 Version 0.5.0 Total: ~21 Story Points

---

## 8. Version 0.6.0 - Quality

**Theme:** Testing framework, Joi validation, complete validation.

**Goals:**

- Set up Mocha and Chai testing framework
- Create test fixtures
- Implement user model tests
- Configure Joi and add signup validation (UserSpec, error partial)
- Add validation to all remaining forms
- Improve store robustness

### 8.1 Stories

#### Epic: Joi and Signup Validation

| ID    | Story                                                                                  | Points | Acceptance Criteria                                                     |
| ----- | -------------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------- |
| S-056 | As a developer, I want Joi configured as server validator so that schemas work         | 2      | Joi package installed; server.validator(Joi) called                     |
| S-057 | As a developer, I want a UserSpec schema so that signup input is validated             | 2      | joi-schemas.js exports UserSpec with required fields                   |
| S-058 | As a visitor, I want validation errors on signup so that I can fix mistakes            | 3      | failAction re-renders form with errors; error partial displays messages |
| S-059 | As a developer, I want an error partial so that validation errors display consistently | 2      | error.hbs iterates errors array and shows messages                     |

#### Epic: Testing Infrastructure

| ID    | Story                                                                         | Points | Acceptance Criteria                                 |
| ----- | ----------------------------------------------------------------------------- | ------ | --------------------------------------------------- |
| S-060 | As a developer, I want Mocha and Chai configured so that I can write tests    | 2      | Packages installed; npm test script defined         |
| S-061 | As a developer, I want test fixtures so that test data is reusable            | 2      | fixtures.js exports maggie user and testUsers array |
| S-062 | As a developer, I want a test directory structure so that tests are organized | 1      | test/ directory with fixtures and test files        |

#### Epic: User Model Tests

| ID    | Story                                                                                  | Points | Acceptance Criteria                                             |
| ----- | -------------------------------------------------------------------------------------- | ------ | --------------------------------------------------------------- |
| S-063 | As a developer, I want a test for user creation so that addUser is verified            | 2      | Test creates user and asserts returned object matches           |
| S-064 | As a developer, I want a test for delete all users so that deleteAll is verified       | 2      | Test verifies count goes to 0 after deleteAll                   |
| S-065 | As a developer, I want tests for getting users so that retrieval is verified           | 3      | Tests verify getUserById and getUserByEmail return correct user |
| S-066 | As a developer, I want a test for deleting one user so that deleteUserById is verified | 2      | Test verifies count decreases and user not found after delete   |
| S-067 | As a developer, I want tests for not-found cases so that null is returned correctly    | 2      | Tests verify null for non-existent ID and email                 |
| S-068 | As a developer, I want tests for bad parameters so that edge cases are handled         | 2      | Tests verify null for empty string and undefined params         |
| S-069 | As a developer, I want a test for failed delete so that invalid ID is handled          | 2      | Test verifies count unchanged after delete with bad ID          |

#### Epic: Store Robustness

| ID    | Story                                                                                                         | Points | Acceptance Criteria                              |
| ----- | ------------------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------ |
| S-070 | As a developer, I want getUserById to return null (not undefined) when not found                              | 2      | JSON store checks for undefined and returns null |
| S-071 | As a developer, I want getUserByEmail to return null (not undefined) when not found                           | 1      | JSON store checks for undefined and returns null |
| S-072 | As a developer, I want deleteUserById to check index before splice so that invalid deletes don't corrupt data | 2      | Check index !== -1 before splice                 |

#### Epic: Complete Validation

| ID    | Story                                                                                | Points | Acceptance Criteria                                    |
| ----- | ------------------------------------------------------------------------------------ | ------ | ------------------------------------------------------ |
| S-073 | As a developer, I want a UserCredentialsSpec schema so that login is validated       | 2      | Schema with required email (valid format) and password |
| S-074 | As a visitor, I want validation errors on login so that I can fix mistakes           | 2      | failAction on login route shows errors                 |
| S-075 | As a developer, I want a PlaylistSpec schema so that playlist creation is validated  | 1      | Schema with required title                             |
| S-076 | As a user, I want validation errors when adding playlists so that I can fix mistakes | 2      | failAction on addPlaylist route shows errors           |
| S-077 | As a developer, I want a TrackSpec schema so that track creation is validated        | 2      | Schema with required title/artist, optional duration   |
| S-078 | As a user, I want validation errors when adding tracks so that I can fix mistakes    | 2      | failAction on addTrack route shows errors              |

#### Epic: E2E Validation Forms (Testing)

| ID   | Story                                                                                          | Points | Acceptance Criteria                                                                 |
| ---- | ---------------------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------- |
| T-014 | As a developer, I want E2E validation tests for playlist and track forms so that errors are shown | 2      | test/e2e/quality.spec.js: invalid playlist title and invalid track input show validation errors |

### 8.2 Version 0.6.0 New Deliverables

```
+ src/models/joi-schemas.js
+ src/views/partials/error.hbs
+ test/
    + fixtures.js
    + users-model-test.js
    + e2e/
        + quality.spec.js

Modified:
~ package.json (joi, mocha, chai, test script)
~ src/server.js (Joi validator)
~ src/web-routes.js (signup validation: UserSpec, failAction)
~ src/views/signup-view.hbs (error partial, payload re-population)
~ src/models/joi-schemas.js (UserCredentialsSpec, PlaylistSpec, TrackSpec)
~ src/models/json/user-json-store.js (null returns, safe delete)
~ src/controllers/accounts-controller.js (login validation)
~ src/controllers/dashboard-controller.js (playlist validation)
~ src/controllers/playlist-controller.js (track validation)
```

### 8.3 Version 0.6.0 Total: ~47 Story Points

---

## 9. Summary

### 7.1 Total Effort

| Version   | Stories | Points   |
| --------- | ------- | -------- |
| 0.0.0     | 10      | ~19      |
| 0.1.0     | 14      | ~34      |
| 0.2.0     | 7       | ~16      |
| 0.3.0     | 11      | ~25      |
| 0.4.0     | 14      | ~30      |
| 0.5.0     | 11      | ~21      |
| 0.6.0     | 24      | ~47      |
| **Total** | **91**  | **~192** |

### 7.2 Feature Progression

```
v0.0.0: [Skeleton] [Handlebars] [Layout/Partials] [ESLint/Prettier] [Welcome Page] [E2E Smoke]
           │
           ▼
v0.1.0: [User Model] [Controllers] [Auth UI] [E2E Auth] [Unit Framework + User Store Tests]
           │
           ▼
v0.2.0: [Sessions] [Show User Name] [E2E Sessions]
           │
           ▼
v0.3.0: [User-Playlist Association] [In-Memory Playlists] [E2E Playlists] [Playlist Store Tests]
           │
           ▼
v0.4.0: [Track Model] [Playlist Detail] [Delete Operations] [E2E Tracks] [Track Store Tests]
           │
           ▼
v0.5.0: [JSON Storage] [Environment Config] [E2E Persistence & Validation]
           │
           ▼
v0.6.0: [Joi & Signup Validation] [Testing Framework] [Complete Validation] [Store Robustness] [E2E Validation Forms]
```

### 7.3 Risk Mitigation

| Risk                     | Mitigation                                                    |
| ------------------------ | ------------------------------------------------------------- |
| Data loss (v0.1.0-0.4.0) | Memory stores acceptable for dev; JSON storage in v0.5.0      |
| Security gaps            | Plain text passwords documented; HTTPS/hashing as future work |
| Incomplete validation    | Progressive validation: Joi and signup in v0.6.0, all forms in v0.6.0 |
| No tests early           | E2E smoke in v0.0.0; unit framework and User store tests in v0.1.0; tests grow with each version |

### 7.4 Definition of Done

A story is complete when:

- Code implements acceptance criteria
- Code passes ESLint without errors
- Code is formatted with Prettier
- Feature is manually tested
- Unit and E2E tests pass (per-version; see §2–§8 testing epics)
- Changes are committed with descriptive message

---

## Appendix A: Story Index by Epic

### Project Skeleton

S-000a, S-000b, S-000c, S-000d

### View Infrastructure

S-000e, S-000f, S-000g

### Welcome Page

S-000h

### E2E Smoke (Testing)

T-001, T-002

### Project Setup

S-001, S-002

_Note: ESLint/Prettier, .gitignore, and View Infrastructure (Handlebars, Layout, Brand partial) moved from v0.1.0 to v0.0.0._

### User Interface - Public

S-008, S-009, S-010, S-011

### User Interface - Authenticated

S-012, S-013, S-014, S-015

### In-Memory Data Models

S-016, S-017, S-018, S-019

### Controllers - Basic

S-017, S-018, S-019

### E2E Auth (Testing)

T-003

### Unit Testing – Framework and User Store (Testing)

T-004, T-005, T-006

### Session Management

S-020, S-021, S-022, S-023, S-024

### Show User Name on Dashboard

S-025

### E2E Sessions (Testing)

T-007

### Playlist Model

S-026, S-027

### User-Playlist Association

S-028, S-029, S-030

### Playlist UI

S-031, S-032, S-033, S-034

### E2E Playlists (Testing)

T-008

### Playlist Store Unit Tests (Testing)

T-009

### Track Model

S-035, S-036, S-037

### Playlist Detail View

S-038, S-039, S-040, S-041, S-042

### Delete Operations

S-043, S-044, S-045, S-046

### E2E Tracks (Testing)

T-010

### Track Store Unit Tests (Testing)

T-011

### Environment Configuration

S-047, S-048, S-049, S-050

### JSON File Storage

S-051, S-052, S-053, S-054, S-055

### E2E Persistence and Validation (Testing)

T-012, T-013

### Testing Infrastructure

S-060, S-061, S-062

### User Model Tests

S-063, S-064, S-065, S-066, S-067, S-068, S-069

### Store Robustness

S-070, S-071, S-072

### Joi and Signup Validation (0.6.0)

S-056, S-057, S-058, S-059

### Complete Validation

S-073, S-074, S-075, S-076, S-077, S-078

### E2E Validation Forms (Testing)

T-014
