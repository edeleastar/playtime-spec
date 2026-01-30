# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

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
