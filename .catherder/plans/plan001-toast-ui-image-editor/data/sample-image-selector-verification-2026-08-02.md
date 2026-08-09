# Sample Image Selector Verification — 2026-08-02

## Browser session

- Sample URL: `http://127.0.0.1:5107`
- Browser: local headless Chrome through the Chrome DevTools Protocol
- Screenshot: [sample-image-selector-verification-2026-08-02.png](sample-image-selector-verification-2026-08-02.png)
- Viewport: 1440 by 1200 pixels

## Results

The page-load selector listed these root-level images in alphabetical order:

1. `landscape.svg`
2. `portrait.svg`
3. `square.svg`

The browser selected each option. Each selection recreated the native editor and
requested the matching local image URL. The final screenshot shows `square.svg`
in the full UI.

The editor wrapper and native editor each measured 1000 pixels wide in a
1440-pixel viewport. The editor height measured 720 pixels. The native header,
Download button, menu bar, and tool controls were visible without clipping.

For the negative check, the verification temporarily added an unsupported
`ignored.txt` file and `nested/ignored.svg`. A page refresh still listed only
the three root-level supported images. The temporary files were removed after
the check.

## Conclusion

Refreshing the page discovers supported images that an operator adds to
`wwwroot/images/samples/`. The page does not list nested files or unsupported
extensions. The constrained layout avoids the previous full-width, short-editor
appearance.
