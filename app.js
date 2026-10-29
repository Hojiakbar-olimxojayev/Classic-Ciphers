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
    e_vlen: 'Vernam key must be at least as long as the text.', e_hex: 'Ciphertext must be valid hex (even number of digits).', e_odd: 'Ciphertext must have an even number of letters.', e_empty: 'Please enter text with letters.', e_int: 'Key values must be whole numbers.',
    info_t: `About this algorithm`, sym: `Symbol`,
    s_table: `Code table (symbol → 5 bits)`,
    table_note: `Every symbol gets a 5-bit code, but with 32 symbols. A–Z = 0–25 and the digits 0–5 = 26–31. Text and key are converted with this table.`,
    s_xrule: `The XOR rule`,
    xr_note: `XOR (⊕) gives 1 when the two bits are different and 0 when they are equal. It is the opposite of equivalence (XNOR).`,
    xn_enc: `Ciphertext = Plaintext ⊕ Key (bit by bit, then bits → symbol).`,
    xn_dec: `Plaintext = Ciphertext ⊕ Key: XOR with the same key undoes the encryption.`,
    h_len: `Key length`, h_short: `key is too short`, h_reduced: `reduced from`, h_decshift: `decryption shift`,
    h_noop: `k = 0 changes nothing`, h_period: `repeats every`, h_share: `shares the factor(s)`,
    h_ident: `a = 1 and b = 0 is the identity: nothing gets encrypted`,
    i_caesar: `<ul><li><b>Idea:</b> every letter moves <i>k</i> places forward in the alphabet (Z wraps to A).</li><li><b>Key:</b> one integer <i>k</i> from 0 to 25 (key length: 1 number). 26 possible keys; k = 0 changes nothing, so 25 are useful.</li><li><b>Encrypt:</b> C = (P + k) mod 26 &nbsp; <b>Decrypt:</b> P = (C − k) mod 26 = (C + (26 − k)) mod 26.</li><li><b>Special case:</b> k = 13 (ROT13) is its own inverse.</li><li><b>Weakness:</b> only 25 keys, so trying them all breaks it instantly; letter frequencies are unchanged.</li></ul>`,
    i_vigenere: `<ul><li><b>Idea:</b> a Caesar shift whose size changes with every letter, taken from a repeating keyword (A=0 … Z=25).</li><li><b>Key:</b> a word of letters A–Z, any length m ≥ 1 (non-letters in the key are ignored). Usually shorter than the text; it repeats every m letters. Possible keys: 26<sup>m</sup>.</li><li><b>Encrypt:</b> C<sub>i</sub> = (P<sub>i</sub> + K<sub>i mod m</sub>) mod 26 &nbsp; <b>Decrypt:</b> P<sub>i</sub> = (C<sub>i</sub> − K<sub>i mod m</sub>) mod 26.</li><li><b>Special cases:</b> m = 1 is a Caesar cipher; a random key as long as the text, used once, behaves like a one-time pad.</li><li><b>Weakness:</b> a short repeating key leaks its length (Kasiski test, index of coincidence); after that every position is an ordinary Caesar cipher.</li></ul>`,
    i_affine: `<ul><li><b>Idea:</b> multiply, then shift: C = (a·P + b) mod 26 (A=0 … Z=25).</li><li><b>Key:</b> two integers (a, b); they are reduced mod 26. <b>b</b> can be any value 0–25 (26 choices). <b>a</b> must be <b>coprime with 26</b>.</li><li><b>Why coprime?</b> 26 = 2 · 13, so a must share no prime factor with 26: a must be <b>odd</b> and <b>not a multiple of 13</b>. Otherwise two different letters give the same ciphertext letter and decryption is ambiguous. Example: a = 2 sends both A (0) and N (13) to the same letter, because 2·13 = 26 ≡ 0.</li><li><b>Valid a (12 values) → inverse a⁻¹:</b> %A%</li><li><b>Invalid a:</b> the even numbers 0, 2, 4 … 24 and 13: 14 values out of 0–25.</li><li><b>Key space:</b> φ(26) · 26 = 12 · 26 = 312 keys. a = 1, b = 0 is the identity (encrypts nothing), so 311 are useful.</li><li><b>Decrypt:</b> P = a⁻¹ · (C − b) mod 26, where a · a⁻¹ ≡ 1 (mod 26).</li><li><b>Special cases:</b> a = 1 is Caesar; a = 25 (≡ −1) with b = 25 is Atbash (reversed alphabet).</li><li><b>Weakness:</b> only 312 keys, and two known plaintext/ciphertext letter pairs are enough to solve for a and b.</li></ul>`,
    i_bigram_std: `<ul><li><b>Idea:</b> letters are taken in pairs. A pair (x, y) becomes one number P = 26·x + y (0–675), then an Affine cipher is applied modulo 26² = 676.</li><li><b>Text:</b> needs an even number of letters; if odd, X is added at the end (encryption). Ciphertext always has an even letter count.</li><li><b>Key:</b> two integers (a, b). <b>b</b>: any value 0–675 (676 choices). <b>a</b> must be coprime with 676.</li><li><b>Why coprime?</b> 676 = 2² · 13², so its only prime factors are 2 and 13: a must be <b>odd</b> and <b>not a multiple of 13</b>.</li><li><b>Counts:</b> φ(676) = 676 · (1 − 1/2) · (1 − 1/13) = 312 valid values of a out of 676, so the key space is 312 · 676 = 210,912 keys.</li><li><b>Examples:</b> a = 7 ✓ (7⁻¹ = 483, because 7·483 = 3381 = 5·676 + 1); a = 26 ✗ (even and a multiple of 13); a = 39 ✗ (3·13).</li><li><b>Decrypt:</b> P = a⁻¹ · (C − b) mod 676, then x = ⌊P / 26⌋ and y = P mod 26.</li><li><b>Strength:</b> hides single-letter frequencies; attacking it needs digraph (pair) statistics.</li></ul>`,
    i_bigram_hill: `<ul><li><b>Idea:</b> each letter pair is a vector (x, y), multiplied by a 2×2 key matrix K = [a b; c d] modulo 26.</li><li><b>Key:</b> four integers (a, b, c, d), each 0–25.</li><li><b>Rule:</b> det = a·d − b·c (mod 26) must be coprime with 26: <b>odd</b> and <b>not a multiple of 13</b>. Valid det values: 1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25.</li><li><b>Counts:</b> 157,248 of the 456,976 possible matrices (about 34%) are valid keys.</li><li><b>Text:</b> odd letter count → X is added at the end.</li><li><b>Decrypt:</b> use K⁻¹ = det⁻¹ · [d −b; −c a] mod 26.</li><li><b>Example:</b> K = [3 3; 2 5] has det = 15 − 6 = 9 ✓.</li></ul>`,
    i_vernam: `<ul><li><b>Idea:</b> the one-time pad. Every symbol becomes a 5-bit code and is XOR-ed with the 5-bit code of a key symbol; the result is turned back into a symbol.</li><li><b>Code table:</b> A–Z = 0–25 (00000–11001). 5 bits give 32 codes, so the 6 extra codes 26–31 are written as the digits 0–5; every XOR result is therefore always a symbol.</li><li><b>XOR rule:</b> 0⊕0 = 0 and 1⊕1 = 0 (equal bits → 0); 0⊕1 = 1 and 1⊕0 = 1 (different bits → 1).</li><li><b>Key length:</b> at least as long as the text: one key symbol per plaintext letter. Key symbols: A–Z and 0–5.</li><li><b>Key rules:</b> truly random, as long as the message, used only once. Reusing a key leaks information (C₁ ⊕ C₂ = P₁ ⊕ P₂).</li><li><b>Text:</b> only letters A–Z are encrypted. Spaces can be kept in place; other characters are removed. The ciphertext may contain the digits 0–5.</li><li><b>Decrypt:</b> the same operation, P = C ⊕ K, because (P ⊕ K) ⊕ K = P.</li><li><b>Key space:</b> 32<sup>n</sup> for n letters; with a random key it is unbreakable (perfect secrecy).</li></ul>`
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
    e_vlen: 'Vernam kaliti matndan qisqa bo\'lmasligi kerak.', e_hex: 'Shifrmatn to\'g\'ri hex bo\'lishi kerak (juft sondagi raqamlar).', e_odd: 'Shifrmatndagi harflar soni juft bo\'lishi kerak.', e_empty: 'Harflardan iborat matn kiriting.', e_int: 'Kalit qiymatlari butun son bo\'lishi kerak.',
    info_t: `Algoritm haqida`, sym: `Belgi`,
    s_table: `Kodlar jadvali (belgi → 5 bit)`,
    table_note: `Har bir belgi 5 bitli kod oladi. A–Z = 0–25, 0–5 raqamlari = 26–31. Matn va kalit shu jadval bo'yicha o'giriladi.`,
    s_xrule: `XOR qoidasi`,
    xr_note: `XOR (⊕) ikki bit har xil bo'lsa 1, teng bo'lsa 0 beradi. Bu ekvivalentlikning (XNOR) teskarisi.`,
    xn_enc: `Shifrmatn = Ochiq matn ⊕ Kalit (bit-bit, so'ng bitlar → belgi).`,
    xn_dec: `Ochiq matn = Shifrmatn ⊕ Kalit: bir xil kalit bilan XOR shifrlashni qaytaradi.`,
    h_len: `Kalit uzunligi`, h_short: `kalit juda qisqa`, h_reduced: `qisqartirildi:`, h_decshift: `deshifrlash siljishi`,
    h_noop: `k = 0 matnni o'zgartirmaydi`, h_period: `har ... harfda takrorlanadi:`, h_share: `umumiy bo'luvchi(lar):`,
    h_ident: `a = 1 va b = 0 — ayniy almashtirish: hech narsa shifrlanmaydi`,
    i_caesar: `<ul><li><b>G'oya:</b> har bir harf alifboda <i>k</i> o'rin oldinga suriladi (Z dan keyin yana A).</li><li><b>Kalit:</b> 0 dan 25 gacha bitta butun son <i>k</i> (kalit uzunligi: 1 ta son). Jami 26 ta kalit; k = 0 matnni o'zgartirmaydi, shuning uchun foydali kalitlar 25 ta.</li><li><b>Shifrlash:</b> C = (P + k) mod 26 &nbsp; <b>Deshifrlash:</b> P = (C − k) mod 26 = (C + (26 − k)) mod 26.</li><li><b>Alohida hol:</b> k = 13 (ROT13) o'ziga teskari.</li><li><b>Kamchiligi:</b> faqat 25 ta kalit bor, hammasini sinab ko'rish bir zumda ochadi; harflar chastotasi o'zgarmaydi.</li></ul>`,
    i_vigenere: `<ul><li><b>G'oya:</b> har bir harf uchun siljish miqdori o'zgaradigan Sezar shifri; siljish takrorlanuvchi kalit so'zdan olinadi (A=0 … Z=25).</li><li><b>Kalit:</b> A–Z harflaridan iborat so'z, uzunligi m ≥ 1 (kalitdagi harf bo'lmagan belgilar hisobga olinmaydi). Odatda matndan qisqa bo'ladi va har m harfda takrorlanadi. Kalitlar soni: 26<sup>m</sup>.</li><li><b>Shifrlash:</b> C<sub>i</sub> = (P<sub>i</sub> + K<sub>i mod m</sub>) mod 26 &nbsp; <b>Deshifrlash:</b> P<sub>i</sub> = (C<sub>i</sub> − K<sub>i mod m</sub>) mod 26.</li><li><b>Alohida hollar:</b> m = 1 bo'lsa Sezar shifri; matn uzunligidagi tasodifiy kalit bir marta ishlatilsa bir martalik bloknotga o'xshaydi.</li><li><b>Kamchiligi:</b> qisqa takrorlanuvchi kalit o'z uzunligini oshkor qiladi (Kasiski usuli, moslik indeksi); undan keyin har bir pozitsiya oddiy Sezar shifriga aylanadi.</li></ul>`,
    i_affine: `<ul><li><b>G'oya:</b> avval ko'paytiriladi, keyin suriladi: C = (a·P + b) mod 26 (A=0 … Z=25).</li><li><b>Kalit:</b> ikkita butun son (a, b); ular mod 26 bo'yicha qisqartiriladi. <b>b</b> — 0–25 oralig'idagi istalgan son (26 ta tanlov). <b>a</b> esa <b>26 bilan o'zaro tub</b> bo'lishi shart.</li><li><b>Nega o'zaro tub?</b> 26 = 2 · 13, demak a ning 26 bilan umumiy tub ko'paytuvchisi bo'lmasligi kerak: a <b>toq</b> va <b>13 ga karrali emas</b> bo'lishi kerak. Aks holda ikki xil harf bir xil shifr harfini beradi va deshifrlash noaniq bo'ladi. Misol: a = 2 bo'lsa A (0) va N (13) bir xil harfga o'tadi, chunki 2·13 = 26 ≡ 0.</li><li><b>To'g'ri a (12 ta qiymat) → teskari a⁻¹:</b> %A%</li><li><b>Yaroqsiz a:</b> barcha juft sonlar 0, 2, 4 … 24 va 13: 0–25 orasida 14 ta qiymat.</li><li><b>Kalitlar fazosi:</b> φ(26) · 26 = 12 · 26 = 312 ta kalit. a = 1, b = 0 ayniy almashtirish (hech narsani shifrlamaydi), shuning uchun 311 tasi foydali.</li><li><b>Deshifrlash:</b> P = a⁻¹ · (C − b) mod 26, bunda a · a⁻¹ ≡ 1 (mod 26).</li><li><b>Alohida hollar:</b> a = 1 bo'lsa Sezar; a = 25 (≡ −1) va b = 25 bo'lsa Atbash (teskari alifbo).</li><li><b>Kamchiligi:</b> kalit atigi 312 ta, va ikki juft ma'lum ochiq/shifr harf a va b ni topish uchun yetarli.</li></ul>`,
    i_bigram_std: `<ul><li><b>G'oya:</b> harflar juft-juft olinadi. (x, y) juft bitta P = 26·x + y (0–675) songa aylanadi, so'ng 26² = 676 moduli bo'yicha Affin shifri qo'llanadi.</li><li><b>Matn:</b> harflar soni juft bo'lishi kerak; toq bo'lsa oxiriga X qo'shiladi (shifrlashda). Shifrmatnda harflar soni doim juft.</li><li><b>Kalit:</b> ikkita butun son (a, b). <b>b</b>: 0–675 oralig'idagi istalgan son (676 ta tanlov). <b>a</b> 676 bilan o'zaro tub bo'lishi kerak.</li><li><b>Nega o'zaro tub?</b> 676 = 2² · 13², uning yagona tub bo'luvchilari 2 va 13: a <b>toq</b> va <b>13 ga karrali emas</b> bo'lishi kerak.</li><li><b>Hisob:</b> φ(676) = 676 · (1 − 1/2) · (1 − 1/13) = 676 ta ichida 312 ta to'g'ri a, demak kalitlar fazosi 312 · 676 = 210 912 ta.</li><li><b>Misollar:</b> a = 7 ✓ (7⁻¹ = 483, chunki 7·483 = 3381 = 5·676 + 1); a = 26 ✗ (juft va 13 ga karrali); a = 39 ✗ (3·13).</li><li><b>Deshifrlash:</b> P = a⁻¹ · (C − b) mod 676, so'ng x = ⌊P / 26⌋ va y = P mod 26.</li><li><b>Kuchli tomoni:</b> alohida harflar chastotasini yashiradi; uni buzish uchun juftliklar (bigramma) statistikasi kerak.</li></ul>`,
    i_bigram_hill: `<ul><li><b>G'oya:</b> har bir harf jufti (x, y) vektor bo'lib, 2×2 kalit matritsasi K = [a b; c d] ga mod 26 bo'yicha ko'paytiriladi.</li><li><b>Kalit:</b> to'rtta butun son (a, b, c, d), har biri 0–25.</li><li><b>Qoida:</b> det = a·d − b·c (mod 26) 26 bilan o'zaro tub bo'lishi kerak: <b>toq</b> va <b>13 ga karrali emas</b>. To'g'ri det qiymatlari: 1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25.</li><li><b>Hisob:</b> mumkin bo'lgan 456 976 ta matritsadan 157 248 tasi (taxminan 34%) yaroqli kalit.</li><li><b>Matn:</b> harflar soni toq bo'lsa oxiriga X qo'shiladi.</li><li><b>Deshifrlash:</b> K⁻¹ = det⁻¹ · [d −b; −c a] mod 26 dan foydalaniladi.</li><li><b>Misol:</b> K = [3 3; 2 5] uchun det = 15 − 6 = 9 ✓.</li></ul>`,
    i_vernam: `<ul><li><b>G'oya:</b> bir martalik bloknot. Har bir belgi 5 bitli kodga aylantiriladi va kalit belgisining 5 bitli kodi bilan XOR qilinadi; natija yana belgiga o'giriladi.</li><li><b>Kodlar jadvali:</b> A–Z = 0–25 (00000–11001). 5 bit 32 ta kod beradi, shuning uchun ortiqcha 6 ta kod 26–31 raqamlar 0–5 sifatida yoziladi; shu tufayli XOR natijasi doim belgiga to'g'ri keladi.</li><li><b>XOR qoidasi:</b> 0⊕0 = 0 va 1⊕1 = 0 (teng bitlar → 0); 0⊕1 = 1 va 1⊕0 = 1 (har xil bitlar → 1).</li><li><b>Kalit uzunligi:</b> kamida matn uzunligicha: har bir ochiq matn harfiga bitta kalit belgisi. Kalit belgilari: A–Z va 0–5.</li><li><b>Kalit qoidalari:</b> haqiqatan tasodifiy, xabar uzunligida va faqat bir marta ishlatiladi. Kalitni qayta ishlatish ma'lumot sizdiradi (C₁ ⊕ C₂ = P₁ ⊕ P₂).</li><li><b>Matn:</b> faqat A–Z harflari shifrlanadi. Probellarni o'z joyida qoldirish mumkin; boshqa belgilar olib tashlanadi. Shifrmatnda 0–5 raqamlari uchrashi mumkin.</li><li><b>Deshifrlash:</b> xuddi shu amal, P = C ⊕ K, chunki (P ⊕ K) ⊕ K = P.</li><li><b>Kalitlar fazosi:</b> n harf uchun 32<sup>n</sup>; tasodifiy kalit bilan shifrni ochib bo'lmaydi (mutlaq maxfiylik).</li></ul>`
  }
};
const $ = id => document.getElementById(id),
  esc = s => s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
