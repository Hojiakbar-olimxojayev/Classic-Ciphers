// Classic cipher algorithms. Each returns {out, steps:[{title, body}]}. T() = translator from app.js
const AZ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', mod = (n, m) => ((n % m) + m) % m, gcd = (a, b) => b ? gcd(b, a % b) : a;
const inv = (a, m) => { a = mod(a, m); for (let i = 1; i < m; i++)if (a * i % m === 1) return i; return null };
const isL = c => /[A-Za-z]/.test(c), letters = t => [...t].filter(isL).map(c => c.toUpperCase());
const rebuild = (t, o, keep) => { let r = '', i = 0; if (keep) for (const c of t) r += isL(c) ? (o[i++] || '') : c; return r + o.slice(i).join('') };
const plain = h => String(h).replace(/<[^>]*>/g, '');
const rows = (r, cls = '') => {
  const budget = (typeof innerWidth !== 'undefined' && innerWidth < 600) ? 32 : 72,
    lab = Math.max(...r.map(x => plain(x[0]).length)),
    w = Math.max(1, ...r.flatMap(x => x.slice(1).map(c => plain(c).length))) + 2,
    n = Math.max(2, Math.min(16, Math.floor((budget - lab) / w))),
    len = Math.max(...r.map(x => x.length - 1)), out = [];
  for (let s = 0; s < len; s += n)
    out.push(`<div class="tw"><table class="${cls}">${r.map(x => `<tr><th>${x[0]}</th>${x.slice(1 + s, 1 + s + n).map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</table></div>`);
  return out.join('');
};
const hl = c => `<b class="hl">${c}</b>`, note = h => `<p class="note">${h}</p>`, sg = s => s < 0 ? '−' : '+';
const hex = b => b.toString(16).padStart(2, '0'), bin = b => b.toString(2).padStart(8, '0');

function caesar(t, { k, dec, keep }) {
  const s = dec ? -k : k, L = letters(t), used = new Set(L), n = L.map(c => AZ.indexOf(c)), o = n.map(v => AZ[mod(v + s, 26)]);
  return {
    out: rebuild(t, o, keep), steps: [
      { title: T('s_shift'), body: note(`${T('shift')}: <b>${sg(s)}${Math.abs(s)}</b>`) + rows([[T('in'), ...[...AZ].map(c => used.has(c) ? hl(c) : c)], [T('out'), ...[...AZ].map((_, i) => AZ[mod(i + s, 26)])]]) },
      { title: T('s_each'), body: rows([[T('in'), ...L], ['#', ...n], [`# ${sg(s)} ${Math.abs(s)} mod 26`, ...n.map(v => mod(v + s, 26))], [T('out'), ...o.map(hl)]]) }]
  };
}

function vigenere(t, { key, dec, keep }) {
  const K = letters(key); if (!K.length) throw Error(T('e_key'));
  const L = letters(t), s = dec ? -1 : 1, kk = L.map((_, i) => K[i % K.length]), p = L.map(c => AZ.indexOf(c)), q = kk.map(c => AZ.indexOf(c)),
    r = p.map((v, i) => mod(v + s * q[i], 26)), o = r.map(v => AZ[v]);
  return {
    out: rebuild(t, o, keep), steps: [
      { title: T('s_keyrep'), body: rows([[T('in'), ...L], [T('key'), ...kk]]) },
      { title: T('s_nums'), body: rows([[T('in'), ...L], ['P/C', ...p], [T('key'), ...kk], ['K', ...q]]) },
      { title: T('s_each'), body: rows([[`P/C ${sg(s)} K`, ...p.map((v, i) => v + s * q[i])], ['mod 26', ...r], [T('out'), ...o.map(hl)]]) }]
  };
}

function affine(t, { a, b, dec, keep }) {
  if (gcd(a, 26) !== 1) throw Error(T('e_a26'));
  const ai = inv(a, 26), L = letters(t), x = L.map(c => AZ.indexOf(c)),
    y = x.map(v => dec ? mod(ai * (v - b), 26) : mod(a * v + b, 26)), o = y.map(v => AZ[v]);
  return {
    out: rebuild(t, o, keep), steps: [
      { title: T('s_check'), body: note(`gcd(${a}, 26) = 1 ✓` + (dec ? `<br>${a}·${ai} = ${a * ai} ≡ 1 (mod 26) → a⁻¹ = <b>${ai}</b>` : '')) },
      { title: T('s_formula'), body: note(dec ? `P = a⁻¹·(C − b) mod 26 = ${ai}·(C − ${b}) mod 26` : `C = (a·P + b) mod 26 = (${a}·P + ${b}) mod 26`) },
      { title: T('s_nums'), body: rows([[T('in'), ...L], ['x', ...x]]) },
      { title: T('s_each'), body: rows([[T('calc'), ...x.map(v => dec ? `${ai}·(${v}−${b})=${ai * (v - b)}` : `${a}·${v}+${b}=${a * v + b}`)], ['mod 26', ...y], [T('out'), ...o.map(hl)]]) }]
  };
}

function vernam(t, { key, dec, keep, variant }) {
  if (variant === 'letters') {
    const K = letters(key), L = letters(t); if (K.length < L.length) throw Error(T('e_vlen'));
    const s = dec ? -1 : 1, p = L.map(c => AZ.indexOf(c)), q = p.map((_, i) => AZ.indexOf(K[i])), r = p.map((v, i) => mod(v + s * q[i], 26)), o = r.map(v => AZ[v]);
    return {
      out: rebuild(t, o, keep), steps: [
        { title: T('s_keyrep'), body: rows([[T('in'), ...L], [T('key'), ...K.slice(0, L.length)]]) },
        { title: T('s_nums'), body: rows([['P/C', ...p], ['K', ...q]]) },
        { title: T('s_each'), body: rows([[`P/C ${sg(s)} K`, ...p.map((v, i) => v + s * q[i])], ['mod 26', ...r], [T('out'), ...o.map(hl)]]) }]
    };
  }
  const kb = [...new TextEncoder().encode(key)]; let tb;
  if (dec) { const h = t.replace(/[^0-9a-f]/gi, ''); if (!h.length || h.length % 2) throw Error(T('e_hex')); tb = h.match(/../g).map(x => parseInt(x, 16)) }
  else tb = [...new TextEncoder().encode(t)];
  if (kb.length < tb.length) throw Error(T('e_vlen'));
  const ob = tb.map((v, i) => v ^ kb[i]), ch = b => b > 32 && b < 127 ? String.fromCharCode(b) : '·',
    out = dec ? new TextDecoder().decode(new Uint8Array(ob)) : ob.map(hex).join(' ');
  return {
    out, steps: [
      { title: T('s_bits'), body: rows([[dec ? 'hex' : T('in'), ...tb.map(v => dec ? hex(v) : ch(v))], [T('bits'), ...tb.map(bin)]]) },
      { title: T('s_keybits'), body: rows([[T('key'), ...tb.map((_, i) => ch(kb[i]))], [T('bits'), ...tb.map((_, i) => bin(kb[i]))]]) },
      { title: 'XOR ⊕', body: rows([[T('in'), ...tb.map(bin)], ['⊕ ' + T('key'), ...tb.map((_, i) => bin(kb[i]))], ['=', ...ob.map(v => hl(bin(v)))], [dec ? T('out') : 'hex', ...ob.map(v => dec ? ch(v) : hex(v))]]) }]
  };
}

function bigram(t, { a, b, c, d, dec, keep, variant }) {
  const L = letters(t); let pad = false;
  if (L.length % 2) { if (dec) throw Error(T('e_odd')); L.push('X'); pad = true }
  const pr = []; for (let i = 0; i < L.length; i += 2)pr.push([AZ.indexOf(L[i]), AZ.indexOf(L[i + 1])]);
  const nm = p => AZ[p[0]] + AZ[p[1]],
    s1 = { title: T('s_pairs'), body: (pad ? note(T('padx')) : '') + rows([[T('in'), ...pr.map(nm)], ['(x, y)', ...pr.map(p => `(${p[0]}, ${p[1]})`)]]) };
  let steps, op;
  if (variant === 'std') {
    if (gcd(a, 676) !== 1) throw Error(T('e_a676'));
    const ai = inv(a, 676), P = pr.map(p => 26 * p[0] + p[1]), C = P.map(v => dec ? mod(ai * (v - b), 676) : mod(a * v + b, 676));
    op = C.map(v => [Math.floor(v / 26), v % 26]);
    steps = [
      { title: T('s_check'), body: note(`gcd(${a}, 676) = 1 ✓` + (dec ? `<br>${a}·${ai} = ${a * ai} ≡ 1 (mod 676) → a⁻¹ = <b>${ai}</b>` : '') + '<br>' + (dec ? `P = a⁻¹·(C − b) mod 676` : `C = (a·P + b) mod 676`)) },
      s1,
      { title: T('s_nums'), body: rows([[T('in'), ...pr.map(nm)], ['P = 26·x + y', ...pr.map((p, i) => `26·${p[0]}+${p[1]}=${P[i]}`)]]) },
      { title: T('s_each'), body: rows([[T('calc'), ...P.map(v => dec ? `${ai}·(${v}−${b})=${ai * (v - b)}` : `${a}·${v}+${b}=${a * v + b}`)], ['mod 676', ...C], ['(⌊N/26⌋, N mod 26)', ...op.map(p => `(${p})`)], [T('out'), ...op.map(p => hl(nm(p)))]]) }];
  } else {
    const det = mod(a * d - b * c, 26); if (gcd(det, 26) !== 1) throw Error(T('e_det'));
    const di = inv(det, 26), M = dec ? [d, -b, -c, a].map(v => mod(v * di, 26)) : [a, b, c, d].map(v => mod(v, 26)),
      mx = m => `[ ${m[0]} ${m[1]} ; ${m[2]} ${m[3]} ]`;
    op = pr.map(p => [mod(M[0] * p[0] + M[1] * p[1], 26), mod(M[2] * p[0] + M[3] * p[1], 26)]);
    steps = [
      { title: T('s_matrix'), body: note(`K = ${mx([a, b, c, d])}<br>det = ${a}·${d} − ${b}·${c} = ${a * d - b * c} ≡ ${det} (mod 26), gcd(${det}, 26) = 1 ✓` + (dec ? `<br>det⁻¹ = ${di}<br>K⁻¹ = det⁻¹·[ d −b ; −c a ] mod 26 = <b>${mx(M)}</b>` : '')) },
      s1,
      { title: T('s_each'), body: rows([[T('in'), ...pr.map(nm)], ["x'", ...pr.map(p => `${M[0]}·${p[0]}+${M[1]}·${p[1]}=${M[0] * p[0] + M[1] * p[1]}`)], ["y'", ...pr.map(p => `${M[2]}·${p[0]}+${M[3]}·${p[1]}=${M[2] * p[0] + M[3] * p[1]}`)], ['mod 26', ...op.map(p => `(${p})`)], [T('out'), ...op.map(p => hl(nm(p)))]]) }];
  }
  return { out: rebuild(t, op.flat().map(v => AZ[v]), keep), steps };
}
