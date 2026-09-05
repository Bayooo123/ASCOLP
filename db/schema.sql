-- ASCOLP schema for Naijabase (run this in the Naijabase SQL editor).
-- snake_case throughout since this is queried over a REST API rather than
-- a Prisma-managed connection.

create extension if not exists pgcrypto;

create type user_role as enum ('ADMIN', 'TEAM_MEMBER');
create type alumni_source as enum ('ADMIN', 'SELF_SUBMITTED');
create type article_type as enum ('ARTICLE', 'NEWSLETTER');

create table users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  role user_role not null default 'TEAM_MEMBER',
  team_member_id uuid unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table team_members (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  credentials text,
  title text,
  bio text,
  photo_url text,
  email text,
  phone text,
  linkedin_url text,
  twitter_url text,
  facebook_url text,
  is_partner boolean not null default false,
  featured_home boolean not null default false,
  home_order integer not null default 0,
  display_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table users
  add constraint users_team_member_id_fkey
  foreign key (team_member_id) references team_members(id) on delete set null;

create index team_members_featured_home_home_order_idx on team_members(featured_home, home_order);
create index team_members_published_display_order_idx on team_members(published, display_order);

create table deal_records (
  id uuid primary key default gen_random_uuid(),
  team_member_id uuid not null references team_members(id) on delete cascade,
  title text not null,
  description text,
  practice_area text,
  year text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index deal_records_team_member_id_idx on deal_records(team_member_id);

create table alumni (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  photo_url text,
  role_at_firm text,
  years_at_firm text,
  current_role text,
  current_organization text,
  country text,
  bio text,
  linkedin_url text,
  source alumni_source not null default 'ADMIN',
  approved boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index alumni_approved_idx on alumni(approved);

create table articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  type article_type not null default 'ARTICLE',
  summary text,
  body text,
  file_url text,
  cover_image_url text,
  external_url text,
  author text,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index articles_published_published_at_idx on articles(published, published_at);
create index articles_type_idx on articles(type);

create table contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create index contact_messages_read_created_at_idx on contact_messages(read, created_at);

create table newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

-- keep updated_at current on every UPDATE, so the app doesn't have to set it manually
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger users_set_updated_at before update on users
  for each row execute function set_updated_at();
create trigger team_members_set_updated_at before update on team_members
  for each row execute function set_updated_at();
create trigger alumni_set_updated_at before update on alumni
  for each row execute function set_updated_at();
create trigger articles_set_updated_at before update on articles
  for each row execute function set_updated_at();
