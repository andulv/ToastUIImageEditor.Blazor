---
type: task
description: "Task 001-02 — vendor version-pinned upstream assets as static web assets"
status: not-started
created: 2026-08-01T15:07:12+02:00
updated: 2026-08-01T15:07:12+02:00
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
By: @ YYYY-MM-DDTHH:MM:SS+HH:MM

## Executor Verification
By: @ YYYY-MM-DDTHH:MM:SS+HH:MM

## Reviewer Verification
By: @ YYYY-MM-DDTHH:MM:SS+HH:MM

## Review Notes
By: @ YYYY-MM-DDTHH:MM:SS+HH:MM
