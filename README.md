# Filler

Fill in PDF forms fast, on a phone or a computer: type text, drop in today's date, tick boxes with a check or an X, and sign. Everything runs on your device. The PDF is never uploaded.

**Live app: https://jpasserin.github.io/filler/**

It installs like the other apps in the family (Tally, Slate, Bench): on a phone use *Share → Add to Home Screen* (iOS) or *Install app* (Android/Chrome). Once installed it works offline.

## Use it

1. **Open** a PDF (or drag one onto the window). A sample form loads at start so you can try the tools.
2. Pick a tool in the bottom bar and tap the page:

   | Tool | Key | What it does |
   |---|---|---|
   | Select | `V` | Tap to select, drag to move |
   | Text | `T` | Tap and type. Tap it again later to edit |
   | Date | `D` | Today's date (format picker in the strip above the tools) |
   | Check | `C` | ✓ mark. Stays active so you can tick several boxes |
   | X | `X` | ✗ mark. Stays active too |
   | Sign | `S` | Places the chosen signature |

3. The strip above the tools has **Size −/+** and **Delete** for the selected item (or drag the outlined square at an item's corner). **Undo** is in the header (`Ctrl+Z`). Pinch to zoom on a phone.
4. **Download** saves `<name>-filled.pdf`. On a phone it opens the share sheet, so you can save it to Files or send it straight away.

## Signatures

Keep as many as you need, one per person (you, your partner…). Each one is made one of three ways:

- **Draw** it with a finger, stylus or mouse.
- **Type** a name and pick one of eight handwriting fonts.
- **Upload** a photo or scan of a signature on white paper. The paper is removed automatically and the ink recolored black or blue. A *Clean-up* slider handles shadows or faint ink.

Signatures are saved in this browser's storage and are there next time you open the app. They never leave the device. To use them on another phone or computer, create them there too.

## How it works

- [pdf.js](https://mozilla.github.io/pdf.js/) renders the pages; [pdf-lib](https://pdf-lib.js.org/) writes the final file (text in Helvetica, marks as vector lines, signatures as trimmed PNGs).
- Placed items are stored in PDF points, so zooming doesn't move them.
- `sw.js` caches the app, the libraries and the handwriting fonts for offline use. When shipping a change, bump `VERSION` in `sw.js` and `APP_VERSION` in `index.html` together. It only clears its own `filler-*` caches, since the other apps share the `jpasserin.github.io` site.
- Tap the **Filler.** name for About: the version running, the offline copy, a Hard reload, and how to install it (with a QR code on a computer to open it on your phone).

No build step and no server: `index.html` is the whole app.

## Limits

- Pages with a `/Rotate` setting may get items in the wrong spot in the download (you get a warning).
- Text uses Helvetica's character set. Characters outside it (emoji, most non-Latin scripts) become `?`.
- It draws on top of the page. It doesn't fill the PDF's own form fields.