let lang = localStorage.getItem('lang') || 'en', S = [], ix = 0, showAll = false, timer = null;
const T = k => (D[lang] && D[lang][k]) || D.en[k] || k;
const VAR = { bigram: ['std', 'hill'] };
const isDec = () => document.querySelector('[name=mode]:checked').value === 'dec';
const valid = m => { const r = []; for (let a = 1; a < m; a++) if (gcd(a, m) === 1) r.push(a); return r };

const ICON_COPY = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
const ICON_OK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';

/* ---------- language / info / key hints ---------- */
function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(e => (e.textContent = T(e.dataset.i18n)));
  document.querySelectorAll('[data-ph]').forEach(e => (e.placeholder = T(e.dataset.ph)));
  $('lang').textContent = lang === 'en' ? 'UZ' : 'EN';
  $('play').textContent = T(timer ? 'pause' : 'play');
  $('all').textContent = T(showAll ? 'one' : 'all');
  info();
  keyHint();
}

function info() {
  const al = $('algo').value, v = $('variant').value,
    k = al === 'bigram' ? 'i_bigram_' + v : 'i_' + al;
  $('info').innerHTML = T(k).replace('%A%', valid(26).map(a => `${a}→${inv(a, 26)}`).join(', '));
}

function keyHint() {
  const al = $('algo').value, vr = $('variant').value,
    g = id => ($(id) ? $(id).value.trim() : ''),
    num = id => (/^-?\d+$/.test(g(id)) ? +g(id) : null),
    h = [],
    ok = m => `<span class="ok">✓ ${m}</span>`,
    bad = m => `<span class="bad">✗ ${m}</span>`,
    cop = (x, m) => {
      const r = mod(x, m), d = gcd(r, m), f = [2, 13].filter(p => r % p === 0);
      return d === 1
        ? ok(`gcd(${x}, ${m}) = 1 → a⁻¹ = ${inv(x, m)}`)
        : bad(`gcd(${x}, ${m}) = ${d}: ${T('h_share')} ${f.join(' & ')}`);
    };

  if (al === 'caesar') {
    const k = num('k1');
    if (k !== null) {
      const r = mod(k, 26);
      h.push(r
        ? ok(`k = ${r}${r !== k ? ` (${T('h_reduced')} ${k})` : ''}; ${T('h_decshift')}: ${26 - r}`)
        : bad(T('h_noop')));
    }
  } else if (al === 'vigenere') {
    if (g('k1')) {
      const n = letters(g('k1')).length;
      h.push(n ? ok(`${T('h_len')}: ${n} — ${T('h_period')} ${n}`) : bad(T('e_key')));
    }
  } else if (al === 'vernam') {
    const raw = $('k1') ? $('k1').value : '';
    if (raw) {
      const n = [...raw.toUpperCase()].filter(c => VA.includes(c)).length,
        need = [...$('text').value.toUpperCase()].filter(c => (isDec() ? VA : AZ).includes(c)).length;
      h.push(n >= need && n > 0
        ? ok(`${T('h_len')}: ${n} / ${need}`)
        : bad(`${T('h_len')}: ${n} / ${need} — ${T('h_short')}`));
    }
  } else if (al === 'affine') {
    const a = num('k1'), b = num('k2');
    if (a !== null) {
      h.push(cop(a, 26));
      if (mod(a, 26) === 1 && b !== null && mod(b, 26) === 0) h.push(bad(T('h_ident')));
    }
  } else if (vr === 'std') {
    const a = num('k1');
    if (a !== null) h.push(cop(a, 676));
  } else {
    const [a, b, c, d] = ['k1', 'k2', 'k3', 'k4'].map(num);
    if ([a, b, c, d].every(x => x !== null)) {
      const det = mod(a * d - b * c, 26), gd = gcd(det, 26), f = [2, 13].filter(p => det % p === 0);
      h.push(gd === 1
        ? ok(`det = ${a}·${d} − ${b}·${c} ≡ ${det} (mod 26), det⁻¹ = ${inv(det, 26)}`)
        : bad(`det ≡ ${det} (mod 26), gcd(${det}, 26) = ${gd}: ${T('h_share')} ${f.join(' & ')}`));
    }
  }
  $('keyhint').innerHTML = h.join('<br>');
}

