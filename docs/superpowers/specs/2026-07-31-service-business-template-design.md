# Reusable Service Business Website and Admin Design

**Date:** 2026-07-31  
**Repository:** `Brando2moon/ServiceTemplate`  
**Status:** Approved design

## 1. Purpose

Build a reusable, production-ready service-business website template that can be customized later for electricians, contractors, repair companies, cleaners, and similar local service providers.

The initial template remains generically branded. The A.P.E.S. logo, company name, and final business copy will not be used until the template is customized for that client.

The system includes a public website and a secure Supabase-powered admin application. It does not display public prices.

## 2. Visual Direction

The design uses a very dark, professional navy-blue system:

- Near-black navy page background
- Midnight-blue panels and navigation
- Dark steel-blue content cards
- Soft white primary text
- Cool-gray secondary text
- Controlled electric-blue accents for buttons, focus states, links, and restoration effects
- Muted green, amber, and red only for operational status messages

The visual tone must feel premium, industrial, trustworthy, and professional. It must not resemble a gaming interface.

The template will support editable brand settings so the owner can change:

- Company name
- Logo
- Tagline
- Primary and accent colors
- Phone, email, address, and service area
- Social links
- Business hours

## 3. Public Website

### 3.1 Home

The home page includes:

- Hero section with generic service-business copy
- Primary call-to-action to request service
- Trust and experience highlights
- Featured services
- Featured before/after projects
- Service-area section
- Customer-review placeholders
- Final contact call-to-action

### 3.2 Services

The services page displays admin-managed service cards with:

- Service name
- Short and long description
- Cover image
- Optional icon
- Featured status
- Display order
- Active or hidden status

No public prices are displayed or stored as public-facing service fields.

### 3.3 About

The about page includes editable sections for:

- Company story
- Mission and values
- Experience and qualifications
- Team introduction
- Service approach
- Trust markers and certifications

### 3.4 Contact

The contact page includes:

- Contact form
- Business phone and email
- Address or service area
- Business hours
- Optional map link
- Emergency-service notice if enabled

Contact submissions become inquiries in the admin application.

### 3.5 Before/After Project Gallery

Each project contains:

- Project title
- Service category
- Location label
- Short description
- Before image
- After image
- Optional progress images
- Completion date
- Featured status
- Display order

Clicking a project image triggers the power-restoration interaction:

1. The before image darkens briefly.
2. A blue-white electrical trace travels around the card border.
3. The image flickers as if power is returning.
4. A controlled flash passes across the image.
5. The after image fades into view.
6. A second click returns to the before image.

The effect must remain subtle and professional. Users with reduced-motion enabled receive a simple crossfade with no flashing or rapid flicker.

An original generic before/after example image pair will be included for demonstration and can later be replaced through the admin.

## 4. Authentication and Staff Roles

There is no public registration. The first owner account is provisioned during setup. Only the owner can create staff accounts.

### 4.1 Owner

The owner has full control and can:

- Manage all public website content
- Manage company settings, logo, and colors
- Create, edit, disable, and delete staff accounts
- Assign staff roles
- Manage services, projects, inquiries, quotes, jobs, schedules, notes, and photos
- Delete operational and content records
- View all schedules, notifications, and history

The owner account cannot be deleted by managers or employees.

### 4.2 Manager

Managers can:

- Manage contact details, services, projects, inquiries, quotes, and jobs
- Assign employees to jobs
- Create and change schedules
- View all employee calendars
- Receive employee reschedule alerts
- Review work notes and photos
- Manage job status and follow-up work
- Create or disable employee accounts only when explicitly granted the staff-management permission by the owner

Managers cannot delete or modify the owner account.

### 4.3 Employee

Employees can:

- View their assigned jobs
- View customer and job instructions needed for the assignment
- Change job status
- Add work notes
- Upload before, progress, and after photos
- Reschedule their own assigned jobs
- Enter a required reason when rescheduling

Employees cannot:

- Delete records
- Manage public website settings
- Manage staff accounts or permissions
- View jobs not assigned to them unless a manager grants broader access

## 5. Inquiry, Quote, and Job Workflow

The operational workflow is:

1. Customer submits an inquiry.
2. Owner or manager contacts the customer.
3. Staff records call notes and quote details.
4. Inquiry is marked as contacted, quoted, accepted, declined, or closed.
5. After acceptance, staff converts the quote into a scheduled job.
6. Staff selects date, time, address, service, instructions, and assigned employee.
7. Employee sees the job on their calendar.
8. Employee updates status and uploads work notes and photos.
9. Job is marked completed or follow-up required.
10. Completed projects may be published to the before/after gallery after owner or manager approval.

No public service pricing is shown. Quote amounts may be stored privately inside the admin if needed during implementation, but they are never rendered on public pages.

## 6. Service Calendar and Scheduling

