// Configuração do login (Supabase) do EasyViz.
// Esses dois valores são PÚBLICOS por natureza — a "anon key" do Supabase é
// feita pra ficar exposta no navegador (a segurança de verdade vem das regras
// de Row Level Security configuradas no projeto Supabase, não do sigilo desta chave).
// NUNCA coloque aqui a "service_role key" — essa sim é secreta e nunca deve
// aparecer em código que roda no navegador.
//
// Onde pegar esses valores: painel do Supabase → seu projeto → Project Settings → API.

window.VIZMAP_SUPABASE_URL = "https://rpdiwgjhkmpadcxcfvwj.supabase.co";
window.VIZMAP_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwZGl3Z2poa21wYWRjeGNmdndqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NDE5MTYsImV4cCI6MjEwMzMxNzkxNn0.TDXgevo67ZrgN_sZCLJzJLk2omjBa7t1o4GDOQ5Pp5A";
