// Configuração do login (Supabase) do EasyViz.
// Esses dois valores são PÚBLICOS por natureza — a "anon key" do Supabase é
// feita pra ficar exposta no navegador (a segurança de verdade vem das regras
// de Row Level Security configuradas no projeto Supabase, não do sigilo desta chave).
// NUNCA coloque aqui a "service_role key" — essa sim é secreta e nunca deve
// aparecer em código que roda no navegador.
//
// Onde pegar esses valores: painel do Supabase → seu projeto → Project Settings → API.

window.VIZMAP_SUPABASE_URL = "COLE_AQUI_A_URL_DO_SEU_PROJETO_SUPABASE";
window.VIZMAP_SUPABASE_ANON_KEY = "COLE_AQUI_A_CHAVE_ANON_PUBLICA";