/* ---------- form building ---------- */
function fieldList() {
  const al = $('algo').value, v = $('variant').value;
  if (al === 'caesar') return [['k1', 'shift']];
  if (al === 'vernam' || al === 'vigenere') return [['k1', 'key', 1]];
  if (al === 'affine') return [['k1', 'a'], ['k2', 'b']];
  return v === 'hill'
    ? [['k1', 'a'], ['k2', 'b'], ['k3', 'c'], ['k4', 'd']]
    : [['k1', 'a'], ['k2', 'b']];
}

function buildFields() {
  $('fields').innerHTML = fieldList()
    .map(([id, l, tx]) => `<label><span data-i18n="${l}"></span><input id="${id}" type="${tx ? 'text' : 'number'}"></label>`)
    .join('');
  applyLang();
}

function onAlgo() {
  const v = VAR[$('algo').value], cur = $('variant').value;
  $('varRow').hidden = !v;
  if (v) {
    $('variant').innerHTML = v.map(x => `<option value="${x}" data-i18n="v_${x}"></option>`).join('');
    if (v.includes(cur)) $('variant').value = cur;
  }
  buildFields();
}

/* ---------- auto key ---------- */
function auto() {
  const al = $('algo').value, vr = $('variant').value, t = $('text').value,
    r = n => Math.floor(Math.random() * n),
    pick = (s, n) => Array.from({ length: n }, () => s[r(s.length)]).join('');
  if (al === 'caesar') $('k1').value = 1 + r(25);
  else if (al === 'vigenere') $('k1').value = pick(AZ, 6);
  else if (al === 'vernam') {
    const n = [...t.toUpperCase()].filter(c => (isDec() ? VA : AZ).includes(c)).length;
    $('k1').value = pick(VA, Math.max(n, 1));
  } else if (al === 'affine') {
    const A = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];
    $('k1').value = A[r(12)];
    $('k2').value = r(26);
  } else if (vr === 'std') {
    let a;
    do a = 1 + r(675); while (gcd(a, 676) !== 1);
    $('k1').value = a;
    $('k2').value = r(676);
  } else {
    let m;
    do m = [r(26), r(26), r(26), r(26)]; while (gcd(mod(m[0] * m[3] - m[1] * m[2], 26), 26) !== 1);
    m.forEach((x, i) => ($('k' + (i + 1)).value = x));
  }
}

