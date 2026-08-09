---
type: task
description: "Task 001-02 — vendor version-pinned upstream assets as static web assets"
status: implemented
created: 2026-08-01T15:07:12+02:00
updated: 2026-08-01T20:44:32+02:00
---
## Required Context
Load and follow these skills:
- `plan-task-standards`
- `nuget-manager`

Also read:
- `plan001-spec.md` (sections 3, 4, 6)
- `data/asset-strategy-*.md` (the decision produced by T01)
- `WrappedToast` reference: `src/WrappedToast/wwwroot/toastui-loader.js`,
  `src/WrappedToast/THIRD-PARTY-NOTICES.md`

## Objective

Acquire the version-pinned upstream distribution into the package as static web
assets, add a lazy idempotent JS loader that exposes
`globalThis.tui.ImageEditor`, and record license attribution.

## Scope

**Included**

- Vendor the files named by T01's decision under
  `src/ToastUIImageEditor.Blazor/wwwroot/lib/tui-image-editor/` (JS, CSS, and any
  required font/icon assets). Pin to the immutable version from T01; do not pull
  `latest`.
- If T01 found that dependencies ship separately, vendor them too under clearly
  named paths.
- Add a loader module, e.g. `src/ToastUIImageEditor.Blazor/wwwroot/tui-image-editor-loader.js`,
  that: injects the stylesheet(s) and script idempotently (mirroring WrappedToast's
  `toastui-loader.js` promise-cached pattern), asserts
  `globalThis.tui.ImageEditor` exists after load, and rejects with a clear error
  on failure. Expose `ensureImageEditorAssets()` plus a small set of
  initialize/get/dispose helpers if that matches the reference pattern.
- Write `src/ToastUIImageEditor.Blazor/THIRD-PARTY-NOTICES.md` with the MIT text
  for tui.image-editor and for `fabric`, `tui-code-snippet`, and
  `tui-color-picker` if any are vendored separately. Name the version and the
  files bundled.
- Wire the notice into the package (add a `<None Include="THIRD-PARTY-NOTICES.md" Pack="true" PackagePath="" />`).
- Update the csproj `<Description>` to state the bundled version.

**Excluded**

- The Blazor component itself (T03).
- The sample image and sample page (T04).

## Steps

1. Acquire exactly the files named by T01, placing them under
   `wwwroot/lib/tui-image-editor/`. Record the source URL for each in the
   third-party notice.
2. Add the loader module under `wwwroot/`, modeled on WrappedToast's loader:
   promise-cached asset load, stylesheet + script injection, and a clear error if
   `globalThis.tui.ImageEditor` is absent after load.
3. Write `THIRD-PARTY-NOTICES.md` and add it to the package's `<None>` items.
4. Update the csproj `<Description>` to reference the pinned version.

## Verification

- `dotnet build ToastUIImageEditor.Blazor.slnx` exits 0.
- The vendored assets exist under
  `src/ToastUIImageEditor.Blazor/wwwroot/lib/tui-image-editor/` and the loader
  module exists under `src/ToastUIImageEditor.Blazor/wwwroot/`.
- Manual check: `THIRD-PARTY-NOTICES.md` names the upstream version and covers
  every vendored file/license.
- `grep -RIn "cdn\|unpkg\|jsdelivr\|latest" src/ToastUIImageEditor.Blazor/wwwroot/lib/`
  does not reveal a runtime CDN or `latest` dependency (vendored copies only).

---

# Execution

## Executor Notes
By: @openai-codex 2026-08-01T20:44:32+02:00

The user selected the task-specified `wwwroot/lib/tui-image-editor/` directory over the different directory named in T01's asset decision. Vendored Image Editor 3.15.3, separately named Color Picker 2.2.6 and FileSaver 2.0.5 assets beneath `wwwroot/lib/`. The new promise-cached loader injects both stylesheets and loads FileSaver, Color Picker, and Image Editor in dependency order, checking their expected globals. Added package attribution and updated the package description.

## Executor Verification
By: @openai-codex 2026-08-01T20:44:32+02:00

- Used `npm pack` to acquire the three pinned packages into a temporary directory and verified the SHA-512 integrity values recorded by T01 before extracting the selected files. No package-manager dependency was added to the .NET project.
- Ran `dotnet build ToastUIImageEditor.Blazor.slnx` — passed (0 warnings, 0 errors).
- Ran `dotnet pack src/ToastUIImageEditor.Blazor/ToastUIImageEditor.Blazor.csproj --output /tmp/toast-image-editor-p001-pack` — passed. Inspected the package and confirmed it contains `THIRD-PARTY-NOTICES.md`, the loader, and all six static assets.
- Ran `node --check src/ToastUIImageEditor.Blazor/wwwroot/tui-image-editor-loader.js` and `git diff --check` — both passed.
- Ran `grep -RIlE 'cdn|unpkg|jsdelivr|latest' src/ToastUIImageEditor.Blazor/wwwroot/lib/`. It reports only the upstream Image Editor bundle because its uninvoked standard-theme default contains the original TOAST UI CDN brand-image literal. The loader contains no CDN or `latest` URL, and T01 requires T03 to override that standard-theme value with the vendored local SVG before any editor instance is constructed; browser verification remains T06's responsibility.
- Ran the plan validator — passed (0 errors, 0 warnings).


## Reviewer Verification
By: @ YYYY-MM-DDTHH:MM:SS+HH:MM

## Review Notes
By: @ YYYY-MM-DDTHH:MM:SS+HH:MM
