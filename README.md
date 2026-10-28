# Classic Cipher Visualizer

An interactive web app that encrypts and decrypts text with classic cipher algorithms and shows every step of the process visually. Built with plain HTML, CSS and JavaScript, with no frameworks and no build step.

## Features

- **5 algorithms:** Caesar, Vernam, Vigenère, Affine, Bigram-based Affine
- **Encryption and decryption** for every algorithm
- **Step-by-step visualization:** alphabet shifts, key repetition, modular arithmetic tables, XOR bit rows, pair and matrix calculations
- **Step controls:** previous / next, auto-play, or show all steps at once
- **Key options:** type your own key or generate a valid one automatically
- **Non-letter characters:** choose to keep them in place or remove them
- **Copy result** to the clipboard with one click
- **UZ / EN language toggle** (remembered between visits)
- **Light / dark theme toggle**
- **Responsive layout** for desktop, tablet and mobile

## Algorithms and variants

| Algorithm | Details |
|-----------|---------|
| Caesar | Shift key 0–25 |
| Vernam | **Bits:** ASCII → binary XOR, output in hex. **Letters:** (P + K) mod 26. Key must be at least as long as the text |
| Vigenère | Repeating alphabetic key |
| Affine | C = (a·P + b) mod 26, with gcd(a, 26) = 1 |
| Bigram Affine | **Standard:** C = (a·P + b) mod 676, where P = 26·x + y. **Matrix:** 2×2 Hill-style key, with det coprime to 26. Odd-length text is padded with `X` |

The alphabet is English A–Z (26 letters).

## Run locally

No installation needed. Open `index.html` in a browser.

Or serve it with any static server:

```bash
npx serve .
```


## Project structure

```
├── index.html    # page markup
├── style.css     # styles, themes and responsive rules
├── ciphers.js    # cipher algorithms and step generation
├── app.js        # UI logic, translations (UZ/EN), controls
└── vercel.json   # Vercel headers and settings
```

## Note

These are classical ciphers made for learning. They are **not secure** and should not be used to protect real data.