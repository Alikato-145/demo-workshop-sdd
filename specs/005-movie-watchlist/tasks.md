# Tasks: Movie Watchlist

**Input**: Design documents from `specs/005-movie-watchlist/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [ui-contract.md](./contracts/ui-contract.md), [quickstart.md](./quickstart.md)

**Tests**: No automated test framework is required by the specification. Final validation follows the browser scenarios in `quickstart.md`.

**Organization**: Tasks are grouped by user story and ordered for a single developer. Every source change stays in the three root-level application files.

## Phase 1: Setup

**Purpose**: Confirm the workshop baseline before editing it.

- [X] T001 Verify branch `team-5`, keep `index.html`, `style.css`, and `app.js` at the repository root, and retain the shared IDs documented in `specs/005-movie-watchlist/contracts/ui-contract.md`.

---

## Phase 2: Foundational

**Purpose**: Establish the one-state, one-render foundation that every user story uses.

- [X] T002 Replace the template state and persistence in `app.js` with an app-specific Movie state and storage key. Define each Movie with `id` as a unique identifier, `title` as “Trimmed value; must not be empty”, `genre` as “User-entered display text; editable”, `releaseYear` as “User-entered display text; not changed by edit flow”, `watched` defaulting to `false`, `rating` defaulting to `null` with values only 1 through 5, and `createdAt` as an ISO 8601 timestamp; retain one `render()` DOM writer. (FR-002, FR-013)

**Checkpoint**: The app has one valid state model, can recover from missing/corrupt saved data, and has no second data store or DOM-render path.

---

## Phase 3: User Story 1 - บันทึกและติดตามรายการที่อยากดู (Priority: P1) 🎯 MVP

**Goal**: ผู้ใช้เพิ่มหนังหรือซีรีส์ เห็นรายการล่าสุดก่อน และสลับสถานะดูจบได้โดยข้อมูลคงอยู่หลังรีเฟรช

**Independent Test**: เพิ่ม `Dune` และ `Parasite`, สลับ `Dune` เป็นดูจบ แล้วรีเฟรช; `Parasite` ต้องอยู่บนสุดและสถานะของ `Dune` ต้องคงอยู่

- [X] T003 [US1] Replace the base form and list shell in `index.html` with title, genre, and release-year inputs while retaining `#item-form`, `#form-error`, `#item-list`, and `#empty-state` for Movie cards. (FR-001, FR-014)
- [X] T004 [US1] Implement add validation, newest-first creation, state persistence, Movie-card rendering, and watched/unwatched toggle actions in `app.js`; new Movies must start with `watched: false` and `rating: null`. (FR-001, FR-002, FR-003, FR-004, FR-005, FR-013)
- [X] T005 [US1] Update card, status-label, empty-state, button, and long-title wrapping styles in `style.css` so watched cards are visibly distinct without content overflow. (FR-005, FR-014)

**Checkpoint**: User Story 1 is usable as a persistent basic watchlist without search, rating, edit, or bulk removal.

---

## Phase 4: User Story 2 - ค้นหาและดูรายการตามสถานะ (Priority: P2)

**Goal**: ผู้ใช้ค้นหาชื่อเรื่องและกรองตามสถานะ พร้อมเห็นจำนวนดูจบและจำนวนที่เหลือแบบเรียลไทม์

**Independent Test**: มีอย่างน้อยหนึ่งเรื่องในแต่ละสถานะ, ค้นหาชื่อบางส่วน, สลับ filter ทั้งสาม และใช้คำค้นที่ไม่พบ; รายการ, summary, และ no-results state ต้องถูกต้อง

- [X] T006 [US2] Add the title-search control and rename filter controls in `index.html` to the contract values `all`, `unwatched`, and `watched`, while retaining `#filter-section` and `#summary-text`. (FR-006, FR-007, FR-008)
- [X] T007 [US2] Add query/filter state, case-insensitive title matching, visible-item derivation, watched/remaining summary, active-filter rendering, and no-results handling in `app.js`; visible items must be derived rather than stored separately. (FR-006, FR-007, FR-008, FR-014)
- [X] T008 [US2] Style the search input, active filters, summary, and no-results state in `style.css` for desktop and mobile use. (FR-014, FR-015)

**Checkpoint**: User Story 2 narrows visible cards immediately without deleting or changing Movie records.

---

