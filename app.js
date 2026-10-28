const D = {
  en: {
    title: 'Classic Cipher Algorithms', algo: 'Algorithm', a_caesar: 'Caesar', a_vernam: 'Vernam', a_vigenere: 'Vigenère', a_affine: 'Affine', a_bigram: 'Bigram Affine',
    enc: 'Encrypt', dec: 'Decrypt', text: 'Text', ph_text: 'Type your text here…', ph_hex: 'Paste ciphertext as hex (e.g. 1a 2b 3c)…', variant: 'Variant',
    v_bits: 'Bits (binary XOR)', v_letters: 'Letters (mod 26)', v_std: 'Standard: C = (a·P + b) mod 676', v_hill: 'Matrix (2×2, Hill-style)',
    nonlet: 'Non-letter characters (spaces, digits…)', keep: 'Keep in place', remove: 'Remove', auto: 'Generate key', run: 'Run', result: 'Result', steps: 'Steps',
    play: '▶ Auto-play', pause: '⏸ Pause', all: 'Show all', one: 'One by one', in: 'Input', out: 'Output', key: 'Key', shift: 'Shift',
    s_shift: 'Shift the alphabet', s_each: 'Compute each letter', s_keyrep: 'Repeat the key under the text', s_nums: 'Letters → numbers (A=0 … Z=25)', s_check: 'Check the key',
    s_formula: 'Formula', s_bits: 'Text → bits', s_keybits: 'Key → bits', s_pairs: 'Split letters into pairs', s_matrix: 'Key matrix', final: 'Final result', calc: 'Calculation', bits: 'Bits',
    padx: 'Odd number of letters: padded with X at the end.',
    e_key: 'Key must contain letters.', e_a26: 'a must be coprime with 26.', e_a676: 'a must be coprime with 676 (odd and not a multiple of 13).', e_det: 'Determinant must be coprime with 26.',
    e_vlen: 'Vernam key must be at least as long as the text.', e_hex: 'Ciphertext must be valid hex (even number of digits).', e_odd: 'Ciphertext must have an even number of letters.', e_empty: 'Please enter text with letters.', e_int: 'Key values must be whole numbers.'
  },
  uz: {
    title: 'Klassik shifrlash algoritmlari', algo: 'Algoritm', a_caesar: 'Sezar', a_vernam: 'Vernam', a_vigenere: 'Vijiner', a_affine: 'Affin', a_bigram: 'Bigramga asoslangan Affin',
    enc: 'Shifrlash', dec: 'Deshifrlash', text: 'Matn', ph_text: 'Matnni shu yerga kiriting…', ph_hex: 'Shifrmatnni hex ko\'rinishida kiriting (masalan 1a 2b 3c)…', variant: 'Variant',
    v_bits: 'Bitli (ikkilik XOR)', v_letters: 'Harfli (mod 26)', v_std: 'Standart: C = (a·P + b) mod 676', v_hill: 'Matritsali (2×2, Hill usuli)',
    nonlet: 'Harf bo\'lmagan belgilar (probel, raqam…)', keep: 'O\'z joyida qoldirish', remove: 'Olib tashlash', auto: 'Kalit yaratish', run: 'Bajarish', result: 'Natija', steps: 'Bosqichlar',
    play: '▶ Avtomatik', pause: '⏸ To\'xtatish', all: 'Hammasini ko\'rsatish', one: 'Birma-bir', in: 'Kirish', out: 'Chiqish', key: 'Kalit', shift: 'Siljish',
    s_shift: 'Alfavitni siljitish', s_each: 'Har bir harfni hisoblash', s_keyrep: 'Kalitni matn ostiga takrorlash', s_nums: 'Harflar → raqamlar (A=0 … Z=25)', s_check: 'Kalitni tekshirish',
    s_formula: 'Formula', s_bits: 'Matn → bitlar', s_keybits: 'Kalit → bitlar', s_pairs: 'Harflarni juftlarga bo\'lish', s_matrix: 'Kalit matritsasi', final: 'Yakuniy natija', calc: 'Hisob', bits: 'Bitlar',
    padx: 'Harflar soni toq: oxiriga X qo\'shildi.',
    e_key: 'Kalitda harflar bo\'lishi kerak.', e_a26: 'a soni 26 bilan o\'zaro tub bo\'lishi kerak.', e_a676: 'a soni 676 bilan o\'zaro tub bo\'lishi kerak (toq va 13 ga karrali emas).', e_det: 'Determinant 26 bilan o\'zaro tub bo\'lishi kerak.',
    e_vlen: 'Vernam kaliti matndan qisqa bo\'lmasligi kerak.', e_hex: 'Shifrmatn to\'g\'ri hex bo\'lishi kerak (juft sondagi raqamlar).', e_odd: 'Shifrmatndagi harflar soni juft bo\'lishi kerak.', e_empty: 'Harflardan iborat matn kiriting.', e_int: 'Kalit qiymatlari butun son bo\'lishi kerak.'
  }
};
const $ = id => document.getElementById(id), esc = s => s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
let lang = localStorage.getItem('lang') || 'en', S = [], ix = 0, showAll = false, timer = null;
const T = k => (D[lang] && D[lang][k]) || D.en[k] || k;
const VAR = { vernam: ['bits', 'letters'], bigram: ['std', 'hill'] }, isDec = () => document.querySelector('[name=mode]:checked').value === 'dec';

