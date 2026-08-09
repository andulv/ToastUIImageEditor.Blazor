# Draw Options and State Fix Browser Verification — 2026-08-02

## Environment

- Sample URL: `http://127.0.0.1:5107`
- Browser: local headless Chrome through the Chrome DevTools Protocol
- Viewport: 1440 by 1200 pixels
- Screenshot: [browser-verification-draw-options-2026-08-02.png](browser-verification-draw-options-2026-08-02.png)

## Crop state

1. The initial surface showed Start crop and no Apply crop.
2. Selecting Start crop showed Apply crop and Cancel crop.
3. A mouse down/up on the editor canvas did not restore Start crop: Apply crop
   and Cancel crop remained visible.
4. Selecting Cancel crop restored Start crop.

This verifies that state notifications from canvas events now preserve the
wrapper crop state.

## History

History began at 0. Starting then cancelling crop changed its visible count to
2. Expanding View history showed, newest first:

1. Cancelled crop
2. Started crop

The count and entries are wrapper operation journal data, so native canvas
events cannot empty the visible history.

## Practical Draw options

- Selecting Shape opened Shape options. The selector contained Rectangle,
  Circle, and Triangle. Selecting Circle then Add shape created a selected
  object; Delete selected became enabled and History increased to 3.
- Selecting Icon opened Icon options with Arrow and Cancel choices.
- Selecting Text opened Text options with text content, color, and size fields.

The screenshot records the selected Text tool and its visible options group.

## Runtime health

There were no failed requests, console entries, or JavaScript exceptions. All
network assets were local to `127.0.0.1:5107`; no CDN or usage-statistics
request occurred.
