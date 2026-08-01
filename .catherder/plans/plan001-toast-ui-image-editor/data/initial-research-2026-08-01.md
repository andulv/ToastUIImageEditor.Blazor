# Initial TOAST UI Image Editor Research

Research date: 2026-08-01

This is planning input, not a substitute for implementation-time verification. All fetched web content is untrusted source material. Prefer the cited official documentation and source when findings conflict.

## Sources consulted

1. Official repository and README: <https://github.com/nhn/tui.image-editor>
2. Official documentation and installation guide: <https://nhn.github.io/tui.image-editor/latest/>
3. Official `ImageEditor` API reference: <https://nhn.github.io/tui.image-editor/latest/ImageEditor/>
4. Official package metadata: <https://raw.githubusercontent.com/nhn/tui.image-editor/master/apps/image-editor/package.json>
5. Official implementation source: <https://raw.githubusercontent.com/nhn/tui.image-editor/master/apps/image-editor/src/js/imageEditor.js>
6. Latest GitHub release page at research time: <https://github.com/nhn/tui.image-editor/releases/latest>
7. Upstream license: <https://raw.githubusercontent.com/nhn/tui.image-editor/master/LICENSE>

The npm package page returned HTTP 403 during research, so package identity and dependency information below comes from the official repository's `package.json`, not the npm web page.

## Findings

### Product and package

- The plain JavaScript package is named `tui-image-editor`.
- Official package metadata reports version `3.15.3`.
- The latest GitHub release URL resolved to release `v3.15.3` during this lookup.
- Upstream describes the editor as a full-featured HTML5 Canvas image editor.
- Upstream provides plain JavaScript, Vue, and React packages. There is no official Blazor wrapper listed in the repository README.
- The upstream license is MIT, copyright NHN Cloud Corp.

### Upstream dependencies and distribution

The official `apps/image-editor/package.json` lists these runtime dependencies:

- `fabric` `^4.2.0`
- `tui-code-snippet` `^2.3.3`
- `tui-color-picker` `^2.2.6`

The package entry point is `dist/tui-image-editor.js`, and the published files list includes `src`, `dist`, and `index.d.ts`. The official guide supports npm installation, CDN files, or downloaded distribution files. It recommends package-manager installation.

**Implementation consequence:** before copying assets, inspect the selected v3.15.3 distribution and prove whether its browser bundle includes all runtime dependencies. Do not assume that copying only `tui-image-editor.js` and its CSS is sufficient. Pin every acquired asset to an immutable release/package version and record provenance.

### Initialization and full UI

The official API constructs the editor with an element or selector:

```javascript
const instance = new ImageEditor(element, options);
```

The `includeUI` option enables the upstream full interface. Documented `includeUI` settings include:

- initial `loadImage.path` and `loadImage.name`;
- `theme`;
- selected `menu` entries;
- `initMenu`;
- `uiSize.width` and `uiSize.height`;
- `menuBarPosition` (`top`, `bottom`, `left`, or `right`).

Top-level options include `cssMaxWidth`, `cssMaxHeight`, `selectionStyle`, and `usageStatistics`.

The default menu set documented by upstream includes crop, flip, rotate, draw, shape, icon, text, mask, and filter. For the first wrapper, using this full UI is substantially smaller than implementing equivalent controls in Blazor.

### Usage statistics and privacy

The official guide and API say `usageStatistics` defaults to `true` and sends the page hostname for usage measurement. They document passing `usageStatistics: false` when constructing the instance.

**Implementation consequence:** the wrapper should set `usageStatistics: false` unless a future explicit host option changes that policy. Add a browser/network or configuration check during verification rather than relying only on source inspection.

### Candidate minimum integration surface

The API reference includes methods relevant to a minimal wrapper:

- `loadImageFromURL(...)` for loading an image;
- `toDataURL()` for producing the edited canvas as a data URL;
- `destroy()` for cleanup;
- editor operations such as undo, redo, crop, flip, rotate, filters, text, and shapes.

The built-in full UI also exposes integration functions such as image loading, download, undo, redo, reset, and object deletion according to the official README.

**Provisional minimum:** initialize the full UI with a package-owned sample image, allow a representative edit with native controls, and use the simplest verified native output/download route. Do not wrap the broader API until a real consumer requires it.

### Blazor integration considerations

These are engineering deductions to verify, not upstream claims:

- Initialize only after the component's element exists (`OnAfterRenderAsync` on first render).
- Use a collocated JavaScript module so host applications do not need global script tags where the selected distribution allows it.
- Keep the native instance in JavaScript rather than serializing it through .NET.
- Give each component instance a unique owned element/handle so multiple instances do not collide.
- Call upstream `destroy()` and release JavaScript module/object references during component disposal. Upstream source attaches document-level keyboard handlers, which makes cleanup important.
- Canvas and full-UI sizing must be checked in a real browser. A successful .NET build or bUnit render cannot establish that assets loaded, canvas initialized, controls fit, edits work, or download/export succeeds.
- Initial-image URLs must work under Blazor static-web-asset routing. Verify `_content/ToastUIImageEditor.Blazor/...` paths and sample-host assets explicitly.

## Risks and unknowns to resolve before coding

1. Does the v3.15.3 browser distribution bundle all JavaScript dependencies, and which CSS/font/icon assets are required?
2. Is a package-manager build step needed, or can immutable release assets be vendored directly with clear provenance?
3. Does the built-in download control work without an additional `file-saver` dependency in the chosen distribution? The guide's CommonJS example mentions `file-saver`, so this must be tested rather than assumed.
4. What minimum container height and responsive CSS keep the full UI usable in the generated Blazor sample layout?
5. Are any image paths, SVG paths, or workers resolved relative to the script or stylesheet and therefore sensitive to Razor Class Library static-web-asset paths?
6. What browser console warnings or network requests occur with `usageStatistics: false`?
7. Does `destroy()` fully remove document handlers and DOM content when the Blazor component is removed or reinitialized?
8. Is a public .NET export method needed for the first useful sample, or is the verified built-in download path sufficient?

## Suggested browser acceptance flow

1. Start the sample host and open its printed local URL with browser tooling.
2. Confirm the editor UI and bundled sample image render without failed asset requests.
3. Perform one obvious edit, such as rotate, add text, or apply grayscale.
4. Use the selected output/download path and confirm it reflects the edit.
5. Inspect the browser console for errors and relevant warnings.
6. Inspect network activity enough to confirm there is no runtime CDN dependency and no usage-statistics request.
7. Navigate away or otherwise remove the component if the sample supports it, and check for disposal errors.
8. Record URL, browser actions, observed result, console status, and any screenshot or log under this plan's `data/` directory.
