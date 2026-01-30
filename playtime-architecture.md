# Playtime - Architecture Specification

**Document Type:** Target Architecture Specification  
**Target Version:** 0.4.0

---

## 1. Executive Summary

Playtime is a web application for managing music playlists. The application enables users to register accounts, authenticate, and manage personal collections of playlists containing music tracks.

This document defines the target architecture that development should work towards. It serves as the definitive reference for system design decisions.

---

## 2. System Overview

### 2.1 Purpose

Provide a simple, intuitive web interface for users to organize their music into playlists.

### 2.2 Key Capabilities

- User account management (registration, authentication, sessions)
- Personal playlist management (create, view, delete)
- Track management within playlists (add, view, delete)
- Persistent data storage
- Input validation on all forms
- Automated testing infrastructure

### 2.3 System Context

```
┌─────────────────────────────────────────────────────────────┐
│                        User (Browser)                        │
└─────────────────────────────┬───────────────────────────────┘
                              │ HTTP/HTTPS
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Playtime Application                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Controllers │──│    Views    │  │   Session (Cookie)  │  │
│  └──────┬──────┘  └─────────────┘  └─────────────────────┘  │
│         │                                                    │
│  ┌──────▼──────┐                                            │
│  │   Models    │                                            │
│  └──────┬──────┘                                            │
│         │                                                    │
│  ┌──────▼──────┐                                            │
│  │ Data Store  │                                            │
│  └──────┬──────┘                                            │
└─────────┼───────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────┐
│   db.json       │
│  (File System)  │
└─────────────────┘
```

---

## 3. Architectural Principles

### 3.1 Design Principles

| Principle | Description |
|-----------|-------------|
| Separation of Concerns | MVC pattern separates data, presentation, and control logic |
| Single Responsibility | Each module has one clear purpose |
| Dependency Inversion | Controllers depend on store abstractions, not implementations |
| Convention over Configuration | Predictable file locations and naming |
| Fail Fast | Validate inputs early, return clear errors |

### 3.2 Technology Choices

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Runtime | Node.js (ES Modules) | Modern JavaScript, async/await support |
| Framework | Hapi.js | Enterprise-grade, plugin architecture |
| Templates | Handlebars | Simple, logic-less templates |
| Styling | Bulma CSS | Modern, responsive, no JavaScript required |
| Storage | LowDB (JSON file) | Simple persistence, no database setup |
| Validation | Joi | Schema-based, integrates with Hapi |
| Testing | Mocha + Chai | Industry standard, TDD support |

---

## 4. Data Architecture

### 4.1 Domain Model

```
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│     User     │       │   Playlist   │       │    Track     │
├──────────────┤       ├──────────────┤       ├──────────────┤
│ _id (PK)     │──┐    │ _id (PK)     │──┐    │ _id (PK)     │
│ firstName    │  │    │ userid (FK)  │◀─┘    │ playlistid(FK)│◀─┘
│ lastName     │  └───▶│ title        │       │ title        │
│ email (UK)   │       │              │       │ artist       │
│ password     │       └──────────────┘       │ duration     │
└──────────────┘            1:N               └──────────────┘
                                                   1:N

PK = Primary Key, FK = Foreign Key, UK = Unique Key
```

### 4.2 Entity Specifications

**User**
| Field | Type | Constraints |
|-------|------|-------------|
| _id | string | Primary key, UUID v4, auto-generated |
| firstName | string | Required |
| lastName | string | Required |
| email | string | Required, valid email format, unique |
| password | string | Required |

**Playlist**
| Field | Type | Constraints |
|-------|------|-------------|
| _id | string | Primary key, UUID v4, auto-generated |
| userid | string | Foreign key → User._id |
| title | string | Required |

**Track**
| Field | Type | Constraints |
|-------|------|-------------|
| _id | string | Primary key, UUID v4, auto-generated |
| playlistid | string | Foreign key → Playlist._id |
| title | string | Required |
| artist | string | Required |
| duration | number | Optional |

### 4.3 Data Store Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      db.js                               │
│                  (Store Abstraction)                     │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │
│  │ userStore   │ │playlistStore│ │ trackStore  │       │
│  └──────┬──────┘ └──────┬──────┘ └──────┬──────┘       │
└─────────┼───────────────┼───────────────┼───────────────┘
          │               │               │
          ▼               ▼               ▼
