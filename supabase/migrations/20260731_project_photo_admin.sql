-- Allow projects to be saved as drafts while before/after photos are added.
alter table public.svc_projects
  alter column before_image_url drop not null,
  alter column after_image_url drop not null;

-- Existing RLS and storage policies limit project-photo changes to Owner and Manager roles.