/* ---------- run + step viewer ---------- */
function run() {
  stop();
  const al = $('algo').value, vr = $('variant').value, dec = isDec(), t = $('text').value,
    keep = $('nonlet').value === 'keep',
    v = id => ($(id) ? $(id).value : ''),
    n = id => {
      const x = Number(v(id));
      if (v(id).trim() === '' || !Number.isInteger(x)) throw Error(T('e_int'));
      return x;
    };
  try {
    const o = { dec, keep, variant: vr };
    let r;
    if (al !== 'vernam' && !letters(t).length) throw Error(T('e_empty'));
    if (al === 'caesar') { o.k = mod(n('k1'), 26); r = caesar(t, o); }
    else if (al === 'vigenere') { o.key = v('k1'); r = vigenere(t, o); }
    else if (al === 'vernam') { o.key = v('k1'); if (!o.key) throw Error(T('e_key')); r = vernam(t, o); }
    else if (al === 'affine') { o.a = n('k1'); o.b = n('k2'); r = affine(t, o); }
    else {
      o.a = n('k1'); o.b = n('k2');
      if (vr === 'hill') { o.c = n('k3'); o.d = n('k4'); }
      r = bigram(t, o);
    }
    $('err').textContent = '';
    S = [...r.steps, { title: T('final'), body: `<div class="final">${esc(r.out)}</div>` }];
    ix = 0; showAll = false;
    $('res').textContent = r.out;
    $('out').hidden = false;
    view();
    applyLang();
  } catch (e) {
    $('err').textContent = e.message;
    $('out').hidden = true;
  }
}