┌─────────────────────────────────────────────────────────┐
│              Store Implementation Layer                  │
│  ┌─────────────────────┐    ┌─────────────────────┐    │
│  │    JSON Stores      │    │   Memory Stores     │    │
│  │  (json/*.js)        │    │   (mem/*.js)        │    │
│  │                     │    │                     │    │
│  │  • Persistent       │    │  • Volatile         │    │
│  │  • File-based       │    │  • Fast             │    │
│  │  • Production use   │    │  • Testing use      │    │
│  └──────────┬──────────┘    └─────────────────────┘    │
└─────────────┼───────────────────────────────────────────┘
              ▼
       ┌─────────────┐
       │  db.json    │
       └─────────────┘
```

### 4.4 Store Interface Contracts

```javascript
// UserStore
getAllUsers()         → User[]
addUser(user)         → User
getUserById(id)       → User | null
getUserByEmail(email) → User | null
deleteUserById(id)    → void
deleteAll()           → void

// PlaylistStore
getAllPlaylists()        → Playlist[]
addPlaylist(playlist)    → Playlist
getPlaylistById(id)      → Playlist  // includes tracks[]
getUserPlaylists(userid) → Playlist[]
deletePlaylistById(id)   → void
deleteAllPlaylists()     → void

// TrackStore
getAllTracks()                   → Track[]
addTrack(playlistId, track)      → Track
getTrackById(id)                 → Track | null
getTracksByPlaylistId(id)        → Track[]
deleteTrack(id)                  → void
deleteAllTracks()                → void
updateTrack(track, updatedTrack) → void
```

---

## 5. Application Architecture

### 5.1 Layer Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Presentation Layer                    │
│  ┌─────────────────────────────────────────────────┐   │
│  │                    Views                         │   │
│  │  • Handlebars templates (.hbs)                  │   │
│  │  • Layouts, Partials, Pages                     │   │
│  │  • Bulma CSS styling                            │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    Controller Layer                      │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │
│  │  Accounts   │ │  Dashboard  │ │  Playlist   │       │
│  │ Controller  │ │ Controller  │ │ Controller  │       │
│  └─────────────┘ └─────────────┘ └─────────────┘       │
│  ┌─────────────┐                                        │
│  │   About     │  • Route handlers                      │
│  │ Controller  │  • Request validation                  │
│  └─────────────┘  • Response generation                 │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                     Model Layer                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Joi Validation Schemas              │   │
│  │  • UserSpec, UserCredentialsSpec                │   │
│  │  • PlaylistSpec, TrackSpec                      │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Data Store Abstraction              │   │
│  │  • db.js (store factory)                        │   │
│  │  • JSON stores (persistent)                     │   │
│  │  • Memory stores (volatile)                     │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### 5.2 Request Flow

```
Browser Request
      │
      ▼
┌─────────────┐
│   Hapi.js   │──── Cookie Authentication
│   Server    │──── Session Validation
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Router    │──── Route Matching
│             │──── Joi Payload Validation
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Controller  │──── Business Logic
│   Handler   │──── Data Store Calls
└──────┬──────┘
       │
       ▼
┌─────────────┐
│    View     │──── Template Rendering
│  (or Redirect)
└──────┬──────┘
       │
       ▼
Browser Response
```

### 5.3 Authentication Architecture

```
┌──────────────────────────────────────────────────────────┐
│                  Authentication Flow                      │
└──────────────────────────────────────────────────────────┘

Login:
┌────────┐    POST /authenticate    ┌────────────┐
│ Browser │ ──────────────────────▶ │ Controller │
└────────┘  {email, password}       └─────┬──────┘
                                          │
                                          ▼
                                    ┌────────────┐
                                    │ UserStore  │
                                    │ .getUserBy │
                                    │  Email()   │
                                    └─────┬──────┘
                                          │
                              ┌───────────┴───────────┐
                              ▼                       ▼
                        [Match Found]           [No Match]
                              │                       │
                              ▼                       ▼
                    Set Cookie {id: user._id}   Redirect /
                              │
                              ▼
                       Redirect /dashboard

Session Validation (each protected request):
┌────────┐    Request + Cookie    ┌─────────────────┐
│ Browser │ ────────────────────▶ │ Hapi Auth       │
└────────┘                        │ Strategy        │
                                  └────────┬────────┘
                                           │
                                           ▼
                                  ┌─────────────────┐
                                  │ accounts        │
                                  │ Controller      │
                                  │ .validate()     │
                                  └────────┬────────┘
                                           │
                                           ▼
                                  ┌─────────────────┐
                                  │ UserStore       │
                                  │ .getUserById()  │
                                  └────────┬────────┘
                                           │
                               ┌───────────┴───────────┐
                               ▼                       ▼
                         [User Found]            [Not Found]
                               │                       │
                               ▼                       ▼
                    {isValid: true,           {isValid: false}
                     credentials: user}              │
                               │                      ▼
                               ▼               Redirect /
                    Continue to handler
```

---

## 6. Interface Specifications

### 6.1 Route Definitions

| Method | Path | Auth | Validation | Handler |
|--------|------|------|------------|---------|
| GET | `/` | No | - | accounts.index |
| GET | `/signup` | No | - | accounts.showSignup |
| POST | `/register` | No | UserSpec | accounts.signup |
| GET | `/login` | No | - | accounts.showLogin |
| POST | `/authenticate` | No | UserCredentialsSpec | accounts.login |
| GET | `/logout` | Yes | - | accounts.logout |
| GET | `/about` | Yes | - | about.index |
| GET | `/dashboard` | Yes | - | dashboard.index |
| POST | `/dashboard/addplaylist` | Yes | PlaylistSpec | dashboard.addPlaylist |
| GET | `/dashboard/deleteplaylist/{id}` | Yes | - | dashboard.deletePlaylist |
| GET | `/playlist/{id}` | Yes | - | playlist.index |
| POST | `/playlist/{id}/addtrack` | Yes | TrackSpec | playlist.addTrack |
| GET | `/playlist/{id}/deletetrack/{trackid}` | Yes | - | playlist.deleteTrack |

### 6.2 Validation Schemas

```javascript
// User Registration
UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}

// User Login
UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}

// Playlist Creation
PlaylistSpec = {
  title: Joi.string().required(),
}

// Track Creation
TrackSpec = {
  title: Joi.string().required(),
  artist: Joi.string().required(),
  duration: Joi.number().allow("").optional(),
}
```

### 6.3 View Templates

| View | Template | Layout | Purpose |
|------|----------|--------|---------|
| Home | main.hbs | layout.hbs | Landing page |
| Signup | signup-view.hbs | layout.hbs | Registration form |
| Login | login-view.hbs | layout.hbs | Authentication form |
| Dashboard | dashboard-view.hbs | layout.hbs | Playlist management |
| Playlist | playlist-view.hbs | layout.hbs | Track management |
| About | about-view.hbs | layout.hbs | App information |

| Partial | Purpose |
|---------|---------|
| playtime-brand.hbs | Logo and app name |
| welcome-menu.hbs | Unauthenticated navigation |
| menu.hbs | Authenticated navigation |
| list-playlists.hbs | Playlist listing with actions |
| add-playlist.hbs | Playlist creation form |
| list-tracks.hbs | Track listing with actions |
| add-track.hbs | Track creation form |
| error.hbs | Validation error display |

---

## 7. Configuration

### 7.1 Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `cookie_name` | Yes | - | Session cookie identifier |
| `cookie_password` | Yes | - | Cookie encryption key (32+ chars) |
| `PORT` | No | 3000 | HTTP server port |

### 7.2 Server Configuration

```javascript
// Cookie Authentication
server.auth.strategy("session", "cookie", {
  cookie: {
    name: process.env.cookie_name,
    password: process.env.cookie_password,
    isSecure: false,  // Set true in production with HTTPS
  },
  redirectTo: "/",
  validate: accountsController.validate,
});
server.auth.default("session");

// View Engine
server.views({
  engines: { hbs: Handlebars },
  relativeTo: __dirname,
  path: "./views",
  layoutPath: "./views/layouts",
  partialsPath: "./views/partials",
  layout: true,
  isCached: false,  // Set true in production
});
```

---

## 8. Testing Architecture

### 8.1 Test Structure

```
test/
├── fixtures.js           # Shared test data (unit + E2E)
├── e2e/                  # End-to-end tests (§8.4)
│   ├── fixtures.js
│   └── *.spec.js
└── *-test.js             # Unit / model tests (e.g. users-model-test.js)
```

### 8.2 Test Configuration

- **Framework:** Mocha
- **Assertions:** Chai
- **Style:** TDD (suite/test)
- **Command:** `mocha --ui tdd test/**.js -exit`

### 8.3 Test Coverage Goals

| Component | Coverage |
|-----------|----------|
| User Store | Full CRUD + edge cases |
| Playlist Store | Full CRUD + edge cases |
| Track Store | Full CRUD + edge cases |
| Controllers | Handler logic |
| Integration | End-to-end flows |

### 8.4 End-to-End Testing Strategy

End-to-end (E2E) tests exercise the application through the browser and HTTP stack as a real user would. This strategy is designed to roll out incrementally with each version, improve robustness, and provide a safety net when introducing new features.

#### 8.4.1 Objectives

| Objective | Description |
|-----------|-------------|
| **Regression safety** | Catch breakage of existing flows before release |
| **Feature confidence** | Verify new behaviour in a realistic environment |
| **Documentation** | E2E specs describe user-visible behaviour |
| **Faster feedback** | Run E2E in CI and locally alongside unit tests |

#### 8.4.2 Tooling and Stack

| Choice | Recommendation | Rationale |
|--------|----------------|------------|
| **Runner** | Playwright or Cypress | Cross-browser, stable selectors, good DX and CI support |
| **Server** | Start real app on test port | Same process as production (Hapi, views, cookies) |
| **Data** | Dedicated test DB or in-memory store | Isolated, repeatable; use `db.init()` with test store where applicable |
| **Auth** | Login via UI or inject session cookie | Prefer UI login so auth flow is covered |

- **Test command:** `npm run test:e2e` (or `npx playwright test` / Cypress equivalent).
- **CI:** Run E2E after unit tests; optionally gate merges on E2E pass.
- **Config:** E2E config (e.g. `playwright.config.js` or `cypress.config.js`) in repo root; base URL and port from env (e.g. `TEST_PORT`, `BASE_URL`).

#### 8.4.3 Rollout by Version

E2E coverage is added **in step with each release**: the tests for a given version only assume capabilities that exist in that version. This keeps suites runnable at every version and avoids “future” tests that fail until later work is done.

| Version | Theme | E2E scope to add |
|---------|--------|-------------------|
| **0.0.0** | Skeleton | Smoke: app starts, GET `/` returns 200 and welcome content (e.g. title or key text). |
| **0.1.0** | Foundation | Home, signup, login, dashboard (no playlists yet): register user, login, see dashboard; logout. Optional: invalid login, duplicate email. |
| **0.2.0** | Sessions | Session persistence: login, reload dashboard, still authenticated; logout, reload, redirected to home. Dashboard shows user name. |
| **0.3.0** | Playlists | Playlist CRUD: create playlist from dashboard, see it in list; open playlist (empty); delete playlist, confirm it’s gone. Filtering: second user sees only own playlists. |
| **0.4.0** | Tracks | Track CRUD: add track to playlist, see in list; delete track; delete playlist (with tracks). Navigation: dashboard → playlist detail → back. |
| **0.5.0** | Persistence | Data survives restart: create user/playlist/track, restart server, login and confirm data still present. Validation: submit invalid signup/login and see error messages. |
| **0.6.0** | Quality | Validation E2E: invalid playlist/track forms show errors. Optional: extend coverage for edge cases (empty lists, not-found ids) and accessibility basics. |

Each version’s E2E suite should remain **green** at that version; new tests are added when the feature exists, not before.

#### 8.4.4 Test Structure and Conventions

```
test/
├── fixtures.js              # Shared unit/E2E data (e.g. test user)
├── e2e/
│   ├── fixtures.js          # E2E-only data (e.g. base URL, test users)
│   ├── smoke.spec.js        # Version 0.0.0: welcome page
│   ├── auth.spec.js         # 0.1.0 / 0.2.0: signup, login, logout, session
│   ├── playlists.spec.js    # 0.3.0: playlist CRUD and ownership
│   ├── tracks.spec.js       # 0.4.0: track CRUD and navigation
│   ├── persistence.spec.js  # 0.5.0: data survives restart, validation
│   └── quality.spec.js      # 0.6.0: validation and edge cases
└── *.test.js               # Unit/model tests (unchanged)
```

- **Naming:** One spec file per major flow or version slice; describe behaviour in test names (e.g. “shows welcome message on home”, “redirects to dashboard after login”).
- **Selectors:** Prefer stable attributes (e.g. `data-testid`, role-based) over brittle CSS; avoid relying on copy that changes often.
- **Isolation:** Each test starts from a known state (e.g. fresh server, empty or seeded test store); no ordering dependency between tests.
- **Speed:** Keep E2E suite small enough to run in a few minutes; use parallel execution and a single browser if needed to meet CI budget.

#### 8.4.5 Server and Data Lifecycle

- **Start:** Before E2E run, start the app on a dedicated port (e.g. `process.env.TEST_PORT || 3001`) with test config (e.g. in-memory or separate `db.json`).
- **Teardown:** After the suite, stop the server and optionally clear test data.
- **Per-test:** Prefer resetting state (e.g. re-init stores or restart server) over sharing mutable state so tests stay independent.

#### 8.4.6 Using E2E to Support New Features

- **Before coding:** Add or extend E2E specs for the new user flow; run and see them fail (red).
- **While coding:** Implement until the new E2E tests pass (green); keep existing E2E tests green to avoid regressions.
- **Before release:** Full run of unit + E2E; fix any failures before tagging the version.

This loop keeps E2E aligned with product behaviour and makes new features safer to ship.

#### 8.4.7 Summary

| Aspect | Strategy |
|--------|----------|
| **Rollout** | One slice of E2E scope per version; tests only cover behaviour that exists in that version. |
| **Robustness** | Regression safety via full-stack checks; persistence and auth verified in real environment. |
| **New features** | Write or extend E2E first, then implement until green; existing E2E guards against breakage. |
| **Maintenance** | Stable selectors, isolated tests, clear naming; small, fast suite that runs in CI. |

---

## 9. Project Structure

```
playtime/
├── .env                    # Environment secrets (git-ignored)
├── .env_example            # Environment template
├── .eslintrc.json          # Linter configuration
├── .gitignore              # Git ignore rules
├── .prettierrc.json        # Formatter configuration
├── CHANGELOG.md            # Version history
├── package.json            # Project manifest
│
├── src/
│   ├── server.js           # Application entry point
│   ├── web-routes.js       # Route definitions
│   │
│   ├── controllers/        # Request handlers
│   │   ├── about-controller.js
│   │   ├── accounts-controller.js
│   │   ├── dashboard-controller.js
│   │   └── playlist-controller.js
│   │
│   ├── models/             # Data layer
│   │   ├── db.js           # Store abstraction
│   │   ├── joi-schemas.js  # Validation schemas
│   │   ├── json/           # Persistent storage
│   │   │   ├── db.json
│   │   │   ├── store-utils.js
│   │   │   ├── user-json-store.js
│   │   │   ├── playlist-json-store.js
│   │   │   └── track-json-store.js
│   │   └── mem/            # In-memory storage
│   │       ├── user-mem-store.js
│   │       ├── playlist-mem-store.js
│   │       └── track-mem-store.js
│   │
│   └── views/              # Templates
│       ├── layouts/
│       │   └── layout.hbs
│       ├── partials/
│       │   └── *.hbs
│       └── *.hbs
│
└── test/                   # Test suite
    ├── fixtures.js         # Shared test data
    ├── e2e/                # End-to-end tests (see §8.4)
    │   ├── fixtures.js
    │   ├── smoke.spec.js
    │   ├── auth.spec.js
    │   ├── playlists.spec.js
    │   ├── tracks.spec.js
    │   ├── persistence.spec.js
    │   └── quality.spec.js
    └── *-test.js           # Unit / model tests
```

---

## 10. Quality Attributes

### 10.1 Current State

| Attribute | Status | Notes |
|-----------|--------|-------|
| Maintainability | ✅ Good | Clear structure, separation of concerns |
| Testability | ✅ Good | Model layer tested, expandable |
| Usability | ✅ Good | Clean UI, validation feedback |
| Security | ⚠️ Limited | Plain text passwords, no CSRF |
| Performance | ✅ Good | Lightweight, minimal dependencies |
| Scalability | ⚠️ Limited | File-based storage |

### 10.2 Technical Debt

| Item | Impact | Effort |
|------|--------|--------|
| Plain text passwords | High | Medium |
| No CSRF protection | High | Low |
| GET for delete actions | Medium | Low |
| Incomplete test coverage | Medium | Medium |
| No API layer | Low | High |

---

## 11. Glossary

| Term | Definition |
|------|------------|
| Controller | Handles HTTP requests and coordinates responses |
| Handler | Function that processes a specific route |
| Partial | Reusable template fragment |
| Store | Data access abstraction layer |
| Session | Server-side user state maintained via cookies |
| Validation Schema | Joi object defining input constraints |