function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(e => e.textContent = T(e.dataset.i18n));
  document.querySelectorAll('[data-ph]').forEach(e => e.placeholder = T(e.dataset.ph));
  $('lang').textContent = lang === 'en' ? 'UZ' : 'EN'; $('play').textContent = T(timer ? 'pause' : 'play'); $('all').textContent = T(showAll ? 'one' : 'all');
}
function fieldList() {
  const al = $('algo').value, v = $('variant').value;
  if (al === 'caesar') return [['k1', 'shift']];
  if (al === 'vernam' || al === 'vigenere') return [['k1', 'key', 1]];
  if (al === 'affine') return [['k1', 'a'], ['k2', 'b']];
  return v === 'hill' ? [['k1', 'a'], ['k2', 'b'], ['k3', 'c'], ['k4', 'd']] : [['k1', 'a'], ['k2', 'b']];
}
function hints() {
  const al = $('algo').value, v = $('variant').value;
  $('nlRow').hidden = al === 'vernam' && v === 'bits';
  $('text').dataset.ph = (al === 'vernam' && v === 'bits' && isDec()) ? 'ph_hex' : 'ph_text';
  applyLang();
}
function buildFields() {
  $('fields').innerHTML = fieldList().map(([id, l, tx]) => `<label><span data-i18n="${l}"></span><input id="${id}" type="${tx ? 'text' : 'number'}"></label>`).join('');
  hints();
}

// That is very good