## Phase 5: User Story 3 - ปรับข้อมูลและบันทึกความชอบ (Priority: P3)

**Goal**: ผู้ใช้แก้ไขชื่อ/แนวหนังและให้คะแนน 1–5 ดาวกับเรื่องที่ดูจบแล้วได้

**Independent Test**: ทำเครื่องหมายเรื่องหนึ่งว่าดูจบ, เปลี่ยนชื่อและแนวหนัง, ให้ 1 ดาวแล้วเปลี่ยนเป็น 5 ดาว, รีเฟรชหน้า; ทุกค่าต้องคงอยู่ และเรื่องที่ยังไม่ได้ดูต้องตั้งคะแนนไม่ได้

- [X] T009 [US3] Add delegated edit and rating actions to rendered Movie cards in `app.js`; edit only title and genre, accept rating integers 1 through 5 only when `watched` is true, and retain-but-hide an existing rating when a Movie becomes unwatched. (FR-009, FR-010, FR-013)
- [X] T010 [US3] Add editable-card and 1–5-star rating presentation styles in `style.css`, including an unavailable rating state for unwatched Movies. (FR-005, FR-010)

**Checkpoint**: User Story 3 preserves the Movie field constraints and never exposes an active rating control for unwatched Movies.

---

## Phase 6: User Story 4 - ลบรายการที่ไม่ต้องการ (Priority: P4)

**Goal**: ผู้ใช้ลบเรื่องเดียวหรือล้างเฉพาะเรื่องที่ดูจบทั้งหมดได้

**Independent Test**: เพิ่มรายการ watched และ unwatched, ลบรายการหนึ่ง แล้วล้าง watched; ต้องเหลือเฉพาะรายการ unwatched และการล้างเมื่อไม่มี watched ต้องไม่ error

- [X] T011 [US4] Update the bulk-action label and placement in `index.html` to “ล้างรายการที่ดูจบแล้ว” while retaining a clear button ID for `app.js`. (FR-012)
- [X] T012 [US4] Implement delegated single-Movie deletion and clear-watched behavior in `app.js`; clearing must remove only records whose `watched` value is true, preserve unwatched records, persist the new state, and safely no-op when no watched record exists. (FR-011, FR-012, FR-013)

**Checkpoint**: User Story 4 can clean the list without affecting unwatched Movies.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Make the complete app compliant with the workshop contract and verify end-to-end behavior.

- [X] T013 Review `index.html`, `style.css`, and `app.js` for keyboard-usable buttons, visible focus states, semantic labels, responsive one-column behavior on small screens, and removal of every base-template `TODO`. (FR-014, FR-015)
- [ ] T014 Run `node --check app.js` and complete every scenario in `specs/005-movie-watchlist/quickstart.md` using a browser; fix any console error or mismatch against the listed expected result in `index.html`, `style.css`, or `app.js`.
- [X] T015 Compare the final changes in `index.html`, `style.css`, and `app.js` against FR-001 through FR-015 in `specs/005-movie-watchlist/spec.md`; keep only traceable features and leave the root page deployable.

---

## Dependencies & Execution Order

```text
T001 → T002 → US1 (T003–T005) → US2 (T006–T008) → US3 (T009–T010) → US4 (T011–T012) → T013–T015
```

- T002 blocks every user story because all behavior reads and writes the shared Movie state.
- US2 requires Movie cards from US1 to make search/filter meaningful.
- US3 and US4 operate on Movies created by US1; implement them after US1 for the smallest, testable increments.
- Polish starts only after all four stories are complete.

## Parallel Opportunities

No implementation task is marked `[P]`: this is an individual workshop and the three root files share DOM IDs, class names, and `render()` behavior. Doing them sequentially avoids conflicting changes. Documentation review or manual test execution can happen alongside a code review, but not before its dependent source task is complete.

## Implementation Strategy

### MVP First

1. Complete T001–T005.
2. Run the User Story 1 independent test.
3. If time is constrained, keep the working persistent watchlist before advancing to search/filter, rating/edit, and cleanup.

### Incremental Delivery

1. Implement US1: add, status, persistent cards.
2. Implement US2: search, filters, summary, no-results.
3. Implement US3: edit and watched-only rating.
4. Implement US4: single delete and clear watched.
5. Complete the shared accessibility, responsive, syntax, and browser checks.
