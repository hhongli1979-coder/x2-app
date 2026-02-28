-- ============================================================
-- X² 生活网站 – Supabase schema
-- Run this in the Supabase SQL editor or via `supabase db push`
-- ============================================================

-- ── posts ────────────────────────────────────────────────────
create table if not exists public.posts (
  id          uuid        primary key default gen_random_uuid(),
  region      text        not null check (region in ('eu','id')),
  category    text        not null,
  title       text        not null,
  content     text        not null,
  contact     text        not null default '',
  images      text[]      not null default '{}',
  status      text        not null default 'pending'
                          check (status in ('pending','approved','rejected','hidden')),
  pinned      boolean     not null default false,
  user_id     uuid        references auth.users(id) on delete set null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- index for common queries
create index if not exists posts_region_category_status
  on public.posts (region, category, status, pinned desc, created_at desc);

-- auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_updated_at on public.posts;
create trigger posts_updated_at
  before update on public.posts
  for each row execute procedure public.set_updated_at();

-- ── admins ───────────────────────────────────────────────────
create table if not exists public.admins (
  id          uuid        primary key default gen_random_uuid(),
  user_id     uuid        not null unique references auth.users(id) on delete cascade,
  created_at  timestamptz not null default now()
);

-- ── RLS ──────────────────────────────────────────────────────
alter table public.posts  enable row level security;
alter table public.admins enable row level security;

-- helper: is the current user an admin?
create or replace function public.is_admin()
returns boolean language sql security definer as $$
  select auth.uid() is not null and exists (
    select 1 from public.admins where user_id = auth.uid()
  );
$$;

-- Public: read only approved posts
drop policy if exists "public_read_approved" on public.posts;
create policy "public_read_approved" on public.posts
  for select using (status = 'approved' or public.is_admin());

-- Anyone (incl. anon) can insert a new post
drop policy if exists "anyone_insert" on public.posts;
create policy "anyone_insert" on public.posts
  for insert with check (true);

-- Only admins can update (approve/reject/pin)
drop policy if exists "admin_update" on public.posts;
create policy "admin_update" on public.posts
  for update using (public.is_admin());

-- Only admins can delete
drop policy if exists "admin_delete" on public.posts;
create policy "admin_delete" on public.posts
  for delete using (public.is_admin());

-- Admins can manage the admins table
drop policy if exists "admin_read_admins" on public.admins;
create policy "admin_read_admins" on public.admins
  for select using (public.is_admin() or user_id = auth.uid());

-- ── Seed categories (reference data – optional table) ────────
-- If you prefer a categories table instead of hardcoded values:
-- create table if not exists public.categories (
--   id   text primary key,
--   label text not null,
--   icon  text not null default ''
-- );
-- insert into public.categories values
--   ('housing',    '租房',    '🏠'),
--   ('secondhand', '二手',    '♻️'),
--   ('jobs',       '招聘',    '💼'),
--   ('services',   '生活服务','🛎️'),
--   ('social',     '交友',    '💬')
-- on conflict do nothing;
