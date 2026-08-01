---
type: task
description: "Task 001-06 — final browser verification and evidence"
status: not-started
created: 2026-08-01T15:07:12+02:00
updated: 2026-08-01T15:07:12+02:00
---
## Required Context
Load and follow these skills:
- `plan-task-standards`
- `ketch`

Also read:
- `plan001-spec.md` (sections 3, 4)
- `data/initial-research-2026-08-01.md` ("Suggested browser acceptance flow")
- `.agents/project.instructions.md` (commands)

## Objective

Prove the complete load/edit/output/disposal flow in a real browser and record
the evidence. This is the only task that can establish canvas, asset, layout,
edit, and download behavior.

## Scope

**Included**

- Run the sample host and open the printed local URL with browser tooling.
- Confirm the full UI and bundled sample image render with no failed asset
  requests.
- Perform one representative edit (e.g. rotate, add text, or apply grayscale).
- Use the selected upstream output/download path and confirm the result reflects
  the edit.
- Inspect the console for errors/warnings and the network panel to confirm there
  is no runtime CDN dependency and no usage-statistics request.
- Remove the component (navigate away / trigger disposal if the sample supports
  it) and check for disposal errors.
- Record URL, browser actions, observed result, console status, and any
  screenshot/log under this plan's `data/` directory.

**Excluded**

- Automated end-to-end browser tests unless a small, stable, long-lived
  regression is found (per the spec's Out of Scope). Direct browser
  verification is required regardless.

## Steps

1. Start the sample host and capture the local URL.
2. Walk through the acceptance flow in the browser (render, edit, download,
   network/console inspection, disposal).
3. Save the evidence (URL, actions, console result, screenshot or log) under
   `data/`, e.g. `browser-verification-YYYY-MM-DD.md`.
4. If the built-in download path does not work for the sample, note it and, per
   the spec, consider adding a minimal .NET export method — record the decision
   either way.

## Verification

- The sample host runs and a browser opened its URL successfully.
- A dated evidence file exists under
  `.catherder/plans/plan001-toast-ui-image-editor/data/`.
- Manual check: the evidence shows the full UI rendering the bundled image, the
  representative edit applied, a working output/download, a clean console (no
  failed assets, no CDN, no usage-statistics request), and clean disposal on
  removal.

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
