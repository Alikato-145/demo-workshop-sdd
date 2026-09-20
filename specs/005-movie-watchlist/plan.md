# Implementation Plan: Movie Watchlist

**Branch**: `team-5` | **Date**: 2026-09-20 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/005-movie-watchlist/spec.md`

## Summary

สร้าง watchlist สำหรับหนังหรือซีรีส์ที่ผู้ใช้เพิ่ม ค้นหา กรอง เปลี่ยนสถานะ ดูคะแนน แก้ไข และลบได้ โดยคงข้อมูลเดิมหลังเปิดหน้าใหม่ ใช้ไฟล์ static ที่มีอยู่ใน root และ browser APIs มาตรฐานเท่านั้น: `localStorage` สำหรับข้อมูล และ `render()` เดียวสำหรับวาด UI จาก state เดียว

## Technical Context

**Language/Version**: HTML5, CSS3, ECMAScript 2020+

**Primary Dependencies**: ไม่มี; ใช้ browser APIs มาตรฐานเท่านั้น

**Storage**: Browser `localStorage` key เฉพาะแอป

**Testing**: ทดสอบแบบ manual ตาม quickstart ด้วย browser; ไม่มี test framework ตามข้อจำกัด workshop

**Target Platform**: เบราว์เซอร์เดสก์ท็อปและสมาร์ตโฟนสมัยใหม่; เปิดผ่าน `file://` หรือ static HTTP server ได้

**Project Type**: Single-page static web application

**Performance Goals**: ค้นหา กรอง และอัปเดต summary ของรายการระดับ workshop (อย่างน้อย 20 เรื่อง) ตอบสนองทันทีจากมุมมองผู้ใช้

**Constraints**: ไม่มี framework/build step/backend/network call/authentication; แก้เฉพาะ `index.html`, `style.css`, `app.js` ที่ root; ต้องลบ TODO ทั้งหมด

**Scale/Scope**: ผู้ใช้คนเดียวในเบราว์เซอร์เดียว, 1 หน้า, 1 collection ของ Movie, 4 user stories ภายใน 75 นาที

## Constitution Check

*GATE: Passed before Phase 0 research and re-checked after Phase 1 design.*

| Principle | Status | Plan evidence |
|-----------|--------|---------------|
| I. Simplicity First | PASS | ใช้ HTML/CSS/JavaScript และ browser APIs มาตรฐานเท่านั้น ไม่มี dependency หรือ build step |
| II. Storage Constraint | PASS | ข้อมูล Movie เก็บใน `localStorage`; ไม่มี API, backend หรือ network call |
| III. No Authentication | PASS | แอปเป็น local single-operator ไม่มีบัญชีหรือ session |
| IV. Time-boxed Scope | PASS | ใช้ base template และมีเพียง CRUD, search/filter, rating, persistence ตาม spec |
| V. Traceability | PASS | งาน implement จะอ้าง FR-001 ถึง FR-015 และ acceptance scenarios ของ spec |
| VI. Shared Interface | PASS | คง `state` เดียว, `render()` เดียว และ shared IDs; เพิ่ม IDs เฉพาะ field ของ Movie เมื่อจำเป็น |
| VII. Root-Level Entry Point | PASS | source ทั้งหมดอยู่ `index.html`, `style.css`, `app.js` ที่ root |
| VIII. Base Template Starting Point | PASS | แก้ base files เดิมและกำจัด TODO ที่ไม่ใช้ |
| Branch-per-Team Workflow | PASS | แก้ branch เป็น `team-5` แล้ว และใช้เฉพาะโจทย์ `specs/โจทย์/team-5.md` |

## Project Structure

### Documentation (this feature)

```text
specs/005-movie-watchlist/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/
│   └── ui-contract.md    # UI/state interaction contract
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
index.html                # form, search, filters, grid cards, empty/no-results states
style.css                 # responsive grid and watch-status/rating styles
app.js                    # state, local persistence, event handlers, render()
```

**Structure Decision**: ใช้ flat root-level layout ที่มีอยู่แล้วโดยไม่เพิ่ม source directory หรือไฟล์แอปใหม่ เพื่อให้เปิดเป็น static page และ deploy ได้ทันทีตาม constitution

## Complexity Tracking

ไม่มี violation ของ constitution
