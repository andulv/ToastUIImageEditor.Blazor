# Browser Verification — 2026-08-02

## Environment

- Sample URL: `http://127.0.0.1:5107`
- Browser: local headless Chrome through the Chrome DevTools Protocol
- Desktop screenshot: [browser-verification-2026-08-02-desktop.png](browser-verification-2026-08-02-desktop.png)
- Narrow screenshot: [browser-verification-2026-08-02-narrow.png](browser-verification-2026-08-02-narrow.png)
- Viewports: 1440 by 1200 and 480 by 900 pixels

## Grouped surface

The desktop browser displayed View, History, Image, Draw, and Image Adjustment.
Reset was absent. The desktop control column measured 304 pixels wide. The
canvas measured 680 pixels wide and 754 pixels high, so it remained the main
working surface beside the controls.

At 480 pixels, every group and the canvas measured 417 pixels wide. The groups
stacked vertically. No horizontal overflow or clipped native control appeared.

## Operation and deletion flow

1. Added a rectangle with the Draw group.
   - The Delete selected control became enabled.
2. Replaced `window.confirm` with a Cancel result and selected Delete all added
   objects.
   - The confirmation text stated that the base image remains unchanged.
   - The selected-object delete control remained enabled, which confirms that
     cancellation did not clear the object.
3. Replaced `window.confirm` with an Accept result and selected Delete all added
   objects.
   - The selected-object delete control became disabled, which confirms that
     the added object was cleared.
4. Applied a clockwise rotation and the grayscale toggle.
   - The grayscale control showed its selected state.

## Network and console

All HTTP requests used `127.0.0.1:5107`. There were no failed network requests,
no CDN request, no usage-statistics request, and no JavaScript exception.

Chrome logged one upstream Canvas2D performance warning after grayscale used
Fabric filtering: `getImageData` recommends `willReadFrequently`. It is not an
application error and the pinned Fabric implementation creates that context;
the wrapper does not call `getImageData` or modify vendor code.

## Conclusion

The browser verified the grouped control surface, Reset absence, responsive
layout, object deletion, Delete All cancellation and acceptance, and
representative image operations. The canvas is the visual focus on desktop and
remains usable at the narrow viewport.
