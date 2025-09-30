-- Create fuel logs table
create table if not exists public.fuel_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null default current_date,
  heure time,
  quantite_litres numeric(12, 2) not null,
  prix_par_litre numeric(12, 2) not null,
  cout_total numeric(12, 2) generated always as (quantite_litres * prix_par_litre) stored,
  vehicule text,
  conducteur text,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.fuel_logs enable row level security;

-- Create policies for fuel logs
create policy "Users can view their own fuel logs"
  on public.fuel_logs for select
  using (auth.uid() = user_id);

create policy "Users can insert their own fuel logs"
  on public.fuel_logs for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own fuel logs"
  on public.fuel_logs for update
  using (auth.uid() = user_id);

create policy "Users can delete their own fuel logs"
  on public.fuel_logs for delete
  using (auth.uid() = user_id);

-- Create indexes
create index if not exists fuel_logs_user_id_idx on public.fuel_logs(user_id);
create index if not exists fuel_logs_date_idx on public.fuel_logs(date desc);
create index if not exists fuel_logs_vehicule_idx on public.fuel_logs(vehicule);
