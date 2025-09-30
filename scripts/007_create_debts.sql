-- Create debts table
create table if not exists public.debts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  nom_creancier text not null,
  montant_total numeric(12, 2) not null,
  avance numeric(12, 2) default 0,
  reste numeric(12, 2) generated always as (montant_total - avance) stored,
  motif text,
  echeance date,
  statut text default 'en_cours' check (statut in ('en_cours', 'paye', 'en_retard', 'annule')),
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.debts enable row level security;

-- Create policies for debts
create policy "Users can view their own debts"
  on public.debts for select
  using (auth.uid() = user_id);

create policy "Users can insert their own debts"
  on public.debts for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own debts"
  on public.debts for update
  using (auth.uid() = user_id);

create policy "Users can delete their own debts"
  on public.debts for delete
  using (auth.uid() = user_id);

-- Create indexes
create index if not exists debts_user_id_idx on public.debts(user_id);
create index if not exists debts_statut_idx on public.debts(statut);
create index if not exists debts_echeance_idx on public.debts(echeance);