function view() {
  const card = (s, i) => `<article class="step"><h3><span>${i + 1}</span>${s.title}</h3>${s.body}</article>`;
  $('stepbox').innerHTML = showAll ? S.map(card).join('') : card(S[ix], ix);
  $('pos').textContent = `${ix + 1} / ${S.length}`;
  $('prev').disabled = showAll || ix === 0;
  $('next').disabled = showAll || ix === S.length - 1;
}

function stop() {
  clearInterval(timer);
  timer = null;
  $('play').textContent = T('play');
}

/* ---------- events ---------- */
$('algo').onchange = onAlgo;
$('variant').onchange = buildFields;
document.querySelectorAll('[name=mode]').forEach(e => (e.onchange = applyLang));
$('fields').addEventListener('input', keyHint);
$('text').addEventListener('input', keyHint);

$('auto').onclick = () => { auto(); keyHint(); };
$('run').onclick = run;

$('prev').onclick = () => { stop(); ix--; view(); };
$('next').onclick = () => { stop(); ix++; view(); };
$('all').onclick = () => { stop(); showAll = !showAll; view(); applyLang(); };
$('play').onclick = () => {
  if (timer) return stop();
  showAll = false;
  if (ix >= S.length - 1) ix = 0;
  view();
  $('play').textContent = T('pause');
  timer = setInterval(() => { if (ix < S.length - 1) { ix++; view(); } else stop(); }, 1600);
};

