# Playtime - Release Plan

**Document Type:** Release Plan  
**Target Version:** 0.6.0

---

## 1. Overview

This document is the high-level release plan for the Playtime application. The plan is organized into seven releases (0.0.0–0.6.0), each building incrementally on the previous version. Detailed stories, acceptance criteria, and deliverables for each version are in the **tasks** folder:

- [tasks/v0.0.0-skeleton.md](tasks/v0.0.0-skeleton.md) – Skeleton
- [tasks/v0.1.0-foundation.md](tasks/v0.1.0-foundation.md) – Foundation
- [tasks/v0.2.0-sessions.md](tasks/v0.2.0-sessions.md) – Sessions
- [tasks/v0.3.0-playlists.md](tasks/v0.3.0-playlists.md) – Playlists
- [tasks/v0.4.0-tracks.md](tasks/v0.4.0-tracks.md) – Tracks
- [tasks/v0.5.0-persistence.md](tasks/v0.5.0-persistence.md) – Persistence
- [tasks/v0.6.0-quality.md](tasks/v0.6.0-quality.md) – Quality

### 1.1 Release Summary

| Version | Theme       | Key Deliverables                                                                                 |
| ------- | ----------- | ------------------------------------------------------------------------------------------------ |
| 0.0.0   | Skeleton    | Minimal Node + Hapi server, Handlebars views with layout/partials, ESLint/Prettier, welcome page |
| 0.1.0   | Foundation  | Basic server, user models, sign up / log in and dashboard views                                  |
| 0.2.0   | Sessions    | User Sessions, show user name on dashboard                                                       |
| 0.3.0   | Playlists   | In memory playlists, user-playlist association                                                   |
| 0.4.0   | Tracks      | Tracks in playlists, support track and playlist delete                                           |
| 0.5.0   | Persistence | JSON storage, environment config                                                                 |
| 0.6.0   | Quality     | Joi & signup validation, complete validation, store robustness                                   |

### 1.2 Story Point Reference

| Points | Effort                 |
| ------ | ---------------------- |
| 1      | Trivial (< 1 hour)     |
| 2      | Small (1-2 hours)      |
| 3      | Medium (2-4 hours)     |
| 5      | Large (4-8 hours)      |
| 8      | Extra Large (1-2 days) |

---

## 2. Total Effort

| Version   | Stories | Points   |
| --------- | ------- | -------- |
| 0.0.0     | 10      | ~19      |
| 0.1.0     | 14      | ~34      |
| 0.2.0     | 7       | ~16      |
| 0.3.0     | 11      | ~25      |
| 0.4.0     | 14      | ~30      |
| 0.5.0     | 11      | ~21      |
| 0.6.0     | 15      | ~27      |
| **Total** | **82**  | **~172** |

---

## 3. Feature Progression

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
v0.6.0: [Joi & Signup Validation] [Complete Validation] [Store Robustness] [E2E Validation Forms]
```

---

## 4. Risk Mitigation

| Risk                     | Mitigation                                                    |
| ------------------------ | ------------------------------------------------------------- |
| Data loss (v0.1.0-0.4.0) | Memory stores acceptable for dev; JSON storage in v0.5.0      |
| Security gaps            | Plain text passwords documented; HTTPS/hashing as future work  |
| Incomplete validation    | Progressive validation: Joi and signup in v0.6.0, all forms in v0.6.0 |
| No tests early           | E2E smoke in v0.0.0; unit framework and User store tests in v0.1.0; tests grow with each version |

---

## 5. Definition of Done

A story is complete when:

- Code implements acceptance criteria
- Code passes ESLint without errors
- Code is formatted with Prettier
- Feature is manually tested
- Unit and E2E tests pass (per-version; see task files for testing epics)
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

S-012, S-013

### In-Memory Data Models

S-014, S-015, S-016

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

### Joi and Signup Validation

S-056, S-057, S-058, S-059

### Store Robustness

S-070, S-071, S-072

### Complete Validation

S-073, S-074, S-075, S-076, S-077, S-078

### E2E Validation Forms (Testing)

T-014
