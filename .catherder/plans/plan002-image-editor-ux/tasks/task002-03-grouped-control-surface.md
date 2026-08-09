---
type: task
description: "Task 002-03 — build the grouped editor control surface"
status: implemented
created: 2026-08-02T16:34:49+02:00
updated: 2026-08-02T20:08:00+02:00
---
## Required Context
Load and follow these skills:
- `plan-task-standards`
- `blazor-expert`
- `blazor-mudblazor-layout`
- `simple-english`

Also read:
- `plan002-spec.md`
- `data/control-api-mapping-*.md`
- `tasks/task002-02-grouped-control-interop.md`
- `src/ToastUIImageEditor.Blazor/ImageEditor.razor`

## Objective

Replace the confusing native toolbar presentation with a responsive,
wrapper-owned grouped control surface.

## Scope

**Included**

- Present View, History, Image, Draw, and Image Adjustment as clearly labeled
  groups around the canvas.
- Include only mapped controls. Omit Reset from the primary UI.
- Put selected-object Delete in Draw and use clear labels, icons, tooltips,
  focus order, and disabled states.
- Show Delete All as a separate destructive action. Require confirmation before
  calling the clear-added-objects interop operation.
- Hide or disable the competing upstream controls without relying on private
  upstream DOM structure.
- Make the layout responsive and keep the canvas visually dominant.
- Update sample text or documentation when a first-time user needs direction.

**Excluded**

- Recreating the upstream canvas or filters in Blazor.
- Adding an upload or persistence workflow.
- A broad public .NET API.

## Steps

1. Build semantic group markup and concise labels from the T01 mapping.
2. Wire controls to the T02 interop contract.
3. Add accessible Delete All confirmation and cancellation behavior.
4. Add component-scoped styling for desktop and narrow viewports.
5. Build and inspect the component without browser-only claims.

## Verification

- `dotnet build ToastUIImageEditor.Blazor.slnx` exits 0.
- Manual check: all five groups have visible names; Reset is absent; and both
  delete actions are in the Draw group.
- Manual check: Delete All requires confirmation and cancellation performs no
  change.
- Negative check: no code reads or rearranges upstream private toolbar DOM.

---

# Execution

## Executor Notes
By: @openai-codex 2026-08-02T16:44:58+02:00

Added a wrapper-owned semantic control surface with View, History, Image, Draw, and Image Adjustment groups. It omits Reset, places both deletion actions in Draw, and calls the adapter's browser-confirmed Delete All operation. The component CSS uses compact group cards and a responsive grid while the canvas remains in its own dark, scrollable surface.

### User-feedback follow-up — 2026-08-02T17:28:29+02:00

Changed controls to consistent two-column button grids with visible icons and full-width actions where that improves clarity. Image, Draw, and Image adjustment are in the left column; the canvas remains central; View and History are in the right column on desktop. Crop now replaces Start crop with Apply crop and Cancel crop only while crop mode is active. Resize and custom rotation now open accessible wrapper dialogs. Resize starts from the native canvas dimensions and offers Keep aspect ratio; custom rotation accepts degrees and direction.

### User-feedback follow-up — 2026-08-02T18:04:50+02:00

Draw, Shape, Icon, and Text now select a corresponding options group instead of immediately creating an object. The practical options are brush color/width; rectangle/circle/triangle with fill, stroke, and width; arrow/cancel with color; and text content, color, and size. Each group has an explicit action to start drawing or add the configured element. History displays its current operation count next to its label.

### User-feedback follow-up — 2026-08-02T18:13:01+02:00

View now presents the wrapper-owned current zoom percentage with accessible Zoom out, Set zoom level, and Zoom in controls. Users can enter a percentage or adjust in 10% steps. The page no longer suggests mouse-wheel zoom because that would leave the displayed wrapper level unsynchronised.

## Executor Verification
By: @openai-codex 2026-08-02T16:44:58+02:00

- Ran `dotnet build ToastUIImageEditor.Blazor.slnx` — passed (0 warnings, 0 errors).
- Ran `node --check src/ToastUIImageEditor.Blazor/ImageEditor.razor.js`, `git diff --check`, and `git diff --cached --check` — all passed.
- Confirmed the markup has all five visible group names, no Reset control, and both delete actions in Draw. Confirmed the component module has no upstream toolbar DOM selector or private `ui` or `graphics` access.
- The pre-existing root-div smoke assertion now fails because the component intentionally contains a grouped surface. T04 is the already-dispatched dedicated task that replaces that brittle assertion with stable product-contract tests; it must pass before this plan can complete.
- Follow-up: Ran `dotnet build ToastUIImageEditor.Blazor.slnx`, `node --check src/ToastUIImageEditor.Blazor/ImageEditor.razor.js`, and both diff checks — all passed. The existing group-order test now fails only because View and History deliberately moved after the central canvas in DOM order; T04 will update it and add the dialog/crop-state contract checks.
- Follow-up: Ran `dotnet build ToastUIImageEditor.Blazor.slnx`, `node --check src/ToastUIImageEditor.Blazor/ImageEditor.razor.js`, and both diff checks — all passed (0 build warnings/errors). T04 will update the heading assertion for the visible operation-count badge and cover the new default Draw-tool surface.


## Reviewer Verification
By: @ YYYY-MM-DDTHH:MM:SS+HH:MM

## Review Notes
By: @ YYYY-MM-DDTHH:MM:SS+HH:MM