The admin includes day, week, and month calendar views.

Each job displays:

- Customer name
- Service type
- Scheduled start and end time
- Address
- Assigned employee
- Job status
- Priority

Supported job statuses:

- New
- Quote pending
- Scheduled
- Confirmed
- In progress
- Paused
- Completed
- Follow-up required
- Cancelled

### 6.1 Employee Rescheduling

An employee may reschedule only a job assigned to them.

A reschedule requires:

- New date and time
- Reason for the change
- Optional note for the manager

The system records:

- Previous start and end time
- New start and end time
- Employee who made the change
- Timestamp
- Reason

The system creates an in-app notification for every active manager. If no manager exists, the owner receives the notification. The notification links directly to the changed job.

Email or SMS notification delivery is an optional future adapter and is not required for the first working template.

## 7. Work Notes and Photos

Each job supports a chronological activity log containing:

- Internal work notes
- Customer-facing completion notes
- Status changes
- Reschedule history
- Uploaded photos
- Staff member and timestamp for every entry

Photo categories:

- Before
- Progress
- After
- Document or reference

Uploads use Supabase Storage. Files are restricted to authenticated staff and validated by file type and size. Public gallery images are exposed only after a project is explicitly published.

## 8. Admin Modules

The secure admin application includes:

- Dashboard overview
- Inquiries and quote pipeline
- Jobs list
- Service calendar
- Job detail and activity timeline
- Services manager
- Projects and before/after gallery manager
- Website content editor
- Business and branding settings
- Staff and permission manager
- Notification center
- Account and sign-out controls

The admin link is not shown in the public navigation. Staff use a direct login URL.

## 9. Suggested Technical Architecture

### 9.1 Frontend

- Responsive HTML, CSS, and JavaScript application suitable for GitHub Pages or another static host
- Shared public layout components
- Separate protected admin pages
- CSS custom properties populated from brand settings
- Accessible keyboard interactions, labels, contrast, and focus states
- Progressive enhancement for the restoration animation

### 9.2 Backend

Supabase provides:

- Authentication
- PostgreSQL database
- Row Level Security
- Storage for logos, service images, project images, and job photos
- Realtime or polling support for notifications and calendar updates

### 9.3 Core Data Tables

Expected tables:

- `profiles`
- `staff_permissions`
- `site_settings`
- `page_content`
- `services`
- `projects`
- `project_images`
- `inquiries`
- `quotes`
- `jobs`
- `job_assignments`
- `job_notes`
- `job_photos`
- `job_reschedule_history`
- `notifications`

Exact columns and indexes will be defined in the implementation plan and migration files.

## 10. Security Boundaries

- Public users can read only published website content and active services/projects.
- Public users can create contact inquiries through a narrowly scoped insert policy or server-side function.
- Employees can read and update only assigned jobs and their related notes/photos.
- Managers can manage operational content according to role permissions.
- Owners have full tenant-level control.
- Staff creation must use a secure server-side Supabase function or Edge Function; the browser must never receive a service-role key.
- Storage policies mirror database permissions.
- Destructive actions require confirmation and owner-only access where specified.
- Audit fields record who created or modified sensitive operational records.

## 11. Error Handling

The interface must provide clear states for:

- Missing Supabase configuration
- Expired sessions
- Insufficient permissions
- Failed form submissions
- Upload validation failures
- Calendar conflicts
- Failed reschedules
- Empty content states
- Offline or temporary network failures

Forms retain user-entered data after recoverable errors. Buttons prevent duplicate submissions. Admin pages redirect unauthenticated users to login.

## 12. Testing and Verification

Automated or scripted tests will verify:

- Public navigation and page links
- No public prices
- Contact inquiry creation
- Owner, manager, and employee permission boundaries
- Owner staff-account management
- Employee assigned-job access
- Employee reschedule logging and manager notification creation
- Calendar rendering and schedule updates
- Work-note creation
- Photo upload validation
- Project publishing
- Before/after restoration toggle
- Reduced-motion fallback
- Responsive layout at mobile, tablet, and desktop widths

End-to-end verification will cover the complete path from inquiry to quote, scheduled job, employee update, reschedule alert, completion, and optional project publication.

## 13. Initial Demo Content

The first working template includes generic placeholder content:

- Generic company name and logo placeholder
- Four to six example services without prices
- Example about and contact content
- One original before/after restoration project
- Sample inquiry, scheduled job, and notification data where useful for demonstration

A.P.E.S. branding remains outside the initial generic template and will be applied only during later client customization.

## 14. Non-Goals for the First Version

- Public online payments
- Public service pricing
- Customer accounts or customer portal
- Automated payroll or time tracking
- Route optimization
- Native mobile applications
- Built-in SMS or email provider billing
- Multi-company tenancy inside one deployment

Each deployment represents one service business with one owner and its staff.
