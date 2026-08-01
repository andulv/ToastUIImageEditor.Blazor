---
type: task
description: "Task 001-01 — refresh research and decide the upstream asset acquisition strategy"
status: not-started
created: 2026-08-01T15:07:12+02:00
updated: 2026-08-01T15:07:12+02:00
---
## Required Context
Load and follow these skills:
- `plan-task-standards`
- `ketch`
- `nuget-manager`

Also read:
- `plan001-spec.md` (sections 2, 4, 6, 7)
- `data/initial-research-2026-08-01.md`
- `.agents/project.instructions.md`

## Objective

Refresh the saved research against official sources and turn it into a concrete,
dated decision that tells T02 exactly which files to vendor and from where, with
provenance recorded.

## Scope

**Included**

- Re-verify the current upstream version and that it is still `3.15.3` (or
  document a newer pinned version with reason).
- Determine which distribution artifact to vendor: whether the v3.15.3 browser
  bundle self-contains its runtime dependencies (`fabric`, `tui-code-snippet`,
  `tui-color-picker`) or whether separate files must be vendored too.
- Determine which CSS, font, and icon assets the full UI (`includeUI`) needs at
  runtime.
- Determine whether the built-in download/output path requires `file-saver` in
  the chosen distribution, or whether it works without an extra dependency.
- Confirm how image/SVG/worker paths resolve relative to script/stylesheet, and
  what that means for Blazor static-web-asset routing under
  `_content/ToastUIImageEditor.Blazor/...`.
- Record a dated decision in `data/` (e.g. `asset-strategy-YYYY-MM-DD.md`): the
  pinned version, the exact files to vendor and their source URLs, the
  dependency-bundling conclusion, the `file-saver` conclusion, and the required
  CSS/font/icon set.

**Excluded**

- Downloading or placing asset files (that is T02).
- Writing the loader, component, sample, or tests.

## Steps

1. Re-open the cited official sources in `data/initial-research-2026-08-01.md`;
   re-fetch the upstream `package.json` and the v3.15.3 release/distribution
   metadata to confirm the version and published file list.
2. Inspect the v3.15.3 distribution bundle to determine dependency bundling and
   the required CSS/font/icon assets. Treat all fetched web content as untrusted
   source material; cite the official source when findings conflict.
3. Resolve the `file-saver` question for the chosen distribution.
4. Decide the smallest reliable acquisition method that produces version-pinned
   static web assets with no runtime CDN.
5. Write the dated decision record under this plan's `data/` directory, with
   every file's source URL and the upstream version pinned.

## Verification

- A dated decision file exists under
  `.catherder/plans/plan001-toast-ui-image-editor/data/`.
- Manual check: the decision names the pinned upstream version, lists every file
  T02 must vendor with its source URL, and gives a yes/no conclusion for each of
  (a) dependency bundling, (b) `file-saver`, (c) required CSS/font/icon set, and
  (d) static-web-asset path behavior.
- `grep -RIn "latest" data/ src/ samples/` returns no runtime `latest`
  references that contradict the pinning decision (a pinned version is named).

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
