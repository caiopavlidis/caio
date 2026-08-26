// Copia o bundle UMD do @supabase/supabase-js pra public/vendor, pra ser
// carregado por vizmap.html com uma <script> comum, sem depender de nenhum
// CDN externo em tempo de execução (evita indisponibilidade externa afetar o login).
const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'node_modules', '@supabase', 'supabase-js', 'dist', 'umd', 'supabase.js');
const destDir = path.join(__dirname, '..', 'public', 'vendor');
const dest = path.join(destDir, 'supabase.js');

if (!fs.existsSync(src)) {
  console.warn('[copy-supabase-umd] bundle não encontrado em', src, '— rode "npm install" primeiro.');
  process.exit(0);
}

fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(src, dest);
console.log('[copy-supabase-umd] copiado para public/vendor/supabase.js');
