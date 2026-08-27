# EasyViz

Escolha a visualização certa, entenda o porquê, e monte a história por trás dos seus dados — baseado nos princípios do livro *Storytelling com Dados*.

A ferramenta em si (`public/vizmap.html`) continua funcionando 100% no navegador — descrever KPIs, enviar CSV/XLSX, gerar gráficos e insights não depende de login nem de servidor. O login é opcional, só pra quem quiser (no futuro) salvar ou compartilhar análises.

## Rodando localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:3000` — a rota `/` serve `public/vizmap.html` (configurado em `next.config.js`).

## Configurar o login (Supabase)

O login usa e-mail/senha e Google, via [Supabase Auth](https://supabase.com/docs/guides/auth). Sem essa configuração, o site funciona normalmente — só o botão de login mostra "Login não configurado".

### 1. Criar o projeto no Supabase

1. Em [supabase.com](https://supabase.com), crie um novo projeto.
2. Vá em **Project Settings → API**.
3. Copie a **Project URL** e a **anon public key**.

### 2. Preencher `public/vizmap-config.js`

Abra o arquivo e substitua os dois placeholders pelos valores copiados acima:

```js
window.VIZMAP_SUPABASE_URL = "https://xxxxxxxx.supabase.co";
window.VIZMAP_SUPABASE_ANON_KEY = "eyJhbGciOi...";
```

Esses dois valores são seguros pra ficar públicos no código — é assim que o Supabase foi desenhado pra funcionar em apps client-side. **Nunca** coloque a `service_role key` aqui (essa é secreta).

### 3. (Opcional) Ativar login com Google

1. No [Google Cloud Console](https://console.cloud.google.com/), crie um projeto (ou use um existente) e configure a "OAuth consent screen".
2. Em **APIs & Services → Credentials**, crie um **OAuth client ID** do tipo *Web application*.
3. Em **Authorized redirect URIs**, adicione:
   ```
   https://SEU-PROJETO.supabase.co/auth/v1/callback
   ```
   (troque `SEU-PROJETO` pela referência do seu projeto Supabase — está na Project URL).
4. Copie o **Client ID** e o **Client Secret** gerados.
5. No painel do Supabase, vá em **Authentication → Providers → Google**, ative, e cole os dois valores.

### 4. Apontar o Supabase pro domínio de produção

No painel do Supabase, em **Authentication → URL Configuration**, defina:
- **Site URL**: a URL de produção (ex.: `https://easyviz.vercel.app`, depois de fazer o deploy).
- **Redirect URLs**: adicione a mesma URL (e `http://localhost:3000` pra testar localmente).

Sem isso, o login com Google redireciona pro lugar errado depois de autenticar.

## Deploy (Vercel)

1. Importe este repositório no [Vercel](https://vercel.com/new).
2. Não é necessário configurar variáveis de ambiente — a configuração do Supabase vive em `public/vizmap-config.js` (veja acima), que já vai commitado no repositório depois de preenchido.
3. Deploy automático a cada push.

## Estrutura

```
public/
  vizmap.html         a ferramenta em si (a mesma que já existia)
  vizmap-config.js     chaves públicas do Supabase (preencher — passo 2 acima)
app/
  layout.js            layout raiz mínimo, exigido pelo Next.js
next.config.js         faz a rota "/" servir public/vizmap.html
```

O motor de análise (recomendação de gráficos, cálculo de insights, renderização) continua inteiramente dentro de `vizmap.html`, em JavaScript puro — nada disso passou a depender de backend. O Supabase entra só pra autenticação.

## Próximos passos (roadmap)

- Decidir o que exatamente "salvar uma análise" significa (só a configuração/insights, ou também os dados enviados) — isso muda a política de privacidade.
- Implementar a função de salvar/carregar (tabela no Supabase + regras de Row Level Security).
- Ajustar a política de privacidade da página pra refletir o modo com conta.
