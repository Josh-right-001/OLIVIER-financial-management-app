-- Create inventory table
create table if not exists public.inventory (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  produit text not null,
  quantite numeric(12, 2) not null default 0,
  unite text not null default 'unité',
  prix_unitaire numeric(12, 2) not null,
  valeur_totale numeric(12, 2) generated always as (quantite * prix_unitaire) stored,
  fournisseur text,
  date_entree date not null default current_date,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.inventory enable row level security;

-- Create policies for inventory
create policy "Users can view their own inventory"
  on public.inventory for select
  using (auth.uid() = user_id);

create policy "Users can insert their own inventory"
  on public.inventory for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own inventory"
  on public.inventory for update
  using (auth.uid() = user_id);

create policy "Users can delete their own inventory"
  on public.inventory for delete
  using (auth.uid() = user_id);

-- Create indexes
create index if not exists inventory_user_id_idx on public.inventory(user_id);
create index if not exists inventory_produit_idx on public.inventory(produit);
create index if not exists inventory_date_entree_idx on public.inventory(date_entree desc);