function onAlgo() {
  const v = VAR[$('algo').value], cur = $('variant').value;
  $('varRow').hidden = !v;
  if (v) { $('variant').innerHTML = v.map(x => `<option value="${x}" data-i18n="v_${x}"></option>`).join(''); if (v.includes(cur)) $('variant').value = cur }
  
  const ICON_COPY = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
  const ICON_OK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
  $('copy').innerHTML = ICON_COPY;
  $('copy').onclick = async () => {
    const txt = $('res').textContent;
    try { await navigator.clipboard.writeText(txt) }
    catch { const ta = document.createElement('textarea'); ta.value = txt; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove() }
    $('copy').innerHTML = ICON_OK; $('copy').classList.add('done');
    setTimeout(() => { $('copy').innerHTML = ICON_COPY; $('copy').classList.remove('done') }, 1500);
  };
  buildFields();
}
function auto() {
  const al = $('algo').value, vr = $('variant').value, t = $('text').value, r = n => Math.floor(Math.random() * n),
    pick = (s, n) => Array.from({ length: n }, () => s[r(s.length)]).join('');
  if (al === 'caesar') $('k1').value = 1 + r(25);
  else if (al === 'vigenere') $('k1').value = pick(AZ, 6);
  else if (al === 'vernam') {
    const n = vr === 'letters' ? letters(t).length : isDec() ? t.replace(/[^0-9a-f]/gi, '').length >> 1 : new TextEncoder().encode(t).length;
    $('k1').value = pick(vr === 'letters' ? AZ : AZ + AZ.toLowerCase() + '0123456789', Math.max(n, 1));
  } else if (al === 'affine') { const A = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25]; $('k1').value = A[r(12)]; $('k2').value = r(26) }
  else if (vr === 'std') { let a; do a = 1 + r(675); while (gcd(a, 676) !== 1); $('k1').value = a; $('k2').value = r(676) }
  else { let m; do m = [r(26), r(26), r(26), r(26)]; while (gcd(mod(m[0] * m[3] - m[1] * m[2], 26), 26) !== 1); m.forEach((x, i) => $('k' + (i + 1)).value = x) }
}
function run() {
  stop();
  const al = $('algo').value, vr = $('variant').value, dec = isDec(), t = $('text').value, keep = $('nonlet').value === 'keep',
    v = id => $(id) ? $(id).value : '', n = id => { const x = Number(v(id)); if (v(id).trim() === '' || !Number.isInteger(x)) throw Error(T('e_int')); return x };
  try {
    const o = { dec, keep, variant: vr }; let r;
    if (!(al === 'vernam' && vr === 'bits') && !letters(t).length) throw Error(T('e_empty'));
    if (al === 'caesar') { o.k = mod(n('k1'), 26); r = caesar(t, o) }
    else if (al === 'vigenere') { o.key = v('k1'); r = vigenere(t, o) }
    else if (al === 'vernam') { o.key = v('k1'); if (!o.key) throw Error(T('e_key')); r = vernam(t, o) }
    else if (al === 'affine') { o.a = n('k1'); o.b = n('k2'); r = affine(t, o) }
    else { o.a = n('k1'); o.b = n('k2'); if (vr === 'hill') { o.c = n('k3'); o.d = n('k4') } r = bigram(t, o) }
    $('err').textContent = '';
    S = [...r.steps, { title: T('final'), body: `<div class="final">${esc(r.out)}</div>` }]; ix = 0; showAll = false;
    $('res').textContent = r.out; $('out').hidden = false; view(); applyLang();
  } catch (e) { $('err').textContent = e.message; $('out').hidden = true }
}
function view() {
  const card = (s, i) => `<article class="step"><h3><span>${i + 1}</span>${s.title}</h3>${s.body}</article>`;
  $('stepbox').innerHTML = showAll ? S.map(card).join('') : card(S[ix], ix);
  $('pos').textContent = `${ix + 1} / ${S.length}`; $('prev').disabled = showAll || ix === 0; $('next').disabled = showAll || ix === S.length - 1;
}
function stop() { clearInterval(timer); timer = null; $('play').textContent = T('play') }
$('algo').onchange = onAlgo; $('variant').onchange = buildFields;
document.querySelectorAll('[name=mode]').forEach(e => e.onchange = hints);
$('auto').onclick = auto; $('run').onclick = run;
$('prev').onclick = () => { stop(); ix--; view() }; $('next').onclick = () => { stop(); ix++; view() };
$('all').onclick = () => { stop(); showAll = !showAll; view(); applyLang() };
$('play').onclick = () => {
  if (timer) return stop();
  showAll = false; if (ix >= S.length - 1) ix = 0; view(); $('play').textContent = T('pause');
  timer = setInterval(() => { if (ix < S.length - 1) { ix++; view() } else stop() }, 1600);
};
$('lang').onclick = () => { lang = lang === 'en' ? 'uz' : 'en'; localStorage.setItem('lang', lang); applyLang(); if (!$('out').hidden) run() };
$('theme').onclick = () => { const h = document.documentElement, d = h.dataset.theme === 'dark'; h.dataset.theme = d ? 'light' : 'dark'; $('theme').textContent = d ? '☾' : '☀' };
onAlgo();
