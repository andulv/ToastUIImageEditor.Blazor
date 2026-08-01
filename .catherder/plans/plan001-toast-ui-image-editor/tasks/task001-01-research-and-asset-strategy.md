---
type: task
description: "Task 001-01 — refresh research and decide the upstream asset acquisition strategy"
status: completed
created: 2026-08-01T15:07:12+02:00
updated: 2026-08-01T15:22:08+02:00
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
By: @openai-codex 2026-08-01T15:17:05+02:00

Created `data/asset-strategy-2026-08-01.md` with a pinned, offline asset decision for T02. The browser load order is FileSaver 2.0.5, Color Picker 2.2.6, then Image Editor 3.15.3; the two required stylesheets load before construction. Fabric and Code Snippet need no separate assets, while the selected Image Editor bundle requires the Color Picker global. The record also covers FileSaver, the local brand-image theme override, MIT provenance, and Razor Class Library static-asset paths.

## Executor Verification
By: @openai-codex 2026-08-01T15:17:05+02:00

- Confirmed the dated decision record exists and names the pinned versions, every T02 asset and source URL, dependency-bundling conclusion, FileSaver conclusion, CSS/font/icon conclusion, and static-web-asset path behavior.
- Ran `npm pack --dry-run` for `tui-image-editor@3.15.3`, `tui-color-picker@2.2.6`, and `file-saver@2.0.5`; it reported the expected package contents and integrity values without placing runtime assets in the repository.
- Ran `bash /home/anders/source/agent/catherder-dev/.agents/skills/catherder-skills/plan-task-standards/scripts/validate.sh .catherder/plans/plan001-toast-ui-image-editor` — passed (0 errors, 0 warnings).
- Ran `git diff --check` — passed. `grep -RIn "latest" .catherder/plans/plan001-toast-ui-image-editor/data src samples` found only research/documentation URLs and the pre-existing Razor language-version setting; no runtime asset reference uses `latest`.


## Reviewer Verification
By: @pi (reviewer) 2026-08-01T15:22:08+02:00

Re-ran every check in `## Verification`; treated repo state as authoritative:

- Confirmed `data/asset-strategy-2026-08-01.md` exists (7981 bytes).
- Re-ran the validator on the whole plan folder: 0 errors, 0 warnings, 9 files.
- `grep -RIn "latest" data/ src/ samples/` — all hits are benign: documentation URLs and release prose in the two `data/` files, plus the pre-existing `<RazorLangVersion>latest</RazorLangVersion>` MSBuild setting (and its mirrored `obj/` editorconfig). No runtime asset reference uses `latest`.

Independently verified the decision's most load-bearing web claim against the cited official v3.15.3 source (raw `webpack.common.config.js`): `externals` lists exactly `tui-code-snippet` (root `['tui','util']`) and `tui-color-picker` (root `['tui','colorPicker']`); `fabric` is NOT externalized, so it is bundled into `tui-image-editor.min.js`. The UMD output name is `['tui','ImageEditor']` → `globalThis.tui.ImageEditor`. This corroborates the bundling conclusion and the FileSaver → ColorPicker → ImageEditor load order.

Substance check of the decision record: names pinned versions (Image Editor 3.15.3, Color Picker 2.2.6, FileSaver 2.0.5); lists every T02 file with target path + source URL + acquisition tarball; gives explicit yes/no conclusions for (a) dependency bundling, (b) FileSaver requirement, (c) CSS/font/icon set, and (d) RCL static-web-asset path behavior. Satisfies the manual-check criteria.

## Review Notes
By: @pi (reviewer) 2026-08-01T15:22:08+02:00

Verdict: verification passed and the work is accepted → status `completed`. The decision is comprehensive and its central claim is independently confirmed. Carry-forward items for downstream tasks (non-blocking, they self-correct):

1. `tui-image-editor-bi.svg` provenance (`apps/image-editor/src/svg/icon-a/img-bi.svg`): the independent scrape returned an empty body (SVG markup stripped by the markdown cleaner), so existence was not positively confirmed here. T02 will discover a wrong path immediately as a 404 at acquisition — confirm then.
2. Integrity SHA-512 values are advisory (from `npm pack --dry-run`). T02 must re-verify integrity at extraction, as the decision already instructs.
3. The `window.saveAs` / download-path claim is corroborated by the cited `action.js` URL and is definitively falsified at T06 (browser verification). Not a T02/T03 blocker since FileSaver is loaded regardless.

Executor left the task artifacts uncommitted; committing as a completed task is the next persistence step (project rule: one commit per completed task, subject prefixed with the task ID).