$('lang').onclick = () => {
  lang = lang === 'en' ? 'uz' : 'en';
  localStorage.setItem('lang', lang);
  applyLang();
  if (!$('out').hidden) run();
};
$('theme').onclick = () => {
  const h = document.documentElement, d = h.dataset.theme === 'dark';
  h.dataset.theme = d ? 'light' : 'dark';
  $('theme').textContent = d ? '☾' : '☀';
};

/* ---------- copy result ---------- */
$('copy').innerHTML = ICON_COPY;
$('copy').onclick = async () => {
  const txt = $('res').textContent;
  try { await navigator.clipboard.writeText(txt); }
  catch {
    const ta = document.createElement('textarea');
    ta.value = txt;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  }
  $('copy').innerHTML = ICON_OK;
  $('copy').classList.add('done');
  setTimeout(() => { $('copy').innerHTML = ICON_COPY; $('copy').classList.remove('done'); }, 1500);
};

/* ---------- rebuild tables when crossing the phone/desktop width ---------- */
let wasMobile = innerWidth < 600;
addEventListener('resize', () => {
  const m = innerWidth < 600;
  if (m !== wasMobile) { wasMobile = m; if (!$('out').hidden) run(); }
});

/* ---------- auto-growing text box ---------- */
const ta = $('text');
ta.addEventListener('input', () => {
  ta.style.height = 'auto';
  ta.style.height = Math.min(ta.scrollHeight + 2, 320) + 'px';
});

/* ---------- start ---------- */
onAlgo();