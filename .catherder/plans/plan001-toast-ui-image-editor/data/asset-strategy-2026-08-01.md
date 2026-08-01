# Asset Strategy — 2026-08-01

## Decision

Use the published, version-pinned browser distributions below. T02 must obtain
only the listed files, place them as Razor Class Library static assets, and
must not add a runtime CDN or an npm build step to the sample application.

Acquire the packages into a temporary directory with:

```bash
npm pack tui-image-editor@3.15.3 tui-color-picker@2.2.6 file-saver@2.0.5
```

Verify the package integrity values before extracting the listed files. The
expected values observed with `npm pack --dry-run` are:

| Package | Version | SHA-512 integrity |
|---|---:|---|
| `tui-image-editor` | 3.15.3 | `sha512-7B5YUxe2eSSh+8YrlREmjqkgeFFKrVkdy0D/G0dWCJIQ2WLPQ/Bkm02WXQeWJiFPzgvargZjn7eAe80p3qBHPQ==` |
| `tui-color-picker` | 2.2.6 | `sha512-+GBTUFGOkDaFiyYt/4IJTKA68Oj7fC9lU+RHs56luyFHYSO3gWuvsZntxAvFFeCGiZFFhu9XQQaZ0rVS5TUOmA==` |
| `file-saver` | 2.0.5 | `sha512-P9bmyZ3h/PRG+Nzga+rbdI4OEpNDzAVyy74uVO9ATgzLK6VtAsYybF/+TOCvrc0MO793d6+42lLyZTw7/ArVzA==` |

Keep the component assets under
`src/ToastUIImageEditor.Blazor/wwwroot/lib/toast-ui-image-editor/3.15.3/` and
FileSaver under
`src/ToastUIImageEditor.Blazor/wwwroot/lib/file-saver/2.0.5/`. Those versioned
folders make the runtime dependency visible in the packaged static-web-asset
path.

## Exact files for T02

| Target path under `wwwroot` | Source package/version | Source URL |
|---|---|---|
| `lib/toast-ui-image-editor/3.15.3/tui-image-editor.min.js` | `tui-image-editor` 3.15.3 | <https://raw.githubusercontent.com/nhn/tui.image-editor/v3.15.3/apps/image-editor/dist/tui-image-editor.min.js> |
| `lib/toast-ui-image-editor/3.15.3/tui-image-editor.min.css` | `tui-image-editor` 3.15.3 | <https://raw.githubusercontent.com/nhn/tui.image-editor/v3.15.3/apps/image-editor/dist/tui-image-editor.min.css> |
| `lib/toast-ui-image-editor/3.15.3/tui-image-editor-bi.svg` | `tui-image-editor` 3.15.3 | <https://raw.githubusercontent.com/nhn/tui.image-editor/v3.15.3/apps/image-editor/src/svg/icon-a/img-bi.svg> |
| `lib/toast-ui-image-editor/3.15.3/tui-color-picker.min.js` | `tui-color-picker` 2.2.6 | <https://raw.githubusercontent.com/nhn/tui.color-picker/v2.2.6/dist/tui-color-picker.min.js> |
| `lib/toast-ui-image-editor/3.15.3/tui-color-picker.min.css` | `tui-color-picker` 2.2.6 | <https://raw.githubusercontent.com/nhn/tui.color-picker/v2.2.6/dist/tui-color-picker.min.css> |
| `lib/file-saver/2.0.5/FileSaver.min.js` | `file-saver` 2.0.5 | <https://registry.npmjs.org/file-saver/-/file-saver-2.0.5.tgz> (`package/dist/FileSaver.min.js`) |

The source tarballs for the two TOAST UI packages are respectively
<https://registry.npmjs.org/tui-image-editor/-/tui-image-editor-3.15.3.tgz> and
<https://registry.npmjs.org/tui-color-picker/-/tui-color-picker-2.2.6.tgz>.
Use these package archives for acquisition; the tagged source URLs above are
human-readable provenance for each selected file.

T02 must retain the upstream MIT notices. The sources are:

- <https://raw.githubusercontent.com/nhn/tui.image-editor/v3.15.3/LICENSE>
- <https://raw.githubusercontent.com/nhn/tui.color-picker/v2.2.6/LICENSE>
- `package/LICENSE.md` in the FileSaver 2.0.5 tarball above.

## Dependency conclusions

### Image Editor, Fabric, Code Snippet, and Color Picker

**Dependency bundling conclusion: not fully self-contained.** The Image Editor
3.15.3 webpack configuration externalizes `tui-color-picker`; its browser
bundle consequently needs `globalThis.tui.colorPicker`. The configuration
imports Fabric but does not externalize it, so Fabric 4.x is included in
`tui-image-editor.min.js`; do not vendor Fabric separately.

