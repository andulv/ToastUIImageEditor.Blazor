# Follow-up Browser Verification — 2026-08-02

## Environment

- Sample URL: `http://127.0.0.1:5107`
- Browser: local headless Chrome through the Chrome DevTools Protocol
- Desktop viewport: 1440 by 1200 pixels
- Narrow viewport: 480 by 900 pixels
- Desktop screenshot: [browser-verification-followup-2026-08-02-desktop.png](browser-verification-followup-2026-08-02-desktop.png)
- Narrow screenshot: [browser-verification-followup-2026-08-02-narrow.png](browser-verification-followup-2026-08-02-narrow.png)

## Desktop layout and buttons

The Image, Draw, and Image adjustment groups were in the left column. The
canvas was central, from x=637 to x=1093. View and History were in the right
column at x=1109. The primary column measured 272 pixels, the canvas measured
456 pixels, and the right column measured 240 pixels.

Image controls used a two-column grid: paired controls measured 118 pixels
wide, while Resize, Start crop, and Custom rotate deliberately span the group
width (243 pixels). Every Image action showed a text label and visible icon.

## Crop, rotation, and resize

- Initially, Start crop was present and Apply crop was absent.
- Selecting Start crop hid it and showed adjacent Apply crop and Cancel crop.
- Selecting Cancel crop restored Start crop.
- Selecting Custom rotate opened its dialog. Entering 30 degrees and choosing
  Counterclockwise was accepted, then Apply rotation closed the dialog.
- Selecting Resize opened its dialog with canvas-derived dimensions of 1086 by
  1448 and Keep aspect ratio selected. Reducing width to 1076 updated height to
  1435. Closing the dialog left the image unchanged.

## Narrow viewport

At 480 pixels, the primary controls, canvas, and secondary controls each
measured 417 pixels wide. The layout had no horizontal overflow. Controls
remained visible with consistent paired widths and adequate touch targets.

## Runtime health

This verification had no failed request, console entry, or JavaScript exception.
All network assets were local to `127.0.0.1:5107`; no CDN or usage-statistics
request occurred.
