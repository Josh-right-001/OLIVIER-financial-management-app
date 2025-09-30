-- Create transactions table
create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('revenu', 'depense', 'dette')),
  nom text not null,
  reference text,
  montant numeric(12, 2) not null,
  devise text default 'USD' not null,
  motif text,
  date date not null default current_date,
  heure time,
  telephone text,
  mode_paiement text check (mode_paiement in ('especes', 'banque', 'mobile_money', 'cheque', 'autre')),
  notes text,
  statut text default 'valide' check (statut in ('valide', 'en_attente', 'annule')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.transactions enable row level security;

-- Create policies for transactions
create policy "Users can view their own transactions"
  on public.transactions for select
  using (auth.uid() = user_id);

create policy "Users can insert their own transactions"
  on public.transactions for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own transactions"
  on public.transactions for update
  using (auth.uid() = user_id);

create policy "Users can delete their own transactions"
  on public.transactions for delete
  using (auth.uid() = user_id);

-- Create index for better query performance
create index if not exists transactions_user_id_idx on public.transactions(user_id);
create index if not exists transactions_date_idx on public.transactions(date desc);
create index if not exists transactions_type_idx on public.transactions(type);