The same configuration names `tui-code-snippet` as an external only for the
package root, while the Image Editor imports its individual submodules. The
published Image Editor bundle contains those submodules. Color Picker 2.2.6 is
a standalone UMD bundle which also contains its `tui-code-snippet` dependency
and exposes `globalThis.tui.colorPicker`. **Do not vendor or build a separate
`tui-code-snippet` bundle.** Version 2.x no longer publishes one, and it is not
needed by these selected browser distributions.

Load scripts in this order:

1. `FileSaver.min.js` (sets `globalThis.saveAs`),
2. `tui-color-picker.min.js` (sets `globalThis.tui.colorPicker`),
3. `tui-image-editor.min.js` (sets `globalThis.tui.ImageEditor`).

The loader must inject the two stylesheets before editor construction:

1. `tui-color-picker.min.css`,
2. `tui-image-editor.min.css`.

### Download/output conclusion

**FileSaver is required for the intended built-in Download button path.** The
Image Editor 3.15.3 download action calls `window.saveAs` when it is available;
without it, it opens the data URL in a new window rather than downloading a
file. Therefore the sample must load FileSaver 2.0.5 before the Image Editor.
No .NET export API is needed for the first slice.

### CSS, fonts, and icons conclusion

**Required CSS: yes, both listed CSS files. Required separate font files: no.
Required physical menu SVG icon files: no.** The default Image Editor icon set
is embedded in its JavaScript since v3.9.0. Color Picker CSS embeds its small
checkerboard image as a data URI. The Image Editor CSS names `Noto Sans` but
contains no `@font-face` or font URL; browser font fallback is sufficient.

The standard Image Editor theme normally assigns its brand image to an
unversioned TOAST UI CDN URL. To eliminate that runtime request, T03 must pass
a theme override whose `common.bi.image` value is the packaged
`_content/ToastUIImageEditor.Blazor/lib/toast-ui-image-editor/3.15.3/tui-image-editor-bi.svg`
asset. Do not use the standard theme's CDN image and do not configure external
SVG icon paths; the bundled default icons are used.

### Static-web-asset path conclusion

The library package ID is `ToastUIImageEditor.Blazor`. Razor Class Library
files under `wwwroot` are served to consumers as
`_content/{PACKAGE ID}/{path-under-wwwroot}`. The JavaScript module should use
relative RCL paths (without a leading `/`) such as:

```text
_content/ToastUIImageEditor.Blazor/lib/toast-ui-image-editor/3.15.3/tui-image-editor.min.js
```

This follows the app document's base URL and works with a hosted application
path base. The injected image-theme value uses the same RCL path.

## Evidence

- The official Image Editor 3.15.3 package metadata identifies version 3.15.3,
  its `dist` entry point, and the Fabric, Code Snippet, and Color Picker
  dependencies: <https://raw.githubusercontent.com/nhn/tui.image-editor/v3.15.3/apps/image-editor/package.json>.
- Its official webpack configuration identifies the browser UMD name and its
  externals: <https://raw.githubusercontent.com/nhn/tui.image-editor/v3.15.3/apps/image-editor/webpack.common.config.js>.
- Its official download action checks `window.saveAs` before downloading:
  <https://raw.githubusercontent.com/nhn/tui.image-editor/v3.15.3/apps/image-editor/src/js/action.js>.
- Its official theme source shows the bundled default SVG handling and the
  configurable brand image: <https://raw.githubusercontent.com/nhn/tui.image-editor/v3.15.3/apps/image-editor/src/js/ui/theme/theme.js>.
- The official Color Picker 2.2.6 bundle exposes the `tui.colorPicker` UMD
  global, and its webpack configuration has no externals:
  <https://raw.githubusercontent.com/nhn/tui.color-picker/v2.2.6/dist/tui-color-picker.min.js>,
  <https://raw.githubusercontent.com/nhn/tui.color-picker/v2.2.6/webpack.config.js>.
- The official Code Snippet documentation states that v2 does not publish
  bundle files: <https://github.com/nhn/tui.code-snippet/blob/v2.1.0/docs/v2.0-migration-guide.md>.
- ASP.NET Core documents the RCL `_content/{PACKAGE ID}/{path}` convention:
  <https://learn.microsoft.com/en-us/aspnet/core/blazor/components/class-libraries?view=aspnetcore-10.0>.

The upstream GitHub latest-release result and tagged package metadata both
still report Image Editor **3.15.3** at this research date. No newer version is
selected.
