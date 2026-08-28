-- EasyViz — tabela de dashboards salvos.
--
-- Como rodar: painel do Supabase → seu projeto → SQL Editor → cole este
-- arquivo inteiro → Run. É seguro rodar mais de uma vez (usa "if not exists"
-- e recria as policies).
--
-- Guarda, por dashboard salvo: o nome, os dados enviados (dataset) e a
-- configuração dos widgets (gráficos, filtros, tamanhos, ordem). Protegido
-- por Row Level Security: cada usuário só enxerga e mexe nos próprios
-- dashboards — isso é obrigatório aqui, não uma opção, já que a tabela
-- guarda os dados que o usuário enviou.

create table if not exists public.dashboards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  dataset jsonb not null,
  widgets jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.dashboards enable row level security;

drop policy if exists "Users can view their own dashboards" on public.dashboards;
create policy "Users can view their own dashboards"
  on public.dashboards for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own dashboards" on public.dashboards;
create policy "Users can insert their own dashboards"
  on public.dashboards for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own dashboards" on public.dashboards;
create policy "Users can update their own dashboards"
  on public.dashboards for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own dashboards" on public.dashboards;
create policy "Users can delete their own dashboards"
  on public.dashboards for delete
  using (auth.uid() = user_id);

create or replace function public.dashboards_set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists dashboards_set_updated_at on public.dashboards;
create trigger dashboards_set_updated_at
  before update on public.dashboards
  for each row execute function public.dashboards_set_updated_at();
