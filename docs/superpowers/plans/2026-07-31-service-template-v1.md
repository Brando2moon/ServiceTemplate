# Service Template V1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a reusable dark-navy service-business website with public pages, a Supabase-backed admin, service scheduling, staff roles, inquiries, work notes, project photos, and a before/after power-restoration interaction.

**Architecture:** A static HTML/CSS/JavaScript frontend runs on GitHub Pages. Supabase provides authentication, PostgreSQL, Row Level Security, and image storage. Public content reads published rows; admin pages require staff authentication and enforce owner, manager, and employee access rules.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Supabase JS v2, PostgreSQL/RLS, Supabase Storage, GitHub Pages.

## Global Constraints

- Public pages: Home, Services, About, Contact.
- No public prices.
- Generic branding only; do not use A.P.E.S. branding yet.
- Dark professional navy-blue design with controlled electric-blue accents.
- Owner creates and manages staff accounts; managers manage operations; employees manage assigned work only.
- Employees may reschedule assigned jobs and must enter a reason; managers and owner receive an alert.
- Public project cards use a click-to-restore before/after electrical animation with reduced-motion fallback.
- Never expose a Supabase service-role key in browser code.

---

### Task 1: Public Website Shell

**Files:**
- Create: `index.html`
- Create: `services.html`
- Create: `about.html`
- Create: `contact.html`
- Create: `styles.css`
- Create: `app.js`
- Create: `config.js`
- Test: `tests/site.test.js`

**Interfaces:**
- Consumes: `window.SERVICE_CONFIG` from `config.js`.
- Produces: shared navigation, site settings loader, service/project renderer, and contact inquiry submission.

- [ ] Write static tests for all public pages, required navigation links, no public price labels, and Supabase configuration hooks.
- [ ] Run `node tests/site.test.js` and confirm the tests fail because pages do not exist.
- [ ] Build the four responsive public pages and shared dark-navy styling.
- [ ] Add generic content and working links.
- [ ] Run `node tests/site.test.js` and confirm all public-shell tests pass.
- [ ] Commit with `feat: add public service website`.

### Task 2: Restoration Project Interaction

**Files:**
- Create: `assets/project-before.svg`
- Create: `assets/project-after.svg`
- Modify: `index.html`
- Modify: `app.js`
- Modify: `styles.css`
- Test: `tests/site.test.js`

**Interfaces:**
- Consumes: project records with `before_image_url` and `after_image_url`.
- Produces: `initRestorationCards()` and accessible before/after state labels.

- [ ] Add failing tests for before/after image attributes, click controls, lightning classes, and reduced-motion CSS.
- [ ] Run the tests and confirm the restoration checks fail.
- [ ] Add the generic before and after demonstration artwork.
- [ ] Implement click/tap and keyboard restoration toggling with professional blue-white animation.
- [ ] Add `prefers-reduced-motion` fallback.
- [ ] Run the tests and confirm restoration checks pass.
- [ ] Commit with `feat: add power restoration project effect`.

### Task 3: Supabase Schema and Security

**Files:**
- Create: `supabase-schema.sql`
- Create: `docs/setup.md`

**Interfaces:**
- Produces tables: `svc_profiles`, `svc_site_settings`, `svc_services`, `svc_projects`, `svc_inquiries`, `svc_jobs`, `svc_job_notes`, `svc_job_photos`, `svc_reschedules`, and `svc_notifications`.
- Produces helper function `public.is_service_staff(required_roles text[])` and secure RLS policies.

- [ ] Define tables, indexes, triggers, enums/check constraints, sample content, storage bucket policies, and RLS.
- [ ] Apply the migration to the selected Supabase project.
- [ ] Verify published content is publicly readable, inquiries can be inserted publicly, and operational data is staff-only.
- [ ] Run Supabase security advisors and correct issues related to service-template objects.
- [ ] Commit with `feat: add service template database`.

### Task 4: Secure Admin and Role-Based Operations

**Files:**
- Create: `admin-login.html`
- Create: `admin.html`
- Create: `admin.css`
- Create: `admin.js`
- Create: `admin-staff.js`
- Test: `tests/site.test.js`

**Interfaces:**
- Consumes Supabase authentication and service-template tables.
- Produces owner, manager, and employee admin views.

- [ ] Add failing tests for login, protected admin route, owner/manager/employee UI sections, and sign-out.
- [ ] Run tests and confirm admin checks fail.
- [ ] Implement email/password login and session guard.
- [ ] Implement dashboard views for inquiries, services, projects, jobs, calendar list, notes, photos, notifications, and branding settings.
- [ ] Restrict destructive staff-management controls to owner UI and enforce all permissions through RLS.
- [ ] Implement owner invitation instructions without embedding privileged keys.
- [ ] Run tests and confirm admin checks pass.
- [ ] Commit with `feat: add service operations admin`.

### Task 5: Quote-to-Job and Reschedule Alert Workflow

**Files:**
- Modify: `admin.html`
- Modify: `admin.js`
- Modify: `admin.css`
- Modify: `supabase-schema.sql`
- Test: `tests/site.test.js`

**Interfaces:**
- Produces `createJobFromInquiry()`, `saveJobNote()`, `rescheduleJob()`, and `markNotificationRead()` browser actions.
- Database trigger/function records reschedule history and creates manager/owner notifications.

- [ ] Add failing tests for inquiry conversion, employee assignment, work notes, photo categories, reschedule reason, and manager alert fields.
- [ ] Run tests and confirm workflow checks fail.
- [ ] Implement inquiry status updates and job creation.
- [ ] Implement assigned-job views, job status updates, notes, and photo uploads.
- [ ] Implement employee rescheduling with old/new times, required reason, and notifications.
- [ ] Verify the full database workflow with temporary data and remove verification rows.
- [ ] Run tests and confirm workflow checks pass.
- [ ] Commit with `feat: add scheduling and job workflow`.

### Task 6: Documentation, Verification, and Deployment

**Files:**
- Modify: `README.md`
- Modify: `docs/setup.md`
- Create: `.nojekyll`
- Test: `tests/site.test.js`

**Interfaces:**
- Produces a GitHub Pages site at the repository Pages URL.

- [ ] Simplify the README with public URL, admin URL, features, and setup steps.
- [ ] Run `node tests/site.test.js` and require zero failures.
- [ ] Verify the Supabase staff profile, tables, policies, and sample content.
- [ ] Enable GitHub Pages from the `main` branch root.
- [ ] Verify the deployed Home, Services, About, Contact, Admin Login, and Admin pages load.
- [ ] Commit with `docs: finalize setup and deployment`.
