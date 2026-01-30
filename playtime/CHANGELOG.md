# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

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
