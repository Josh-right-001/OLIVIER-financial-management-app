-- Create employees table
create table if not exists public.employees (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  nom text not null,
  postnom text,
  prenom text,
  role text not null,
  salaire_unitaire numeric(12, 2),
  unite_salaire text check (unite_salaire in ('heure', 'jour', 'mois')),
  salaire_mensuel numeric(12, 2),
  banque text,
  compte_bancaire text,
  telephone text,
  email text,
  statut text default 'actif' check (statut in ('actif', 'inactif', 'conge', 'suspendu')),
  date_embauche date,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.employees enable row level security;

-- Create policies for employees
create policy "Users can view their own employees"
  on public.employees for select
  using (auth.uid() = user_id);

create policy "Users can insert their own employees"
  on public.employees for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own employees"
  on public.employees for update
  using (auth.uid() = user_id);

create policy "Users can delete their own employees"
  on public.employees for delete
  using (auth.uid() = user_id);

-- Create indexes
create index if not exists employees_user_id_idx on public.employees(user_id);
create index if not exists employees_statut_idx on public.employees(statut);
create index if not exists employees_nom_idx on public.employees(nom);
