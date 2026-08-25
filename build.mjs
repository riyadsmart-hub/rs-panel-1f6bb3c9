import fs from 'node:fs';
import crypto from 'node:crypto';
import zlib from 'node:zlib';
const S = '/private/tmp/claude-501/-Users-kod64/c3da57af-b7e9-4191-9402-c8fcc6751810/scratchpad';
const OUT = '/Users/kod64/risport-tracker/panel';
const KEYFILE = '/Users/kod64/risport-tracker/.panel-key';

// كلمة المرور: تُولَّد مرّة وتبقى — لا تُطبع في المحادثة، تُقرأ من الملف
let pass;
if (fs.existsSync(KEYFILE)) pass = fs.readFileSync(KEYFILE, 'utf8').trim();
else {
  const words = crypto.randomBytes(9).toString('base64url');
  pass = `risport-${words}`;
  fs.writeFileSync(KEYFILE, pass + '\n', { mode: 0o600 });
}

// الحمولة = بيانات اللوحة نفسها، مضغوطة ثم مشفّرة
const html = fs.readFileSync(`${S}/admin/admin.html`, 'utf8');
const DATA = html.match(/<script id="data" type="application\/json">([\s\S]*?)<\/script>/)[1];
const CSS = html.match(/<style id="sty">([\s\S]*?)<\/style>/)[1];
const APP = html.match(/<script id="app">([\s\S]*?)<\/script>\s*$/)[1];

const salt = crypto.randomBytes(16);
const iv = crypto.randomBytes(12);
const ITER = 250000;
const key = crypto.pbkdf2Sync(pass, salt, ITER, 32, 'sha256');
const gz = zlib.gzipSync(Buffer.from(DATA, 'utf8'), { level: 9 });
const c = crypto.createCipheriv('aes-256-gcm', key, iv);
const ct = Buffer.concat([c.update(gz), c.final()]);
const blob = { s: salt.toString('base64'), i: iv.toString('base64'), t: c.getAuthTag().toString('base64'), c: ct.toString('base64'), n: ITER };

// تطبيق اللوحة معدّلاً: الحفظ في localStorage بدل قدرة الأرتيفاكت
const appLocal = APP
  .replace("var ADDED = JSON.parse(document.getElementById('added').textContent);",
    "var ADDED = JSON.parse(localStorage.getItem('rs_added') || '[]');")
  .replace(/function save\(\)\s*\{[\s\S]*?\n  \}\n/,
`function save() {
    try {
      localStorage.setItem('rs_added', JSON.stringify(ADDED));
      msg = { k: 'ok', t: 'حُفظ على هذا الجهاز. أرسل لكلود «افحص الجديد» ليملأ مصادره.' };
      form = { input: '', brand: form.brand, colors: '', salla: '', note: '' };
    } catch (e) { msg = { k: 'err', t: 'تعذّر الحفظ محلياً — تحقّق من مساحة المتصفّح.' }; }
    render();
  }
`);

const page = `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="robots" content="noindex,nofollow,noarchive">
<meta name="theme-color" content="#004C9C">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="لوحة اليابان">
<title>لوحة منتجات اليابان</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap">
<style id="sty">${CSS}
/* بوّابة الدخول */
.gate{min-height:100dvh;display:grid;place-items:center;padding:24px}
.gbox{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:26px 24px;box-shadow:var(--shadow);width:100%;max-width:380px;text-align:center}
.gbox h1{font-size:20px;margin:0 0 6px}
.gbox p{color:var(--dim);font-size:13px;margin:0 0 18px}
.gbox input{font:inherit;font-size:16px;width:100%;padding:11px 14px;border:1px solid var(--line);border-radius:10px;background:var(--sunk);color:var(--ink);text-align:center;direction:ltr}
.gbox input:focus{outline:2px solid var(--brand);outline-offset:1px}
.gbox button{width:100%;margin-top:12px;background:var(--brand);border-color:var(--brand);color:#fff;font-weight:600;font-size:15px;padding:11px}
.gerr{color:var(--accent);font-size:12.5px;margin-top:10px;min-height:18px}
.gremember{display:flex;align-items:center;gap:7px;justify-content:center;margin-top:12px;font-size:12.5px;color:var(--dim)}
</style></head><body>
<div id="gate" class="gate"><div class="gbox">
  <h1>لوحة منتجات اليابان</h1><p>هذه الصفحة تحوي تكاليفك وهوامشك — أدخل كلمة المرور لفتحها.</p>
  <input id="pw" type="password" autocomplete="current-password" placeholder="كلمة المرور" enterkeyhint="go">
  <label class="gremember"><input id="rem" type="checkbox" checked style="width:auto"> تذكّرني على هذا الجهاز</label>
  <button id="go">افتح</button><div id="gerr" class="gerr"></div>
</div></div>
<div id="root"></div>
<script id="blob" type="application/json">${JSON.stringify(blob)}</script>
<script>
(function () {
  var B = JSON.parse(document.getElementById('blob').textContent);
  var b64 = function (s) { var r = atob(s), u = new Uint8Array(r.length); for (var i = 0; i < r.length; i++) u[i] = r.charCodeAt(i); return u; };
  async function unlock(pass) {
    var enc = new TextEncoder();
    var base = await crypto.subtle.importKey('raw', enc.encode(pass), 'PBKDF2', false, ['deriveKey']);
    var key = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt: b64(B.s), iterations: B.n, hash: 'SHA-256' },
      base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
    var ctTag = new Uint8Array(b64(B.c).length + b64(B.t).length);
    ctTag.set(b64(B.c)); ctTag.set(b64(B.t), b64(B.c).length);
    var plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64(B.i) }, key, ctTag);
    var ds = new DecompressionStream('gzip');
    var txt = await new Response(new Blob([plain]).stream().pipeThrough(ds)).text();
    return txt;
  }
  function boot(json) {
    var s = document.createElement('script');
    s.id = 'data'; s.type = 'application/json'; s.textContent = json;
    document.body.appendChild(s);
    document.getElementById('gate').remove();
    var a = document.createElement('script'); a.id = 'app'; a.textContent = APP_SRC;
    document.body.appendChild(a);
  }
  var go = document.getElementById('go'), pw = document.getElementById('pw'), err = document.getElementById('gerr');
  async function attempt(p, quiet) {
    try { var j = await unlock(p); if (document.getElementById('rem').checked) localStorage.setItem('rs_pw', p); boot(j); }
    catch (e) { if (!quiet) { err.textContent = 'كلمة المرور غير صحيحة'; pw.select(); } localStorage.removeItem('rs_pw'); }
  }
  go.onclick = function () { err.textContent = ''; attempt(pw.value, false); };
  pw.onkeydown = function (e) { if (e.key === 'Enter') go.click(); };
  var saved = localStorage.getItem('rs_pw');
  if (saved) attempt(saved, true); else pw.focus();
})();
</script>
<script>var APP_SRC = ${JSON.stringify(appLocal)};</script>
</body></html>`;

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(`${OUT}/index.html`, page);
fs.writeFileSync(`${OUT}/robots.txt`, 'User-agent: *\nDisallow: /\n');
fs.writeFileSync(`${OUT}/.nojekyll`, '');
console.log('✔ panel/index.html —', (fs.statSync(`${OUT}/index.html`).size / 1024).toFixed(0), 'KB');
console.log('  كلمة المرور في:', KEYFILE, '(٦٠٠)');
