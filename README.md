# Quick PDF Filler

A single-page web app for filling in PDF forms fast: type text, drop in today's date, tick boxes with a check or an X, and sign. Everything runs in your browser. The PDF is never uploaded anywhere.

## Use it

Open `index.html` in a browser (or the GitHub Pages URL for this repo), then:

1. **Open PDF** (or drag a PDF onto the window). A sample form loads at start so you can try the tools.
2. Pick a tool and click on the page:

   | Tool | Key | What it does |
   |---|---|---|
   | Select | `V` | Click to select, drag to move |
   | Text | `T` | Click and type. Click again later to edit |
   | Date | `D` | Places today's date (format picker in the toolbar) |
   | Check | `C` | ✓ mark. Stays active so you can tick several boxes |
   | X | `X` | ✗ mark. Stays active too |
   | Signature | `S` | Draw it once, then click to place it |

3. Drag the corner square to resize (text size, mark size, signature width). `Delete` removes the selected item, arrow keys nudge it (`Shift` for bigger steps), `Ctrl+Z` undoes.
4. **Download PDF** saves `<name>-filled.pdf` with everything drawn into the page.

The ink color (black or blue), text size, date format and your signature are remembered in this browser's local storage. Untick "Remember on this device" in the signature dialog if you don't want the signature kept.

## How it works

- [pdf.js](https://mozilla.github.io/pdf.js/) renders the pages to canvas.
- Placed items are stored in PDF points, so zooming doesn't move them.
- [pdf-lib](https://pdf-lib.js.org/) writes the final file: text in Helvetica, marks as vector lines, the signature as a trimmed PNG.

No build step and no server. Both libraries load from a CDN.

## Limits

- Pages with a `/Rotate` setting may get items in the wrong spot in the download (you get a warning when that happens).
- Text uses Helvetica's character set. Characters outside it (emoji, most non-Latin scripts) are replaced with `?`.
- It draws on top of the page. It doesn't fill the PDF's own form fields.
